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
import { QUERIES } from "~/styles/constants";

type SlideFormProps<T extends string[]> = PropsWithChildren<{
  tabs: T;
  initialTab: T[number];
}>;

type SlideFormContextType = {
  next: (data: unknown) => void;
  submitForm: (data: unknown) => void;
  form: Record<string, Record<string, unknown>>;
  back: () => void;
  current: string;
  previousRef?: MutableRefObject<string>;
  tabs: string[];
};

const slideFormContext = createContext<SlideFormContextType>({
  next: () => void 0,
  back: () => void 0,
  submitForm: () => void 0,
  form: {},
  current: "",
  tabs: [],
});

export const SlideForm = <T extends string[]>({
  tabs,
  children,
  initialTab,
}: SlideFormProps<T>) => {
  const [current, setCurrent] = useState(initialTab);
  const previousRef = useRef<string>();
  const [form, setForm] = useState<Record<T[number], Record<string, unknown>>>(
    {} as never
  );

  useEffect(() => {
    previousRef.current = current;
  }, [current]);

  const next = (values: unknown) => {
    submitForm(values);
    setCurrent(tabs[(tabs.indexOf(current) + 1) % tabs.length]);
  };

  const submitForm = (values: unknown) => {
    setForm((prev) => ({
      ...prev,
      [current]: values,
    }));
  };

  const back = () => {
    if (tabs.indexOf(current) === 0) {
      return;
    }

    setCurrent(tabs[Math.max(0, tabs.indexOf(current) - (1 % tabs.length))]);
  };

  return (
    <slideFormContext.Provider
      value={{
        next,
        back,
        current,
        submitForm,
        tabs,
        previousRef,
        form,
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

const Wrapper = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
  overflow: hidden;
  min-width: min(400px, 100%);
  width: min-content;
  position: relative;

  --padding: 16px;
  padding: var(--padding);

  @media ${QUERIES.tabletAndUp} {
    --padding: 24px;
  }
`;
