import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../../public/assets/logo.jpg';
import { RootState } from '@/store';

const Navbar = () => {
  const { cartItems } = useSelector((state: RootState) => state.shopping);
  const { isAuth } = useSelector((state: RootState) => state.auth);

  return (
    <header className="border-b border-palette-lighter sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link href="/" className="cursor-pointer">
          <h1 className="flex no-underline">
            <Image
              src={Logo}
              alt="Company Logo"
              priority
              className="h-8 w-8 mr-1 object-contain"
            />
            <span className="text-xl font-primary font-bold tracking-tight pt-1">
              Home Essentials
            </span>
          </h1>
        </Link>
        {isAuth ? (
          <Link href="/cart" className="relative" aria-label="cart">
            <ShoppingCart />
            {cartItems?.length === 0 ? null : (
              <div className="absolute top-0 right-0 text-xs bg-yellow-300 text-gray-900 font-semibold rounded-full py-1 px-2 transform translate-x-10 -translate-y-3">
                {cartItems?.length}
              </div>
            )}
          </Link>
        ) : (
          <Link href="/login" className="relative" aria-label="cart">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
