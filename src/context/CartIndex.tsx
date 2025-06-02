import { createContext, useEffect, useState, type ReactNode } from "react"
import type { DataProps } from "../pages/home";

import { auth, db } from "../services/firebaseconection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


interface CartData{
    cart:CartProps[];
    cartAmount:number;
    addItem:(novoitem:DataProps)=> void;
    removeItem:(produto:CartProps) => void;
    total:string
}

interface CartProps{
    id:number;
    title:string;
    description:string;
    price:number;
    cover:string;
    amount:number;
    total:number;
}

interface ChildrenProps {
    children:ReactNode;
}
export const CartContext = createContext({} as CartData)

function CartProvider({children}:ChildrenProps){
const[cart,setCart]=useState<CartProps[]>([])
const[total,setTotal]=useState("")

useEffect(() => {
  // Começa observando mudanças na autenticação do usuário
  const unsub = onAuthStateChanged(auth, (user) => {
    // Se o usuário estiver logado
    if (user) {
      // Cria uma função assíncrona interna (porque o callback do onAuthStateChanged não pode ser async direto)
      const loadCart = async () => {
        try {
          // Referência ao documento do carrinho no Firestore
          const cartDoc = doc(db, "carts", user.uid);
          // Pega o documento
          const docSnap = await getDoc(cartDoc);

          // Se existir, atualiza o estado do carrinho. Senão, usa array vazio.
          setCart(docSnap.exists() ? docSnap.data().items || [] : []);
        } catch (error) {
          console.error("Erro ao carregar carrinho:", error);
        }
      };

      // Chama a função assíncrona
      loadCart();
    } else {
      // Usuário não está logado, limpa o carrinho
      setCart([]);
    }
  });

  // Quando o componente desmontar, cancela o listener de auth
  return () => unsub();
}, []);


useEffect(() => {
  // Essa função salva o carrinho no Firestore sempre que o estado 'cart' mudar.
  async function saveCart() {
    // Primeiro, verifica se o usuário está autenticado. Se não estiver, não salva nada.
    if (!auth.currentUser) {
      console.log("Usuário não autenticado, não salva.");
      return;
    }

    // Cria uma referência para o documento do carrinho, com o uid do usuário atual.
    const cartDoc = doc(db, "carts", auth.currentUser.uid);

    try {
      // Salva (ou substitui) o documento com o conteúdo atual do carrinho.
      await setDoc(cartDoc, { items: cart });
      console.log("Carrinho salvo com sucesso:", cart);
    } catch (error) {
      // Caso ocorra algum erro ao salvar, exibe no console para debugar.
      console.error("Erro ao salvar carrinho no Firestore:", error);
    }
  }

  // Chama a função para salvar o carrinho.
  saveCart();
}, [cart]); // Esse useEffect roda toda vez que o estado 'cart' for alterado.



 function addItem(novoitem:DataProps){

const index = cart.findIndex(item=> item.id === novoitem.id)

if(index !== -1){
    let carrinholista = [...cart];
    carrinholista[index] = {...carrinholista[index]};

    carrinholista[index].amount = carrinholista[index].amount +1;
    carrinholista[index].total = carrinholista[index].amount * carrinholista[index].price
        setCart(carrinholista)
        totalResult(carrinholista)
            return

}

let data = {...novoitem, amount:1 , total:novoitem.price}

setCart(produto => [...produto,data])
totalResult([...cart,data])
 }
function totalResult(itens:CartProps[]){
    let carrinho = itens
    let result = carrinho.reduce((acc,obj)=> {return acc + obj.total},0)
const resultFormated = result.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"})
    setTotal(resultFormated)
}

function removeItem(produto:CartProps){

    const index = cart.findIndex(item => item.id === produto.id)

    if(cart[index].amount >1){
         let carrinho = [...cart];
        carrinho[index] = {...carrinho[index]};
        carrinho[index].amount = carrinho[index].amount -1
        carrinho[index].total = carrinho[index].total - carrinho[index].price

        setCart(carrinho)
        totalResult(carrinho)
        return
    }
    removeItem


}

    return(

<CartContext.Provider value={{cart,cartAmount:cart.length,
addItem,removeItem,total
}}
>

{children}

</CartContext.Provider>

    )
}

export default CartProvider