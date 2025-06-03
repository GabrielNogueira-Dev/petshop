// src/services/getProducts.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseconection"; // mesmo que seu firebase.ts

import {type DataProps } from "../pages/home"; // ou copie a interface aqui se preferir

export async function getProductsFirestore(): Promise<DataProps[]> {
  const productsRef = collection(db, "products");
  const snapshot = await getDocs(productsRef);

  const products = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: Number(data.id),
      title: data.title,
      price: Number(data.price),
      cover: data.cover,
      description: data.description,
    } as DataProps;
  });

  return products;
}
