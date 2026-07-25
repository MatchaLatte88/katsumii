/**
 * Generates web-optimized, resized WebP copies of every full-size PNG in
 * public/Screenshots/ into public/Screenshots/opt/.
 *
 * Full-size product screenshots (up to ~2560px / 1.7 MB PNG) are far larger
 * than any slot on the marketing site renders them. We downscale to a retina-
 * friendly max width and re-encode as WebP, which cuts payload ~90% while
 * staying visually identical at display sizes.
 *
 *   npm run screenshots
 */
import { readdir, mkdir, stat } from "node:fs/promises"
import { join, dirname, basename, extname, sep } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC_DIR = join(__dirname, "..", "public", "Screenshots")
const OUT_DIR = join(SRC_DIR, "opt")

const MAX_WIDTH = 1600 // covers 2x for the largest on-page display width
const QUALITY = 80

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  /* recursive so grouped shots (e.g. Screenshots/layout/) keep their folder
     structure inside opt/ — skip opt/ itself so we never re-encode output */
  const entries = await readdir(SRC_DIR, { recursive: true })
  const pngs = entries
    .map((f) => f.split(sep).join("/"))
    .filter((f) => extname(f).toLowerCase() === ".png" && !f.startsWith("opt/"))
    .sort()

  if (pngs.length === 0) {
    console.warn("No PNG screenshots found in", SRC_DIR)
    return
  }

  let totalIn = 0
  let totalOut = 0

  for (const file of pngs) {
    const srcPath = join(SRC_DIR, file)
    const outDir = join(OUT_DIR, dirname(file))
    await mkdir(outDir, { recursive: true })
    const outPath = join(outDir, `${basename(file, ".png")}.webp`)

    const img = sharp(srcPath)
    const meta = await img.metadata()
    const width = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH)

    await img
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const inSize = (await stat(srcPath)).size
    const outSize = (await stat(outPath)).size
    totalIn += inSize
    totalOut += outSize

    const kb = (n) => `${(n / 1024).toFixed(0)}KB`
    console.log(
      `${file.padEnd(34)} ${kb(inSize).padStart(8)} -> ${kb(outSize).padStart(7)}  (${width}px)`
    )
  }

  const mb = (n) => `${(n / 1024 / 1024).toFixed(2)}MB`
  console.log(
    `\n${pngs.length} images  ${mb(totalIn)} -> ${mb(totalOut)}  (${(
      (1 - totalOut / totalIn) *
      100
    ).toFixed(1)}% smaller)`
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
