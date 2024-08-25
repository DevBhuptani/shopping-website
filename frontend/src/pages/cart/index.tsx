import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from '@/store/slices/shoppingSlice';
import { ArrowLeftIcon, ArrowRightIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const ProductCart = () => {
  // Accessing cart items from the Redux store
  const { cartItems } = useSelector((state: any) => state.shopping);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  // Handle quantity change for an item
  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: any
  ) => {
    const quantity = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
    dispatch(updateCartQuantity({ id: item.id, quantity }));
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (item: any) => {
    dispatch(removeFromCart(item.id));
  };

  // Calculate the subtotal price of items in the cart
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (acc: number, item: any) =>
        acc + item.quantity * Number(item.product_price.substring(1)),
      0
    );
  };

  // Handle checkout button click
  const handleCheckout = () => {
    toast.success('Thank you for purchasing the products!!');
    setTimeout(() => {
      dispatch(clearCart()); // Clear the cart items
      router.push('/'); // Redirect to home page after a delay
    }, 1000);
  };

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="leading-relaxed font-primary font-extrabold text-4xl text-center text-palette-primary mt-4 py-2 sm:py-4">
        Your Cart
      </h1>

      <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
        <table className="mx-auto">
          <thead>
            <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
              <th className="font-primary font-normal px-6 py-4">Product</th>
              <th className="font-primary font-normal px-6 py-4">Price</th>
              <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                Total
              </th>
              <th className="font-primary font-normal px-6 py-4">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-palette-lighter">
            {/* Iterate over cart items to display each product in the cart */}
            {cartItems?.map((item: any) => (
              <tr
                className="text-sm sm:text-base text-gray-600 text-center"
                key={item?.id}
              >
                {/* Product details and link */}
                <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                  {/* Product Image */}
                  <Image
                    src={item?.product_photo}
                    alt={item?.product_title}
                    priority
                    width={32}
                    height={32}
                    className="hidden sm:inline-flex"
                  />
                  {/* Product title with a link to the product page */}
                  <Link
                    href={`/products/${item?.asin}`}
                    className="pt-1 hover:text-palette-dark"
                  >
                    {item?.product_title?.length > 30
                      ? item?.product_title?.slice(0, 30)
                      : item?.product_title}
                  </Link>
                </td>

                {/* Quantity Input */}
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <input
                    type="number"
                    className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                    inputMode="numeric"
                    id="variant-quantity"
                    name="variant-quantity"
                    min={1}
                    step={1}
                    value={item?.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                  />
                </td>

                {/* Total Price for the item */}
                <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                  <span className="text-lg">
                    {(
                      item?.quantity * Number(item?.product_price?.substring(1))
                    ).toFixed(2)}
                  </span>
                </td>

                {/* Remove Item Button */}
                <td className="font-primary font-medium px-4 sm:px-6 py-4">
                  <button
                    aria-label="delete-item"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <X />
                  </button>
                </td>
              </tr>
            ))}

            {/* Subtotal Calculation */}
            <tr className="text-center">
              <td></td>
              <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                $
                <span className="text-xl">
                  {calculateSubtotal().toFixed(2)}
                </span>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Checkout and Back to Products Buttons */}
      <div className="max-w-sm mx-auto space-y-4 px-2">
        {/* Checkout Button */}
        <button
          aria-label="checkout-products"
          className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
          disabled={cartItems?.length === 0} // Disable if cart is empty
          onClick={handleCheckout}
        >
          Check Out <ArrowRightIcon />
        </button>

        {/* Back to Products Link */}
        <Link
          href="/"
          aria-label="back-to-products"
          className="border border-palette-primary text-palette-primary text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex  justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
        >
          <ArrowLeftIcon /> Back To All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductCart;
