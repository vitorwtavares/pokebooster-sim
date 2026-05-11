# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # run dev server on port 5173
pnpm build        # tsc type-check + vite production build
pnpm preview      # preview production build
```

There are no tests or linting configured yet.

## Environment

Copy `.env.template` to `.env` and fill in the [Pokémon TCG API](https://pokemontcg.io/) values:

```
VITE_API_URL=""
VITE_API_KEY=""
```

## Architecture

Single-page React app. There are no routes — the whole app is one view.

**Data flow:**
- `SelectedPackContext` (`src/context/SelectedPack/`) holds the currently selected booster pack (id + total cards) globally. The Header's pack selector writes to it; `App.tsx` reads from it to fetch cards.
- `src/providers/fetchClient.ts` — axios instance configured with base URL and API key from env. Response interceptor unwraps `.data` automatically, so service functions return the payload directly.
- `src/services/requests.ts` — two endpoints: `getBoosterPacks` (sets list) and `getCards` (cards for a set).

**Component tree:**
```
main.tsx  (ChakraProvider + SelectedPackProvider + AppToaster)
└── App.tsx  (fetches cards on button click, owns card flip state)
    ├── Header  (Drawer with pack selector + search)
    │   └── PackSelectorList  (paginated, infinite scroll via react-waypoint)
    │       └── PackSelectorListItem  (selects pack, fires toast)
    ├── CardPack  (renders the 10-card grid)
    │   └── Card  (flip animation, parallax tilt on hover)
    └── Credits  (modal)
```

**Styling pattern:** Components use co-located `*.styles.tsx` files with `@emotion/styled` wrapping Chakra UI components. Custom props (e.g. `isSelectedPack`, `shouldCardBeFlipped`) are typed and excluded from DOM forwarding via `shouldForwardProp`.

**Toasts:** `src/utils/toaster.ts` creates the ark-ui/Chakra toaster store. `AppToaster.tsx` renders it in the tree. Call `toaster.create({...})` anywhere — no hook needed.

**Path alias:** `~` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
