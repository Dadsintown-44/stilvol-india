"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <motion.div
        className="min-h-screen bg-white"
        initial="hidden"
        animate="visible"
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }}
      >
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#39795F] to-[#2d5f4a] text-white pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              custom={0.1}
              variants={fadeUp}
              className="text-lg text-white/90"
            >
              Last Updated: April 2026
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <motion.div
            custom={0.2}
            variants={fadeUp}
            className="prose prose-lg max-w-none"
          >
            {/* Introduction */}
            <section className="mb-12">
              <p className="text-gray-700 leading-relaxed text-lg">
                At Stilvoll India, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                1. Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">1.1 Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
                    <li>Fill out contact forms or inquiry forms on our website</li>
                    <li>Subscribe to our newsletter or marketing communications</li>
                    <li>Request product catalogs or information</li>
                    <li>Make a purchase or place an order</li>
                    <li>Contact us via email or phone</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    This information may include: name, email address, phone number, postal address, company name, and any other information you choose to provide.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">1.2 Automatically Collected Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you visit our website, we may automatically collect certain information about your device, including:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To process and fulfill your orders and requests</li>
                <li>To send you product information, catalogs, and promotional materials (with your consent)</li>
                <li>To improve our website, products, and services</li>
                <li>To analyze website usage and optimize user experience</li>
                <li>To prevent fraud and enhance website security</li>
                <li>To comply with legal obligations and resolve disputes</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid legal requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                <li><strong>With Your Consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. Cookies are small data files stored on your device.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of certain features on our website.
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                5. Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                6. Your Rights and Choices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                <li><strong>Correction:</strong> You can request that we correct any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal exceptions.</li>
                <li><strong>Opt-Out:</strong> You can opt-out of receiving marketing communications by following the unsubscribe instructions in our emails or contacting us directly.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, please contact us at connect@stilvollindia.com.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                7. Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete that information.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                9. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new &quot;Last Updated&quot; date. Your continued use of our website after such changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                10. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-800 font-semibold mb-2">Stilvoll India</p>
                <p className="text-gray-700">Email: connect@stilvollindia.com</p>
                <p className="text-gray-700">Phone: +91 9930865508</p>
              </div>
            </section>

            {/* Consent */}
            <section className="mb-12 bg-[#39795F]/5 p-6 rounded-lg border-l-4 border-[#39795F]">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Your Consent</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our website and services, you consent to the collection, use, and disclosure of your information as described in this Privacy Policy.
              </p>
            </section>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}