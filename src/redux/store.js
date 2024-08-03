import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import restaurantReducer from "./restaurantSlice";

const persistConfig = {
  key: "root",
  storage,
}

// persist redux store
const persistedReducer = persistReducer(persistConfig, restaurantReducer);

const store = configureStore({
  reducer: {
    restaurants: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
