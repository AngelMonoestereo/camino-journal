import { useContext, useCallback, useMemo, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import GenreCover from "./GenreCover";

const pickTag = (desc = "") => {
  const d = desc.toLowerCase();
  if (d.includes("lounge")) return "lounge";
  if (d.includes("jazz")) return "jazz";
  if (d.includes("blues")) return "blues";
  if (d.includes("salsa")) return "salsa";
  if (d.includes("firepit")) return "firepit";
  if (d.includes("coffee")) return "coffeehouse";
  return "default";
};

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);
  const tag = useMemo(() => pickTag(desc), [desc]);

  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);
  const onError = useCallback(() => {
    setFailed(true);
    setLoaded(false);
  }, []);

  const showCover = failed || !loaded || !image;

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-3 rounded cursor-pointer bg-deepEspresso/60 hover:bg-deepEspresso transition-colors border border-charcoalBlack/40"
    >
      <div className="relative w-full h-44">
        {image && !failed && (
          <img
            className={`absolute inset-0 w-full h-full object-cover rounded border border-charcoalBlack/40 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            src={image}
            alt={name}
            loading="lazy"
            onLoad={onLoad}
            onError={onError}
          />
        )}

        {showCover && (
          <div className="absolute inset-0">
            <GenreCover label={name} tag={tag} />
          </div>
        )}
      </div>

      <p className="font-heading mt-3">{name}</p>
      <p className="font-subheading text-oliveBronze text-sm mt-1">{desc}</p>
    </div>
  );
};

export default SongItem;
