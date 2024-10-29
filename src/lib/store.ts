import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";
import logisticsIntegratorReducer from "./features/logisticsIntegrator";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import generalReducer from "./features/common/general";
import toastReducer from "./features/common/toast";
import authReducer from "./features/auth";
import storage from "./storage";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth", "logisticsIntegrator"],
};

const rootReducer = combineReducers({
  general: generalReducer,
  toast: toastReducer,
  auth: authReducer,
  logisticsIntegrator: logisticsIntegratorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    // Añadir la configuración de Redux DevTools
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
