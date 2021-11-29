import {
  Avatar,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import { StreamStatusContext } from "../../App";
import { color } from "../../config";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivSelected = styled.div`
  margin-top: 0.5em;
  border-radius: 5px;
  padding: 10px;
  &.selected {
    background: ${color.darkBlue};
  }
`;

const DivDM = styled.div`
  display: flex;
  cursor: pointer;
`;

type Props = Pick<ChannelPreviewUIComponentProps, "channel"> & {
  type: string;
};

const CustomChannelPreview: React.FC<Props> = ({ channel, type }) => {
  const { channel: activeChannel, client, setActiveChannel } = useChatContext();
  const { setIsCreating, setIsEditing, setToggle, toggle } =
    useContext(StreamStatusContext);

  const ChannelPreview = () => (
    <p style={{ cursor: "pointer" }}># {channel?.data?.name}</p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user?.id !== client.userID
    );

    return (
      <DivDM>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.name || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.name || members[0]?.user?.id}</p>
      </DivDM>
    );
  };

  return (
    <DivSelected
      className={channel?.id === activeChannel?.id ? "selected" : ""}
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);

        if (toggle) {
          setToggle((p) => !p);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </DivSelected>
  );
};

export default CustomChannelPreview;
