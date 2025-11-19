import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'

function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white/70 border border-white/60 backdrop-blur rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.15)] transition-all"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 font-semibold tracking-tight">{product.name}</h3>
          <span className="text-slate-900 font-bold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-slate-600/80">{product.brand}</p>
        {product.notes && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.notes.map((n, i) => (
              <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-900/5 text-slate-700 border border-slate-900/10">
                {n}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => onAdd(product, 1)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors">
            <ShoppingCart size={18} /> Add
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
