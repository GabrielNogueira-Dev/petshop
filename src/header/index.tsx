import { PiDogFill } from "react-icons/pi";


export function Header(){
    return(
      <header className=" flex justify-center w-full bg-amber-500 h-14 ">
        <nav className=" flex  items-center gap-1 justify-center text-white" >
          <PiDogFill style={{fontSize:"27px"}} className=" bg-amber-100 rounded-md  text-amber-950 text-2xl" />
            <span className="text-2xl font-bold bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-400 bg-clip-text  text-transparent">ToPetShop </span>
        </nav>
      </header>
    )
}
 