/**
 * Kissflow webhook integration: queue submissions and send to webhook asynchronously.
 * One item at a time, 3–4 second delay between requests. Does not block API response.
 */

const https = require('https');
const { URL } = require('url');

const KISSFLOW_WEBHOOK_URL =
  'https://refexgroup.kissflow.com/integration/2/AcCMptp3yqcn/webhook/4e9yNyjAD6uxENJXAhNbtXzEGuOVQbDukBaeyWoG0kkqoeCkhIaxbK8FF4sWPWtcuQema2TcT-gLfVu3ot6g';

const queue = [];
let workerRunning = false;
const DELAY_MS_MIN = 3000;
const DELAY_MS_MAX = 4000;

function randomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function slugFromWebsiteName(websiteName) {
  if (!websiteName || typeof websiteName !== 'string') return 'website';
  return websiteName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9-]/g, '');
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processOne(websiteName, formName, formData) {
  const websiteSlug = slugFromWebsiteName(websiteName);
  const submissionId = `${websiteSlug}-${Date.now()}-${randomString(8)}`;
  const websiteAndForm = `${websiteName} - ${formName}`;
  const payload = {
    ...formData,
    submissionId,
    websiteName,
    formName,
    'Website and form': websiteAndForm,
    Website_and_form: websiteAndForm
  };

  try {
    const body = JSON.stringify(payload);
    const url = new URL(KISSFLOW_WEBHOOK_URL);
    const res = await new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: url.hostname,
          port: url.port || 443,
          path: url.pathname + url.search,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(body, 'utf8')
          }
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => resolve({ status: res.statusCode, data }));
        }
      );
      req.on('error', reject);
      req.write(body);
      req.end();
    });
    if (res.status < 200 || res.status >= 300) {
      console.warn('[Kissflow] Webhook responded with status:', res.status, res.data);
    }
  } catch (err) {
    console.warn('[Kissflow] Webhook request failed (non-fatal):', err.message);
  }
}

async function worker() {
  if (workerRunning || queue.length === 0) return;
  workerRunning = true;
  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) continue;
    await processOne(item.websiteName, item.formName, item.formData);
    const delayMs = DELAY_MS_MIN + Math.random() * (DELAY_MS_MAX - DELAY_MS_MIN);
    await delay(delayMs);
  }
  workerRunning = false;
}

/**
 * Queue a submission for the Kissflow webhook. Does not block.
 * @param {string} websiteName - e.g. "adonis"
 * @param {string} formName - e.g. "Contact form"
 * @param {Record<string, any>} formData - Payload fields (name, email, phone, etc.)
 */
function sendToKissflowWebhook(websiteName, formName, formData) {
  queue.push({
    websiteName: websiteName || 'adonis',
    formName: formName || 'Contact form',
    formData: formData || {}
  });
  worker().catch((err) => {
    console.warn('[Kissflow] Worker error (non-fatal):', err.message);
  });
}

module.exports = {
  sendToKissflowWebhook
};
