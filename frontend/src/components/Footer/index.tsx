import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-4 flex justify-center font-primary items-center">
      {/* Footer content */}
      Built with <Heart color="#ff0000" fill="#ff0000" size={20} /> by{' '}
      <a
        href="https://devbhuptani.vercel.app/" // Link to the portfolio or personal website
        target="_blank" // Opens the link in a new tab
        rel="noreferrer" // Prevents the new page from accessing the referrer information
        className="text-palette-primary font-bold px-1" // Styling for the link
      >
        Dev Bhuptani
      </a>
    </footer>
  );
};

export default Footer;
