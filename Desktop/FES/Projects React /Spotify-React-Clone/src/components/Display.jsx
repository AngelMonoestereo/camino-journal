import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";

const Display = () => {
  const displayRef = useRef(null);
  const location = useLocation();

  // ¿Estamos en /album/:id ?
  const isAlbum = location.pathname.includes("/album/");
  // Toma el id de forma segura (no solo el último char)
  const match = location.pathname.match(/\/album\/(\d+)/);
  const albumId = isAlbum && match ? Number(match[1]) : null;

  // Fallbacks con tu paleta VPC
  const fallbackStart = "#3B2F2F"; // deepEspresso
  const fallbackEnd = "#1E1E1E";   // charcoalBlack

  // Color inicial del gradiente si hay álbum; si no, usa VPC defaults
  const bgStart =
    isAlbum && albumId != null && albumsData[albumId]?.bgColor
      ? albumsData[albumId].bgColor
      : fallbackStart;

  useEffect(() => {
    if (!displayRef.current) return;

    // transición suave cuando cambie el fondo
    displayRef.current.style.transition = "background 300ms ease";

    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgStart}, ${fallbackEnd})`;
    } else {
      // gradiente VPC por defecto
      displayRef.current.style.background = `linear-gradient(${fallbackStart}, ${fallbackEnd})`;
    }
  }, [isAlbum, bgStart]);

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded overflow-auto text-antiqueCream bg-deepEspresso lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;



// import { Route, Routes, useLocation } from "react-router-dom";
// import DisplayHome from "./DisplayHome";
// import DisplayAlbum from "./DisplayAlbum";
// import { useEffect, useRef } from "react";
// import { albumsData } from "../assets/assets";

// const Display = () => {
//   const displayRef = useRef();
//   const location = useLocation();

//   const isAlbum = location.pathname.includes("album");
//   const albumId = isAlbum ? location.pathname.slice(-1) : "";
//   const bgColor = isAlbum ? albumsData[Number(albumId)]?.bgColor || "#121212" : "#121212";

//   useEffect(() => {
//     if (displayRef.current) {
//       if (isAlbum) {
//         displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
//       } else {
//         displayRef.current.style.background = "#121212";
//       }
//     }
//   }, [isAlbum, bgColor]);

//   return (
//     <div
//       ref={displayRef}
//       className="w-[100%] m-2 px-6 pt-4 rounded text-white overflow-auto bg-[#121212] lg:w-[75%] lg:ml-0"
//     >
//       <Routes>
//         <Route path="/" element={<DisplayHome />} />
//         <Route path="/album/:id" element={<DisplayAlbum />} />
//       </Routes>
//     </div>
//   );
// };

// export default Display;
