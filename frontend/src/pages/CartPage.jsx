import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const [totalBill, setTotalBill] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalBill(total);
  }, [cartItems]);

  const handleCheckout = () => {
    alert("Checkout Successful!");
  };

  return (
    <div className="cotainer bmi-card max-w-4xl mx-auto p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate("/medicines")}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 w-full">
                <img
                  src={item.mediAvatar?.url}
                  alt={item.medicineName}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                />
                <h3 className="text-lg font-semibold mb-1">
                    {item.medicineName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} x {item.quantity}
                  </p>
              </div>

              {/* RIGHT SIDE: total price */}
              <div className="text-right">
                <p className="text-md font-bold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          <hr />
          <div className="text-right text-xl font-bold mb-4">
            Total: ₹{totalBill}
          </div>

          <div className="text-right">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
