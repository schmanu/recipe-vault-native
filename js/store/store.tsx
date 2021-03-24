import { createStore, combineReducers, applyMiddleware } from 'redux';
import recipes,{ RecipesState } from '../reducers/Recipes'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { $CombinedState, Action, Store } from '@reduxjs/toolkit';

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    recipes: persistReducer(persistConfig, recipes)
} );

export const store : Store<{
    readonly [$CombinedState]?: undefined;
} & {
    recipes: RecipesState & PersistPartial;
}, Action> & {
    dispatch: unknown;
} = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch