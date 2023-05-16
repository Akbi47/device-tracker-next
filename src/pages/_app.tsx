import "../styles/globals.scss";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enUS } from "date-fns/locale";
import setDefaultOptions from "date-fns/setDefaultOptions";
import type { AppProps } from "next/app";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import { AppWrapper } from "../context";

// Sets the defaults to `en`
setDefaultOptions({ locale: enUS });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<SessionProviderProps>) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <SessionProvider session={session}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </SessionProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
