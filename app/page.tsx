import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedCategories from '@/components/FeaturedCategories'
import BestSeller from '@/components/BestSeller'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import InstagramGallery from '@/components/InstagramGallery'
import Newsletter from '@/components/Newsletter'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCategories />
        <BestSeller />
        <WhyChooseUs />
        <Testimonials />
        <InstagramGallery />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
