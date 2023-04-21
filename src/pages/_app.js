import "@/styles/globals.css";
import { ShopifyProvider } from "@shopify/hydrogen-react";

export default function App({ Component, pageProps }) {
  return (
    <ShopifyProvider
      storeDomain="https://paigedemo20230411.myshopify.com"
      storefrontToken="05e0d82260b46e7158635cd9cc3cd907"
      storefrontApiVersion="2023-04"
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <Component {...pageProps} />
    </ShopifyProvider>
  );
}
