import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

import { db } from "../../services/firebaseconection";
import { auth } from "../../services/firebaseconection";

import { Link } from "react-router-dom"

import { createUserWithEmailAndPassword,  } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';


export function CreateAcount(){
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const navigate = useNavigate()

   async function register(e: FormEvent) {
e.preventDefault()
if(email === "" || password ===""){
    toast.warn("Preencha todos os campos")
    return
}


try{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
        const user = userCredential.user
        
        await addDoc(collection(db,"users"),{
                   uid:user.uid,
                   email:user.email,
                   createdAcc: new Date()
                })
                
                toast.success(`Usuário criado com sucesso! ${userCredential}`)
                navigate("/login",{replace:true})
}catch(error){
        toast.error(`Error ao criar conta ${error}`)
    };
  }

return (
  <div>
    <form onSubmit={register}
    className="bg-amber-800 min-h-screen flex flex-col justify-center items-center px-4 py-10">

      <div className=" flex flex-col bg-white p-6 lg:p-10 rounded-xl shadow-2xl w-full max-w-sm gap-4">
        <img
    src="https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_960_720.jpg"
    alt="Cão feliz"
    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
  />
       <h2 className="flex justify-center mb-6 text-3xl font-bold text-zinc-950">Registre-se</h2>
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
 <Link to="/login"
       className=" font-semibold border-b w-fit self-center text-blue-800">Já possui Login?</Link>
      
        <button 
          type="submit"
          className="cursor-pointer mt-4 bg-zinc-900 hover:bg-amber-800 text-white font-semibold py-2 rounded transition duration-300"
        >
          Criar Conta
        </button>
      </div>
    </form>
  </div>
);

}