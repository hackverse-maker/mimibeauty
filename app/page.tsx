import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedCategories from '@/components/FeaturedCategories'
import BestSeller from '@/components/BestSeller'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import InstagramGallery from '@/components/InstagramGallery'
import Newsletter from '@/components/Newsletter'
import PageTransition from '@/components/PageTransition'

export default function Page() {
  return (
    <PageTransition>
      <Hero />
      <FeaturedCategories />
      <BestSeller />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </PageTransition>
  )
}
