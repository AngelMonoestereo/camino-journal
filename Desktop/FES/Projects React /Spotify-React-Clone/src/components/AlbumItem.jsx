import { useNavigate } from "react-router-dom";

const getInitials = (str = "") => {
  const words = str.trim().split(/\s+/).slice(0, 2);
  return words.map(w => w[0]?.toUpperCase() || "").join("") || "VP";
};

const AlbumItem = ({ id, name, desc, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id !== undefined && id !== null) {
      navigate(`/album/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="min-w-[180px] max-w-[220px] p-3 rounded cursor-pointer
                 bg-deepEspresso/60 hover:bg-deepEspresso transition-colors
                 border border-charcoalBlack/40 mr-3"
      aria-label={`Open album ${name}`}
      role="button"
    >
      {/* Cover */}
      {image ? (
        <img
          className="rounded w-full h-44 object-cover"
          src={image}
          alt={name}
          loading="lazy"
        />
      ) : (
        <div
          className="rounded w-full h-44 flex items-center justify-center
                     bg-[linear-gradient(#3B2F2F,#1E1E1E)] border border-charcoalBlack/40"
          aria-hidden="true"
        >
          <span className="font-heading text-goldenHoney text-3xl tracking-wide">
            {getInitials(name)}
          </span>
        </div>
      )}

      {/* Meta */}
      <p className="font-heading text-antiqueCream mt-3 line-clamp-1">{name || "Untitled"}</p>
      <p className="font-subheading text-oliveBronze text-sm mt-1 line-clamp-2">
        {desc || "Curated VPC selection"}
      </p>
    </div>
  );
};

export default AlbumItem;
