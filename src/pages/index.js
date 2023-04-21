import { Inter } from "next/font/google";
import {
  createStorefrontClient,
  ProductProvider,
  useProduct,
  ShopPayButton,
  useShop,
  Image,
} from "@shopify/hydrogen-react";

const inter = Inter({ subsets: ["latin"] });

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
        variants(first: 3) {
          edges {
            node {
              id
              title
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

export function AddVariantQuantity1({ variantId, storeDomain }) {
  return <ShopPayButton variantIds={[variantId]} storeDomain={storeDomain} />;
}

function Product() {
  const shop = useShop();
  const domain = shop.getShopifyDomain();
  const { product, variants, setSelectedVariant, selectedVariant } =
    useProduct();
  return (
    <>
      <h1>{product?.title}</h1>
      {variants?.map((variant) => {
        return (
          <button onClick={() => setSelectedVariant(variant)} key={variant?.id}>
            {variant?.title}
          </button>
        );
      })}
      <Image data={product.featuredImage} />
      <ShopPayButton
        variantIds={[selectedVariant?.id]}
        storeDomain={shop.getShopifyDomain()}
      />
    </>
  );
}

export default function Home({ products }) {
  const product = products[0].node;
  return (
    <ProductProvider data={product}>
      <Product />
    </ProductProvider>
  );
}
