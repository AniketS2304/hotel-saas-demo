import puppeteer from 'puppeteer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const screenshotDir = path.join(__dirname, 'screenshots')
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true })

const PAGES = [
  { key: 'home', url: 'http://localhost:5173/#/' },
  { key: 'qr_menu', url: 'http://localhost:5173/#/qr/menu?table=5' },
  { key: 'food_detail', url: 'http://localhost:5173/#/qr/food/dish-004' },
  { key: 'cart', url: 'http://localhost:5173/#/qr/cart' },
  { key: 'kitchen', url: 'http://localhost:5173/#/kitchen' },
  { key: 'staff', url: 'http://localhost:5173/#/staff' },
  { key: 'admin_dashboard', url: 'http://localhost:5173/#/admin/dashboard' },
  { key: 'admin_reports', url: 'http://localhost:5173/#/admin/reports' },
]

async function run() {
  console.log('Launching browser...')
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  for (const item of PAGES) {
    console.log(`Navigating to ${item.url}...`)
    try {
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 10000 })
    } catch (e) {
      console.log(`Nav warning: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 1500))
    const outPath = path.join(screenshotDir, `${item.key}.png`)
    await page.screenshot({ path: outPath, fullPage: false })
    console.log(`Saved screenshot: ${outPath}`)
  }

  await browser.close()
  console.log('All screenshots captured successfully!')
}

run().catch(console.error)
