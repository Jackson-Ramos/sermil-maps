# Design — Links do Google Maps por lote

Data: 2026-06-14

## Objetivo

Permitir que, ao tocar em "Abrir no Google Maps" na tela de modo de
navegação, o app abra o Google Maps com a rota para o lote selecionado.
Os links ficam num arquivo JSON editável.

## Decisões

- **Granularidade:** um link por par quadra+lote (quadras A–D, lotes 01–28).
- **Conteúdo:** URL completa do Google Maps, colada manualmente por destino.
- **Escopo:** apenas o botão Google Maps. Waze fica para depois.
- **Sem link preenchido:** mostra aviso "rota indisponível" (toast) e não abre.
- **Exemplos:** A-01 e A-02 vêm pré-preenchidos com URLs de exemplo.

## Arquivos

### `src/data/mapsLinks.json`
Estrutura aninhada quadra → lote → URL (string). Todas as 112 entradas
presentes; vazias por padrão, exceto A-01 e A-02 (exemplos).

```json
{
  "A": { "01": "https://...", "02": "https://...", "03": "", "...": "" },
  "B": { "01": "", "...": "" },
  "C": { "...": "" },
  "D": { "...": "" }
}
```

### `src/data/getMapsLink.ts`
`getMapsLink(quadra: string, lote: string): string | null` — devolve a URL
ou `null` se a entrada não existir ou estiver vazia.

### `src/app/App.tsx`
- `handleNavigationMode('google')`: busca a URL via `getMapsLink`; se houver,
  `window.open(url, '_blank', 'noopener')`; senão, `toast.error('Rota indisponível...')`.
- Monta `<Toaster />` (sonner) uma vez no componente raiz.

## Fora de escopo

- Waze.
- Edição dos links em runtime (editar exige rebuild + redeploy).
- Coordenadas/geração automática de URL.
