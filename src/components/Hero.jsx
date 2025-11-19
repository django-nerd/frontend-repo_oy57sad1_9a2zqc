import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-[#f4ecff] via-[#efe8ff] to-[#e8e5ff]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/myxXfbNiwnbTpGFp/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10">
        <div className="max-w-xl">
          <p className="tracking-[0.3em] uppercase text-slate-600/80">Imperial Essence</p>
          <h1 className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
            The Fragrance of Royalty
          </h1>
          <p className="mt-6 text-lg text-slate-600/90">
            Discover rare ouds and timeless signatures curated from the world’s most prestigious maisons. Elegantly crafted, impeccably bottled.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <a href="#catalog" className="inline-flex items-center px-6 py-3 rounded-full bg-slate-900 text-white hover:opacity-90 transition-opacity shadow-[0_10px_30px_rgba(2,6,23,0.25)]">
              Explore Collection
            </a>
            <a href="#offers" className="inline-flex items-center px-6 py-3 rounded-full bg-white/70 backdrop-blur border border-white/40 text-slate-800 hover:bg-white/90 transition-all">
              Seasonal Offers
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/60 to-transparent rounded-3xl pointer-events-none"></div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white"></div>
    </section>
  )
}

export default Hero
