import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/reducer";

const ReducerContext = createContext();

export const useReducerContext = () => useContext(ReducerContext);

const initialState = []

const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)
  return <ReducerContext.Provider value={{state, dispatch}}>{children}</ReducerContext.Provider>;
};

export default ContextProvider;
