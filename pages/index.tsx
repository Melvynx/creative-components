import styled from "@emotion/styled";
import DropdownExample from "./examples/dropdown";
import GumroadButtonExample from "./examples/gumroad_button";
import NotifyMe from "./examples/notify_me";
import Notion from "./examples/notion";
import ShadowButtonExample from "./examples/shadow_button";
import SlideFormExample from "./examples/slide_form";
import TooltipExample from "./examples/tooltip";
import TwoFA from "./examples/two_fa";

const IndexPage = () => {
  return (
    <Wrapper>
      <h1>
        I have fun creating component with CSS to learn and discover new thing.
      </h1>
      <p>There is all components:</p>
      <DropdownExample />
      <GumroadButtonExample />
      <NotifyMe />
      <Notion />
      <ShadowButtonExample />
      <SlideFormExample />
      <TooltipExample />
      <TwoFA />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default IndexPage;
