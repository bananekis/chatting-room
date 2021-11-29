import {
  Avatar,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import { ChannelInfo } from "./ChannelInfo";
import { StreamStatusContext } from "../../App";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivInfo = styled.div`
  display: flex;
  align-items: center;
`;

const PActiveChannel = styled.div`
  margin-right: 0.5em;
  font-size: 1.3em;
`;

const Span = styled.span`
  display: flex;
  cursor: pointer;
`;

const ChannelName = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const { setIsEditing } = useContext(StreamStatusContext);

  const members = Object.values(channel.state.members).filter(
    ({ user }) => user?.id !== client.userID
  );
  const additionalMembers = members.length - 3;

  if (channel.type === "messaging") {
    return (
      <DivInfo>
        {members.map(({ user }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "1em",
            }}
          >
            <Avatar
              image={user?.image}
              name={user?.name || user?.id}
              size={32}
            />
            <p>{user?.name || user?.id}</p>
          </div>
        ))}

        {additionalMembers > 0 && <p>and {additionalMembers} more</p>}
      </DivInfo>
    );
  }

  return (
    <DivInfo>
      <PActiveChannel># {channel?.data?.name}</PActiveChannel>
      <Span onClick={() => setIsEditing(true)}>
        <ChannelInfo />
      </Span>
    </DivInfo>
  );
};

export default ChannelName;
