import React, { createContext } from "react";

type RecordsContextType<T> = {
  data: T[];
};

export const RecordsContext = createContext<
  RecordsContextType<any> | undefined
>(undefined);

export const useContextRecords = <T>() => {
  const context = React.useContext(RecordsContext);
  if (context === undefined) {
    throw new Error(
      "useContextRecords must be used within a RecordsContext.Provider"
    );
  }
  return context as RecordsContextType<T>;
};
