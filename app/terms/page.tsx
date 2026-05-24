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

export default function TermsAndConditions() {
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
              Terms and Conditions
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
                Welcome to Stilvoll India. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. Please read them carefully before using our services.
              </p>
            </section>

            {/* Acceptance */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the Stilvoll India website (the &quot;Website&quot;) and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree with any part of these Terms, you must not use our Website or services.
              </p>
            </section>

            {/* Use of Website */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                2. Use of Website
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">2.1 Permitted Use</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You may use our Website for lawful purposes only. You agree not to use the Website:
                  </p>
                  <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
                    <li>In any way that violates any applicable local, national, or international law or regulation</li>
                    <li>To transmit or procure the sending of any unsolicited or unauthorized advertising or promotional material</li>
                    <li>To impersonate or attempt to impersonate Stilvoll India, our employees, other users, or any other person or entity</li>
                    <li>To engage in any conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Website</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">2.2 User Accounts</h3>
                  <p className="text-gray-700 leading-relaxed">
                    If you create an account on our Website, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                </div>
              </div>
            </section>

            {/* Products and Services */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                3. Products and Services
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">3.1 Product Information</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to provide accurate descriptions, images, and pricing information for our hardware and innovative solutions. However, we do not warrant that product descriptions, images, pricing, or other content on the Website is accurate, complete, reliable, current, or error-free.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">3.2 Pricing and Availability</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All prices are subject to change without notice. We reserve the right to modify or discontinue products at any time without liability. Product availability may vary, and we cannot guarantee that products displayed on the Website will be in stock.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">3.3 Orders and Payments</h3>
                  <p className="text-gray-700 leading-relaxed">
                    All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including inaccuracies in product or pricing information, suspected fraud, or unauthorized transactions. Payment terms will be specified at the time of purchase.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                4. Intellectual Property Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                All content on this Website, including text, graphics, logos, images, videos, software, and other materials, is the property of Stilvoll India or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, republish, download, store, or transmit any content from our Website without our prior written consent, except as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You may print or download one copy for your personal, non-commercial use</li>
                <li>If we provide social media features, you may share content in accordance with those features</li>
              </ul>
            </section>

            {/* Warranties */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                5. Warranties and Disclaimers
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">5.1 Product Warranties</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Our products may be covered by manufacturer warranties. Specific warranty terms will be provided with the product documentation. We stand behind the quality of our products and will work with you to address any defects or issues in accordance with applicable warranty terms.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#39795F] mb-3">5.2 Website Disclaimer</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The Website and its content are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. We do not warrant that the Website will be uninterrupted, secure, or error-free, or that defects will be corrected.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To the fullest extent permitted by law, Stilvoll India, its affiliates, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Your use of or inability to use the Website or services</li>
                <li>Any unauthorized access to or use of our servers or personal information</li>
                <li>Any interruption or cessation of transmission to or from the Website</li>
                <li>Any bugs, viruses, or similar harmful components transmitted through the Website</li>
                <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted or shared through the Website</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                7. Indemnification
              </h2>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Stilvoll India and its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising out of or in any way connected with your access to or use of the Website, your violation of these Terms, or your violation of any third-party rights.
              </p>
            </section>

            {/* Return and Refund */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                8. Return and Refund Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want you to be completely satisfied with your purchase. Our return and refund policy includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Return Period:</strong> Products may be returned within 30 days of delivery, subject to conditions</li>
                <li><strong>Condition:</strong> Products must be unused, in original packaging, with all accessories and documentation</li>
                <li><strong>Custom Orders:</strong> Custom or specially ordered products may not be eligible for return</li>
                <li><strong>Damaged Goods:</strong> Report any damaged or defective products within 7 days of delivery</li>
                <li><strong>Refund Processing:</strong> Approved refunds will be processed within 7–14 business days</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                For specific return inquiries, please contact us at connect@stilvollindia.com.
              </p>
            </section>

            {/* Shipping */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                9. Shipping and Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to deliver products in a timely manner. However, delivery times are estimates and not guaranteed. We are not liable for delays caused by shipping carriers, customs, or circumstances beyond our control. Risk of loss and title for products pass to you upon delivery to the carrier.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                10. Governing Law and Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
              </p>
            </section>

            {/* Changes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. If we make material changes, we will provide notice by posting the updated Terms on this page with a new &quot;Last Updated&quot; date. Your continued use of the Website after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                12. Severability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                13. Entire Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy and any other legal notices published on the Website, constitute the entire agreement between you and Stilvoll India regarding your use of the Website and supersede all prior agreements and understandings.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#1F2937] mb-6 border-b-2 border-[#39795F] pb-3">
                14. Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or feedback regarding these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-gray-800 font-semibold mb-2">Stilvoll India</p>
                <p className="text-gray-700">Email: connect@stilvollindia.com</p>
                <p className="text-gray-700">Phone: +91 9930865508</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-12 bg-[#39795F]/5 p-6 rounded-lg border-l-4 border-[#39795F]">
              <h2 className="text-2xl font-bold text-[#1F2937] mb-4">Acknowledgment</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our Website and services, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them. Thank you for choosing Stilvoll India.
              </p>
            </section>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}