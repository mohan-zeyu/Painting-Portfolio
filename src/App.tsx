import { useEffect, useMemo, useState } from "react";
import { Mail, Instagram, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  type Artwork = {
    id: string;
    title: string;
    year?: string;
    medium?: string;
    size?: string;
    src: string;
    alt?: string;
  };

  const artworks: Artwork[] = useMemo(
    () => [
      {
        id: "a1",
        title: "Untitled No. 1",
        year: "2024",
        medium: "Oil on canvas",
        size: "60×80 cm",
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop",
        alt: "Abstract strokes in deep hues.",
      },
      {
        id: "a2",
        title: "Late Light",
        year: "2023",
        medium: "Acrylic on wood",
        size: "50×70 cm",
        src: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1400&auto=format&fit=crop",
        alt: "Soft abstract light study.",
      },
      {
        id: "a3",
        title: "Blue Field",
        year: "2022",
        medium: "Oil on canvas",
        size: "80×100 cm",
        src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1400&auto=format&fit=crop",
        alt: "Monochrome blue textures.",
      },
      {
        id: "a4",
        title: "Rhythm",
        year: "2024",
        medium: "Mixed media",
        size: "70×70 cm",
        src: "https://images.unsplash.com/photo-1526318472353-c74b59b031c2?q=80&w=1400&auto=format&fit=crop",
        alt: "Gestural marks and rhythm.",
      },
      {
        id: "a5",
        title: "After Rain",
        year: "2023",
        medium: "Watercolor on paper",
        size: "42×59 cm",
        src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400&auto=format&fit=crop",
        alt: "Soft gradients like rain.",
      },
      {
        id: "a6",
        title: "Vermilion",
        year: "2022",
        medium: "Oil on canvas",
        size: "60×60 cm",
        src: "https://images.unsplash.com/photo-1484244233201-29892afe6a2c?q=80&w=1400&auto=format&fit=crop",
        alt: "Warm vermilion palette.",
      },
    ],
    []
  );

  const [selected, setSelected] = useState<Artwork | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">Your Name</h1>
            <p className="text-sm text-neutral-500">Paintings</p>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-neutral-600">
            <a href="#work" className="hover:text-black transition-colors">Work</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight">Selected Works</h2>
          <p className="mt-2 text-neutral-600 text-sm sm:text-base">
            A concise gallery of recent paintings. Click any image to view larger.
          </p>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {artworks.map((art) => (
            <motion.button
              key={art.id}
              onClick={() => setSelected(art)}
              className="group relative overflow-hidden rounded-2xl shadow-sm bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={art.src}
                  alt={art.alt || art.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-between items-end p-3 sm:p-4 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                <div>
                  <h3 className="text-white text-sm sm:text-base font-medium leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm">
                    {[art.year, art.medium].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute -top-10 right-0 text-white/90 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="rounded-2xl overflow-hidden bg-black">
                <img
                  src={selected.src}
                  alt={selected.alt || selected.title}
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="mt-3 text-white/90">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span className="font-medium text-white">{selected.title}</span>
                  {selected.year && <span>• {selected.year}</span>}
                  {selected.medium && <span>• {selected.medium}</span>}
                  {selected.size && <span>• {selected.size}</span>}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer id="contact" className="border-t mt-10">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-lg font-medium tracking-tight">Contact</h2>
          <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-2xl">
            For commissions, exhibitions, or inquiries, feel free to reach out.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <a
              href="mailto:artist@example.com"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:shadow-sm transition"
            >
              <Mail className="h-4 w-4" /> artist@example.com
            </a>
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border hover:shadow-sm transition"
            >
              <Instagram className="h-4 w-4" /> @yourhandle
            </a>
          </div>

          <div className="mt-8 text-xs text-neutral-500">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
