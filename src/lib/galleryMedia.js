// Shared gallery media data and helpers.
//
// Lives in its own module (instead of inside HorseGallery) so the eagerly
// loaded HeroSection can reuse the video list without pulling the whole
// lazy-loaded gallery chunk into the initial bundle.

const galleryVideos = '/images/gallery/videos';
const v = galleryVideos;

// Fisher–Yates shuffle. Returns a new array; never mutates the input.
export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const videos = [
  { src: `${v}/beachride.mp4` },
  { src: `${v}/video1.mov` },
  { src: `${v}/video2.MP4` },
  { src: `${v}/video3.mp4` },
  { src: `${v}/ridingvideo1.mp4` },
  { src: `${v}/ridingvideo2.mp4` },
  { src: `${v}/ridingvideo3.mp4` },
  { src: `${v}/ridingvideo4.mp4` },
  { src: `${v}/ridingvideo5.mp4` },
  { src: `${v}/ridingvideo6.mp4` },
  { src: `${v}/ridingvideo7.mp4` },
  { src: `${v}/shakey-video1.MP4` },
  { src: `${v}/shakey-video2.mp4` },
  { src: `${v}/ridingvideo8.mp4` },
  { src: `${v}/ridingvideo9.mp4` },
  { src: `${v}/ridingvideo10.mp4` },
  { src: `${v}/ridingvideo11.mp4` },
  { src: `${v}/ridingvideo12.mp4` },
];

// Small clips (roughly 1.5–3 MB each) that are cheap enough to rotate as the
// muted full-bleed hero background without hurting initial page load. Keep
// multi-megabyte files (beachride.mp4, video2.MP4, ...) out of this list.
export const heroPreviewVideos = [
  `${v}/ridingvideo1.mp4`,
  `${v}/ridingvideo3.mp4`,
  `${v}/ridingvideo7.mp4`,
  `${v}/ridingvideo9.mp4`,
  `${v}/ridingvideo10.mp4`,
  `${v}/ridingvideo11.mp4`,
  `${v}/ridingvideo12.mp4`,
];
