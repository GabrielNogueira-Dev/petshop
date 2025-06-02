 import { useState } from "react"

import { auth } from "../../services/firebaseconection"
import { signInWithEmailAndPassword } from "firebase/auth"

import { type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

 export function Login(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()


    function addLogin(e:FormEvent){
e.preventDefault()

if(email === "" || password ===""){
    toast.warn("Preencha todos os campos")
    return
}

 signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{
    toast.success(`Bem-Vindo!`)
console.log(userCredential.user)
    navigate("/")
})
.catch((error)=>{
toast.error(`aconteceu algum error, ${error.message}`)
})

    }
   
    return(
  <div>
    <form onSubmit={addLogin}
    className="bg-amber-800 min-h-screen flex flex-col justify-center items-center px-4 py-10">

      <div className=" flex flex-col bg-white p-6 lg:p-10 rounded-xl shadow-2xl w-full max-w-sm gap-4">
        <img
    src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg"
    alt="Cão feliz"
    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
  />
       <h2 className="flex justify-center mb-6 text-3xl font-bold text-zinc-950">Login</h2>
        <label className=" text-zinc-950 font-semibold" htmlFor="email">
          Email:
        </label>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="teste@teste.com"
          className=" text-center border  text-zinc-950 rounded px-4 py-2 focus:outline-none focus:ring-2 "
          type="email"
        />

        <label className=" text-zinc-950 font-semibold" htmlFor="password">
          Senha:
        </label>
        <input
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
          id="password"
          placeholder="******"
          className="text-center border  text-zinc-950 rounded px-4 py-2 focus:outline-none focus:ring-2 "
          type="password"
        />
      
        <button 
          type="submit"
          className=" cursor-pointer mt-4 bg-zinc-900 hover:bg-amber-800 text-white font-semibold py-2 rounded transition duration-300"
        >
         Fazer Login
        </button>
      </div>
    </form>
  </div>
);
    
 }