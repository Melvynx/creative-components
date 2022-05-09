import Layout from "~/components/layout/Layout";
import { ExampleWrapper } from "~/components/ExampleWrapper";
import { TwoFAInput, TwoFAInputState } from "~/components/creative/TwoFAInput";
import { useState } from "react";
import styled from "@emotion/styled";

const TwoFA = () => {
  const [twoFAState, setTwoFAState] = useState<TwoFAInputState>("idle");

  const onSubmit = async (code: string) => {
    await fakeAsyncTask(500);
    if (code === "666666") {
      setTwoFAState("success");
    } else {
      setTwoFAState("error");
    }
  };

  return (
    <ExampleWrapper>
      <Wrapper>
        <TwoFAInput onSubmit={onSubmit} state={twoFAState} />
      </Wrapper>
    </ExampleWrapper>
  );
};

const Wrapper = styled.div`
  background: var(--color-bg-paper);
  border-radius: 4px;
  padding: 16px;
`;

// fake async task with timout
const fakeAsyncTask = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export default TwoFA;
