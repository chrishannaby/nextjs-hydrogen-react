import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  privateStorefrontToken: process.env.SHOPIFY_PRIVATE_STOREFRONT_TOKEN,
  storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_VERSION,
});

export function fetchFromStorefrontApi(query, variables = {}) {
  return fetch(client.getStorefrontApiUrl(), {
    method: "POST",
    headers: client.getPrivateTokenHeaders(),
    body: JSON.stringify({
      query,
      variables,
    }),
  });
}
