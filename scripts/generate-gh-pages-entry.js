import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const clientDist = path.join(projectRoot, 'dist', 'client')
const manifestPath = path.join(clientDist, '.vite', 'manifest.json')
const basePath = '/solus-recycle-DEMO/'

async function main() {
  const manifestRaw = await fs.readFile(manifestPath, 'utf8')
  const manifest = JSON.parse(manifestRaw)

  const entry = Object.values(manifest).find((value) => value.isEntry) ?? manifest['src/client.tsx']
  if (!entry || !entry.file) {
    throw new Error(`Could not find a client entry in manifest: ${manifestPath}`)
  }

  const cssLinks = (entry.assets ?? [])
    .filter((asset) => asset.endsWith('.css'))
    .map((asset) => `<link rel="stylesheet" href="${basePath}${asset}" />`)
    .join('\n    ')

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="${basePath}" />
    <title>Solus Recycle DEMO</title>
    ${cssLinks}
  </head>
  <body></body>
  <script type="module" src="${basePath}${entry.file}"></script>
</html>
`

  await fs.mkdir(clientDist, { recursive: true })
  await fs.writeFile(path.join(clientDist, 'index.html'), html, 'utf8')
  await fs.writeFile(path.join(clientDist, '404.html'), html, 'utf8')
  console.log(`Generated GitHub Pages entry files in ${clientDist}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
