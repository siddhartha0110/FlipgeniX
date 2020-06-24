import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Home from './components/screens/Home';
import ProductDetail from './components/screens/ProductDetail';

function App() {


  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />

        <main className="main">
          <div className="content">
            <Route path="/" exact component={Home} />
            <Route path="/product/:id" component={ProductDetail} />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
