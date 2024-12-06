import React from 'react';

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
    title: "Luxury Residence",
    description: "Spacious modern villa with ocean views"
  },
  {
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
    title: "Cozy Garden",
    description: "Tropical paradise surroundings"
  },
  {
    url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7",
    title: "Infinity Pool",
    description: "Private pool overlooking the ocean"
  },
  {
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    title: "Private Marina",
    description: "Exclusive dock access"
  },
  {
    url: "https://images.unsplash.com/photo-1514649923863-ceaf75b7ec40",
    title: "La Donostiarra",
    description: "Your gateway to Caribbean adventures"
  }
];

export function Gallery() {
  return (
    <section id="villa" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-caribbean-900">
          Discover Your Paradise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {/* Large feature image */}
          <div className="relative md:col-span-2 md:row-span-2 group overflow-hidden rounded-xl">
            <img
              src={GALLERY_IMAGES[0].url}
              alt={GALLERY_IMAGES[0].title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {GALLERY_IMAGES[0].title}
                </h3>
                <p className="text-white/80">{GALLERY_IMAGES[0].description}</p>
              </div>
            </div>
          </div>

          {/* Smaller images */}
          {GALLERY_IMAGES.slice(1).map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}