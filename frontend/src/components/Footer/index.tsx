import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-4 flex justify-center font-primary items-center">
      Built with <Heart color="#ff0000" fill="#ff0000" size={20} /> by{' '}
      <a
        href="https://devbhuptani.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="text-palette-primary font-bold px-1"
      >
        Dev Bhuptani
      </a>
    </footer>
  );
};

export default Footer;
