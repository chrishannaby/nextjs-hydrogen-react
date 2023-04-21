export const PRODUCT_QUERY = `
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
