import { Toaster } from 'react-hot-toast';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }: any) {
  const router = useRouter();

  const noHeaderFooter = ['/login', '/register'];

  return (
    <>
      {!noHeaderFooter.includes(router.pathname) && <Navbar />}
      <Toaster position="bottom-right" />
      <main>{children}</main>
      {!noHeaderFooter.includes(router.pathname) && <Footer />}
    </>
  );
}
