'use client';
import Image from 'next/image';

export default function PhotoGallery({ images }) {
  if (!images || images.length === 0) {
    return <p>No photos yet for this country.</p>;
  }

  return (
    <div className="photo-grid">
      {images.map((imageUrl, index) => (
        <div key={index} className="grid-item">
          <Image
            src={imageUrl}
            alt={`Photo ${index + 1} from the gallery`}
            width={300}
            height={300}
            style={{ objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  );
}