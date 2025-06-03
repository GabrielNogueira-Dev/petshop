import { useState,useEffect,useContext } from "react"
import { api } from "../../services/api"
import { BsCartPlus } from "react-icons/bs";
import { CartContext } from "../../context/CartIndex";

import { useNavigate } from "react-router-dom";

interface CartSave{
    cartItems:DataProps[];
}

export interface DataProps{
    id:number;
    title:string;
    price:number;
    cover:string;
    description:string;
}

export function Home(){
    const [products,setProducts] = useState<DataProps[]>([])
    const {addItem}=useContext(CartContext)
const navigate = useNavigate()

    useEffect(()=>{
async function getProducts() {
    const response = await api.get("/products")
    console.log(response.data)
    setProducts(response.data)
}

getProducts()
    },[])

    useEffect(()=>{



},[])


function handleAdd(produto:DataProps){
addItem(produto)
}

function click(id:number){
    navigate(`/detail/${id}`)
}

        return(
            <div className="pt-14 min-h-screen w-full bg-amber-700  " >
    <main>
            <h1 className="mt-5 font-bold mb-8 text-3xl flex  justify-center text-black">Nossos Produtos</h1>
    </main>
       
        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((produtos)=>(
        
        <section key={produtos.id} className="w-full  p-5 bg-amber-600 rounded shadow text-center">

    <h1 className="font-bold text-zinc-900 truncate w-full mb-4 ">{produtos.title}</h1>
   <img onClick={()=>click(produtos.id)}
    className="cursor-pointer rounded-md w-full h-10/12 object-cover transition-transform duration-300 transform hover:scale-105" 
    src={produtos.cover} alt={produtos.title} />
   
<div className="flex items-center justify-center gap-3 mt-3 mb-4">
  <p className="font-bold text-zinc-900 text-lg m-0">
    {produtos.price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}
  </p>
  <button>
    <BsCartPlus
     onClick={()=> handleAdd(produtos)}
     style={{ animationDuration: "2s" }}
    className="text-xl font-bold cursor-pointer rounded transition hover:scale-110 hover:animate-ping"/>
  </button>
</div>
        </section>
        
        ))}
        </div>
            </div>
        )
    }