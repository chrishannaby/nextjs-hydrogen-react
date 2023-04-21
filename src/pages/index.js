import { ProductProvider } from "@shopify/hydrogen-react";
import ProductCard from "@/components/ProductCard";
import { fetchFromStorefrontApi } from "@/lib/storefrontClient";

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
  const response = await fetchFromStorefrontApi(PRODUCT_QUERY);
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
