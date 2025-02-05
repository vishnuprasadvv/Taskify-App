
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import userReducer from '../features/userSlice'
import { persistStore } from 'redux-persist'

const userPersistConfig = {
    key: 'user',
    storage ,
    whitelist: ['isAuthenticated', 'user']
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer)
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
export default store;