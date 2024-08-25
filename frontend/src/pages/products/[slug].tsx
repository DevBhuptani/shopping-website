import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import shopData from '@/utils/data/data.json';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/shoppingSlice';

const ProductDetail = () => {
  const router = useRouter(); // Router object to access URL parameters
  const { slug } = router.query; // Product slug from URL
  const [product, setProduct] = useState<any>(null); // State for storing product details
  const [quantity, setQuantity] = useState(1); // State for storing selected quantity

  const { cartItems } = useSelector((state: any) => state.shopping); // Cart items from Redux store

  const dispatch = useDispatch(); // Dispatch function from Redux

  useEffect(() => {
    if (slug) {
      // Fetch and set product data based on slug
      const selectedProduct = shopData.find((p) => p.asin === slug);
      if (selectedProduct) {
        setProduct(selectedProduct);

        // Set quantity if product is already in cart
        const cartItem = cartItems.find(
          (item: any) => item.asin === selectedProduct.asin
        );
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    }
  }, [slug, cartItems]); // Dependencies for the effect

  if (!product) {
    return <div>Loading...</div>; // Show loading indicator if product is not loaded
  }

  // Handle input changes for quantity
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
    setQuantity(value);
  };

  // Handle adding product to the cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        {/* Product Image Section */}
        <div className="w-full md:w-1/2 max-w-md border border-palette-lighter bg-white rounded shadow-lg">
          <div className="relative h-96">
            <Image
              src={product.product_photo}
              alt={product.product_title}
              width={32}
              height={32}
              className="transform duration-500 ease-in-out hover:scale-90"
              style={{
                position: 'absolute',
                inset: '0px',
                boxSizing: 'border-box',
                padding: '0px',
                border: 'none',
                margin: 'auto',
                display: 'block',
                width: '0px',
                height: '0px',
                minHeight: '100%',
                minWidth: '100%',
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
          </div>
        </div>
        {/* Product Details Section */}
        <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
          <Link
            href="/"
            className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
          >
            <ArrowLeft />
            Back To All Products
          </Link>
          <div className="font-primary">
            <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary py-2 sm:py-4">
              {product.product_title}
            </h1>
            <div className="text-xl text-palette-primary font-medium py-4 px-1">
              <span className="text-2xl">{product.product_price}</span>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-start space-x-2 w-full">
              <div className="flex flex-col items-start space-y-1 flex-grow-0">
                <label className="text-gray-500 text-base">Qty.</label>
                <input
                  type="number"
                  inputMode="numeric"
                  id="quantity"
                  name="quantity"
                  min={1}
                  step={1}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="text-gray-900 form-input border border-gray-300 w-100 rounded-sm focus:border-palette-light focus:ring-palette-light"
                />
              </div>
            </div>
            <button
              className="pt-3 pb-2 bg-palette-primary text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex justify-center items-baseline hover:bg-palette-dark"
              aria-label="cart-button"
              onClick={handleAddToCart}
            >
              Add To Cart <ShoppingCart fill="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
