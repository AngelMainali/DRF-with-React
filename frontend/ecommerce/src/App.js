import React from 'react'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/screens/HomeScreen';    
import LoginScreen from './components/screens/LoginScreen';    
import SignupScreen from './components/screens/SignupScreen';    
import CartScreen from './components/screens/CartScreen';    


function App() {
  return (
    <>
  
      <Header />
      <Routes>
        <Route exact path='/' element={<HomeScreen />}></Route>
        <Route exact path='/login' element={<LoginScreen/>}></Route>
        <Route exact path='/signup' element={<SignupScreen />}></Route>
        <Route exact path='/cart' element={<CartScreen />}></Route>
      </Routes>
      < Footer/>
   
    </>
  )
}

export default App
