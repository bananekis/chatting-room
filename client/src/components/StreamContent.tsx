import {
  Channel,
  EmptyStateIndicatorProps,
  MessageTeam,
} from "stream-chat-react";
import { ChannelCreate, ChannelEdit, LiveChat } from ".";
import { StreamStatusContext } from "../App";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivStreamContent = styled.div`
  display: flex;
  flex: 1;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const DivEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  height: 100%;
  justify-content: end;
  padding: 1em;
`;

const PChatHistory = styled.p`
  font-size: 1.1em;
  font-weight: 600;
`;

const PChatInfo = styled.p`
  font-size: 0.9em;
  font-style: italic;
`;

const StreamContent = () => {
  const { isCreating, isEditing } = useContext(StreamStatusContext);

  if (isCreating) {
    return (
      <DivStreamContent>
        <ChannelCreate />
      </DivStreamContent>
    );
  }

  if (isEditing) {
    return (
      <DivStreamContent>
        <ChannelEdit />
      </DivStreamContent>
    );
  }

  const EmptyState:
    | React.ComponentType<EmptyStateIndicatorProps>
    | undefined = () => (
    <DivEmptyState>
      <PChatHistory>This is the beginning of your chat history.</PChatHistory>
      <PChatInfo>
        Send messages, attachments, links, emojis, and more!
      </PChatInfo>
    </DivEmptyState>
  );

  return (
    <DivStreamContent>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, index) => (
          <MessageTeam key={index} {...messageProps} />
        )}
      >
        <LiveChat />
      </Channel>
    </DivStreamContent>
  );
};

export default StreamContent;
