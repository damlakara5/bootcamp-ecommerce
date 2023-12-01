import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NavBar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';

function App() {


  return (
    <Router>
      <div className="App">
        <NavBar />
        <div id='content'>
            <Switch>
              <Route exact  path="/" component={Products} />
              <Route exact  path="/product/:product_id" component={ProductDetail} />
              <Route  path="/signin" component={Signin} />
              <Route  path="/signup" component={Signup} />
              <ProtectedRoute  path="/profile" component={Profile} />
              <ProtectedRoute  path="/baskets" component={Basket} />
              <ProtectedRoute  path="/admin" component={Admin} admin={true} />
              <Route  path="*" component={Error404} />
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
