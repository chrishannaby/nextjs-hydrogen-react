import ProductCard from "@/components/ProductCard";
import { fetchFromStorefrontApi, PRODUCT_QUERY } from "@/lib/storefrontClient";
import { ProductProvider } from "@shopify/hydrogen-react";

export async function getStaticProps() {
  const repsonse = await fetchFromStorefrontApi(PRODUCT_QUERY);
  const { data } = await repsonse.json();

  return {
    props: {
      products: data.products.edges,
    },
  };
}

export default function Home({ products }) {
  return (
    <main className="m-24 flex flex-col gap-12">
      {products.map((product) => {
        return (
          <ProductProvider data={product.node} key={product.node.id}>
            <ProductCard />
          </ProductProvider>
        );
      })}
    </main>
  );
}
