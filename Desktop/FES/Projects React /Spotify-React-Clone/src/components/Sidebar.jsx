import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-2 hidden lg:flex flex-col gap-2 text-antiqueCream">
      {/* Header VPC */}
      <div className="bg-deepEspresso/70 rounded flex items-center gap-3 px-4 py-3 border border-charcoalBlack/40">
        {/* Cambia /logo.png por tu ruta real */}
        <img src="/logo.png" alt="VPC Logo" className="w-10 h-10 object-contain" />
        <div className="leading-tight">
          <h1 className="font-heading text-goldenHoney text-lg">The Vinyl Pour Club</h1>
          <p className="font-subheading text-oliveBronze text-xs">Drop the Needle, Pour the Drink</p>
        </div>
      </div>

      {/* Navegación principal */}
      <div className="bg-charcoalBlack rounded flex flex-col justify-around">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 py-3 cursor-pointer hover:bg-deepEspresso/60 transition-colors"
        >
          <img className="w-6" src={assets.home_icon} alt="Home" />
          <p className="font-heading text-goldenHoney">Home</p>
        </div>

        <div className="flex items-center gap-3 pl-8 py-3 cursor-pointer hover:bg-deepEspresso/60 transition-colors">
          <img className="w-6" src={assets.search_icon} alt="Search" />
          <p className="font-heading text-goldenHoney">Search</p>
        </div>
      </div>

      {/* Librería */}
      <div className="bg-charcoalBlack rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="Library" />
            <p className="font-subheading text-antiqueCream">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.plus_icon} alt="Add" />
            <img className="w-5" src={assets.arrow_icon} alt="Expand" />
          </div>
        </div>

        <div className="p-4 bg-deepEspresso/70 m-2 rounded flex flex-col items-start gap-1 pl-4 border border-charcoalBlack/40">
          <h1 className="font-subheading">Create your first playlist</h1>
          <p className="font-body text-oliveBronze text-sm">It’s easy — we’ll help you</p>
          <button className="px-4 py-1.5 bg-burntAmber text-charcoalBlack text-[15px] rounded-full mt-4 hover:bg-goldenHoney transition-colors">
            Create Playlist
          </button>
        </div>

        <div className="p-4 bg-deepEspresso/70 m-2 rounded flex flex-col items-start gap-1 pl-4 mt-4 border border-charcoalBlack/40">
          <h1 className="font-subheading">Let’s find some podcasts to follow</h1>
          <p className="font-body text-oliveBronze text-sm">We’ll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-burntAmber text-charcoalBlack text-[15px] rounded-full mt-4 hover:bg-goldenHoney transition-colors">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
