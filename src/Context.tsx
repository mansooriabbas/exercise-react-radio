import { createContext } from "react";
interface IFavorites {
    id: number;
    programimage?: string;
    name?: string;
    channel: {
      name?: string;
    };
    description?: string;
    schedule?: string;
  }
interface IContextProps {
  sharedValue: string;
  setSharedValue: React.Dispatch<React.SetStateAction<string>>;
  favorites: IFavorites[];
  setFavorites: React.Dispatch<React.SetStateAction<IFavorites[]>>;
}
const Context = createContext<IContextProps>({
    sharedValue: "",
    setSharedValue: () => {},
    favorites: [],
    setFavorites: () => {},
  });
  

export default Context;
