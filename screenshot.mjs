import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { chromium: cr } = require('playwright')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const url = process.argv[2] || 'http://localhost:3000'
const dir = path.join(__dirname, 'temporary screenshots')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)
const existing = fs.readdirSync(dir).filter(f=>f.startsWith('screenshot-'))
const n = existing.length + 1

const browser = await cr.launch()
const page = await browser.newPage()
await page.setViewportSize({width:1440, height:900})
await page.goto(url, {waitUntil:'networkidle'})
await page.waitForTimeout(1500)
const file = path.join(dir, `screenshot-${n}.png`)
await page.screenshot({path:file, fullPage:false})
console.log(`Saved: ${file}`)
await browser.close()
