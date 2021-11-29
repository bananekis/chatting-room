import { AddChannel } from "./AddChannel";
import { ChannelListMessengerProps } from "stream-chat-react";
import { PropsWithChildren } from "react";
import { color } from "../../config";
import styled from "styled-components";

// styles

const DivList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  font-size: 0.7em;
  color: ${color.white};
`;

const DivListInner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DivChild = styled.div`
  font-size: 0.9em;
  margin-top: 0.5em;
  font-weight: 400;
`;

type Props = PropsWithChildren<ChannelListMessengerProps> & { type: string };

const CustomChannelList = ({ children, error, loading, type }: Props) => {
  if (error) {
    return (
      <DivList>
        <DivChild>Connection error, please try again later.</DivChild>
      </DivList>
    );
  }

  if (loading) {
    return (
      <DivList>
        <DivChild>
          {type === "team" ? "Channels " : "Messages "}loading...
        </DivChild>
      </DivList>
    );
  }
  return (
    <DivList>
      <DivListInner>
        <p>{type === "team" ? "Channels" : "Direct Messages "}</p>
        <AddChannel type={type} />
      </DivListInner>
      <DivChild>{children}</DivChild>
    </DivList>
  );
};

export default CustomChannelList;
