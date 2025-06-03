import { useEffect, useState } from "react"
import { api } from "../../services/api"
import {type DataProps } from "../home"
import { useParams } from "react-router-dom"


export function Detail(){
const [produto,setproduto] =useState<DataProps |null>(null)
const {id} = useParams()

async function det() {
  try {
    const response = await api.get(`/products/${id}`);
    console.log("Dados recebidos:", response.data); // Veja isso no console
    setproduto(response.data);
  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
  }
}

  useEffect(() => {
    if (id) {
      det()
    }
  }, [id])
return (
  <div className="bg-amber-900 min-h-screen flex flex-col items-center px-4 py-10 sm:px-6 lg:px-8">
    <h1 className="text-white text-4xl font-extrabold p-14 mb-10 text-center max-w-3xl">
      Detalhes do Produto
    </h1>

    <section className="bg-amber-800 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
      {/* Imagem */}
      <img style={{ animationDuration: "4s" }}
        src={produto?.cover}
        alt={produto?.title}
        className="cursor-pointer rounded-md hover:scale-105 w-full md:w-1/2 h-64 md:h-auto object-cover"
      />

      {/* Conteúdo */}
      <div className="cursor-pointer hover:scale-105 p-14 flex flex-col justify-between text-white md:w-1/2">
        <h2 className=" text-3xl font-bold mb-4">{produto?.title}</h2>
        <p className="mb-6 text-justify">{produto?.description}</p>

       <div className=" flex items-center justify-center">
         <p className="mr-2 text-2xl font-semibold mt-auto">
          Preço:  
        </p>
        <span className="items-center text-xl font-bold text-amber-300"> R$ { produto?.price.toFixed(2)}</span>
      
       </div>
      </div>
    </section>
  </div>
);

}