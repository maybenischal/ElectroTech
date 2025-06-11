
import  Home  from './Pages/Home'
import './App.css'
import Navbar from './components/Navbar'
import { Button } from './components/ui/button'
import { BrowserRouter } from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import Support from './Pages/Support'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gaming-laptops" element={<div>Gaming Laptops</div>} />
      <Route path="/normal-laptops" element={<div>Normal Laptops</div>} />
      <Route path="/support" element={<Support/>} />
    </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
