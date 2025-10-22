 // pages/index.jsx
// Next.js Product Listing Page (PLP) - Professional, realistic, responsive, SEO-ready

import Head from 'next/head'
import React from 'react'

export default function PLP({ products }){
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
        <title>ShopEase - Product Listing</title>
        <meta name="description" content="ShopEase product listing page - browse latest products with filters and Add to Cart functionality" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <header className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-1">ShopEase</h1>
          <h2 className="text-sm md:text-base text-gray-600 mb-6">Browse our latest products</h2>
        </header>

        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="hidden md:block md:col-span-1 bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="font-semibold mb-3">Filters</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <label className="block font-medium">Category</label>
                <select 
                  aria-label="Category" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 w-full rounded-md border p-2"
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

          <div className="col-span-1 md:col-span-3">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">Showing <strong>{filteredProducts.length}</strong> products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <article key={product.id} className="bg-white rounded-2xl p-4 shadow hover:shadow-md transition-shadow min-h-[320px] flex flex-col">
                  <div className="w-full h-48 relative mb-4 flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-44 object-contain mx-auto" loading="lazy" />
                  </div>

                  <h3 className="text-sm md:text-base font-semibold leading-tight mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-3">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold">${product.price}</span>
                    <button 
                      onClick={() => handleAdd(product)}
                      className="px-3 py-2 rounded-lg border hover:bg-gray-100 text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-500">
          <p>© 2025 ShopEase. All rights reserved.</p>
        </footer>
      </main>
    </>
  )
}

export async function getServerSideProps(){
  try{
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