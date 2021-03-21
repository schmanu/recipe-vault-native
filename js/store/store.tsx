import { createStore, combineReducers, applyMiddleware } from 'redux';
import recipes, { RecipesState } from '../reducers/Recipes'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    recipes: persistReducer(persistConfig, recipes)
} );

    
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch