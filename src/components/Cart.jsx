import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Cart({ items, onUpdateQty, onRemove, discount, setDiscount, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items])
  const discountAmount = useMemo(() => subtotal * (discount?.percent || 0), [subtotal, discount])
  const total = useMemo(() => Math.max(0, subtotal - discountAmount), [subtotal, discountAmount])

  const applyCode = async () => {
    if (!discount?.code) return
    const res = await fetch(`${baseUrl}/discount`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: discount.code })
    })
    const data = await res.json()
    setDiscount({ ...discount, valid: data.valid, percent: data.percent })
  }

  return (
    <aside className="sticky top-4 bg-white/70 backdrop-blur border border-white rounded-2xl p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Your Cart</h3>
      <div className="space-y-3 max-h-[50vh] overflow-auto pr-2">
        <AnimatePresence>
          {items.map(item => (
            <motion.div key={item.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded object-cover"/>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{item.name}</p>
                <p className="text-xs text-slate-600">${item.price.toFixed(2)}</p>
                <div className="mt-2 inline-flex items-center rounded-full border border-slate-200 overflow-hidden">
                  <button onClick={()=> onUpdateQty(item.id, Math.max(1, item.quantity-1))} className="px-2 py-1 text-slate-700 hover:bg-slate-100">-</button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button onClick={()=> onUpdateQty(item.id, item.quantity+1)} className="px-2 py-1 text-slate-700 hover:bg-slate-100">+</button>
                </div>
                <button onClick={()=> onRemove(item.id)} className="ml-3 text-xs text-rose-600 hover:underline">Remove</button>
              </div>
              <div className="text-right font-semibold text-slate-900">${(item.price*item.quantity).toFixed(2)}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between"><span className="text-slate-600">Subtotal</span><span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="text-slate-600">Discount</span><span className="font-semibold text-emerald-600">-{discountAmount.toFixed(2)}</span></div>
        <div className="flex justify-between text-base pt-2 border-t"><span className="font-bold text-slate-900">Total</span><span className="font-bold text-slate-900">${total.toFixed(2)}</span></div>
      </div>

      <div className="mt-6">
        <div className="flex gap-2">
          <input value={discount?.code || ''} onChange={(e)=> setDiscount({ ...discount, code: e.target.value })} placeholder="Discount code"
                 className="flex-1 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"/>
          <button onClick={applyCode} className="px-4 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800">Apply</button>
        </div>
        {discount?.valid === false && <p className="text-xs text-rose-600 mt-2">Invalid code</p>}
        {discount?.valid && <p className="text-xs text-emerald-600 mt-2">Code applied: {(discount.percent*100).toFixed(0)}% off</p>}
      </div>

      <button onClick={()=> onCheckout({subtotal, total})} className="mt-6 w-full px-5 py-3 rounded-full bg-gradient-to-b from-slate-900 to-slate-800 text-white font-semibold shadow-[0_10px_30px_rgba(2,6,23,0.25)] hover:opacity-95">Checkout</button>
    </aside>
  )
}

export default Cart
