import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import React, { PropsWithChildren, ReactNode, useState } from 'react';

export const ArrowPopover = ({
  children,
  items,
  onHover,
}: PropsWithChildren<{ items: ReactNode | undefined; onHover?: boolean }>) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <ChildrenContainer
        onClick={(e) => {
          if (!onHover) {
            setAnchorEl(e.currentTarget);
          }
        }}
        onMouseOver={(e) => {
          if (onHover) {
            setAnchorEl(e.currentTarget);
          }
        }}
      >
        {children}
      </ChildrenContainer>
      <ClassNames>
        {({ css }) => (
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null);
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{
              paper: css({
                transform: 'translateY(8px) !important',
                overflow: 'visible',
              }),
            }}
          >
            <Indicator>
              <ArrowTop />
            </Indicator>
            {items}
          </Popover>
        )}
      </ClassNames>
    </>
  );
};

const ChildrenContainer = styled.div`
  & > *:first-child {
    display: block;
  }
`;

const ArrowTop = styled.div`
  background: #3f4043;
  width: var(--array-size);
  height: var(--array-size);
  clip-path: polygon(50% 50%, 0% 100%, 100% 100%);
`;

const Indicator = styled.div`
  --array-size: 16px;
  position: absolute;
  right: 0;
  left: 0;
  top: calc(var(--array-size) * -1);
  display: flex;
  justify-content: center;
`;
