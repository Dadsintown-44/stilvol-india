import { redirect } from 'next/navigation';
import AdminLoginForm from '../../../components/admin/AdminLoginForm';
import { getAdminSessionFromServerCookies } from '../../../lib/admin-auth';

export default async function AdminLoginPage() {
  const session = await getAdminSessionFromServerCookies();
  if (session) {
    redirect('/admin');
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
      <AdminLoginForm />
    </main>
  );
}
