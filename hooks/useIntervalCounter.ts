import { useEffect, useState } from "react";

export const useIntervalCounter = (
  interval: number,
  {
    needRun = () => true,
    defaultValue = 0,
  }: {
    needRun?: () => boolean;
    defaultValue?: number;
  } = {}
) => {
  const [counter, setCounter] = useState(defaultValue);

  useEffect(() => {
    if (!needRun()) return;

    setCounter((c) => c + 1);
    const intervalId = setInterval(() => {
      setCounter((c) => c + 1);
    }, interval);
    return () => {
      clearInterval(intervalId);
    };
  }, [interval, needRun]);

  return counter;
};
