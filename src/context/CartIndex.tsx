import { Children, createContext, useState, type ReactNode } from "react"
import type { DataProps } from "../pages/home";

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

 function addItem(novoitem:DataProps){

const index = cart.findIndex(item=> item.id === novoitem.id)

if(index !== -1){

let carrinholista = cart

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
        let carrinho = cart;
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