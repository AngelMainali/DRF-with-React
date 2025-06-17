import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';    
import LoginScreen from './components/screens/LoginScreen';    
import SignupScreen from './components/screens/SignupScreen';    
import CartScreen from './components/screens/CartScreen';  
import ProductScreen from './components/screens/ProductScreen';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/signup' element={<SignupScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
