
import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { Cart } from "./pages/cart";
import { CreateAcount } from "./pages/create";
import { Login } from "./pages/login";
import { Private } from "./routes/private";


const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:"/create",
        element:<CreateAcount/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
    path:"/",
    element:<Private><Home/></Private>
    },
    {
      path:"/cart",
      element:<Private><Cart/></Private>
    },
    {
      path:"/detail/:id",
      element:<Private><Detail/></Private>
    }
  ]
  }
]) 

export {router}