import { Channel } from "stream-chat";
import { ChannelList, useChatContext } from "stream-chat-react";
import { CustomChannelPreview, Search } from "..";
import { StreamStatusContext } from "../../App";
import { color, cookies } from "../../config";
import { useContext } from "react";
import CustomChannelList from "./CustomChannelList";
import homepage from "../../assets/homepage.svg";
import logoutImg from "../../assets/logout.svg";
import styled from "styled-components";

// styles

const DivSidebar = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${color.darkBlue};
`;

const DivIconWrapper = styled.div`
  width: 25%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  justify-content: space-between;
`;

const DivSideRight = styled.div`
  position: relative;
  width: 100%;
  color: ${color.white};
  font-weight: bold;
  font-size: 1.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
  background: var(--primary-color);
`;

const DivTitle = styled.div`
  margin-bottom: 0.85em;
`;

const DivImage = styled.div`
  margin-bottom: 1em;
  cursor: pointer;
`;

const Sidebar = () => {
  const { client } = useChatContext();
  const { setIsCreating, setIsEditing } = useContext(StreamStatusContext);

  const accessibleChannels = { members: { $in: [client.userID || ""] } };

  const messagingPreview = (channels: Channel[]) => {
    return channels.filter((channel) => channel.type === "messaging");
  };

  const teamPreview = (channels: Channel[]) => {
    return channels.filter((channel) => channel.type === "team");
  };

  const logout = () => {
    cookies.remove("userID");
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const goHome = () => {
    setIsCreating(false);
    setIsEditing(false);
  };

  return (
    <DivSidebar>
      <DivIconWrapper>
        <DivImage>
          <img src={homepage} alt="homepage" onClick={goHome} />
        </DivImage>
        <DivImage>
          <img src={logoutImg} alt="logout" onClick={logout} />
        </DivImage>
      </DivIconWrapper>
      <DivSideRight>
        <DivTitle>Chatting Room</DivTitle>
        <Search />
        <ChannelList
          filters={accessibleChannels}
          channelRenderFilterFn={teamPreview}
          List={(props) => <CustomChannelList {...props} type="team" />}
          Preview={(props) => (
            <CustomChannelPreview channel={props.channel} type="team" />
          )}
        />
        <ChannelList
          filters={accessibleChannels}
          channelRenderFilterFn={messagingPreview}
          List={(props) => <CustomChannelList {...props} type="messaging" />}
          Preview={(props) => (
            <CustomChannelPreview channel={props.channel} type="messaging" />
          )}
        />
      </DivSideRight>
    </DivSidebar>
  );
};

export default Sidebar;
