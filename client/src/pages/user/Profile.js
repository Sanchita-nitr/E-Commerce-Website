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
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
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
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Profile"}>
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
                <label >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  placeholder="Enter Your Name"
                />
              </div>
              <div>
                <label>
                  Email
                </label>
                <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                                required
                                disabled
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                            />
              </div>
              <div>
                <label>
                  Password
                </label>
       
                  <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
              />
              </div>
              <div>
                <label >
                  Phone Number
                </label>
                <div>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={10}
                    placeholder="Enter Your Phone Number"
                    pattern="^[0-9]{10}$"
                    title="Enter a valid 10-digit mobile number"
                    required
                    className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label>
                  Address
                </label>
                <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter Your Address"
                                required
                                className="border rounded p-3 w-full bg-slate-50 hover:bg-slate-100 shadow-gray-500 shadow-sm"
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
