import "stream-chat-react/dist/css/index.css";
import { Auth, StreamContent, WindowAdapt } from "./components";
import { Channel, UserResponse } from "stream-chat";
import { Chat } from "stream-chat-react";
import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";
import { StatusContext } from "./types";
import { authToken, client, cookies } from "./config";
import { createContext, useState } from "react";
import styled from "styled-components";

// styles

const Div = styled.div`
  display: flex;
`;

// connecting user...

if (authToken) {
  client.connectUser(
    {
      id: cookies.get("userID"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

export const StreamStatusContext = createContext<StatusContext>({
  createType: "",
  isCreating: false,
  isEditing: false,
  toggle: false,
  teamChannels: [],
  directChannels: [],
  query: "",
  loading: false,
  setCreateType: () => {},
  setIsCreating: () => {},
  setIsEditing: () => {},
  setToggle: () => {},
  setTeamChannels: () => {},
  setDirectChannels: () => {},
  setQuery: () => {},
  setLoading: () => {},
});

function App() {
  const [createType, setCreateType] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [teamChannels, setTeamChannels] = useState<Channel[]>([]);
  const [directChannels, setDirectChannels] = useState<
    UserResponse<DefaultUserType<DefaultUserTypeInternal>>[]
  >([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  if (!authToken) return <Auth />;

  return (
    <Div>
      <Chat client={client} theme="team light">
        <StreamStatusContext.Provider
          value={{
            createType,
            isCreating,
            isEditing,
            toggle,
            teamChannels,
            directChannels,
            query,
            loading,
            setCreateType,
            setIsCreating,
            setIsEditing,
            setToggle,
            setTeamChannels,
            setDirectChannels,
            setQuery,
            setLoading,
          }}
        >
          <WindowAdapt></WindowAdapt>
          <StreamContent></StreamContent>
        </StreamStatusContext.Provider>
      </Chat>
    </Div>
  );
}

export default App;
