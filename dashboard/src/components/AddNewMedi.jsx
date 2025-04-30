import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";
import imageCompression from "browser-image-compression";

const AddNewMedi = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [medicineName, setMedicineName] = useState("");
  const [price, setPrice] = useState("");
  const [mediAvatar, setMediAvatar] = useState("");
  const [mediAvatarPreview, setMediAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setMediAvatarPreview(reader.result);
        setMediAvatar(compressedFile);
      };
    } catch (error) {
      toast.error("Image compression failed");
    }
  };

  const handleAddNewMedicine = async (e) => {
    e.preventDefault();
    if (!medicineName || !price || !mediAvatar) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("medicineName", medicineName);
      formData.append("price", Number(price));
      formData.append("mediAvatar", mediAvatar);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/medicine/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setMedicineName("");
      setPrice("");
      setMediAvatar("");
      setMediAvatarPreview("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="add-medicine-page page">
      <section className="add-medicine-container">
        <img src="/mylogo.jpeg" alt="logo" className="add-medicine-logo" />
        <h1 className="add-medicine-title">ADD NEW MEDICINE</h1>
        <form onSubmit={handleAddNewMedicine} className="add-medicine-form">
          <div className="first-add-medicine-wrapper">
            <div className="add-medicine-avatar">
              <img
                src={mediAvatarPreview || "/mediHoc.jpg"}
                alt="Avatar"
                className="avatar-preview"
              />
              <label className="custom-file-upload">
                <input type="file" accept="image/*" onChange={handleAvatar} />
                📁 Choose Image
              </label>
            </div>

            <div className="add-medicine-inputs">
              <input
                type="text"
                placeholder="Medicine Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-field"
              />
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Add New Medicine"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewMedi;
