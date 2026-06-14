import mapsLinks from './mapsLinks.json';

type MapsLinks = Record<string, Record<string, string>>;

/**
 * Retorna a URL do Google Maps para o par quadra+lote informado.
 * Devolve `null` quando o destino não existe no JSON ou está vazio,
 * para que o app possa avisar que a rota está indisponível.
 */
export function getMapsLink(quadra: string, lote: string): string | null {
  const url = (mapsLinks as MapsLinks)[quadra]?.[lote];
  return url && url.trim() !== '' ? url : null;
}

/** Lista de quadras presentes no JSON, em ordem. */
export function getQuadras(): string[] {
  return Object.keys(mapsLinks as MapsLinks).sort();
}

/** Lista de lotes de uma quadra presentes no JSON, em ordem. */
export function getLotes(quadra: string): string[] {
  const lotes = (mapsLinks as MapsLinks)[quadra];
  return lotes ? Object.keys(lotes).sort() : [];
}
