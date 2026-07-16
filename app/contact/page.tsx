import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-beige pt-32 pb-12">
          <div className="container-premium">
            <AnimatedSection className="text-center">
              <h1 className="text-5xl font-serif text-charcoal mb-4">Get in Touch</h1>
              <p className="text-charcoal/70 max-w-2xl mx-auto">
                Have questions about our products? We&apos;re here to help.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-premium">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  {
                    Icon: Mail,
                    title: 'Email',
                    content: 'hello@skinscience.com',
                  },
                  {
                    Icon: Phone,
                    title: 'Phone',
                    content: '1-800-SKINCARE',
                  },
                  {
                    Icon: MapPin,
                    title: 'Address',
                    content: 'Los Angeles, CA',
                  },
                  {
                    Icon: Clock,
                    title: 'Hours',
                    content: 'Mon-Fri 9AM-6PM PST',
                  },
                ].map((item, i) => {
                  const Icon = item.Icon
                  return (
                    <AnimatedSection key={i} delay={i * 0.1} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-pink rounded-lg flex items-center justify-center">
                          <Icon size={24} className="text-charcoal" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-serif text-charcoal mb-1">{item.title}</h3>
                        <p className="text-charcoal/70 text-sm">{item.content}</p>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <AnimatedSection variant="slideInRight">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Name</label>
                      <input
                        type="text"
                        className="input-premium w-full"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Email</label>
                      <input
                        type="email"
                        className="input-premium w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Subject</label>
                      <input
                        type="text"
                        className="input-premium w-full"
                        placeholder="How can we help?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-charcoal mb-2">Message</label>
                      <textarea
                        className="input-premium w-full h-32"
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full bg-charcoal text-white hover:bg-pink hover:text-charcoal">
                      Send Message
                    </button>
                  </form>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
