import React from 'react';
import Navigation from './js/components/navigation/Navigation';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { persistor, store } from './js/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useCombinedTheme } from './js/components/hooks/ColorScheme';

export default function App() {
  const theme = useCombinedTheme();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}