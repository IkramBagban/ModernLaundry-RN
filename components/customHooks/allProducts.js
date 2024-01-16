import { useState, useEffect } from "react";
import { getProducts } from "../../utils/api";

export function useProducts() {
  const [products, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        console.log("productsData called : allProducts.js ");

        // console.log('productsData. data',productsData.data)
        // console.log('product data', productsData.data)
        setAllProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { products, isLoading };
}

// import { useState, useEffect, useMemo } from 'react';
// import { getProducts } from '../../utils/api';

// export function useProducts() {
//   const [products, setAllProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productsData = await getProducts();
//         setAllProducts(productsData.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Memoize the value using useMemo
//   const memoizedValue = useMemo(() => ({
//     products,
//     isLoading,
//   }), [products, isLoading]);

//   return memoizedValue;
// }
