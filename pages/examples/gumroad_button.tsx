import Layout from "~/components/layout/Layout";
import { ExampleWrapper } from "~/components/ExampleWrapper";
import { MoveButton } from "~/components/creative/MoveButton";

export const GumroadButtonExample = () => {
  return (
    <ExampleWrapper backgroundColor={"#F4F4F0"}>
      <MoveButton>Click me</MoveButton>
    </ExampleWrapper>
  );
};

export default GumroadButtonExample;
