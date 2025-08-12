import Sidebar from "./components/Sidebar";
import Display from "./components/Display";
import Player from "./components/Player";

const App = () => {
  return (
//     <div className="h-screen bg-vintageCream text-coffeeInk flex flex-col">
//   <div className="flex flex-1">
//     <Sidebar />
//     <div className="flex-1 p-6">
//       <Display />
//     </div>
//   </div>
//   <div className="border-t border-charcoalBlack/30 bg-antiqueCream">
//     <Player />
//   </div>
// </div>

    <div className="h-screen bg-noir text-antiqueCream flex flex-col">
  <div className="flex flex-1">
    <Sidebar />
    <div className="flex-1 p-6">
      <Display />
    </div>
  </div>
  <div className="border-t border-charcoalBlack/40 bg-panel">
    <Player />
  </div>
</div>

    // <div className="h-screen bg-deepEspresso text-antiqueCream flex flex-col">
    //   {/* Zona principal */}
    //   <div className="flex flex-1">
    //     <Sidebar />
    //     <div className="flex-1 p-6">
    //       <Display />
    //     </div>
    //   </div>

    //   {/* Player abajo */}
    //   <div className="border-t border-charcoalBlack/40 bg-charcoalBlack">
    //     <Player />
    //   </div>
    // </div>
  );
};

export default App;








// import { useContext } from "react"
// import Display from "./components/Display"
// import Player from "./components/Player"
// import Sidebar from "./components/Sidebar"
// import { PlayerContext } from "./context/PlayerContext"

// const App = () => {
//   const {audioRef,track} = useContext(PlayerContext)
//   return (
//     <div className="h-screen bg-black">
//       <div className="h-[90%] flex">
//         <Sidebar/>
//         <Display/>
//       </div>
//       <Player/>
//       <audio ref={audioRef} src={track.file} preload="auto">

//       </audio>
//     </div>
//   )
// }

// export default App