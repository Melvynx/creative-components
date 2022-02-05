import Layout from "~/components/layout/Layout";
import { ExampleWrapper } from "~/components/ExampleWrapper";
import { RainbowButton } from "~/components/creative/RainbowButton";

const ShadowButtonExample = () => {
  return (
    <Layout>
      <ExampleWrapper>
        <RainbowButton>Click me</RainbowButton>
      </ExampleWrapper>
    </Layout>
  );
};

export default ShadowButtonExample;
