import React, { useMemo } from "react";
import emptyCartimage from "../assets/util/emptycart.png";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import CartTable from "./CartTable";
import { useAuth } from "../store/AuthContext";

export default function Cart() {
  const { cart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const isAddressInComplete = useMemo(() => {
    if (!isAuthenticated) return false;
    if (!user.address) return true;
    const { street, city, state, postalCode, country } = user.address;
    return !street || !city || !state || !postalCode || !country;
  },[user]);

  // Memoize the cart length check to prevent re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />

        {!isCartEmpty ? (
          <>
            {isAddressInComplete && (
              <p className="text-red-500 text-lg mt-2 text-center">
                Please updatte your address in your profile to proceed to
                checkout.
              </p>
            )}

            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              {/* Back to Products Button */}
              <Link
                to="/home"
                className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              {/* Proceed to Checkout Button */}
              <Link
                to={isAddressInComplete ? "#" : "/checkout"}
                className={`py-2 px-4 text-xl font-semibold rounded-sm flex justify-center items-center transition
                    ${isAddressInComplete ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter'}
                    text-white dark:text-black`}
                onClick={(e) => {
                  if(isAddressInComplete) {
                    e.preventDefault();
                  }
                }}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartimage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              to="/home"
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
