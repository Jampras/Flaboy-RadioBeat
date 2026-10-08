import { ArrowLeft, Radio } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <main className="not-found-page">
      <Radio size={32} aria-hidden="true" />
      <span className="section-no">sinal perdido / 404</span>
      <h1>Essa frequência<br /><em>não existe.</em></h1>
      <p>O endereço saiu do ar. Volte para a rádio e continue procurando seu som.</p>
      <button type="button" onClick={() => setLocation("/")} className="radio-button dark-button">
        <ArrowLeft size={16} /> voltar para a rádio
      </button>
    </main>
  );
}
