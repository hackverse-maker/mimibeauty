import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-luxury-charcoal/60 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to our team anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-luxury-charcoal mb-1">Email</h3>
                  <p className="text-luxury-charcoal/60">hello@luxeglow.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-luxury-charcoal mb-1">Phone</h3>
                  <p className="text-luxury-charcoal/60">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-luxury-charcoal mb-1">Address</h3>
                  <p className="text-luxury-charcoal/60">
                    123 Glow Street
                    <br />
                    Los Angeles, CA 90001
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Clock className="w-6 h-6 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-luxury-charcoal mb-1">Hours</h3>
                  <p className="text-luxury-charcoal/60">
                    Mon - Fri: 9AM - 6PM PST
                    <br />
                    Sat - Sun: 10AM - 4PM PST
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-3xl overflow-hidden shadow-lg h-96 bg-gradient-to-br from-luxury-gold/10 to-luxury-rose/10 flex items-center justify-center mb-16">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-luxury-gold/30 mx-auto mb-4" />
              <p className="text-luxury-charcoal/50">Map integration would go here</p>
            </div>
          </div>

          {/* FAQ Section */}
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  )
}
