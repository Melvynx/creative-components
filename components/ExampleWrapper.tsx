import styled from "@emotion/styled";
import { QUERIES } from "~/styles/constants";

export const ExampleWrapper = styled.div<{ backgroundColor?: string }>`
  --breathing-space: 16px;

  border-radius: 8px;
  padding: var(--breathing-space);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ backgroundColor }) =>
    backgroundColor ||
    "linear-gradient(330deg, hsl(272 51% 54%) 0%, hsl(226 70% 55.5%) 100%)"};

  @media ${QUERIES.tabletAndUp} {
    --breathing-space: 48px;
  }
`;
