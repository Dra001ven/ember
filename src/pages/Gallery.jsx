import { useEffect, useRef, useState } from 'react';
import { galleryImages } from '../data.js';

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ paddingTop: 48 }}>
      <div className="wrap">
        <div className="gallery-top reveal">
          <h2>Inside the kitchen and the room.</h2>
          <a
            className="btn-ghost"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--ink)', borderColor: 'var(--line-strong)' }}
          >
            Follow @emberandsalt
          </a>
        </div>
        <p className="gallery-hint reveal">Scroll to flip through the room. Click a photo for a closer look.</p>
      </div>

      <div className="stack-gallery">
        <div className="stack-counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
        </div>
        {galleryImages.map((img, i) => (
          <div className="stack-card-wrap" key={img.id}>
            <button
              type="button"
              className="stack-card"
              style={{ top: `${88 + i * 5}px`, zIndex: i + 1 }}
              onClick={() => setActive(img)}
              aria-label={`View larger: ${img.alt}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              data-index={i}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <span className="stack-card-caption">{img.alt}</span>
            </button>
          </div>
        ))}
      </div>

      {active && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setActive(null)}>
          <img src={active.src} alt={active.alt} />
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setActive(null)}>
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
