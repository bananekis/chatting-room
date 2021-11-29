import { Channel } from "stream-chat";
import { SearchResult } from "..";
import { StreamStatusContext } from "../../App";
import { color } from "../../config";
import { useContext } from "react";
import styled from "styled-components";

// styles

const DivResults = styled.div`
  position: absolute;
  left: 258px;
  background: ${color.lightBlue};
  top: 8%;
  z-index: 99;
  border-radius: 5px;
  padding: 1em;
  font-size: 0.7em;
  width: 100%;

  @media screen and (max-width: 960px) {
    width: 100%;
  }

  @media screen and (max-width: 420px) {
    left: 25px;
    top: 116px;
    width: 80%;
  }
`;

const PTitle = styled.p`
  font-size: 1.1em;
  border-bottom: 1px solid white;
`;

const I = styled.i`
  font-weight: 300;
`;

interface Props {
  setChannel: (channel: Channel | undefined) => void;
}

const ResultsDropdown = ({ setChannel }: Props) => {
  const { teamChannels, directChannels, loading } =
    useContext(StreamStatusContext);

  return (
    <DivResults>
      <PTitle>Channels</PTitle>
      {loading && !teamChannels.length && <I>Loading...</I>}

      {!loading && !teamChannels.length ? (
        <I>No channels found</I>
      ) : (
        teamChannels.map((teamChannel, i) => (
          <SearchResult
            key={i}
            teamChannel={teamChannel}
            setChannel={setChannel}
            type="channel"
          />
        ))
      )}
      <PTitle>Users</PTitle>
      {loading && !directChannels.length && <I>Loading...</I>}

      {!loading && !directChannels.length ? (
        <I>No direct messages found</I>
      ) : (
        directChannels.map((directChannel, i) => (
          <SearchResult
            key={i}
            directChannel={directChannel}
            setChannel={setChannel}
            type="user"
          />
        ))
      )}
    </DivResults>
  );
};

export default ResultsDropdown;
