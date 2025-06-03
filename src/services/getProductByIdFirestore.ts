import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconection"; // ajuste para seu caminho

import type { DataProps } from "../pages/home"; // ajuste o caminho

export async function getProductByIdFirestore(id: string): Promise<DataProps | null> {
  try {
    const docRef = doc(db, "products", id); // id é o ID do documento no Firestore
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: Number(data.id),
        title: data.title,
        price: Number(data.price),
        cover: data.cover,
        description: data.description,
      };
    } else {
      console.warn("Produto não encontrado no Firestore com ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar produto no Firestore:", error);
    return null;
  }
}
