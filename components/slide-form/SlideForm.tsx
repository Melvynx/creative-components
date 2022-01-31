import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { QUERIES } from "~/styles/constants";

type SlideFormProps<T extends string[]> = PropsWithChildren<{
  tabs: T;
  initialTab: T[number];
}>;

type SlideFormContextType = {
  next: (data: unknown) => void;
  back: () => void;
  current: string;
  submit: (callback: (values: Record<string, unknown>) => void) => void;
  previousRef?: MutableRefObject<string>;
  tabs: string[];
};

const slideFormContext = createContext<SlideFormContextType>({
  next: () => void 0,
  back: () => void 0,
  current: "",
  submit: () => () => void 0,
  tabs: [],
});

export const SlideForm = <T extends string[]>({
  tabs,
  children,
  initialTab,
}: SlideFormProps<T>) => {
  const [current, setCurrent] = useState(initialTab);
  const previousRef = useRef<string>();
  const [form, setForm] = useState<Record<T[number], unknown>>({} as never);

  const next = (values: unknown) => {
    setForm((prev) => ({
      ...prev,
      [current]: values,
    }));
    setCurrent(tabs[(tabs.indexOf(current) + 1) % tabs.length]);
  };

  const back = () => {
    if (tabs.indexOf(current) === 0) {
      return;
    }

    setCurrent(tabs[Math.max(0, tabs.indexOf(current) - (1 % tabs.length))]);
  };

  const submit = (callback: (values: Record<T[number], unknown>) => void) => {
    callback(form);
  };

  useEffect(() => {
    previousRef.current = current;
  }, [current]);

  return (
    <slideFormContext.Provider
      value={{
        next,
        back,
        current,
        submit,
        tabs,
        previousRef,
      }}
    >
      <Wrapper>{children}</Wrapper>
    </slideFormContext.Provider>
  );
};

export const useSlideFormContext = (): SlideFormContextType => {
  const context = useContext(slideFormContext);
  if (!context) {
    throw new Error("SlideForm must be used within a SlideForm");
  }
  return context;
};

const getIsBack = (current: string, previous: string, tabs: string[]) => {
  const currentIndex = tabs.indexOf(current);
  const previousIndex = tabs.indexOf(previous);
  console.log({ current, previous, isBack: currentIndex < previousIndex });

  return currentIndex < previousIndex;
};

export const SlideFormChildren = ({
  tab,
  children,
}: PropsWithChildren<{ tab: string }>) => {
  const { current, previousRef, tabs } = useSlideFormContext();
  const lastIsBackRef = useRef(false);

  const isBack =
    current === tab || previousRef.current === tab
      ? getIsBack(current, previousRef.current, tabs)
      : lastIsBackRef.current;

  useEffect(() => {
    lastIsBackRef.current = isBack;
  }, [isBack]);

  const isActive = current === tab;

  const styles: Record<string, string> = {
    pointerEvents: isActive ? "auto" : "none",
    position: isActive ? "relative" : "absolute",
    left: isActive ? "unset" : "var(--padding)",
    right: isActive ? "unset" : "var(--padding)",
    bottom: isActive ? "unset" : "var(--padding)",
  };

  return (
    <ChildrenWrapper isActive={isActive} isBack={isBack} style={styles}>
      {children}
    </ChildrenWrapper>
  );
};

export const SlideBackButton = ({ children }: PropsWithChildren<unknown>) => {
  const { back, current, tabs } = useSlideFormContext();

  const isVisible = tabs.indexOf(current) !== 0;

  return React.cloneElement(children as React.ReactElement, {
    onClick: () => {
      back();
    },
    style: {
      visibility: isVisible ? "visible" : "hidden",
      pointerEvents: isVisible ? "auto" : "none",
    },
  });
};

const slideInLeft = keyframes({
  from: {
    transform: "translateX(100%)",
    opacity: 0,
  },
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
});

const slideInRight = keyframes({
  from: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
});

const slideOutLeft = keyframes({
  from: {
    transform: "translateX(0)",
    opacity: 1,
  },
  to: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
});

const slideOutRight = keyframes({
  from: {
    transform: "translateX(0)",
    opacity: 1,
  },
  to: {
    transform: "translateX(100%)",
    opacity: 0,
  },
});

const getAnimation = (isActive: boolean, isBack: boolean) => {
  if (isBack) {
    return isActive ? slideInRight : slideOutRight;
  } else {
    return isActive ? slideInLeft : slideOutLeft;
  }
};

const ChildrenWrapper = styled.div<{ isActive: boolean; isBack: boolean }>`
  border-radius: inherit;
  animation-name: ${(props) => getAnimation(props.isActive, props.isBack)};
  animation-duration: ${(props) => (props.isActive ? "400ms" : "300ms")};
  animation-timing-function: var(--ease-out);
  animation-fill-mode: forwards;
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 4px;
  overflow: hidden;
  min-width: min(400px, 100%);
  position: relative;

  --padding: 16px;
  padding: var(--padding);

  @media ${QUERIES.tabletAndUp} {
    --padding: 24px;
  }
`;
