import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowUpRight, AudioLines, Disc3, House, Mail, Pause, Play, Search, SlidersHorizontal, X } from "lucide-react";

type CatalogBeat = {
  id: string;
  title: string;
  styles: string[];
  moods: string[];
  bpm: number;
  previewUrl: string;
  accent: string;
};

const catalogBeats: CatalogBeat[] = [
  { id: "noite", title: "Noite sem placa", styles: ["trap", "dark"], moods: ["madrugada", "grave pesado"], bpm: 142, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", accent: "beat-purple" },
  { id: "subsolo", title: "Subsolo 02", styles: ["drill", "trap"], moods: ["rua", "grave pesado"], bpm: 138, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", accent: "beat-orange" },
  { id: "ponto", title: "Ponto cego", styles: ["boom bap", "rap"], moods: ["madrugada", "confissão"], bpm: 92, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", accent: "beat-green" },
  { id: "sem-freio", title: "Sem freio", styles: ["trap", "funk"], moods: ["energia alta", "rua"], bpm: 150, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", accent: "beat-pink" },
  { id: "concreto", title: "Concreto molhado", styles: ["drill", "dark"], moods: ["madrugada", "rua"], bpm: 136, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", accent: "beat-blue" },
  { id: "linha-9", title: "Linha 9", styles: ["rap", "boom bap"], moods: ["confissão", "melódico"], bpm: 88, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", accent: "beat-yellow" },
  { id: "pressao", title: "Pressão alta", styles: ["trap", "funk"], moods: ["energia alta", "grave pesado"], bpm: 148, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", accent: "beat-red" },
  { id: "janela", title: "Janela aberta", styles: ["rap", "dark"], moods: ["melódico", "madrugada"], bpm: 104, previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", accent: "beat-lilac" },
];

const styleFilters = ["todos", "trap", "drill", "boom bap", "rap", "funk"];
const moodFilters = ["todos", "madrugada", "grave pesado", "rua", "melódico", "energia alta"];

function Cover({ beat }: { beat: CatalogBeat }) {
  return (
    <div className={`radio-cover ${beat.accent}`}>
      <span className="cover-code">JA / {beat.id.slice(0, 3).toUpperCase()}</span>
      <span className="cover-sun" />
      <span className="cover-title">
        {beat.title.split(" ").slice(0, 2).join(" ")}
        <br />
        <b>{beat.title.split(" ").slice(2).join(" ")}</b>
      </span>
      <span className="cover-bpm">{beat.bpm} BPM</span>
    </div>
  );
}

function PreviewBars({ active }: { active: boolean }) {
  return <span className={`catalog-preview-bars ${active ? "active" : ""}`} aria-hidden="true"><i /><i /><i /><i /><i /></span>;
}

export default function Catalog() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("todos");
  const [mood, setMood] = useState("todos");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return catalogBeats.filter((beat) => {
      const matchesQuery = !normalizedQuery || [beat.title, ...beat.styles, ...beat.moods].some((value) => value.toLocaleLowerCase().includes(normalizedQuery));
      const matchesStyle = style === "todos" || beat.styles.includes(style);
      const matchesMood = mood === "todos" || beat.moods.includes(mood);
      return matchesQuery && matchesStyle && matchesMood;
    });
  }, [query, style, mood]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const end = () => {
      setActiveId(null);
      setIsPlaying(false);
    };
    audio.addEventListener("ended", end);
    return () => {
      audio.pause();
      audio.removeEventListener("ended", end);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const stopPreview = () => {
    const audio = audioRef.current;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    setActiveId(null);
    setIsPlaying(false);
  };

  const startPreview = async (beat: CatalogBeat) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeId === beat.id && isPlaying) {
      stopPreview();
      return;
    }
    if (timerRef.current) window.clearTimeout(timerRef.current);
    audio.pause();
    audio.src = beat.previewUrl;
    audio.currentTime = 0;
    setActiveId(beat.id);
    setIsPlaying(true);
    timerRef.current = window.setTimeout(stopPreview, 5000);
    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>, beat: CatalogBeat) => {
    if (event.pointerType === "mouse") void startPreview(beat);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse") stopPreview();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>, beat: CatalogBeat) => {
    if (event.pointerType !== "mouse") void startPreview(beat);
  };

  const clearFilters = () => {
    setQuery("");
    setStyle("todos");
    setMood("todos");
  };

  const activeBeat = catalogBeats.find((beat) => beat.id === activeId);

  return (
    <div className="radio-shell catalog-shell">
      <header className="radio-header catalog-header">
        <a href="/" className="radio-brand" aria-label="Voltar para a J.A Radio">
          <span className="ja-stamp">J.A</span>
          <span><b>J.A RADIO</b><small>catálogo / arquivo aberto</small></span>
        </a>
        <span className="catalog-header-note"><AudioLines size={14} /> escuta por descoberta</span>
        <a href="mailto:contato@joaoalvarez.com" className="radio-header-cta">mandar ideia <ArrowUpRight size={14} /></a>
      </header>

      <main className="catalog-main radio-wrap">
        <a href="/" className="catalog-back"><ArrowLeft size={15} /> voltar para a rádio</a>
        <div className="catalog-intro">
          <div>
            <span className="section-no">arquivo / 01—08</span>
            <h1>Encontre<br /><em>seu beat.</em></h1>
          </div>
          <p>Procure por uma palavra, escolha um clima e deixe o grave apresentar o próximo movimento.</p>
        </div>

        <section className="catalog-controls" aria-label="Buscar e filtrar beats">
          <label className="catalog-search">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="buscar por título, estilo ou clima" aria-label="Buscar beats" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Limpar busca"><X size={15} /></button>}
          </label>
          <button type="button" className={`catalog-filter-toggle ${showFilters ? "active" : ""}`} onClick={() => setShowFilters((current) => !current)}><SlidersHorizontal size={16} /> filtros <span>{(style !== "todos" ? 1 : 0) + (mood !== "todos" ? 1 : 0)}</span></button>
          <div className={`catalog-filter-panel ${showFilters ? "open" : ""}`}>
            <div className="catalog-filter-group"><span>estilo</span><div>{styleFilters.map((item) => <button type="button" key={item} className={style === item ? "selected" : ""} onClick={() => setStyle(item)}>{item}</button>)}</div></div>
            <div className="catalog-filter-group"><span>clima</span><div>{moodFilters.map((item) => <button type="button" key={item} className={mood === item ? "selected" : ""} onClick={() => setMood(item)}>{item}</button>)}</div></div>
          </div>
        </section>

        <div className="catalog-result-line"><span>{results.length.toString().padStart(2, "0")} faixas encontradas</span><span><i className="live-dot" /> {activeBeat ? `prévia / ${activeBeat.title}` : "passe ou toque para ouvir"}</span></div>

        {results.length > 0 ? (
          <section className="catalog-grid" aria-label="Catálogo de beats">
            {results.map((beat, index) => {
              const active = activeId === beat.id && isPlaying;
              return (
                <article className={`catalog-card ${active ? "is-previewing" : ""}`} key={beat.id}>
                  <button type="button" className="catalog-art-button" onPointerEnter={(event) => handlePointerEnter(event, beat)} onPointerLeave={handlePointerLeave} onPointerDown={(event) => handlePointerDown(event, beat)} aria-label={`${active ? "Parar" : "Ouvir preview de"} ${beat.title}`}>
                    <span className="catalog-card-index">{String(index + 1).padStart(2, "0")}</span>
                    <Cover beat={beat} />
                    <span className="catalog-play"><span>{active ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</span><small>{active ? "parar" : "preview 5s"}</small></span>
                    <span className="catalog-card-signal"><PreviewBars active={active} /> <span>{active ? "tocando" : "ouvir"}</span></span>
                  </button>
                  <div className="catalog-card-info"><div><h2>{beat.title}</h2><p>{beat.styles.join(" / ")} <span>·</span> {beat.bpm} BPM <span>·</span> {beat.moods[0]}</p></div><a href={`mailto:contato@joaoalvarez.com?subject=${encodeURIComponent(`Quero criar em cima de ${beat.title}`)}`} aria-label={`Falar sobre ${beat.title}`}><ArrowUpRight size={17} /></a></div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className="catalog-empty"><AudioLines size={25} /><h2>Nenhum grave nessa frequência.</h2><p>Tente outra palavra ou limpe os filtros para abrir o arquivo.</p><button type="button" onClick={clearFilters} className="radio-button purple-button">limpar busca <X size={14} /></button></div>
        )}
      </main>

      <footer className="catalog-footer radio-wrap"><span><span className="ja-stamp small-stamp">J.A</span> arquivo aberto / 24—7</span><a href="/">voltar ao início <ArrowUpRight size={14} /></a></footer>
      <nav className="mobile-tabbar catalog-mobile-tabbar" aria-label="Navegação rápida"><a href="/"><House size={16} strokeWidth={1.8} /><span>início</span></a><a href="/catalogo" className="is-active"><AudioLines size={16} strokeWidth={1.8} /><span>catálogo</span></a><a href="/#releases"><Disc3 size={16} strokeWidth={1.8} /><span>lançamentos</span></a><a href="/#contact"><Mail size={16} strokeWidth={1.8} /><span>contato</span></a></nav>
    </div>
  );
}
