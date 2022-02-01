import styled from "@emotion/styled";
import { QUERIES } from "~/styles/constants";

export const ExampleWrapper = styled.div`
  --breathing-space: 16px;
  
  background: linear-gradient(
    330deg,
    hsl(272 51% 54%) 0%,
    hsl(226 70% 55.5%) 100%
  );
  border-radius: 8px;
  padding: var(--breathing-space);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media ${QUERIES.tabletAndUp} {
    --breathing-space: 48px;
  }
`;
