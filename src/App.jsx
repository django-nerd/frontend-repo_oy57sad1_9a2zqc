import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Catalog from './components/Catalog'
import Cart from './components/Cart'
import WhatsappButton from './components/WhatsappButton'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [cart, setCart] = useState([])
  const [discount, setDiscount] = useState({ code: '', valid: null, percent: 0 })

  // Seed database on first load (idempotent)
  useEffect(() => {
    fetch(`${baseUrl}/seed`, { method: 'POST' }).catch(()=>{})
  }, [])

  const addToCart = (product, qty=1) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty }
        return copy
      }
      return [...prev, { ...product, quantity: qty }]
    })
  }

  const updateQty = (id, qty) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const checkout = async ({ subtotal, total }) => {
    const res = await fetch(`${baseUrl}/order`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cart.map(c => ({ product_id: c.id, quantity: c.quantity })),
        subtotal,
        discount_code: discount.code,
        discount_amount: subtotal * (discount.percent || 0),
        total,
      })
    })
    const data = await res.json()
    alert(`Thank you! Your order id: ${data.id}`)
    setCart([])
    setDiscount({ code: '', valid: null, percent: 0 })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-white/60">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700"></div>
            <span className="text-xl font-extrabold tracking-wide">Imperial Essence</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#catalog" className="hover:text-slate-900 transition-colors">Collection</a>
            <a href="#offers" className="hover:text-slate-900 transition-colors">Offers</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <Hero />

      <main className="container mx-auto px-6 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Catalog onAdd={addToCart} />
        </div>
        <div className="lg:col-span-4">
          <Cart items={cart} onUpdateQty={updateQty} onRemove={removeItem} discount={discount} setDiscount={setDiscount} onCheckout={checkout} />
        </div>
      </main>

      <footer id="contact" className="mt-20 py-12 bg-slate-50 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-600">© {new Date().getFullYear()} Imperial Essence. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Terms</a>
            <a href="#" className="hover:text-slate-900">Support</a>
          </div>
        </div>
      </footer>

      <WhatsappButton />
    </div>
  )
}

export default App
