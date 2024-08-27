import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup.js';
import Cart from './screens/Cart.js';
import Address from './components/Address'; // Import the Address component
import OrderConfirmation from './screens/OrderConfirmation'; // Import if you have this
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
import Contact from './components/Contact.js';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} /> {/* Add this route */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} /> {/* Add this route if you have an order confirmation page */}
            <Route path="/myOrder" element={<MyOrder />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
