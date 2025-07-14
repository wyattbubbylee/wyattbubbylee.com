set dotenv-load := true

serve:
  python -m http.server -d markout
build: tailwind
  uvx --from 'markata<0.9.0' markata clean
  uvx --from 'markata<0.9.0' markata build
deploy:
  npx wrangler pages deploy markout --project-name wyattbubbylee-com --branch prod-markata
tailwind:
  npx tailwindcss --input tailwind/app.css --output static/wyattbubbylee.css

