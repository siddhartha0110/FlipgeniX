import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/screens/Home';
import ProductDetail from './components/screens/ProductDetail';
import Cart from './components/screens/Cart';
import Signin from './components/auth/Signin';

function App() {


  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main className="main">
          <div className="content">
            <Route path="/" exact component={Home} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/signin" component={Signin} />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

