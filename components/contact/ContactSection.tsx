'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  delay?: number;
}

function InfoCard({ icon, title, lines, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      className="group flex items-start cursor-pointer gap-4 p-6 rounded-none bg-white border border-[#39795F]/10 shadow-sm hover:shadow-md hover:border-[#39795F]/30 transition-all duration-300"
    >
      <div className="flex-shrink-0 rounded-none w-11 h-11 bg-[#39795F]/10 group-hover:bg-[#39795F] flex items-center justify-center transition-colors duration-300 text-[#39795F] group-hover:text-white">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#1F2937] text-[15px] mb-1.5">{title}</h3>
        <div className="space-y-0.5">
          {lines.map((line, i) => (
            <p key={i} className="text-[#6B7280] text-[14px] leading-relaxed">{line}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const isFormInView = useInView(formRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      {/* ─── Hero Banner ─── */}
      <div className="bg-gradient-to-br from-[#39795F] to-[#2d5f4a] pt-36 pb-24 px-4 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10" ref={heroRef}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-white/70 uppercase tracking-[0.2em] text-xs font-semibold mb-4"
          >
            Let&apos;s Talk
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Get In Touch <br />
            <span className="text-white/60">With Our Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg max-w-xl leading-relaxed"
          >
            Have a project in mind or want to explore our premium hardware solutions? We&apos;d love to hear from you.
          </motion.p>
        </div>
      </div>

      {/* ─── Info Cards ─── */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 -mt-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <InfoCard
            delay={0}
            icon={<Clock className="w-5 h-5" strokeWidth={2} />}
            title="Office Hours"
            lines={['Monday – Saturday', '9:00 am to 6:00 pm']}
          />
          <InfoCard
            delay={0.1}
            icon={<MapPin className="w-5 h-5" strokeWidth={2} />}
            title="Our Office"
            lines={['7th Floor, SS HOUSE, 704, Nehru Rd', 'Vile Parle East, Mumbai, Maharashtra 400057']}
          />
          <InfoCard
            delay={0.2}
            icon={<Phone className="w-5 h-5" strokeWidth={2} />}
            title="Phone"
            lines={['+91 9930865508']}
          />
          <InfoCard
            delay={0.3}
            icon={<Mail className="w-5 h-5" strokeWidth={2} />}
            title="Email"
            lines={['connect@stilvollindia.com']}
          />
        </motion.div>
      </div>

      {/* ─── Main Content: Image + Form ─── */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left – Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            {/* Green accent blob */}
            <div className="absolute -bottom-8 -left-8 w-3/4 h-[90%] bg-[#39795F]/10 rounded-none -z-10" />

            <div className="relative rounded-none overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="/contact/image14.jpg"
                alt="Stilvoll India Showroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Overlay tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-none p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-[#39795F] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">Call Us Directly</p>
                  <p className="text-[#1F2937] font-bold text-[15px]">+91 9930865508</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Contact Form */}
          <motion.div
            ref={formRef}
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
              className="inline-block text-[#39795F] uppercase tracking-[0.2em] text-xs font-semibold mb-3"
            >
              Send a Message
            </motion.span>
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
              className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-4 leading-tight"
            >
              Let&apos;s Start a Conversation
            </motion.h2>
            <motion.p
              custom={0.2}
              variants={fadeUp}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
              className="text-[#6B7280] text-[16px] leading-relaxed mb-10"
            >
              Whether you&apos;re an architect, interior designer, or homeowner — tell us about your project and we&apos;ll get back within 24 hours.
            </motion.p>

            <motion.form
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate={isFormInView ? 'visible' : 'hidden'}
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#1F2937] uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul"
                    className="px-4 py-3.5 rounded-none border border-[#E5E7EB] text-[#1F2937] placeholder-[#9CA3AF] text-[15px] outline-none focus:border-[#39795F] focus:ring-2 focus:ring-[#39795F]/20 transition-all bg-[#F9FAFB]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-[#1F2937] uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sharma"
                    className="px-4 py-3.5 rounded-none border border-[#E5E7EB] text-[#1F2937] placeholder-[#9CA3AF] text-[15px] outline-none focus:border-[#39795F] focus:ring-2 focus:ring-[#39795F]/20 transition-all bg-[#F9FAFB]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#1F2937] uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="px-4 py-3.5 rounded-none border border-[#E5E7EB] text-[#1F2937] placeholder-[#9CA3AF] text-[15px] outline-none focus:border-[#39795F] focus:ring-2 focus:ring-[#39795F]/20 transition-all bg-[#F9FAFB]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#1F2937] uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="px-4 py-3.5 rounded-none border border-[#E5E7EB] text-[#1F2937] placeholder-[#9CA3AF] text-[15px] outline-none focus:border-[#39795F] focus:ring-2 focus:ring-[#39795F]/20 transition-all bg-[#F9FAFB]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-[#1F2937] uppercase tracking-wider">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project or enquiry..."
                  className="px-4 py-3.5 rounded-none border border-[#E5E7EB] text-[#1F2937] placeholder-[#9CA3AF] text-[15px] outline-none focus:border-[#39795F] focus:ring-2 focus:ring-[#39795F]/20 transition-all bg-[#F9FAFB] resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#2d5f4a' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#39795F] text-white py-4 px-8 rounded-none font-semibold text-[16px] flex items-center justify-center gap-2.5 transition-colors shadow-lg shadow-[#39795F]/25 mt-2"
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* ─── Map Strip ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="w-full h-[360px] relative overflow-hidden"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.2445843613264!2d72.84836107520586!3d19.096923182112015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9cf7274562f%3A0x33262ea98fdc7c8f!2sSTILVOLL%20Doors%20%26%20Partition%20Solutions%20LLP!5e0!3m2!1sen!2sin!4v1776701311783!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Stilvoll India Office Location"
        />
      </motion.div>

    </section>
  );
}
