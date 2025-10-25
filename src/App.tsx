
import './App.css'
import Navbar from './components/Navar'
import HederE from './components/HederE'
import Footer from './components/Footer'
import ProductGrid from './components/ProductGrid'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HederE />
      <ProductGrid />
      <main>
      </main>
      <Footer />
    </div>
  )
}

export default App
