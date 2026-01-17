set dotenv-load := true

def:
  @just --choose

s:
  python -m http.server -d markout

g:
  uvx --from 'git+https://github.com/waylonwalker/markata@image-zoom' markata steam-games

b:
  uvx --from 'git+https://github.com/waylonwalker/markata@image-zoom' markata clean
  uvx --from 'git+https://github.com/waylonwalker/markata@image-zoom' markata build

d:
  npx wrangler pages deploy markout --project-name wyattbubbylee-com --branch prod-markata

tw:
  npx tailwindcss --input tailwind/app.css --output static/wyattbubbylee.css

np:
  uvx copier copy page-templates/blog .
