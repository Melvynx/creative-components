import { useEffect, useRef } from "react";
import { useSlideFormContext } from "~/components/slide-form/SlideForm";

export const useSlideFormTabState = (tab: string) => {
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
  const tabDelta = getDelta(current, tab, tabs);
  const isIdle = !previousRef.current;

  return { isActive, tabDelta, isIdle, isBack };
};

const getIsBack = (current: string, previous: string, tabs: string[]) => {
  const currentIndex = tabs.indexOf(current);
  const previousIndex = tabs.indexOf(previous);

  return currentIndex < previousIndex;
};

const getDelta = (current: string, previous: string, tabs: string[]) => {
  const currentIndex = tabs.indexOf(current);
  const previousIndex = tabs.indexOf(previous);
  return Math.abs(currentIndex - previousIndex);
};
