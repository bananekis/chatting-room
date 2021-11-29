import { Avatar } from "stream-chat-react";
import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";
import { UserResponse } from "stream-chat";
import { color } from "../../config";
import { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import styled from "styled-components";

// styles

const DivUserItemWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5em;
`;

const DivUser = styled.div`
  display: flex;
  align-items: center;
`;

const PUser = styled.p`
  font-size: 0.7em;
`;

interface Props {
  user: UserResponse<DefaultUserType<DefaultUserTypeInternal>>;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const UserItem = ({ user, setSelectedUsers }: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = () => {
    if (selected) {
      setSelectedUsers((p) => p.filter((p) => p !== user.id));
    } else {
      setSelectedUsers((p) => [...p, user.id]);
    }

    setSelected((p) => !p);
  };

  return (
    <DivUserItemWrapper onClick={handleSelect}>
      <DivUser>
        <Avatar image={user.image} name={user.name || user.id} size={36} />
        <PUser>{user.name || user.id}</PUser>
      </DivUser>
      {selected ? (
        <VerifiedIcon style={{ color: color.green, fontSize: "1.5em" }} />
      ) : (
        <div />
      )}
    </DivUserItemWrapper>
  );
};

export default UserItem;
