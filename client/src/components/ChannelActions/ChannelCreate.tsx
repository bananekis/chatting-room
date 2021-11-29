import { Button } from "@vechaiui/button";
import { ChannelNameInput, UserList } from "..";
import { StreamStatusContext } from "../../App";
import { color } from "../../config";
import { useChatContext } from "stream-chat-react";
import { useContext, useState } from "react";
import { useNotification } from "@vechaiui/react";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";
import styled from "styled-components";

// styles

export const DivWrapper = styled.div`
  padding: 1em;
  font-size: 1.5em;
`;

export const DivCreateChannel = styled.div`
  display: flex;
  flex: 2;
  justify-content: end;
  align-items: end;
`;

export const DivTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const ChannelCreate = () => {
  const { createType, setIsCreating } = useContext(StreamStatusContext);
  const [channelName, setChannelName] = useState<string>("");
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([
    client.userID || "",
  ]);
  const notification = useNotification();

  const createChannel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      if (
        createType === "team" &&
        (selectedUsers.length === 1 || channelName === "")
      ) {
        return notification({
          title: channelName === "" ? "Warning" : "Error",
          description:
            channelName === ""
              ? "Please Fill out Channel Name"
              : "You didn't invite any members!",
          status: channelName === "" ? "warning" : "error",
          position: "top",
        });
      } else if (createType === "messaging" && selectedUsers.length === 1) {
        return notification({
          title: "Error",
          description: "You didn't invite any members!",
          status: "error",
          position: "top",
        });
      }

      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID || ""]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DivWrapper>
      <DivTitle>
        <p>
          {createType === "team"
            ? "Create New Channel"
            : "Send Direct Messages"}
        </p>
        <CancelSharpIcon
          style={{ color: color.skyBlue, cursor: "pointer", fontSize: "1.5em" }}
          onClick={() => setIsCreating(false)}
        />
      </DivTitle>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <DivCreateChannel>
        <Button color="blue" onClick={createChannel}>
          {createType === "team" ? "Create Channel" : "Create Message Group"}
        </Button>
      </DivCreateChannel>
    </DivWrapper>
  );
};

export default ChannelCreate;
