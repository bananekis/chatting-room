import { Button, Icon, Input } from "@vechaiui/react";
import { ErrorForm, FormType } from "../../types";
import { URL, color, cookies } from "../../config";
import { useNotification } from "@vechaiui/react";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import Logo from "../../assets/Logo";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import axios from "axios";
import background from "../../assets/auth-background.svg";
import styled from "styled-components";

// styles

const DivAuth = styled.div`
  background-image: url(${background});
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2rem;
`;

const DivForm = styled.div`
  width: 40%;
  background: ${color.white};
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const PFormHeading = styled.p`
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 0.7em;
`;

const Label = styled.label`
  font-size: 0.9em;
`;

const Span = styled.span`
  cursor: pointer;
  color: ${color.darkBlue};
  font-weight: 500;

  @media (max-width: 330px) {
    font-size: 0.8em;
  }
`;

const DivAskAnswear = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
`;

const Form = styled.form`
  & > div {
    margin-bottom: 0.5em;
  }
`;

const DivTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 3em;
  font-weight: 500;
  color: ${color.white};
  align-items: center;

  @media (max-width: 768px) {
    font-size: 2.5em;
  }

  @media (max-width: 420px) {
    font-size: 2em;
  }

  @media (max-width: 330px) {
    font-size: 1.5em;
  }
`;

const DivDescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${color.white};
  padding: 27px;
`;

const SpanDescription = styled.span`
  font-style: italic;

  @media (max-width: 330px) {
    font-size: 0.9em;
  }
`;

const PQuestion = styled.p`
  @media (max-width: 330px) {
    font-size: 0.9em;
  }
`;

const initialState: FormType = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const errorState: ErrorForm = {
  fullName: false,
  username: false,
  password: false,
  confirmPassword: false,
  phoneNumber: false,
  avatarURL: false,
};

const Auth = () => {
  const [form, setForm] = useState<FormType | any>(initialState);
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [error, setError] = useState<ErrorForm>(errorState);
  const notification = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p: FormType) => {
      return { ...p, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate form

    setError(errorState);
    let hasError = false;

    for (const key in form) {
      if (form[key] === "" && isSignUp) {
        setError((p) => {
          return { ...p, [key]: true };
        });
        hasError = true;
      } else if (
        (key === "username" || key === "password") &&
        form[key] === "" &&
        !isSignUp
      ) {
        setError((p) => {
          return { ...p, [key]: true };
        });
        hasError = true;
      }
    }

    if (hasError) return;

    // api request

    const { username, password, phoneNumber, avatarURL, confirmPassword } =
      form;

    const {
      data: { token, userID, hashedPassword, fullName, users, message },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      fullName: form.fullName,
      username,
      password,
      phoneNumber,
      avatarURL,
      confirmPassword,
    });

    // checking for an error

    if (message) {
      setError((p) => {
        return message === "Passwords do not match!"
          ? { ...p, password: true, confirmPassword: true }
          : message === "Incorrect password"
          ? { ...p, password: true }
          : { ...p, username: true };
      });

      return notification({
        title: "Error",
        description: message,
        status: "error",
        position: "top",
      });
    }

    // checking if username is already taken

    let usernameExists = false;

    for (const user in users) {
      if (users[user].name === username) {
        usernameExists = true;
      }
    }

    if (usernameExists) {
      setError((p) => {
        return { ...p, username: true };
      });

      return notification({
        title: "Error",
        description: "This username is already taken!",
        status: "error",
        position: "top",
      });
    }

    // setting cookies

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userID", userID);

    if (isSignUp) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const handleChoice = () => {
    setIsSignUp((p) => !p);
    setForm(initialState);
    setError(errorState);
  };

  return (
    <DivAuth>
      <DivDescriptionWrapper>
        <DivTitle>
          Welcome to the Chatting Room!
          <Logo />
        </DivTitle>
        <SpanDescription>
          send messages, GIFs, emojis and create your own channels with members
          you want to chat with!
        </SpanDescription>
      </DivDescriptionWrapper>
      <DivWrapper>
        <DivForm>
          <PFormHeading>{isSignUp ? "Sign Up" : "Sign In"}</PFormHeading>
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input.Group>
                  <Input
                    type="text"
                    name="fullName"
                    color={error.fullName ? "red" : "blue"}
                    placeholder="Full Name"
                    onChange={handleChange}
                    value={form.fullName}
                    invalid={error.fullName}
                  />
                  <Input.RightElement>
                    <Icon as={BadgeOutlinedIcon} label="fullName" />
                  </Input.RightElement>
                </Input.Group>
              </div>
            )}
            <div>
              <Label htmlFor="username">Username</Label>
              <Input.Group>
                <Input
                  type="text"
                  name="username"
                  color={error.username ? "red" : "blue"}
                  placeholder="Username"
                  onChange={handleChange}
                  value={form.username}
                  invalid={error.username}
                />
                <Input.RightElement>
                  <Icon as={PersonOutlinedIcon} label="username" />
                </Input.RightElement>
              </Input.Group>
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input.Group>
                  <Input
                    type="number"
                    name="phoneNumber"
                    color={error.phoneNumber ? "red" : "blue"}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    value={form.phoneNumber}
                    invalid={error.phoneNumber}
                  />
                  <Input.RightElement>
                    <Icon as={PhoneAndroidOutlinedIcon} label="phone" />
                  </Input.RightElement>
                </Input.Group>
              </div>
            )}
            {isSignUp && (
              <div>
                <Label htmlFor="avatarURL">Avatar URL</Label>
                <Input.Group>
                  <Input
                    type="text"
                    name="avatarURL"
                    color={error.avatarURL ? "red" : "blue"}
                    placeholder="Avatar URL"
                    onChange={handleChange}
                    value={form.avatarURL}
                    invalid={error.avatarURL}
                  />
                  <Input.RightElement>
                    <Icon as={AccountCircleIcon} label="avatar" />
                  </Input.RightElement>
                </Input.Group>
              </div>
            )}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input.Group>
                <Input
                  type="password"
                  name="password"
                  color={error.password ? "red" : "blue"}
                  placeholder="Password"
                  onChange={handleChange}
                  value={form.password}
                  invalid={error.password}
                />
                <Input.RightElement>
                  <Icon as={PasswordOutlinedIcon} label="password" />
                </Input.RightElement>
              </Input.Group>
            </div>
            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input.Group>
                  <Input
                    type="password"
                    name="confirmPassword"
                    color={error.confirmPassword ? "red" : "blue"}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    value={form.confirmPassword}
                    invalid={error.confirmPassword}
                  />
                  <Input.RightElement>
                    <Icon as={PasswordOutlinedIcon} label="password" />
                  </Input.RightElement>
                </Input.Group>
              </div>
            )}
            <Button color="blue">{isSignUp ? "Sign Up" : "Sign In"}</Button>
          </Form>
          <DivAskAnswear>
            <PQuestion>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </PQuestion>
            <Span onClick={handleChoice}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </Span>
          </DivAskAnswear>
        </DivForm>
      </DivWrapper>
    </DivAuth>
  );
};

export default Auth;
