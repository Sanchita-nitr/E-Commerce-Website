import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name || "");
      setPhone(phone || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/update-profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.success) {
        // Update auth context and local storage
        setAuth({ ...auth, user: data.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success(data.message || "Profile updated successfully!");
      } else {
        toast.error(data.message || "Error updating profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while updating profile");
    }
  };

  return (
    <Layout title="Dashboard - Profile">
      <div className="flex flex-col sm:flex-row min-h-screen">
        {/* User Menu */}
        <div className="bg-gray-100 min-w-max">
          <UserMenu />
        </div>

        {/* Profile Form */}
        <div className="w-full p-4 md:p-6">
          <div className="bg-white p-6 shadow rounded-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  value={email}
                  type="email"
                  disabled
                  className="border rounded p-3 w-full bg-slate-100 shadow-gray-500 shadow-sm"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  placeholder="Enter Your Password"
                />
              </div>
              <div>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  pattern="^[0-9]{10}$"
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <div>
                <label>Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  placeholder="Enter Your Address"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
