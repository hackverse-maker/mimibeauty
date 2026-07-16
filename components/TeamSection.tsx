'use client'

import { motion } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  icon: string
}

interface TeamSectionProps {
  members?: TeamMember[]
  title?: string
  description?: string
}

const defaultMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'Founder & CEO',
    bio: 'Skincare specialist with 15+ years of experience in luxury cosmetics',
    icon: '👩',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Chief Operations Officer',
    bio: 'Expert in sustainable business practices and supply chain optimization',
    icon: '👨',
  },
  {
    id: 3,
    name: 'Dr. Sarah Kim',
    role: 'Lead Research Chemist',
    bio: 'PhD in Cosmetic Chemistry, pioneering clean beauty formulations',
    icon: '👩‍🔬',
  },
  {
    id: 4,
    name: 'James Rodriguez',
    role: 'Sustainability Officer',
    bio: 'Environmental advocate committed to eco-friendly practices',
    icon: '♻️',
  },
]

export default function TeamSection({
  members = defaultMembers,
  title = 'Meet Our Team',
  description = 'Passionate professionals dedicated to bringing you premium skincare',
}: TeamSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const memberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 md:py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-luxury-charcoal mb-4">
            {title}
          </h2>
          <p className="text-luxury-charcoal/60 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={memberVariants}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg-lg group">
                {/* Avatar */}
                <div className="h-48 bg-gradient-to-br from-luxury-gold/20 to-luxury-rose/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {member.icon}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-luxury-charcoal mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-semibold text-luxury-gold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-luxury-charcoal/60 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
