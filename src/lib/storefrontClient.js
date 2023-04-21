import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
  storeDomain: "https://paigedemo20230411.myshopify.com",
  privateStorefrontToken: "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",
  storefrontApiVersion: "2023-04",
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

export const PRODUCT_QUERY = `
{
  products(first: 3) {
    edges {
      node {
        id
        title
        description
        featuredImage {
          id
          url
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale 
              selectedOptions {
                name
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
`;
