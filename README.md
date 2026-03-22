# toolie

React SPA starter powered by Bun, Vite 8, and UnoCSS.

## Scripts

```bash
bun run dev
```

```bash
bun run build
```

```bash
bun run preview
```

```bash
bun run typecheck
```

## Structure

```text
.
|-- index.html
|-- src/
|   |-- App.tsx
|   |-- main.tsx
|   |-- styles.css
|   `-- vite-env.d.ts
|-- uno.config.ts
|-- vite.config.ts
`-- tsconfig.json
```

## Notes

- `vite` handles the SPA dev server and production build.
- `unocss/vite` generates utility classes on demand.
- `@unocss/reset/tailwind.css` provides a simple baseline reset.

## Install

```bash
bun install
```
