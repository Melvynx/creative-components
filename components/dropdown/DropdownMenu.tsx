import React from "react";
import { Manager } from "react-popper";

type DropdownMode = "click" | "hover";

type DropdownMenuProps = React.PropsWithChildren<{
  mode: DropdownMode;
}>;

type DropdownMenuContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: DropdownMode;
};

const dropdownContext = React.createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => void 0,
  mode: "click",
});

export const DropdownMenu = ({ children, mode }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const values = { isOpen, setIsOpen, mode };

  return (
    <dropdownContext.Provider value={values}>
      <Manager>{children}</Manager>
    </dropdownContext.Provider>
  );
};

export const useDropdownMenuContext = () => {
  const context = React.useContext(dropdownContext);
  if (context === undefined) {
    throw new Error(
      "useDropdownMenuContext must be used within a DropdownMenu"
    );
  }
  return context;
};
