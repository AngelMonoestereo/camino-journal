import { useContext, useMemo } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const pad = (n) => String(n ?? 0).padStart(2, "0");

const Player = () => {
  const {
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  const currentTime = useMemo(
    () => `${pad(time?.currentTime?.minute)}:${pad(time?.currentTime?.second)}`,
    [time]
  );
  const totalTime = useMemo(
    () => `${pad(time?.totalTime?.minute)}:${pad(time?.totalTime?.second)}`,
    [time]
  );

  return (
    <div
      className="h-[10%] min-h-[72px] bg-charcoalBlack text-antiqueCream px-4
                 flex justify-between items-center border-t border-charcoalBlack/40"
      aria-label="VPC Player"
    >
      {/* Left: current track */}
      <div className="hidden lg:flex items-center gap-4 min-w-[220px]">
        <img
          className="w-12 h-12 object-cover rounded"
          src={track?.image || "/covers/coffee-1.jpg"}
          alt={track?.name || "Current track cover"}
        />
        <div className="leading-tight">
          <p className="font-heading text-goldenHoney">
            {track?.name || "—"}
          </p>
          <p className="font-subheading text-oliveBronze text-sm">
            {(track?.desc || "—").slice(0, 60)}
          </p>
        </div>
      </div>

      {/* Center: transport + timeline */}
      <div className="flex flex-col items-center gap-2 m-auto max-w-[720px] w-full">
        {/* Controls */}
        <div className="flex gap-5 items-center">
          <img
            className="w-4 cursor-pointer opacity-80 hover:opacity-100"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer opacity-80 hover:opacity-100"
            src={assets.prev_icon}
            alt="Previous"
          />

          {playStatus ? (
            <img
              onClick={pause}
              className="w-6 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-6 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          )}

          <img
            onClick={next}
            className="w-4 cursor-pointer opacity-80 hover:opacity-100"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer opacity-80 hover:opacity-100"
            src={assets.loop_icon}
            alt="Loop"
          />
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4 text-sm w-full px-4">
          <p className="tabular-nums w-[42px] text-antiqueCream/85">{currentTime}</p>

          <div
            ref={seekBg}
            onClick={seekSong}
            className="flex-1 h-2 rounded-full bg-deepEspresso/70 cursor-pointer
                       border border-charcoalBlack/40"
            aria-label="Seek bar"
            role="progressbar"
          >
            {/* El <hr> actúa como el “fill” (ancho controlado por contexto) */}
            <hr
              ref={seekBar}
              className="h-2 border-none w-0 bg-goldenHoney rounded-full"
            />
          </div>

          <p className="tabular-nums w-[42px] text-antiqueCream/85">{totalTime}</p>
        </div>
      </div>

      {/* Right: extras */}
      <div className="hidden lg:flex items-center gap-3 opacity-80 min-w-[220px] justify-end">
        <img className="w-4" src={assets.plays_icon} alt="Plays" />
        <img className="w-4" src={assets.mic_icon} alt="Mic" />
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.speaker_icon} alt="Devices" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 h-1 rounded bg-deepEspresso/70">
          {/* TODO: hacer volumen real si quieres */}
        </div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini player" />
        <img className="w-4" src={assets.zoom_icon} alt="Expand" />
      </div>
    </div>
  );
};

export default Player;
