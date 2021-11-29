import { Avatar, useChatContext } from "stream-chat-react";
import { Channel, UserResponse } from "stream-chat";
import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";
import { StreamStatusContext } from "../../App";
import { UserChannel } from "../../types";
import { color } from "../../config";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivWrapper = styled.div`
  display: flex;
  color: ${color.lightGreen};
  font-weight: 400;
  cursor: pointer;
  margin: 0.5em 0;
`;

// custom hook

const setUserChannel = async ({
  client,
  directChannel,
  setChannel,
}: UserChannel) => {
  const newChannel = client.channel("messaging", {
    members: [directChannel?.id || "", client.userID || ""],
  });

  return setChannel(newChannel);
};

type Props = {
  teamChannel?: Channel;
  directChannel?: UserResponse<DefaultUserType<DefaultUserTypeInternal>>;
  setChannel: (channel: Channel | undefined) => void;
  type: string;
};

const SearchResult = ({
  teamChannel,
  directChannel,
  type,
  setChannel,
}: Props) => {
  const { client } = useChatContext();
  const { setToggle } = useContext(StreamStatusContext);

  if (type === "channel") {
    return (
      <DivWrapper
        onClick={() => {
          setChannel(teamChannel);
          if (setToggle) {
            setToggle((p) => !p);
          }
        }}
      >
        <p>#</p>
        <p>{teamChannel?.id}</p>
      </DivWrapper>
    );
  }

  return (
    <div
      onClick={async () => {
        setUserChannel({ client, directChannel, setChannel });
        if (setToggle) {
          setToggle((p) => !p);
        }
      }}
    >
      <DivWrapper>
        <Avatar
          image={directChannel?.image}
          name={directChannel?.name}
          size={24}
        />
        <p>{directChannel?.name}</p>
      </DivWrapper>
    </div>
  );
};

export default SearchResult;
