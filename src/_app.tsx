import { AppProps } from "next/app";
import useSession from "./hooks/useSession";

function MyApp({ Component, pageProps }: AppProps) {
  useSession();

  return <Component {...pageProps} />;
}

export default MyApp;
