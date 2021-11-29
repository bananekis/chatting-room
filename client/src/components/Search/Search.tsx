import { Channel, UserResponse } from "stream-chat";
import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";
import { Icon, Input } from "@vechaiui/react";
import { ResultsDropdown } from "..";
import { StreamStatusContext } from "../../App";
import { color } from "../../config";
import { useChatContext } from "stream-chat-react";
import { useContext, useEffect, useState } from "react";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import styled from "styled-components";

// styles

const DivSearch = styled.div`
  display: flex;
  margin-bottom: 1em;
  color: ${color.black};
`;

const Search = () => {
  const { client, setActiveChannel } = useChatContext();
  const { setDirectChannels, setTeamChannels, setQuery, query, setLoading } =
    useContext(StreamStatusContext);

  useEffect(() => {
    if (!query) {
      setDirectChannels([]);
      setTeamChannels([]);
    }
  }, [query]);

  const getChannels = async (searchedValue: string) => {
    try {
      const channelResponse = client.queryChannels({
        type: "team",
        name: { $autocomplete: searchedValue },
        members: { $in: [client.userID || ""] },
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID || "" },
        name: { $autocomplete: searchedValue },
      });

      const [channels, { users }] = await Promise.all([
        channelResponse,
        userResponse,
      ]);

      if (channels.length) setTeamChannels(channels);
      if (users.length) setDirectChannels(users);

      setLoading(false);
    } catch (error: any) {
      setQuery("");
    }
  };

  const setChannel = (channel: Channel | undefined) => {
    setQuery("");
    setActiveChannel(channel);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  };

  return (
    <>
      <DivSearch>
        <Input.Group style={{ width: "100%" }}>
          <Input.LeftElement>
            <Icon as={SearchSharpIcon} label="search" />
          </Input.LeftElement>
          <Input
            type="text"
            placeholder="search..."
            value={query}
            color="blue"
            onChange={handleSearch}
          />
        </Input.Group>
      </DivSearch>
      {query && <ResultsDropdown setChannel={setChannel} />}
    </>
  );
};

export default Search;
