import ProductCard from "@/components/ProductCard";

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Home({ products }) {
  return (
    <main className="m-24 flex flex-col gap-12">
      <ProductCard />
    </main>
  );
}
