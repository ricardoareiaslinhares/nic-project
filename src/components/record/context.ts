import { createContext, useContext } from "react";

type RecordContextType<T> = {
  data: T;
};

export const RecordContext = createContext<RecordContextType<any> | undefined>(
  undefined
);

export const useContextRecord = <T>() => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error(
      "useContextRecord must be used within a RecordContext.Provider"
    );
  }
  return context as RecordContextType<T>;
};
