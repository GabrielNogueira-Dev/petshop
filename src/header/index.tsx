import { PiDogFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../context/CartIndex";

export function Header(){
  const {cartAmount}=useContext(CartContext)
    return(
      <header className="fixed h-14 top-0 z-50  flex justify-center w-full bg-amber-500 ">
        <nav className=" flex  items-center gap-1 justify-center text-white" >
          <PiDogFill style={{fontSize:"27px"}} className=" bg-amber-100 rounded-md  text-amber-950 text-2xl" />
            <Link className="text-2xl font-bold bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-400 bg-clip-text  text-transparent" to="/">ToPetShop </Link>

<div className="absolute  m-3 right-6 ">
  <Link to="./cart" className="relative">
<FiShoppingCart size={24}/>

{cartAmount > 0 && (
  <span className="absolute right-3 -top-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs">
    {cartAmount}
  </span>
)}

</Link>
</div>

        </nav>
      </header>
    )
}
 