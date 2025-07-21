set dotenv-load := true

serve:
  python -m http.server -d markout
build:
  uvx --from 'git+https://github.com/waylonwalker/markata@image-zoom' markata clean
  uvx --from 'git+https://github.com/waylonwalker/markata@image-zoom' markata build
deploy:
  npx wrangler pages deploy markout --project-name wyattbubbylee-com --branch prod-markata
tailwind:
  npx tailwindcss --input tailwind/app.css --output static/wyattbubbylee.css

