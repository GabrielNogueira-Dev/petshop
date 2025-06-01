import { useState,useEffect } from "react"
import { api } from "../../services/api"
import { length } from "localforage";


interface DataProps{
    id:number;
    title:string;
    price:number;
    cover:string;
}

export function Home(){
    const [products,setProducts] = useState<DataProps[]>([])

    useEffect(()=>{
async function getProducts() {
    const response = await api.get("/products")
    console.log(response.data)
    setProducts(response.data)
}

getProducts()
    },[])

        return(
            <div className=" min-h-screen w-full bg-amber-700 pt-4 " >
    <main>
            <h1 className="font-bold mb-8 text-3xl flex  justify-center text-black">Nossos Produtos</h1>
    </main>
       
        <div className="grid grid-cols-1 gap-5 px-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((produtos)=>(
        
        <section key={produtos.id} className="w-full  p-5 bg-amber-600 rounded shadow text-center">

    <h1 className="font-bold text-zinc-900 truncate w-full mb-4 ">{produtos.title}</h1>
    <img className="cursor-pointer rounded-md w-full h-10/12 object-cover transition-transform duration-300 transform hover:scale-105" 
    src={produtos.cover} alt={produtos.title} />
    <p className="font-bold text-zinc-900 mt-3 mb-6">{produtos.price.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}</p>
            
        </section>
        
        ))}
        </div>
            </div>
        )
    }