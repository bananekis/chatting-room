import { color } from "../../config";
import React from "react";
import styled from "styled-components";

const DivInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${color.grey};
  font-size: 0.8em;
  margin-bottom: 0.5em;
`;

const UserListContainer: React.FC = ({ children }) => {
  return (
    <>
      <DivInfo>
        <p>User</p>
        <p>Invite</p>
      </DivInfo>
      {children}
    </>
  );
};

export default UserListContainer;
