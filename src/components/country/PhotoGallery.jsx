"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PhotoGallery({ images }) {
  const [index, setIndex] = useState(-1); // -1 = lightbox closed

  if (!images || images.length === 0) {
    return <p>No photos yet for this country.</p>;
  }

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="photo-grid">
        {images.map((imageUrl, idx) => (
          <div key={idx} className="grid-item" onClick={() => setIndex(idx)}>
            <Image
              src={imageUrl}
              alt={`Photo ${idx + 1} from the gallery`}
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
