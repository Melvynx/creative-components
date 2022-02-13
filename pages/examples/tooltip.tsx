import Layout from "~/components/layout/Layout";
import { ExampleWrapper } from "~/components/ExampleWrapper";
import { Tooltip } from "~/components/Tooltip";

export const TooltipExample = () => {
  return (
    <Layout>
      <ExampleWrapper>
        <Tooltip title="Thanks for hovering">
          <button>Hover me</button>
        </Tooltip>
      </ExampleWrapper>
    </Layout>
  );
};

export default TooltipExample;
