import {BrowserRouter, Route, Routes} from "react-router-dom"
import Header from "./mainComponents/Header";
import Footer from "./mainComponents/Footer";

//pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart"
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ShippingAddress from "./pages/ShippingAddress";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
       <Header />
        <main>
          <Routes>
            <Route path="/cart/:id" element={<Cart />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/signin" element={<Signin />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route path="/shipping" element={<ShippingAddress />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="/placeorder" element={<PlaceOrder />}></Route>
            <Route path="/order/:id" element={<Order />}></Route>
          </Routes>
          
        </main>
        <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
