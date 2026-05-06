import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 3000

const mime = {
  '.html':'text/html','.css':'text/css','.js':'application/javascript',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml',
  '.woff2':'font/woff2','.woff':'font/woff','.ico':'image/x-icon',
}

http.createServer((req,res)=>{
  let url = req.url === '/' ? '/index.html' : req.url
  const filePath = path.join(__dirname, url)
  const ext = path.extname(filePath)
  try {
    const data = fs.readFileSync(filePath)
    res.writeHead(200,{'Content-Type': mime[ext]||'application/octet-stream'})
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
}).listen(PORT, ()=>console.log(`Serving http://localhost:${PORT}`))
