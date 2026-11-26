import { useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Photo } from "@/data/photos";

// One row of photos that scrolls on its own. It pauses on hover, on keyboard
// focus and with the button. With reduced motion it doesn't animate and
// becomes a strip you can scroll sideways.
const PhotoStrip = ({ photos, label }: { photos: Photo[]; label: string }) => {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="flex justify-end px-5 pb-4 md:px-10 motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="flex min-h-11 items-center gap-2 rounded-md px-2 font-bold text-paper hover:text-sun"
        >
          {paused ? <Play className="size-5" aria-hidden /> : <Pause className="size-5" aria-hidden />}
          {paused ? "Play" : "Pause"} photos
        </button>
      </div>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="group overflow-hidden motion-reduce:overflow-x-auto"
      >
        <ul
          className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {[0, 1].map((copy) =>
            photos.map((photo) => (
              <li key={`${copy}-${photo.src}`} aria-hidden={copy === 1} className={`shrink-0 pr-3 ${copy === 1 ? "motion-reduce:hidden" : ""}`}>
                <img
                  src={photo.src}
                  alt={copy === 0 ? photo.alt : ""}
                  width={photo.width}
                  height={photo.height}
                  className="h-64 w-auto md:h-80"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
};

export default PhotoStrip;
