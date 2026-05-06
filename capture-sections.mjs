import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dir = path.join(__dirname, 'temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const browser = await puppeteer.launch({headless:'new'})
const page = await browser.newPage()
await page.setViewport({width:1440,height:900})
await page.goto('http://localhost:3000',{waitUntil:'networkidle2'})
await new Promise(r=>setTimeout(r,2500))

const sections = ['#o-nas','#uslugi','#realizacje','#jak-pracujemy','#kontakt']
let n = fs.readdirSync(dir).filter(f=>f.startsWith('screenshot-')).length

for(const sel of sections){
  await page.evaluate(s=>{
    const el = document.querySelector(s)
    if(el) el.scrollIntoView({behavior:'instant'})
  }, sel)
  await new Promise(r=>setTimeout(r,700))
  n++
  const file = path.join(dir,`screenshot-${n}.png`)
  await page.screenshot({path:file})
  console.log(`Saved ${sel}: ${file}`)
}

await browser.close()
