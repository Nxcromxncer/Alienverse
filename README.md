# Ben 10 — Alienverse 🟢

An interactive alien explorer web app inspired by the Ben 10 universe, built to feel like using the Omnitrix watch interface.

## Tech Stack

- React 18
- Vite
- Tailwind CSS v3
- Framer Motion
- React Router DOM v6

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # Circular Omnitrix dial navigation
│   ├── AlienCarousel.jsx  # 3D rotating alien selector
│   ├── AlienCard.jsx      # Grid card for each alien
│   ├── SearchBar.jsx      # Live search input
│   └── BackgroundFX.jsx   # Ben 10 styled background panels
├── data/
│   └── aliens.js          # All alien data (name, species, abilities, etc.)
├── pages/
│   ├── Home.jsx           # Search + alien card grid
│   ├── Alien.jsx          # 3D carousel + full DNA profile
│   └── About.jsx          # Project info
├── App.jsx
├── main.jsx
└── index.css
```

## Adding Your Own Images

Drop your PNG files into `public/assets/aliens/` following this naming pattern:

```
public/
└── assets/
    ├── omnitrix.png          # Omnitrix logo (shows in sidebar center)
    └── aliens/
        ├── alien1.png        # Heatblast
        ├── alien2.png        # Wildmutt
        ├── alien3.png        # Diamondhead
        └── ...up to alien60.png
```

No code changes needed — images load automatically by alien ID.

## Navigation

- **Sidebar** — circular Omnitrix dial on the left edge. Active page pops outward and turns green.
- **Home** — search bar filters aliens in real time by name, species, category, or homeworld.
- **Alien page** — drag left/right or double-click left/right half of the carousel to switch aliens.

## Alien Data

All 60 aliens are defined in `src/data/aliens.js`. Each entry follows this shape:

```js
{
  id: 1,
  name: "Heatblast",
  species: "Pyronite",
  homeworld: "Pyros",
  category: "Fire",
  power: 95,
  description: "...",
  abilities: ["Fire Projection", "Heat Absorption", "Flight", "Pyrokinesis"],
  image: "/assets/aliens/alien1.png",
  color: "#ff4400",
  glowColor: "#ff6600",
}
```

To add more aliens, append entries to the array and drop the matching PNG in the assets folder.

## Disclaimer

Fan-made educational project. Ben 10 and all related characters are property of Cartoon Network.

```

```
