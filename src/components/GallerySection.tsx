import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Photo {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/6f7b13a9-f126-450e-81af-c93e4e9fb07e.jpg",
    title: "Луговые травы",
    subtitle: "Росистое утро на лугу",
    tag: "Природа",
  },
  {
    id: 2,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/c8f4d55c-d78e-4212-b022-52c35d529157.jpg",
    title: "Коллекция трав",
    subtitle: "Травы на деревянном столе",
    tag: "Коллекция",
  },
  {
    id: 3,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/d3a103ff-8dec-48a1-b1d5-899bd85f543c.jpg",
    title: "Ботанические иллюстрации",
    subtitle: "Акварельная коллекция растений",
    tag: "Иллюстрации",
  },
  {
    id: 4,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/6f7b13a9-f126-450e-81af-c93e4e9fb07e.jpg",
    title: "Мята перечная",
    subtitle: "Mentha piperita в природе",
    tag: "Лекарственные",
  },
  {
    id: 5,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/c8f4d55c-d78e-4212-b022-52c35d529157.jpg",
    title: "Лесные травы",
    subtitle: "Разнотравье лесной опушки",
    tag: "Природа",
  },
  {
    id: 6,
    src: "https://cdn.poehali.dev/projects/5516d959-d1fd-40cc-9dd5-847977764c4c/files/d3a103ff-8dec-48a1-b1d5-899bd85f543c.jpg",
    title: "Ромашка",
    subtitle: "Matricaria chamomilla",
    tag: "Лекарственные",
  },
];

const tags = ["Все", "Природа", "Коллекция", "Иллюстрации", "Лекарственные"];

export default function GallerySection() {
  const [activeTag, setActiveTag] = useState("Все");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = activeTag === "Все" ? photos : photos.filter(p => p.tag === activeTag);

  return (
    <div className="pt-16 min-h-screen">
      <div className="hero-gradient py-16 px-6">
        <div className="container mx-auto text-center text-white">
          <h1 className="font-display text-5xl md:text-6xl mb-4">Галерея</h1>
          <p className="font-body text-white/75 text-lg">Травы в их естественной красоте</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`font-body text-sm px-5 py-2 rounded-full transition-colors ${
                activeTag === tag
                  ? "bg-herb-mid text-white"
                  : "bg-herb-pale text-herb-dark hover:bg-herb-mid/20"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setLightbox(photo)}
              className="break-inside-avoid w-full block group rounded-2xl overflow-hidden relative shadow-md card-hover"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div className="text-left">
                  <span className="font-body text-xs text-herb-gold uppercase tracking-wider">{photo.tag}</span>
                  <h3 className="font-display text-xl text-white">{photo.title}</h3>
                  <p className="font-body text-white/75 text-sm">{photo.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={lightbox.src} alt={lightbox.title} className="w-full max-h-[75vh] object-cover" />
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
              >
                <Icon name="X" size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <span className="font-body text-herb-gold text-xs uppercase tracking-wider">{lightbox.tag}</span>
                <h2 className="font-display text-2xl text-white">{lightbox.title}</h2>
                <p className="font-body text-white/75">{lightbox.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
