"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// ⬇️ adjust the path if your folder name differs
import { store, persistor } from "@/Store/store";

const GlobalStoreProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default GlobalStoreProvider;
