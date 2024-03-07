import Context from "./Context";
import React, { useState } from 'react';

const ContextProvider = (props) => {
     
    const [favorites, setFavorites] = useState([]);
    
    console.log('From ContextProvider', favorites);
    return (
        <Context.Provider value={{ favorites, setFavorites }}>
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;