import { Sidebar } from ".";
import { StreamStatusContext } from "../App";
import { color } from "../config";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivResponzive = styled.div`
  display: none;
  height: 100vh;
  position: absolute;
  width: 90%;
  top: 0%;
  z-index: 5;
  transition: 0.8s ease;
  background: ${color.skyBlue};

  @media screen and (max-width: 960px) {
    display: flex;
  }
`;

const DivToggle = styled.div`
  display: none;
  height: 50px;
  width: 50px;
  background: ${color.skyBlue};
  position: absolute;
  right: -2%;
  top: 50%;
  border-radius: 50%;
  z-index: 0;

  @media screen and (max-width: 960px) {
    display: flex;
  }

  @media screen and (max-width: 650px) {
    right: -3%;
  }

  @media screen and (max-width: 400px) {
    right: -5%;
  }
`;

const DivWideScreen = styled.div`
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const WindowAdapt = () => {
  const { toggle, setToggle } = useContext(StreamStatusContext);

  return (
    <>
      <DivWideScreen>
        <Sidebar />
      </DivWideScreen>

      <DivResponzive style={{ left: toggle ? "0%" : "-89%" }}>
        <DivToggle onClick={() => setToggle((p) => !p)}></DivToggle>
        <Sidebar />
      </DivResponzive>
    </>
  );
};

export default WindowAdapt;
