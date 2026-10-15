require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';

// Yalidine Config
const API = 'https://api.yalidine.app/v1';

// ZR Express Config
const ZR_API_URL = 'https://api.zrexpress.app/api/v1';
const ZR_HEADERS = {
  'tenantId': '37f4b436-aa6a-4e49-a667-55fa074cf531',
  'Authorization': 'Bearer w1nCmIERd8Gcqtl9kImV7VE5FYXk8FxC71xCxtYsBvw94U8uUuGRscJ3Ep1XmJV1',
  'Content-Type': 'application/json'
};

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map();

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',').map(s => s.trim())
    : true
}));
app.use(express.json({ limit: '20kb' }));

async function yalidineGet(path, params = {}) {
  const id = process.env.YALIDINE_API_ID;
  const token = process.env.YALIDINE_API_TOKEN;

  if (!id || !token) {
    const error = new Error('Yalidine credentials are missing from server configuration.');
    error.status = 500;
    throw error;
  }

  const url = new URL(API + path);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      'X-API-ID': id,
      'X-API-TOKEN': token,
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(12000)
  });

  if (!response.ok) {
    const error = new Error('Yalidine API request failed.');
    error.status = 502;
    error.upstreamStatus = response.status;
    throw error;
  }

  return response.json();
}

async function cachedGet(key, path, params) {
  const item = cache.get(key);
  if (item && item.expiresAt > Date.now()) return item.value;

  const value = await yalidineGet(path, params);
  cache.set(key, { value, expiresAt: Date.now() + CACHE_MS });
  return value;
}

function validId(value, max = 1000000) {
  return typeof value === 'string' &&
    /^\d+$/.test(value) &&
    Number(value) >= 1 &&
    Number(value) <= max;
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sou9koum Yalidine Backend' });
});

app.get('/api/yalidine/wilayas', async (req, res, next) => {
  try {
    res.json(await cachedGet('wilayas', '/wilayas/', { page_size: 100 }));
  } catch (e) {
    next(e);
  }
});

app.get('/api/yalidine/communes', async (req, res, next) => {
  const id = req.query.wilaya_id;
  if (!validId(id, 58)) {
    return res.status(400).json({ error: 'Valid wilaya_id (1-58) is required.' });
  }

  try {
    res.json(await cachedGet(
      `communes:${id}`,
      '/communes/',
      { wilaya_id: id, page_size: 1000 }
    ));
  } catch (e) {
    next(e);
  }
});

app.get('/api/yalidine/centers', async (req, res, next) => {
  const { wilaya_id, commune_id } = req.query;

  if (wilaya_id && !validId(wilaya_id, 58)) {
    return res.status(400).json({ error: 'Invalid wilaya_id.' });
  }
  if (commune_id && !validId(commune_id)) {
    return res.status(400).json({ error: 'Invalid commune_id.' });
  }

  const params = { page_size: 1000 };
  if (wilaya_id) params.wilaya_id = wilaya_id;
  if (commune_id) params.commune_id = commune_id;

  try {
    const key = `centers:${wilaya_id || ''}:${commune_id || ''}`;
    res.json(await cachedGet(key, '/centers/', params));
  } catch (e) {
    next(e);
  }
});

app.get('/api/yalidine/fees', async (req, res, next) => {
  // Yalidine wilaya ID for Biskra is 7.
  const from = req.query.from_wilaya_id || '7';
  const to = req.query.to_wilaya_id;

  if (!validId(from, 58) || !validId(to, 58)) {
    return res.status(400).json({
      error: 'Valid from_wilaya_id and to_wilaya_id are required.'
    });
  }

  try {
    const data = await cachedGet(
      `fees:${from}:${to}`,
      '/fees/',
      { from_wilaya_id: from, to_wilaya_id: to }
    );
    res.json({ origin_wilaya_id: Number(from), destination_wilaya_id: Number(to), data });
  } catch (e) {
    next(e);
  }
});

// ==========================================
// ZR EXPRESS ROUTES
// ==========================================

app.get('/api/zr/rates', async (req, res, next) => {
  try {
    const response = await fetch(`${ZR_API_URL}/delivery-pricing/rates`, {
      method: 'GET',
      headers: ZR_HEADERS,
      signal: AbortSignal.timeout(12000)
    });
    
    if (!response.ok) {
      const error = new Error('ZR Express API request failed.');
      error.status = 502;
      error.upstreamStatus = response.status;
      throw error;
    }
    
    const data = await response.json();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

app.post('/api/zr/hubs', async (req, res, next) => {
  try {
    const { territoryId } = req.body;
    const response = await fetch(`${ZR_API_URL}/hubs/search`, {
      method: 'POST',
      headers: ZR_HEADERS,
      body: JSON.stringify({ territoryId: territoryId || null }),
      signal: AbortSignal.timeout(12000)
    });
    
    if (!response.ok) {
      const error = new Error('ZR Express API request failed.');
      error.status = 502;
      error.upstreamStatus = response.status;
      throw error;
    }
    
    const data = await response.json();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// ==========================================
// ERROR HANDLING
// ==========================================

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error('Backend error:', err.message);
  res.status(err.status || 502).json({
    error: err.status === 500
      ? 'Backend credentials are not configured.'
      : 'Unable to retrieve delivery information.',
    ...(err.upstreamStatus ? { upstreamStatus: err.upstreamStatus } : {})
  });
});

app.listen(PORT, HOST, () => {
  console.log(`Sou9koum backend listening on ${HOST}:${PORT}`);
});