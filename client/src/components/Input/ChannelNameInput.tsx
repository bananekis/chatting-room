import { Input } from "@vechaiui/forms";
import { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 0.7em;
`;

const PAddMembers = styled.p`
  margin: 1em 0 0.2em 0;
`;

type Props = {
  channelName: string;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
};

const ChannelNameInput = ({ channelName, setChannelName }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(e.target.value);
  };

  return (
    <div>
      <Label>Channel name</Label>
      <Input
        color="blue"
        value={channelName}
        onChange={handleChange}
        placeholder="Channel name (without spaces)"
      />
      <PAddMembers>Add Members</PAddMembers>
    </div>
  );
};

export default ChannelNameInput;
