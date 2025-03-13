import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Dashboard from "./pages/Dashboard"
import CriarDespesas from "./pages/CriarDespesas"
import Home from "./pages/Home"
function App() {
  return(
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criar-despesas" element={<CriarDespesas />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>  
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App