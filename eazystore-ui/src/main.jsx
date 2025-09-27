import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login, { loginAction } from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Contact, { contactAction } from "./components/Contact.jsx";
import Cart from "./components/Cart.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import { productsLoader } from "./components/Home.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import { CartProvider } from "./store/CartContext.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import Profile, { profileAction, profileLoader } from "./components/Profile.jsx";
import Orders from "./components/Orders.jsx";
import Message from "./components/admin/Message.jsx";
import Register, { registerAction } from "./components/Register.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/OrderSuccess.jsx";


const stripePromise = loadStripe("pk_test_51SBlPLIUwr10UcrAcxL4SSHzoNujgtrvKmbLAfFJ3NgY5rf3ZStuEcvA92pnt55ka0SDR8yP5dDO3wiJvf1Xhznv00N5hjk4i1");



const routeDefinitaions = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} loader={productsLoader} />
    <Route path="/home" element={<Home />} loader={productsLoader} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} action={contactAction} />
    <Route path="/login" element={<Login />}  action={loginAction}/>
    <Route path="/register" element={<Register/>} action={registerAction}/>
    <Route path="/cart" element={<Cart />} />
    <Route path="/products/:productId" element={<ProductDetail />} />
    <Route element={<ProtectedRoute/>}>
      <Route path="/checkout" element={<CheckoutForm/>}/>
      <Route path="/order-success" element={<OrderSuccess/>}/>
      <Route 
        path="/profile" 
        element={<Profile/>} 
        loader={profileLoader} 
        action={profileAction} 
        shouldRevalidate={({actionResult}) => {
          return !actionResult?.success;
        }}
      />
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/admin/orders" element={<AdminOrders/>}/>
      <Route path="/admin/messages" element={<Message/>}/>
    </Route>
  </Route>
);

const appRouter = createBrowserRouter(routeDefinitaions);

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage/>,
//     children: [
//       {
//         index: true,
//         element: <Home/>
//       },
//       {
//         path: "/home",
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/cart",
//         element: <Cart />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <AuthProvider>
        <CartProvider>
            <RouterProvider router={appRouter} />
        </CartProvider>
      </AuthProvider>
    
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable
        pauseOnHover
        theme={localStorage.getItem("theme") === "dark" ? "dark" : "light"}
        transition={Bounce}
      />
    </Elements>
  </StrictMode>
);
