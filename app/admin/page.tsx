import { redirect } from 'next/navigation';
import AdminDashboard from '../../components/admin/AdminDashboard';
import { getAdminSessionFromServerCookies } from '../../lib/admin-auth';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default async function AdminPage() {
  const session = await getAdminSessionFromServerCookies();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <>
      <Header alwaysGreen />
      <main className="min-h-screen bg-[#FAF9F6] pt-[72px]">
        <AdminDashboard />
      </main>
      <Footer />
    </>
  );
}
