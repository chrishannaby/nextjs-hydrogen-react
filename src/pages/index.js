import {
  createStorefrontClient,
  ProductProvider,
} from "@shopify/hydrogen-react";
import ProductCard from "@/components/ProductCard";

const client = createStorefrontClient({
  storeDomain: "https://paigedemo20230411.myshopify.com",
  privateStorefrontToken: "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",
  storefrontApiVersion: "2023-04",
});

const PRODUCT_QUERY = `
{
  products(first: 20) {
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

export async function getStaticProps() {
  const response = await fetch(client.getStorefrontApiUrl(), {
    method: "POST",
    headers: client.getPrivateTokenHeaders(),
    body: JSON.stringify({
      query: PRODUCT_QUERY,
    }),
  });
  const json = await response.json();
  return {
    props: {
      products: json?.data?.products?.edges || null,
    },
  };
}

export default function Home({ products }) {
  return (
    <main className="m-24 flex flex-col gap-12">
      {products.map((product) => {
        return (
          <ProductProvider data={product.node}>
            <ProductCard />
          </ProductProvider>
        );
      })}
    </main>
  );
}
