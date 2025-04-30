import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState({});
  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/medicine/all",
          { withCredentials: true }
        );
        setMedicines(data.medicines);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch medicines"
        );
      }
    };
    fetchMedicines();
  }, []);

  const handleAddToCart = (medicine) => {
    const updatedCart = { ...cart };
    updatedCart[medicine._id] = (updatedCart[medicine._id] || 0) + 1;
    setCart(updatedCart);
    toast.success(
      `${medicine.medicineName} added (Qty: ${updatedCart[medicine._id]})`
    );
  };

  const handleRemoveFromCart = (medicine) => {
    const updatedCart = { ...cart };
    if (updatedCart[medicine._id]) {
      updatedCart[medicine._id] -= 1;
      if (updatedCart[medicine._id] <= 0) {
        delete updatedCart[medicine._id];
      }
      setCart(updatedCart);
      toast.warn(
        `${medicine.medicineName} removed (Qty: ${
          updatedCart[medicine._id] || 0
        })`
      );
    }
  };

  const handleCheckout = () => {
    const selectedItems = medicines
      .filter((medicine) => cart[medicine._id])
      .map((medicine) => ({
        ...medicine,
        quantity: cart[medicine._id],
      }));

    if (selectedItems.length === 0) {
      toast.error("No items in cart");
      return;
    }

    navigate("/cart", { state: { cartItems: selectedItems } });
  };

  const getQuantity = (id) => cart[id] || 0;

  if (!isAuthenticated) {
    return <Navigate to="/medicines" />;
  }

  return (
    <section className="page medicines container">
      <h1 className="section-title">MEDICINES</h1>
      <div className="medicine-grid">
        {medicines && medicines.length > 0 ? (
          medicines.map((medicine) => (
            <div key={medicine._id} className="medicine-card">
              <img
                src={medicine.mediAvatar?.url}
                alt="Medicine"
                className="medicine-img"
              />
              <div className="medicine-info">
                <h3 className="medicine-name">{medicine.medicineName}</h3>
                <p className="medicine-price">Price: ₹{medicine.price}</p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    margin: "8px 0",
                  }}
                >
                  <div
                    style={{
                      padding: "5px 12px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      minWidth: "40px",
                      textAlign: "center",
                    }}
                  >
                    {getQuantity(medicine._id)}
                  </div>

                  <button
                    onClick={() => handleAddToCart(medicine)}
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => handleRemoveFromCart(medicine)}
                    style={{
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #ccc",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️
                  </button>
                </div>

                <button
                  onClick={() =>
                    toast.info(`More info about ${medicine.medicineName}`)
                  }
                >
                  More Info
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="no-data">No Medicine Found!</h2>
        )}
      </div>

      {/* Checkout Button */}
      {Object.keys(cart).length > 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleCheckout}
            style={{
              padding: "10px 20px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      )}
    </section>
  );
};

export default Medicines;
