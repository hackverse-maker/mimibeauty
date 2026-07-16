import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TeamSection from '@/components/TeamSection'
import FAQ from '@/components/FAQ'

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
              About Luxe Glow
            </h1>
            <p className="text-lg text-luxury-charcoal/60 max-w-2xl mx-auto">
              Our journey to bring premium, ethical skincare to the world
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-luxury-charcoal mb-6">Our Story</h2>
              <p className="text-luxury-charcoal/70 leading-relaxed mb-4">
                Founded in 2014, Luxe Glow was born from a passion for creating skincare products
                that are both effective and ethical. We believe that beauty should never come at the
                cost of the environment or animal welfare.
              </p>
              <p className="text-luxury-charcoal/70 leading-relaxed">
                Today, we proudly serve over 50,000 customers worldwide, each trusting us with their
                skincare journey.
              </p>
            </div>
            <div className="bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 rounded-3xl p-12 flex items-center justify-center text-7xl">
              🌿
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-luxury-charcoal mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Quality', icon: '✨' },
                { title: 'Ethics', icon: '🤝' },
                { title: 'Sustainability', icon: '🌍' },
                { title: 'Innovation', icon: '🔬' },
              ].map((value) => (
                <div key={value.title} className="bg-white rounded-2xl p-8 shadow-md text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-luxury-charcoal">{value.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <TeamSection />

          {/* Certifications */}
          <div className="bg-luxury-cream rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-luxury-charcoal mb-8">Our Certifications</h2>
            <div className="flex flex-wrap justify-center gap-8 text-2xl">
              <div className="text-center">
                <div className="text-4xl mb-2">✓</div>
                <p className="text-sm font-medium text-luxury-charcoal">Dermatologist Tested</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🐰</div>
                <p className="text-sm font-medium text-luxury-charcoal">Cruelty Free</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🌱</div>
                <p className="text-sm font-medium text-luxury-charcoal">Vegan</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">♻️</div>
                <p className="text-sm font-medium text-luxury-charcoal">Eco-Friendly Packaging</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
