 // pages/index.jsx
import Head from 'next/head'
import React from 'react'

export default function PLP({ products }) {
  const [category, setCategory] = React.useState('All');

  const filteredProducts = category === 'All'
    ? products
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const handleAdd = (product) => {
    alert(`${product.title} added to cart!`);
  };

  return (
    <>
      <Head>
        <title>ShopEase - Premium Product Listing</title>
        <meta name="description" content="ShopEase product listing with premium modern design, animated background, glassmorphism cards, and interactive effects." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 bg-dark-gradient animate-bgShift overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <span key={i} className={`particle particle-${i}`} />
        ))}
      </div>

      <main className="min-h-screen p-4 md:p-8 relative text-gray-100">
        {/* Header */}
        <header className="max-w-7xl mx-auto mb-8 animate-fadeDown">
          <h1 className="text-3xl md:text-4xl font-bold mb-1 text-white">ShopEase</h1>
          <h2 className="text-sm md:text-base text-gray-300 mb-6">Browse our latest products</h2>
        </header>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block md:col-span-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg animate-slideLeft">
            <h3 className="font-semibold mb-3 text-white">Filters</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <div>
                <label className="block font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-400/50 bg-black/20 p-2 text-white"
                >
                  <option value="All">All Products</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                  <option value="jewelery">Accessories</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product list */}
          <div className="col-span-1 md:col-span-3">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg mb-6 flex items-center justify-between animate-slideRight">
              <p className="text-sm text-gray-200">Showing <strong>{filteredProducts.length}</strong> products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <article
                  key={product.id}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg transform transition duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-xl animate-fadeUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-44 object-contain mx-auto transition-transform duration-500 hover:scale-110 hover:rotate-1 hover:shadow-[0_0_15px_#ff7e5f]"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-sm md:text-base font-semibold mb-1 text-white">{product.title}</h3>
                  <p className="text-xs text-gray-300 mb-3 line-clamp-3">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-white">${product.price}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="px-3 py-2 rounded-lg border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black active:scale-110 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-400">
          <p>© 2025 ShopEase. All rights reserved.</p>
        </footer>
      </main>

      <style jsx>{`
        /* Dark gradient background */
        .bg-dark-gradient {
          background: linear-gradient(135deg, #1a1a2e, #162447, #1f4068, #e43f5a);
          background-size: 400% 400%;
        }
        .animate-bgShift {
          animation: bgShift 25s ease infinite;
        }
        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Floating particles */
        .particle {
          position: absolute;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          animation: float 20s linear infinite;
        }
        .particle-0 { top: 10%; left: 20%; width: 15px; height: 15px; animation-delay: 0s; }
        .particle-1 { top: 30%; left: 50%; width: 25px; height: 25px; animation-delay: 2s; }
        .particle-2 { top: 60%; left: 10%; width: 20px; height: 20px; animation-delay: 4s; }
        .particle-3 { top: 70%; left: 70%; width: 18px; height: 18px; animation-delay: 6s; }
        .particle-4 { top: 50%; left: 30%; width: 22px; height: 22px; animation-delay: 1s; }
        .particle-5 { top: 20%; left: 80%; width: 12px; height: 12px; animation-delay: 3s; }
        .particle-6 { top: 40%; left: 60%; width: 20px; height: 20px; animation-delay: 5s; }
        .particle-7 { top: 80%; left: 40%; width: 14px; height: 14px; animation-delay: 7s; }
        .particle-8 { top: 15%; left: 70%; width: 16px; height: 16px; animation-delay: 9s; }
        .particle-9 { top: 55%; left: 15%; width: 24px; height: 24px; animation-delay: 11s; }

        @keyframes float {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }

        /* Entrance animations */
        @keyframes fadeUp { 0% { opacity:0; transform: translateY(20px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes fadeDown { 0% { opacity:0; transform: translateY(-20px); } 100% { opacity:1; transform: translateY(0); } }
        @keyframes slideLeft { 0% { opacity:0; transform: translateX(-20px); } 100% { opacity:1; transform: translateX(0); } }
        @keyframes slideRight { 0% { opacity:0; transform: translateX(20px); } 100% { opacity:1; transform: translateX(0); } }

        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .animate-fadeDown { animation: fadeDown 0.8s ease forwards; }
        .animate-slideLeft { animation: slideLeft 0.8s ease forwards; }
        .animate-slideRight { animation: slideRight 0.8s ease forwards; }
      `}</style>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    const products = await res.json()

    const small = products.map(p => ({
      id: p.id,
      title: p.title,
      price: Number(p.price).toFixed(2),
      image: p.image,
      description: p.description.substring(0, 160),
      category: p.category
    }))

    return { props: { products: small } }
  } catch (err) {
    console.error(err)
    return { props: { products: [] } }
  }
}
