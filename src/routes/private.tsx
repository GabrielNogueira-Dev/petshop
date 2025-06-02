import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../services/firebaseconection"
import { Navigate } from "react-router-dom"

import {type ReactNode } from "react"

interface PrivateProps{
    children:ReactNode;
}

export function Private({children}:PrivateProps):any{
    const [loading,setLoading] = useState(true)
    const[signed,setSigned] = useState(false)

useEffect(()=>{

const unsub = onAuthStateChanged(auth,(user)=>{

    if(user){
        const userData = {
            uid:user.uid,
            email:user.email
        }
        localStorage.setItem("@userDetail",JSON.stringify(userData))
        setLoading(false)
        setSigned(true)
    }else{
        setLoading(false)
        setSigned(false)
    }

})
return unsub
},[])

if(loading){
    return <div className="bg-amber-800 flex justify-center items-center h-screen"><h2 className="font-bold text-white text-3xl">Carregando..</h2></div>
}

if(!signed){
    return <Navigate to="/create"/>
}
return children
}
