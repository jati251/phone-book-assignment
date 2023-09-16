import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import createApolloClient from "../../apollo-client";
import "@/styles/globals.css";

const client = createApolloClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
