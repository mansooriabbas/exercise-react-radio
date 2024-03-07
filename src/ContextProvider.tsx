import Context from "./Context";
import React, { useState } from "react";

const ContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [favorites, setFavorites] = useState([]);

  console.log("From ContextProvider", favorites);
  return (
    <Context.Provider value={{ favorites, setFavorites } as any}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
