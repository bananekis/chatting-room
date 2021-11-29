import { Channel, StreamChat, UserResponse } from "stream-chat";
import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";

export type StatusContext = {
  createType: string;
  isCreating: boolean;
  isEditing: boolean;
  toggle: boolean;
  query: string;
  loading: boolean;
  teamChannels: Channel[];
  directChannels: UserResponse<DefaultUserType<DefaultUserTypeInternal>>[];
  setCreateType: React.Dispatch<React.SetStateAction<string>>;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setTeamChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
  setDirectChannels: React.Dispatch<
    React.SetStateAction<
      UserResponse<DefaultUserType<DefaultUserTypeInternal>>[]
    >
  >;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserChannel = {
  client: StreamChat;
  directChannel?: UserResponse<DefaultUserType<DefaultUserTypeInternal>>;
  setChannel: (channel: Channel | undefined) => void;
};

export type FormType = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  avatarURL: string;
};

export type ErrorForm = {
  fullName: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
  phoneNumber: boolean;
  avatarURL: boolean;
};
