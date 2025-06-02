import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartIndex";


export function Cart() {
  const { cart,total,addItem,removeItem } = useContext(CartContext);

  return (
    <div className="p-14 bg-amber-700 flex flex-col min-h-screen px-4 text-center mt-2 pt-14">
      <h1 className="m-5 text-2xl font-bold mb-6">Aqui estão seus itens 👇</h1>
<div className=" text-white flex items-center justify-center">
   
</div>
      {cart.length === 0 && (
        <div >
          <strong className="block text-lg mb-2">Seu carrinho está vazio... 🐕‍🦺</strong>
          <Link
            to="/"
            className="text-blue-700 border-b-2 border-blue-700 hover:text-blue-900"
          >
            Escolha seus Produtos
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto ">
        {cart.map((item) => (
          <section
            key={item.id}
            className=" w-full flex flex-col items-center  border-white border-2  p-4 rounded-md  bg-amber-600"
          >
    <p className="text-md text-zinc-800">{item.title}</p>
    <br />
            <img
              src={item.cover}
              alt={item.title}
              className="w-40 h-40 object-cover rounded-md mb-2"
            />
            <strong className="flex gap-5 p-2 text-zinc-700 text-md">
              Preço:{" "}
              {item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </strong>
           
<div className="text-black flex items-center gap-3">
  <button onClick={()=> removeItem(item)} className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
    -
  </button>

 {item.amount}

   <button onClick={ ()=> addItem(item) } className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
    +
  </button>

</div>

          </section>
          
        ))}
  


      </div>
      {cart.length >0 && (
    <div className=" fixed bottom-4 right-5 mx1 bg-zinc-300 text-zinc-900 p-4 rounded-xl shadow-lg flex items-center gap-2">
<span className="text-xs rounded lg:text-2xl">🛒</span>
<span className="font-bold"></span>
Total:{total}
    </div>
)}
    </div>
  );
}
