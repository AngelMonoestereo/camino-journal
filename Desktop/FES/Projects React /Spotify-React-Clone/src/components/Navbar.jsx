import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        {/* Back / Forward */}
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-charcoalBlack p-2 rounded-2xl cursor-pointer hover:bg-deepEspresso/70"
            src={assets.arrow_left}
            alt="Back"
            onClick={() => navigate(-1)}
          />
          <img
            className="w-8 bg-charcoalBlack p-2 rounded-2xl cursor-pointer hover:bg-deepEspresso/70"
            src={assets.arrow_right}
            alt="Forward"
            onClick={() => navigate(+1)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <p className="bg-burntAmber text-charcoalBlack text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-goldenHoney">
            Explore Premium
          </p>
          <p className="bg-charcoalBlack py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-deepEspresso/70">
            Install App
          </p>
          <p className="bg-goldenHoney text-charcoalBlack w-8 h-8 rounded-full flex items-center justify-center cursor-pointer font-heading">
            V
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-burntAmber text-charcoalBlack px-4 py-1 rounded-2xl">All</p>
        <p className="bg-charcoalBlack cursor-pointer px-4 py-1 rounded-2xl hover:bg-deepEspresso/70">Music</p>
        <p className="bg-charcoalBlack cursor-pointer px-4 py-1 rounded-2xl hover:bg-deepEspresso/70">Podcasts</p>
      </div>
    </>
  );
};

export default Navbar;
