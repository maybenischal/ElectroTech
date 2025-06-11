
import  Home  from './Pages/Home'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Support from './Pages/Support'
import Header from './components/Header'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
     <Navbar />
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/gaming-laptops" element={<div>Gaming Laptops</div>} />
      <Route path="/normal-laptops" element={<div>Normal Laptops</div>} />
      <Route path="/support" element={<Support/>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
