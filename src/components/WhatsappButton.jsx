import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

function WhatsappButton() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(()=> setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noreferrer"
      className={`fixed z-50 bottom-6 right-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 transition transform ${visible ? 'animate-bounce' : 'opacity-0'}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}

export default WhatsappButton
