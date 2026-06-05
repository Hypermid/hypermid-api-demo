// ============================================
// Hypermid API Playground — Application Logic
// ============================================

const API_BASE = 'https://api.hypermid.io';

// ---- Endpoint Definitions ----
const ENDPOINTS = [
  // Core Swap
  {
    id: 'get-chains',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/chains',
    description: 'List all supported blockchain networks.',
    params: [],
    example: {},
  },
  {
    id: 'get-tokens',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/tokens',
    description: 'Search for supported tokens across chains.',
    params: [
      { name: 'chains', type: 'text', label: 'Chains', placeholder: 'e.g. 42161,10', optional: true },
      { name: 'keywords', type: 'text', label: 'Keywords', placeholder: 'e.g. USDC', optional: true },
    ],
    example: { chains: '42161', keywords: 'USDC' },
  },
  {
    id: 'get-connections',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/connections',
    description: 'Get available token connections between chains.',
    params: [
      { name: 'fromChain', type: 'number', label: 'From Chain', placeholder: '42161' },
      { name: 'fromToken', type: 'text', label: 'From Token', placeholder: '0x...' },
      { name: 'toChain', type: 'number', label: 'To Chain', placeholder: '1' },
    ],
    example: { fromChain: '42161', fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', toChain: '1' },
  },
  {
    id: 'get-tools',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/tools',
    description: 'List available bridging and swap tools.',
    params: [],
    example: {},
  },
  {
    id: 'get-gas-prices',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/gas-prices',
    description: 'Get current gas prices for specified chains.',
    params: [
      { name: 'chains', type: 'text', label: 'Chains', placeholder: 'e.g. 1,42161,10' },
    ],
    example: { chains: '1,42161,10' },
  },
  {
    id: 'get-quote',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/quote',
    description: 'Get a swap/bridge quote with estimated output.',
    params: [
      { name: 'fromChain', type: 'number', label: 'From Chain', placeholder: '42161' },
      { name: 'fromToken', type: 'text', label: 'From Token', placeholder: '0x...' },
      { name: 'fromAmount', type: 'text', label: 'From Amount', placeholder: '100000000000000000' },
      { name: 'toChain', type: 'number', label: 'To Chain', placeholder: '42161' },
      { name: 'toToken', type: 'text', label: 'To Token', placeholder: '0x...' },
      { name: 'fromAddress', type: 'text', label: 'From Address', placeholder: '0x...' },
      { name: 'toAddress', type: 'text', label: 'To Address', placeholder: '0x...', optional: true },
      { name: 'slippage', type: 'text', label: 'Slippage', placeholder: '0.03', optional: true },
      { name: 'order', type: 'select', label: 'Order', options: ['RECOMMENDED', 'FASTEST', 'CHEAPEST'], optional: true },
    ],
    example: {
      fromChain: '42161',
      fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      fromAmount: '100000000000000000',
      toChain: '42161',
      toToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      fromAddress: '0x552008c0f6b2e554f36D8e8Bb3a82D63e8A5AB2F',
      slippage: '0.03',
      order: 'RECOMMENDED',
    },
  },
  {
    id: 'get-routes',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/routes',
    description: 'Get multiple route options for a swap/bridge.',
    params: [
      { name: 'fromChain', type: 'number', label: 'From Chain', placeholder: '42161' },
      { name: 'fromToken', type: 'text', label: 'From Token', placeholder: '0x...' },
      { name: 'fromAmount', type: 'text', label: 'From Amount', placeholder: '100000000000000000' },
      { name: 'toChain', type: 'number', label: 'To Chain', placeholder: '42161' },
      { name: 'toToken', type: 'text', label: 'To Token', placeholder: '0x...' },
      { name: 'fromAddress', type: 'text', label: 'From Address', placeholder: '0x...' },
      { name: 'toAddress', type: 'text', label: 'To Address', placeholder: '0x...', optional: true },
      { name: 'slippage', type: 'text', label: 'Slippage', placeholder: '0.03', optional: true },
      { name: 'order', type: 'select', label: 'Order', options: ['RECOMMENDED', 'FASTEST', 'CHEAPEST'], optional: true },
    ],
    example: {
      fromChain: '42161',
      fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      fromAmount: '100000000000000000',
      toChain: '42161',
      toToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      fromAddress: '0x552008c0f6b2e554f36D8e8Bb3a82D63e8A5AB2F',
      slippage: '0.03',
      order: 'RECOMMENDED',
    },
  },
  {
    id: 'get-status',
    category: 'Core Swap',
    method: 'GET',
    path: '/v1/status',
    description: 'Check the status of a cross-chain transaction.',
    params: [
      { name: 'txHash', type: 'text', label: 'TX Hash', placeholder: '0x...' },
      { name: 'bridge', type: 'text', label: 'Bridge', placeholder: 'e.g. across', optional: true },
      { name: 'fromChain', type: 'number', label: 'From Chain', placeholder: '42161' },
      { name: 'toChain', type: 'number', label: 'To Chain', placeholder: '1' },
    ],
    example: {
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      fromChain: '42161',
      toChain: '1',
    },
  },

  // Execute
  {
    id: 'post-execute',
    category: 'Execute',
    method: 'POST',
    path: '/v1/execute',
    description: 'Create and execute a swap/bridge transaction.',
    params: [
      { name: 'fromChain', type: 'number', label: 'From Chain', placeholder: '42161' },
      { name: 'fromToken', type: 'text', label: 'From Token', placeholder: '0x...' },
      { name: 'fromAmount', type: 'text', label: 'From Amount', placeholder: '100000000000000000' },
      { name: 'toChain', type: 'number', label: 'To Chain', placeholder: '42161' },
      { name: 'toToken', type: 'text', label: 'To Token', placeholder: '0x...' },
      { name: 'fromAddress', type: 'text', label: 'From Address', placeholder: '0x...' },
      { name: 'toAddress', type: 'text', label: 'To Address', placeholder: '0x...' },
      { name: 'depositMode', type: 'select', label: 'Deposit Mode', options: ['auto', 'wallet', 'manual'] },
      { name: 'slippage', type: 'text', label: 'Slippage', placeholder: '0.03', optional: true },
      { name: 'order', type: 'select', label: 'Order', options: ['RECOMMENDED', 'FASTEST', 'CHEAPEST'], optional: true },
    ],
    example: {
      fromChain: '42161',
      fromToken: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      fromAmount: '100000000000000000',
      toChain: '42161',
      toToken: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      fromAddress: '0x552008c0f6b2e554f36D8e8Bb3a82D63e8A5AB2F',
      toAddress: '0x552008c0f6b2e554f36D8e8Bb3a82D63e8A5AB2F',
      depositMode: 'auto',
      slippage: '0.03',
      order: 'RECOMMENDED',
    },
  },
  {
    id: 'post-execute-deposit-submit',
    category: 'Execute',
    method: 'POST',
    path: '/v1/execute/deposit/submit',
    description: 'Submit a deposit transaction hash for tracking.',
    params: [
      { name: 'txHash', type: 'text', label: 'TX Hash', placeholder: '0x...' },
      { name: 'depositAddress', type: 'text', label: 'Deposit Address', placeholder: '0x...' },
    ],
    example: {
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      depositAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  },
  {
    id: 'get-execute-deposit-status',
    category: 'Execute',
    method: 'GET',
    path: '/v1/execute/deposit/status',
    description: 'Check the status of a deposit.',
    params: [
      { name: 'depositAddress', type: 'text', label: 'Deposit Address', placeholder: '0x...' },
      { name: 'depositMemo', type: 'text', label: 'Deposit Memo', placeholder: 'Optional memo', optional: true },
    ],
    example: {
      depositAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  },

  // On-Ramp
  {
    id: 'post-onramp-quote',
    category: 'On-Ramp',
    method: 'POST',
    path: '/v1/onramp/quote',
    description: 'Get a fiat-to-crypto on-ramp quote.',
    params: [
      { name: 'fiatAmount', type: 'number', label: 'Fiat Amount', placeholder: '100' },
      { name: 'fiatCurrency', type: 'text', label: 'Fiat Currency', placeholder: 'USD' },
      { name: 'cryptoToken', type: 'text', label: 'Crypto Token', placeholder: 'ETH' },
      { name: 'cryptoChain', type: 'text', label: 'Crypto Chain', placeholder: 'ethereum' },
    ],
    example: { fiatAmount: '100', fiatCurrency: 'USD', cryptoToken: 'ETH', cryptoChain: 'ethereum' },
  },
  {
    id: 'post-onramp-checkout',
    category: 'On-Ramp',
    method: 'POST',
    path: '/v1/onramp/checkout',
    description: 'Create a checkout session for on-ramp purchase.',
    params: [
      { name: 'walletAddress', type: 'text', label: 'Wallet Address', placeholder: '0x...' },
      { name: 'cryptoToken', type: 'text', label: 'Crypto Token', placeholder: 'ETH' },
      { name: 'cryptoChain', type: 'text', label: 'Crypto Chain', placeholder: 'ethereum' },
      { name: 'fiatCurrency', type: 'text', label: 'Fiat Currency', placeholder: 'USD' },
      { name: 'fiatAmount', type: 'number', label: 'Fiat Amount', placeholder: '100' },
      { name: 'email', type: 'text', label: 'Email', placeholder: 'user@example.com', optional: true },
    ],
    example: {
      walletAddress: '0x552008c0f6b2e554f36D8e8Bb3a82D63e8A5AB2F',
      cryptoToken: 'ETH',
      cryptoChain: 'ethereum',
      fiatCurrency: 'USD',
      fiatAmount: '100',
    },
  },
  {
    id: 'get-onramp-status',
    category: 'On-Ramp',
    method: 'GET',
    path: '/v1/onramp/status',
    description: 'Check the status of an on-ramp order.',
    params: [
      { name: 'orderUid', type: 'text', label: 'Order UID', placeholder: 'order-uid-here' },
    ],
    example: { orderUid: 'example-order-uid-123' },
  },
  {
    id: 'get-onramp-config',
    category: 'On-Ramp',
    method: 'GET',
    path: '/v1/onramp/config',
    description: 'Get on-ramp configuration and supported options.',
    params: [],
    example: {},
  },
  {
    id: 'get-onramp-assets',
    category: 'On-Ramp',
    method: 'GET',
    path: '/v1/onramp/assets',
    description: 'List available on-ramp crypto assets.',
    params: [
      { name: 'currency', type: 'text', label: 'Currency', placeholder: 'USD' },
      { name: 'chain', type: 'text', label: 'Chain', placeholder: 'ethereum' },
      { name: 'orderCurrency', type: 'text', label: 'Order Currency', placeholder: 'ETH', optional: true },
    ],
    example: { currency: 'USD', chain: 'ethereum' },
  },

  // Partner
  {
    id: 'get-partner-me',
    category: 'Partner',
    method: 'GET',
    path: '/v1/partner/me',
    description: 'Get your partner account details. Requires API key.',
    params: [],
    example: {},
    requiresAuth: true,
  },
  {
    id: 'get-partner-stats',
    category: 'Partner',
    method: 'GET',
    path: '/v1/partner/stats',
    description: 'Get partner transaction statistics. Requires API key.',
    params: [
      { name: 'from', type: 'text', label: 'From Date', placeholder: '2024-01-01' },
      { name: 'to', type: 'text', label: 'To Date', placeholder: '2024-12-31' },
    ],
    example: { from: '2024-01-01', to: '2024-12-31' },
    requiresAuth: true,
  },
  {
    id: 'get-partner-transactions',
    category: 'Partner',
    method: 'GET',
    path: '/v1/partner/transactions',
    description: 'List partner transactions with pagination. Requires API key.',
    params: [
      { name: 'page', type: 'number', label: 'Page', placeholder: '1' },
      { name: 'limit', type: 'number', label: 'Limit', placeholder: '10' },
    ],
    example: { page: '1', limit: '10' },
    requiresAuth: true,
  },

  // Webhooks
  {
    id: 'post-partner-webhooks',
    category: 'Webhooks',
    method: 'POST',
    path: '/v1/partner/webhooks',
    description: 'Register a new webhook endpoint. Requires API key.',
    params: [
      { name: 'url', type: 'text', label: 'Webhook URL', placeholder: 'https://your-server.com/webhook' },
      {
        name: 'events',
        type: 'multiselect',
        label: 'Events',
        options: ['transaction.completed', 'transaction.failed', 'transaction.pending', 'deposit.received', 'deposit.confirmed'],
      },
    ],
    example: {
      url: 'https://example.com/webhook',
      events: ['transaction.completed', 'transaction.failed'],
    },
    requiresAuth: true,
  },
  {
    id: 'get-partner-webhooks',
    category: 'Webhooks',
    method: 'GET',
    path: '/v1/partner/webhooks',
    description: 'List all registered webhooks. Requires API key.',
    params: [],
    example: {},
    requiresAuth: true,
  },
  {
    id: 'delete-partner-webhooks',
    category: 'Webhooks',
    method: 'DELETE',
    path: '/v1/partner/webhooks/:id',
    description: 'Delete a webhook by ID. Requires API key.',
    params: [
      { name: 'webhookId', type: 'text', label: 'Webhook ID', placeholder: 'webhook-id-here', isPathParam: true },
    ],
    example: { webhookId: 'wh_abc123' },
    requiresAuth: true,
  },

  // Health
  {
    id: 'get-ping',
    category: 'Health',
    method: 'GET',
    path: '/v1/ping',
    description: 'Health check endpoint. Returns pong.',
    params: [],
    example: {},
  },
];

// ---- State ----
let currentEndpoint = null;
let requestHistory = [];
let isLoading = false;

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  loadApiKey();
  loadHistory();
  renderSidebar();
  renderHistory();
  selectEndpoint(ENDPOINTS[0].id);
  setupEventListeners();
});

// ---- API Key Management ----
function loadApiKey() {
  const key = localStorage.getItem('hypermid_api_key') || '';
  const input = document.getElementById('apiKeyInput');
  if (input) input.value = key;
  updateKeyIndicator();
}

function saveApiKey() {
  const input = document.getElementById('apiKeyInput');
  const key = input ? input.value.trim() : '';
  if (key) {
    localStorage.setItem('hypermid_api_key', key);
  } else {
    localStorage.removeItem('hypermid_api_key');
  }
  updateKeyIndicator();
}

function getApiKey() {
  return localStorage.getItem('hypermid_api_key') || '';
}

function updateKeyIndicator() {
  const indicator = document.getElementById('keyIndicator');
  if (!indicator) return;
  const hasKey = !!getApiKey();
  indicator.className = `api-key-indicator ${hasKey ? 'authenticated' : 'anonymous'}`;
  indicator.innerHTML = hasKey
    ? '<span>&#128273;</span> Authenticated'
    : '<span>&#128275;</span> Anonymous';
}

// ---- Sidebar Rendering ----
function renderSidebar() {
  const nav = document.getElementById('endpointNav');
  if (!nav) return;

  const categories = {};
  ENDPOINTS.forEach((ep) => {
    if (!categories[ep.category]) categories[ep.category] = [];
    categories[ep.category].push(ep);
  });

  let html = '';
  for (const [cat, eps] of Object.entries(categories)) {
    html += `<div class="sidebar-section">
      <div class="sidebar-section-title">${cat}${cat === 'Partner' || cat === 'Webhooks' ? ' <span style="color:var(--warning)">&#128273;</span>' : ''}</div>`;
    eps.forEach((ep) => {
      const shortPath = ep.path.replace('/v1/', '/');
      html += `<div class="endpoint-item" data-id="${ep.id}" onclick="selectEndpoint('${ep.id}')">
        <span class="method-badge ${ep.method.toLowerCase()}">${ep.method}</span>
        <span class="endpoint-path">${shortPath}</span>
      </div>`;
    });
    html += '</div>';
  }
  nav.innerHTML = html;
}

// ---- History ----
function loadHistory() {
  try {
    requestHistory = JSON.parse(localStorage.getItem('hypermid_history') || '[]');
  } catch {
    requestHistory = [];
  }
}

function saveHistory() {
  localStorage.setItem('hypermid_history', JSON.stringify(requestHistory.slice(0, 10)));
}

function addToHistory(entry) {
  requestHistory.unshift(entry);
  if (requestHistory.length > 10) requestHistory.pop();
  saveHistory();
  renderHistory();
}

function clearHistory() {
  requestHistory = [];
  saveHistory();
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('historyList');
  if (!container) return;

  if (requestHistory.length === 0) {
    container.innerHTML = '<div style="padding:12px 16px;color:var(--text-muted);font-size:0.78rem;">No requests yet</div>';
    return;
  }

  let html = '';
  requestHistory.forEach((entry, i) => {
    const statusClass = entry.status >= 500 ? 's5xx' : entry.status >= 400 ? 's4xx' : entry.status >= 200 ? 's2xx' : 'err';
    const shortPath = entry.path.replace('/v1/', '/');
    html += `<div class="history-item" onclick="replayHistory(${i})">
      <span class="history-status ${statusClass}">${entry.status || 'ERR'}</span>
      <span class="method-badge ${entry.method.toLowerCase()}" style="font-size:0.6rem;padding:0 4px;">${entry.method}</span>
      <span class="history-path">${shortPath}</span>
      <span class="history-time">${entry.duration}ms</span>
    </div>`;
  });
  html += `<button class="clear-history-btn" onclick="clearHistory()">Clear history</button>`;
  container.innerHTML = html;
}

function replayHistory(index) {
  const entry = requestHistory[index];
  if (!entry || !entry.endpointId) return;
  selectEndpoint(entry.endpointId);
  // Fill in params from history
  if (entry.params) {
    setTimeout(() => {
      for (const [key, val] of Object.entries(entry.params)) {
        const input = document.getElementById(`param-${key}`);
        if (input) {
          if (input.type === 'checkbox') {
            // multiselect handled differently
          } else {
            input.value = val;
          }
        }
      }
    }, 50);
  }
}

// ---- Endpoint Selection ----
function selectEndpoint(id) {
  currentEndpoint = ENDPOINTS.find((e) => e.id === id);
  if (!currentEndpoint) return;

  // Update sidebar active state
  document.querySelectorAll('.endpoint-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.id === id);
  });

  renderRequestBuilder();
  clearResponse();

  // Close mobile sidebar
  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.sidebar-overlay')?.classList.remove('show');
}

// ---- Request Builder ----
function renderRequestBuilder() {
  const ep = currentEndpoint;
  if (!ep) return;

  const builder = document.getElementById('requestBuilder');
  if (!builder) return;

  const fullUrl = API_BASE + ep.path;

  let paramsHtml = '';
  if (ep.params.length > 0) {
    paramsHtml = '<div class="card-body"><div class="form-grid">';
    ep.params.forEach((p) => {
      paramsHtml += `<div class="form-group">
        <label class="form-label" for="param-${p.name}">
          ${p.label}
          ${p.optional ? '<span class="optional">optional</span>' : '<span class="required">*</span>'}
        </label>`;

      if (p.type === 'select') {
        paramsHtml += `<select class="form-select" id="param-${p.name}">
          <option value="">-- Select --</option>
          ${p.options.map((o) => `<option value="${o}">${o}</option>`).join('')}
        </select>`;
      } else if (p.type === 'multiselect') {
        paramsHtml += `<div class="checkbox-group" id="param-${p.name}">
          ${p.options.map((o) => `<label class="checkbox-label"><input type="checkbox" value="${o}"> ${o}</label>`).join('')}
        </div>`;
      } else {
        paramsHtml += `<input class="form-input" type="${p.type === 'number' ? 'text' : 'text'}" id="param-${p.name}" placeholder="${p.placeholder || ''}">`;
      }

      paramsHtml += '</div>';
    });
    paramsHtml += '</div></div>';
  }

  const authWarning = ep.requiresAuth && !getApiKey()
    ? '<div style="padding:8px 16px;font-size:0.8rem;color:var(--warning);background:rgba(210,153,34,0.08);border-bottom:1px solid var(--border);">This endpoint requires an API key. Enter your key in the header above.</div>'
    : '';

  builder.innerHTML = `
    <div class="endpoint-header">
      <span class="method-badge ${ep.method.toLowerCase()}">${ep.method}</span>
      <span class="endpoint-url">${fullUrl}</span>
    </div>
    <div class="endpoint-description">${ep.description}</div>
    ${authWarning}
    ${paramsHtml}
    <div class="actions-bar">
      <button class="btn btn-primary" id="sendBtn" onclick="sendRequest()">
        <span class="icon">&#9654;</span> Send Request
      </button>
      ${ep.params.length > 0 || Object.keys(ep.example).length > 0
        ? '<button class="btn btn-secondary" onclick="loadExample()"><span class="icon">&#128196;</span> Load Example</button>'
        : ''}
      <button class="btn btn-ghost" onclick="generateCurl()" style="margin-left:auto;">
        <span class="icon">&#128203;</span> Show cURL
      </button>
    </div>`;
}

// ---- Load Example ----
function loadExample() {
  const ep = currentEndpoint;
  if (!ep) return;

  for (const [key, val] of Object.entries(ep.example)) {
    const el = document.getElementById(`param-${key}`);
    if (!el) continue;

    if (Array.isArray(val)) {
      // multiselect
      const checkboxes = el.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((cb) => {
        cb.checked = val.includes(cb.value);
      });
    } else if (el.tagName === 'SELECT') {
      el.value = val;
    } else {
      el.value = val;
    }
  }
  showToast('Example values loaded');
}

// ---- Collect Params ----
function collectParams() {
  const ep = currentEndpoint;
  if (!ep) return {};

  const params = {};
  ep.params.forEach((p) => {
    const el = document.getElementById(`param-${p.name}`);
    if (!el) return;

    if (p.type === 'multiselect') {
      const checked = [];
      el.querySelectorAll('input[type="checkbox"]:checked').forEach((cb) => {
        checked.push(cb.value);
      });
      if (checked.length > 0) params[p.name] = checked;
    } else {
      const val = el.value.trim();
      if (val) params[p.name] = val;
    }
  });
  return params;
}

// ---- Build URL ----
function buildUrl(ep, params) {
  let path = ep.path;

  // Replace path params like :id
  ep.params.forEach((p) => {
    if (p.isPathParam && params[p.name]) {
      path = path.replace(`:${p.name.replace('Id', '').replace('webhook', '')}`, params[p.name]);
      path = path.replace(':id', params[p.name]);
    }
  });

  if (ep.method === 'GET' || ep.method === 'DELETE') {
    const queryParams = { ...params };
    // Remove path params from query
    ep.params.forEach((p) => {
      if (p.isPathParam) delete queryParams[p.name];
    });

    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(queryParams)) {
      if (Array.isArray(v)) {
        v.forEach((item) => qs.append(k, item));
      } else {
        qs.append(k, v);
      }
    }
    const qsStr = qs.toString();
    return API_BASE + path + (qsStr ? '?' + qsStr : '');
  }

  return API_BASE + path;
}

// ---- Build Body (for POST/PUT) ----
function buildBody(ep, params) {
  if (ep.method === 'GET' || ep.method === 'DELETE') return null;

  const body = {};
  for (const [k, v] of Object.entries(params)) {
    const paramDef = ep.params.find((p) => p.name === k);
    if (paramDef && paramDef.isPathParam) continue;
    body[k] = v;
  }
  return Object.keys(body).length > 0 ? JSON.stringify(body, null, 2) : null;
}

// ---- Send Request ----
async function sendRequest() {
  const ep = currentEndpoint;
  if (!ep || isLoading) return;

  const params = collectParams();
  const url = buildUrl(ep, params);
  const body = buildBody(ep, params);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const apiKey = getApiKey();
  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const sendBtn = document.getElementById('sendBtn');
  isLoading = true;
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span class="spinner"></span> Sending...';
  }

  const startTime = performance.now();
  let status = 0;
  let responseData = null;
  let responseHeaders = {};
  let duration = 0;

  try {
    const fetchOpts = {
      method: ep.method,
      headers,
    };
    if (body && (ep.method === 'POST' || ep.method === 'PUT')) {
      fetchOpts.body = body;
    }

    const response = await fetch(url, fetchOpts);
    duration = Math.round(performance.now() - startTime);
    status = response.status;

    // Collect headers
    response.headers.forEach((val, key) => {
      responseHeaders[key] = val;
    });

    const text = await response.text();
    try {
      responseData = JSON.parse(text);
    } catch {
      responseData = text;
    }
  } catch (err) {
    duration = Math.round(performance.now() - startTime);
    responseData = { error: 'Network error', message: err.message };
    status = 0;
  }

  isLoading = false;
  if (sendBtn) {
    sendBtn.disabled = false;
    sendBtn.innerHTML = '<span class="icon">&#9654;</span> Send Request';
  }

  renderResponse(status, responseData, duration, responseHeaders);

  // Add to history
  addToHistory({
    endpointId: ep.id,
    method: ep.method,
    path: ep.path,
    params,
    status,
    duration,
    timestamp: Date.now(),
  });
}

// ---- Render Response ----
function renderResponse(status, data, duration, headers) {
  const container = document.getElementById('responsePanel');
  if (!container) return;

  const statusClass = status === 0 ? 'err' : status >= 500 ? 's5xx' : status >= 400 ? 's4xx' : 's2xx';
  const statusText = status === 0 ? 'Network Error' : status;

  const rateLimit = headers['x-ratelimit-remaining'] || headers['ratelimit-remaining'];
  const rateLimitHtml = rateLimit ? `<span class="rate-limit-info">Rate limit remaining: ${rateLimit}</span>` : '';

  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  const highlighted = highlightJson(jsonStr);

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div class="response-meta">
          <span class="status-badge ${statusClass}">${statusText}</span>
          <span class="response-time">${duration}ms</span>
          ${rateLimitHtml}
        </div>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-ghost" onclick="copyResponse()" title="Copy response">&#128203; Copy</button>
          <button class="btn btn-ghost" onclick="generateCurl()" title="Copy as cURL">cURL</button>
        </div>
      </div>
      <div class="card-body">
        <div class="json-viewer">
          <pre id="responseJson">${highlighted}</pre>
        </div>
      </div>
    </div>`;

  // Store raw JSON for copy
  container.dataset.rawJson = jsonStr;
}

function clearResponse() {
  const container = document.getElementById('responsePanel');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <div class="card-body">
        <div class="empty-state">
          <div class="empty-state-icon">&#9889;</div>
          <div class="empty-state-title">Ready to send</div>
          <div class="empty-state-text">Fill in the parameters and click "Send Request" to see the response here.</div>
        </div>
      </div>
    </div>`;
}

// ---- JSON Syntax Highlighting ----
function highlightJson(json) {
  if (!json) return '';
  return json
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(
      /("(\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    )
    .replace(/([{}\[\]])/g, '<span class="json-bracket">$1</span>');
}

// ---- Copy Response ----
function copyResponse() {
  const container = document.getElementById('responsePanel');
  const raw = container?.dataset.rawJson;
  if (!raw) return;
  navigator.clipboard.writeText(raw).then(() => showToast('Response copied to clipboard'));
}

// ---- cURL Generator ----
function generateCurl() {
  const ep = currentEndpoint;
  if (!ep) return;

  const params = collectParams();
  const url = buildUrl(ep, params);
  const body = buildBody(ep, params);

  let curl = `curl -X ${ep.method} '${url}'`;
  curl += ` \\\n  -H 'Content-Type: application/json'`;
  curl += ` \\\n  -H 'Accept: application/json'`;

  const apiKey = getApiKey();
  if (apiKey) {
    curl += ` \\\n  -H 'x-api-key: ${apiKey}'`;
  }

  if (body) {
    curl += ` \\\n  -d '${body}'`;
  }

  // Show in a modal/panel below the request builder
  const curlPanel = document.getElementById('curlPanel');
  if (curlPanel) {
    curlPanel.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span class="card-title">cURL Command</span>
          <button class="btn btn-ghost" onclick="copyCurl()">&#128203; Copy</button>
        </div>
        <div class="card-body">
          <div class="curl-viewer" id="curlContent">${escapeHtml(curl)}</div>
        </div>
      </div>`;
    curlPanel.dataset.rawCurl = curl;
  }
}

function copyCurl() {
  const panel = document.getElementById('curlPanel');
  const raw = panel?.dataset.rawCurl;
  if (!raw) return;
  navigator.clipboard.writeText(raw).then(() => showToast('cURL command copied to clipboard'));
}

// ---- Utilities ----
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ---- Event Listeners ----
function setupEventListeners() {
  // API key input
  const apiKeyInput = document.getElementById('apiKeyInput');
  if (apiKeyInput) {
    apiKeyInput.addEventListener('input', saveApiKey);
    apiKeyInput.addEventListener('change', saveApiKey);
  }

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('show');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay.classList.remove('show');
    });
  }

  // Keyboard shortcut: Ctrl+Enter to send
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      sendRequest();
    }
  });
}

// Make functions available globally for onclick handlers
window.selectEndpoint = selectEndpoint;
window.loadExample = loadExample;
window.sendRequest = sendRequest;
window.copyResponse = copyResponse;
window.generateCurl = generateCurl;
window.copyCurl = copyCurl;
window.clearHistory = clearHistory;
window.replayHistory = replayHistory;
