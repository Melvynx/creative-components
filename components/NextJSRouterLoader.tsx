import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

export const NextJSRouterLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = () => {
      setIsLoading(true);
    };
    const onRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  });

  if (!isLoading) {
    return null;
  }

  return <Wrapper />;
};

const Wrapper = styled.div`
  inset: 0;
  position: absolute;
  background-color: hsl(0 0% 0% / 0.2);
`;
