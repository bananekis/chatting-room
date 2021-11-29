import { ChatHeader } from "..";
import {
  MessageInput,
  MessageList,
  MessageToSend,
  Thread,
  Window,
  useChannelActionContext,
} from "stream-chat-react";

const LiveChat = () => {
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message: MessageToSend) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (sendMessage) {
      sendMessage(updatedMessage);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <Window>
        <ChatHeader />
        <MessageList />
        <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <Thread />
    </div>
  );
};

export default LiveChat;
