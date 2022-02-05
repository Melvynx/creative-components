import { useEffect, useRef } from "react";
import { useIntervalCounter } from "~/hooks/useIntervalCounter";
import { getUniqueId } from "~/hooks/useUniqueId";

// TODO: Remove this once the registerProperty is fully supported
// This property isn't fully supported yet.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getCssRegisterProperty = () => window.CSS.registerProperty;

/**
 * Hook to create a rainbow gradient.
 * To avoid problem with server side rendering, the gradient is set only on the first useEffect
 * @param rainbowColors Array of colors to use in the rainbow
 * @param delay Delay between each color change
 */
export const useRainbowGradient = (rainbowColors: string[], delay: number) => {
  const uniqueId = useRef("");
  const counter = useIntervalCounter(delay, {
    needRun: getCssRegisterProperty,
  });

  useEffect(() => {
    const cssRegisterProperty = getCssRegisterProperty();
    if (!cssRegisterProperty) return;

    // only set the uniqueId on clientSide
    if (!uniqueId.current) {
      uniqueId.current = getUniqueId();
    }

    for (let i = 1; i <= 3; i++) {
      try {
        cssRegisterProperty({
          name: `--rainbow-gradient-${uniqueId.current}-${i}`,
          syntax: "<color>",
          inherits: false,
          initialValue: "#ffffff",
        });
      } catch (e: unknown) {
        // this error append when NextJS hot reload.
      }
    }
  }, []);

  if (!uniqueId.current) {
    return {};
  }

  return {
    [`--rainbow-gradient-${uniqueId.current}-1`]:
      rainbowColors[counter % rainbowColors.length],
    [`--rainbow-gradient-${uniqueId.current}-2`]:
      rainbowColors[(counter + 1) % rainbowColors.length],
    [`--rainbow-gradient-${uniqueId.current}-3`]:
      rainbowColors[(counter + 2) % rainbowColors.length],
  };
};
