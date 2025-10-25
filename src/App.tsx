import './App.css'
import Navbar from './components/Navar'
import Footer from './components/Footer'
import ProductGrid from './components/ProductGrid'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ProductGrid />
      <main>
      </main>
      <Footer />
    </div>
  )
}

export default App
