import {
  DefaultUserType,
  DefaultUserTypeInternal,
} from "stream-chat-react/dist/types/types";
import { UserItem, UserListContainer } from "..";
import { UserResponse } from "stream-chat";
import { useChatContext } from "stream-chat-react";
import { useEffect, useState } from "react";

type Props = {
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
};

const UserList = ({ setSelectedUsers }: Props) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState<
    UserResponse<DefaultUserType<DefaultUserTypeInternal>>[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [usersEmpty, setUsersEmpty] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID || "" } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setUsersEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  }, []);

  if (error) {
    return (
      <UserListContainer>
        <div>Error occured, please refresh and try again</div>
      </UserListContainer>
    );
  }

  if (usersEmpty) {
    return (
      <UserListContainer>
        <div>No users found.</div>
      </UserListContainer>
    );
  }

  return (
    <UserListContainer>
      {loading ? (
        <div>Loading users ...</div>
      ) : (
        users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </UserListContainer>
  );
};

export default UserList;
