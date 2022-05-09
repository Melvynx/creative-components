import Layout from "~/components/layout/Layout";
import { ExampleWrapper } from "~/components/ExampleWrapper";
import { Tooltip } from "~/components/Tooltip";

export const TooltipExample = () => {
  return (
    <ExampleWrapper>
      <Tooltip title="Thanks for hovering">
        <button>Hover me</button>
      </Tooltip>
    </ExampleWrapper>
  );
};

export default TooltipExample;
