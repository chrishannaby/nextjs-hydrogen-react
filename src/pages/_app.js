import "@/styles/globals.css";
import { ShopifyProvider } from "@shopify/hydrogen-react";

export default function App({ Component, pageProps }) {
  return (
    <ShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
      storefrontToken={process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_STOREFRONT_TOKEN}
      storefrontApiVersion={
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION
      }
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <Component {...pageProps} />
    </ShopifyProvider>
  );
}
