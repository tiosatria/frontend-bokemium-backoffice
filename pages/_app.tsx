import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { theme } from "@/theme";
import { persistor, store } from "@store/index";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import '@mantine/spotlight/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <MantineProvider theme={theme}>
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </Provider>
  );
}
