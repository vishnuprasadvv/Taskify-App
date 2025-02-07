import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/userSlice";
import toast from "react-hot-toast";
import { logoutApi } from "@/api/api";
import { RootState } from "@/app/store";
import UserDashboard from "@/components/UserDashboard";
import LOGO from '../../public/checklist.png'

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      toast.success("Loggedout successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <div className="bg-gray-100 w-screen  h-screen">
      <div className="max-w-7xl w-full place-self-center">
        <div className="w-full m-0 shadow-md bg-teal-100 h-16 flex items-center justify-between mb-2">
        <div className="flex  ml-2">
        <img src={LOGO} alt="logo" width={30} />
          <h1 className="text-2xl font-bold text-teal-800 pl-2">Taskify</h1>
        </div>
          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold">Hi, {user?.name} </span>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer mr-2 bg-slate-300 aspect-square rounded-full"
              >
                <img
                  className="w-12 rounded-full m-0 p-0  hover:border-2 border-red-300"
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  alt="image"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm "
              >
                <li>
                  <a className="hover:text-red-500" onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
            <UserDashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
