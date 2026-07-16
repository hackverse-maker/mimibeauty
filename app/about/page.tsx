import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-beige pt-32 pb-12">
          <div className="container-premium">
            <AnimatedSection className="text-center">
              <h1 className="text-5xl font-serif text-charcoal mb-4">About SkinScience</h1>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Our mission: bringing dermatologist-tested skincare science to everyone.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <AnimatedSection>
                <h2 className="text-3xl font-serif text-charcoal mb-6">Our Story</h2>
                <p className="text-charcoal/70 leading-relaxed mb-4">
                  Founded by dermatologists with over 30 years of combined research experience, SkinScience was created to bridge the gap between professional skincare science and accessible formulations.
                </p>
                <p className="text-charcoal/70 leading-relaxed">
                  We believe that everyone deserves clinically-proven skincare without unnecessary chemicals or marketing hype. Every product is backed by research.
                </p>
              </AnimatedSection>
              <AnimatedSection variant="slideInRight" className="bg-beige rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔬</div>
                  <p className="text-charcoal/60">Science-Backed Skincare</p>
                </div>
              </AnimatedSection>
            </div>

            <div>
              <AnimatedSection className="text-center mb-12">
                <h2 className="text-3xl font-serif text-charcoal mb-8">Our Values</h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Integrity', description: 'Transparency in every ingredient' },
                  { title: 'Science', description: 'Clinically-proven formulations' },
                  { title: 'Sustainability', description: 'Eco-conscious practices' },
                  { title: 'Efficacy', description: 'Results-driven products' },
                ].map((value) => (
                  <AnimatedSection
                    key={value.title}
                    className="card-premium p-8 text-center hover-lift"
                  >
                    <h3 className="text-xl font-serif text-charcoal mb-2">{value.title}</h3>
                    <p className="text-sm text-charcoal/70">{value.description}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-beige">
          <div className="container-premium">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-serif text-charcoal mb-4">Why We&apos;re Different</h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">Our commitment to dermatological excellence sets us apart.</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Dermatologist Approved', value: '100%' },
                { label: 'Clinically Tested', value: '500+' },
                { label: 'Happy Customers', value: '100K+' },
              ].map((stat, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                  <div className="text-4xl font-bold text-charcoal mb-2">{stat.value}</div>
                  <p className="text-charcoal/70">{stat.label}</p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
