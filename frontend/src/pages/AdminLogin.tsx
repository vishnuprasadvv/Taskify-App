import { adminLoginApi } from "@/api/api";
import { RootState } from "@/app/store";
import { adminLoggedIn } from "@/features/adminSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {

    const {isAdminAuthenticated} = useSelector((state: RootState)=> state.admin)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if(isAdminAuthenticated) {
        navigate('/admin/dashboard')
    }
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminLoginApi(email, password);
      console.log(response);
      dispatch(adminLoggedIn({ admin: response.data.user }));
      toast.success(response.message || "Login successful.");
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error(error.response.data.message || "Login failed");
      toast.error(error.response.data.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-5">
            Admin Login{" "}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mb-5">
              <div>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>

              <div>
                <label className="input validator">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    minLength={6}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <p className="validator-hint hidden">
                  Must be more than 6 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              </div>
            </div>

            <div className="card-actions justify-end w-full">
              <button
                type="submit"
                className="btn bg-teal-400 hover:bg-teal-300 text-white w-full"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-3">
            Don't have an account?{" "}
            <Link
              to={"/admin/signup"}
              className="text-teal-400 font-semibold hover:text-teal-500"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
