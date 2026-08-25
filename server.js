import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env or .env.local if exists
function loadEnv() {
  const envFiles = ['.env.local', '.env', '.env.example'];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [k, ...v] = trimmed.split('=');
          if (k && v.length) {
            const key = k.trim();
            const val = v.join('=').trim().replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log(`[ASIP Server] Loaded environment from ${file}`);
      break;
    }
  }
}
loadEnv();

// Import serverless API handlers
let chatHandler = null;
let projectsHandler = null;

try {
  const chatModule = await import('./api/chat.js');
  chatHandler = chatModule.default;
} catch (e) {
  console.error('[ASIP Server] Error loading api/chat.js:', e);
}

try {
  const projectsModule = await import('./api/projects.js');
  projectsHandler = projectsModule.default;
} catch (e) {
  console.error('[ASIP Server] Error loading api/projects.js:', e);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/jsx; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Add helpers for serverless res functions (json, status, setHeader)
  const enhanceRes = (response) => {
    response.status = (code) => {
      response.statusCode = code;
      return response;
    };
    response.json = (data) => {
      response.setHeader('Content-Type', 'application/json; charset=utf-8');
      response.end(JSON.stringify(data));
      return response;
    };
    return response;
  };

  // API Routes
  if (pathname.startsWith('/api/')) {
    enhanceRes(res);

    // Parse query params into req.query
    const query = {};
    for (const [k, v] of parsedUrl.searchParams.entries()) {
      query[k] = v;
    }
    req.query = query;

    // Parse JSON body for POST
    if (req.method === 'POST' || req.method === 'PUT') {
      let bodyData = '';
      req.on('data', chunk => { bodyData += chunk; });
      req.on('end', async () => {
        try {
          req.body = bodyData ? JSON.parse(bodyData) : {};
        } catch {
          req.body = bodyData;
        }

        if (pathname === '/api/chat' && chatHandler) {
          return chatHandler(req, res);
        } else if (pathname === '/api/projects' && projectsHandler) {
          return projectsHandler(req, res);
        } else {
          return res.status(404).json({ error: 'Endpoint not found' });
        }
      });
      return;
    }

    if (pathname === '/api/chat' && chatHandler) {
      return chatHandler(req, res);
    } else if (pathname === '/api/projects' && projectsHandler) {
      return projectsHandler(req, res);
    } else {
      return res.status(404).json({ error: 'Endpoint not found' });
    }
  }

  // Static File Serving
  let filePath = pathname;
  if (filePath === '/' || filePath === '') {
    filePath = '/index.html';
  } else if (filePath === '/projects') {
    filePath = '/projects.html';
  }

  // Clean decoded path
  try {
    filePath = decodeURIComponent(filePath);
  } catch {}

  const safePath = path.join(__dirname, filePath);

  if (fs.existsSync(safePath) && fs.statSync(safePath).isFile()) {
    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(safePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀 ASIP AI Local Server is running!`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`👉 Directory: http://localhost:${PORT}/projects.html\n`);
});
