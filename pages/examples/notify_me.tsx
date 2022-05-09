import styled from "@emotion/styled";
import { useState } from "react";
import Layout from "~/components/layout/Layout";
import NotifyMeInput from "~/components/creative/NotifyMeInput";

const NotifyMe = () => {
  const [email, setEmail] = useState("");

  return (
    <Wrapper>
      {email}
      <NotifyMeInput
        onSubmit={(email) => {
          setEmail(email);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  justify-content: center;
`;

export default NotifyMe;
