import { useState } from 'react'
import './App.css'
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Principal from './components/Principal'
import AjusteStock from './components/AjusteStock'

function App() {
  
  return (
    <>
     <Router>
        <Routes>
            <Route path='/' element={<Principal></Principal>}></Route>
            <Route path='/ajuste' element={<AjusteStock></AjusteStock>}> 
            </Route>
        </Routes>
     </Router>
    </>
  )
}

export default App
