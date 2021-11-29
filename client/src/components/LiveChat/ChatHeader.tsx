import { ChannelName } from "..";
import { color } from "../../config";
import { useChannelStateContext } from "stream-chat-react";
import styled from "styled-components";

// styled

const DivHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const POnline = styled.p`
  background-color: ${color.skyBlue};
  border-radius: 5px;
  padding: 10px;
  color: ${color.white};
`;

const ChatHeader = () => {
  const { watcher_count } = useChannelStateContext();

  const getWatcherText = (watchers: number | undefined) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <DivHeader>
      <ChannelName />
      <POnline>{getWatcherText(watcher_count)}</POnline>
    </DivHeader>
  );
};

export default ChatHeader;
