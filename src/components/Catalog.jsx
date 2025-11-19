import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Catalog({ onAdd }) {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')
  const [brand, setBrand] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${baseUrl}/products?q=${encodeURIComponent(query)}&brand=${encodeURIComponent(brand)}`, { signal: controller.signal })
      .then(r => r.json())
      .then(setProducts)
      .catch(() => {})
    return () => controller.abort()
  }, [query, brand])

  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products])

  return (
    <section id="catalog" className="relative py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our Collection</h2>
          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 transition"
            />
            <select value={brand} onChange={(e)=> setBrand(e.target.value)} className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300 transition">
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        <AnimatePresence mode="popLayout"> 
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <ProductCard product={p} onAdd={onAdd} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Catalog
