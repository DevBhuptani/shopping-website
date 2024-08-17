import Footer from '../Footer'; // Import the Footer component
import Navbar from '../Navbar'; // Import the Navbar component

// Layout component to wrap around page content
export default function Layout({ children }: any) {
  return (
    <>
      {/* Render the Navbar at the top of the page */}
      <Navbar />
      {/* Main content area where child components or pages will be rendered */}
      <main>{children}</main>
      {/* Render the Footer at the bottom of the page */}
      <Footer />
    </>
  );
}
