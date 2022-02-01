import React, {PropsWithChildren} from "react";
import {useSlideFormContext} from "~/components/slide-form/SlideForm";

export const SlideBackButton = ({ children }: PropsWithChildren<unknown>) => {
  const { back, current, tabs } = useSlideFormContext();

  const isVisible = tabs.indexOf(current) !== 0;

  return React.cloneElement(children as React.ReactElement, {
    onClick: () => {
      back();
    },
    style: {
      display: isVisible ? undefined : "none",
    },
  });
};
