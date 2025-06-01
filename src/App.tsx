
import { LuDog } from "react-icons/lu";

import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";
import { Header } from "./header";
import { Home } from "./pages/home";
import { Detail } from "./pages/detail";


const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
path:"/",
element:<Home/>
    },
    {
      path:"/detail",
      element:<Detail/>
    },
    {
      path:"/detail/:id",
      element:<Detail/>
    }
  ]
  }
]) 

export {router}