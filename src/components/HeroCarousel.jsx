import { useEffect, useState } from 'react';

const DISPLAY_MS = 3000;

export default function HeroCarousel({ images }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, DISPLAY_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="hero-carousel" aria-hidden="true">
      {images.map((img, i) => (
        <img
          key={img.id}
          src={img.src}
          alt={img.alt}
          className={`hero-slide${i === index ? ' active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
}
