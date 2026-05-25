import ContactSection from '../../components/contact/ContactSection';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export const metadata = {
  title: 'Contact Us | Stilvoll India India',
  description: "Get in touch with Stilvoll India India — India's largest manufacturer of Aluminium profiles, Modular Kitchen Drawers, Sliding Door Systems and Glass fittings.",
};

export default function ContactPage() {
  return (
    <>
      <Header alwaysGreen />
      <main>
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}