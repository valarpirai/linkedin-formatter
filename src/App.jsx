import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import TextFormatter from './components/TextFormatter'
import Features from './components/Features'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <Header />
      <Hero />
      <div id="formatter" className="py-12 bg-white">
        <TextFormatter />
      </div>
      <Features />
      <FAQ />
      <Footer />
    </div>
  )
}

export default App
