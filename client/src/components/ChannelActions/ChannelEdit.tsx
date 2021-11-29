import { Button } from "@vechaiui/button";
import { ChannelNameInput, UserList } from "..";
import { DivCreateChannel, DivTitle, DivWrapper } from "./ChannelCreate";
import { StreamStatusContext } from "../../App";
import { color } from "../../config";
import { useChatContext } from "stream-chat-react";
import { useContext, useState } from "react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

const ChannelEdit = () => {
  const { channel } = useChatContext();
  const { setIsEditing } = useContext(StreamStatusContext);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [channelName, setChannelName] = useState<string>(
    channel?.data?.name || ""
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const nameChanged =
      channelName !== (channel?.data?.name || channel?.data?.id);

    if (nameChanged) {
      await channel?.update(
        { name: channelName },
        { text: `Channel name changed to ${channelName}` }
      );
    }

    if (selectedUsers.length) {
      await channel?.addMembers(selectedUsers);
    }

    setChannelName("");
    setIsEditing(false);
    setSelectedUsers([]);
  };

  return (
    <DivWrapper>
      <DivTitle>
        <p>Edit Channel</p>
        <CancelSharpIcon
          style={{
            color: color.skyBlue,
            cursor: "pointer",
            fontSize: "1.5em",
          }}
          onClick={() => setIsEditing(false)}
        />
      </DivTitle>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <DivCreateChannel>
        <Button color="blue" onClick={handleClick}>
          Save Changes
        </Button>
      </DivCreateChannel>
    </DivWrapper>
  );
};

export default ChannelEdit;
