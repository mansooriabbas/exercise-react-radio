import { createContext } from "react";
interface IContextProps {
  sharedValue: string;
  setSharedValue: React.Dispatch<React.SetStateAction<string>>;
}
const Context = createContext<IContextProps | undefined>(undefined);

export default Context;
