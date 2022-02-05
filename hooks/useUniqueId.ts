import { useRef } from "react";

export const useUniqueId = () => {
  return useRef(getUniqueId());
};

export const getUniqueId = () => {
  return Math.random().toString(36).substring(2, 9);
};
