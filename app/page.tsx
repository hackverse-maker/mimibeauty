import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhyChooseUs from '@/components/WhyChooseUs'
import IngredientEducation from '@/components/IngredientEducation'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProducts />
        <WhyChooseUs />
        <IngredientEducation />
      </main>
      <Footer />
    </>
  )
}
