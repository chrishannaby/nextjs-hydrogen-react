import { RadioGroup } from "@headlessui/react";
import {
  useProduct,
  Image,
  useMoney,
  ShopPayButton,
  useShop,
} from "@shopify/hydrogen-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const placeholderProduct = {
  title: "Women's Basic Tee",
  price: "$32",
  rating: 3.9,
  reviewCount: 512,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
  imageAlt: "Back of women's Basic Tee in black.",
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    {
      name: "Heather Grey",
      bgColor: "bg-gray-400",
      selectedColor: "ring-gray-400",
    },
  ],
  variants: [
    { title: "XXS", availableForSale: true },
    { title: "XS", availableForSale: true },
    { title: "S", availableForSale: true },
    { title: "M", availableForSale: true },
    { title: "L", availableForSale: true },
    { title: "XL", availableForSale: true },
    { title: "XXL", availableForSale: false },
  ],
};

export default function ProductCard() {
  const { product, variants, selectedVariant, setSelectedVariant } =
    useProduct();

  const price = useMoney(selectedVariant.price);
  const shop = useShop();
  const domain = shop.getShopifyDomain();

  return (
    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8">
      <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
        <Image
          data={product.featuredImage}
          className="object-cover object-center h-full"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <h2 className="text-xl font-medium text-gray-900 sm:pr-12">
          {product.title}
        </h2>

        <section aria-labelledby="information-heading" className="mt-1">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>

          <p className="font-medium text-gray-900">{price.localizedString}</p>
        </section>

        <section aria-labelledby="options-heading" className="mt-8">
          <h3 id="options-heading" className="sr-only">
            Product options
          </h3>

          <form>
            {/* Size picker */}
            <div className="my-8">
              <RadioGroup
                value={selectedVariant}
                onChange={setSelectedVariant}
                className="mt-2"
              >
                <RadioGroup.Label className="sr-only">
                  Choose a size
                </RadioGroup.Label>
                <div className="grid grid-cols-7 gap-2">
                  {variants.map((variant) => (
                    <RadioGroup.Option
                      key={variant.title}
                      value={variant}
                      className={({ active, checked }) =>
                        classNames(
                          variant?.availableForSale
                            ? "cursor-pointer focus:outline-none"
                            : "cursor-not-allowed opacity-25",
                          active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                          checked
                            ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700"
                            : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                          "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                        )
                      }
                      disabled={!variant.availableForSale}
                    >
                      <RadioGroup.Label as="span">
                        {variant.title}
                      </RadioGroup.Label>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>
            <ShopPayButton
              variantIds={[selectedVariant.id]}
              storeDomain={domain}
            />
          </form>
        </section>
      </div>
    </div>
  );
}
