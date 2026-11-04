# Portfolio a scaffale

Portfolio interattivo in React + Vite + Framer Motion: uno scaffale illustrato in SVG, ogni oggetto apre una sezione.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # versione pronta per la pubblicazione in dist/
```

## Dove modificare le cose

- `src/data.js` — **tutti i testi** (italiano e inglese), progetti, competenze, contatti. I valori tra `[parentesi quadre]` sono segnaposto da completare.
- `PHOTO` in `src/data.js` — per usare la tua foto vera: metti il file in `public/` (es. `me.jpg`) e scrivi `'/me.jpg'`.
- `src/Scene.jsx` — il disegno dello scaffale e la posizione degli oggetti.
- `src/Panel.jsx` — i pannelli che si aprono.
- `src/index.css` — colori (variabili in cima), animazioni, versione mobile.

## Oggetti

| Oggetto | Apre |
| --- | --- |
| Foto nella cornice | Chi sono |
| Quadro con la laurea | Formazione (triennale e magistrale, con avanti/indietro) |
| iPhone | App mobile |
| Monitor | App web |
| Apple Watch | Timer Lift su watchOS |
| Libri (5) | Competenze, la copertina si apre |
| Drone (in volo) | Voli |
| Telefono fisso | Contatti |
| Gatto | Fa le fusa se lo clicchi |
