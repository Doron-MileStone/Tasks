/* המשימות שלי – אפליקציית PWA (צד לקוח) */
'use strict';

/* ================================================================== */
/* קבועים ועזרים                                                       */
/* ================================================================== */

const DEFAULT_CATS = [
  { id: 'work',     name: 'עבודה',         color: '#2563EB', tint: '#E3ECFF', ink: '#1E40AF', icon: 'briefcase', order: 1 },
  { id: 'money',    name: 'כספים',         color: '#059669', tint: '#DCF5EB', ink: '#065F46', icon: 'wallet',    order: 2 },
  { id: 'home',     name: 'בית',           color: '#EA580C', tint: '#FFEAD9', ink: '#9A3412', icon: 'home',      order: 3 },
  { id: 'family',   name: 'משפחה',         color: '#DB2777', tint: '#FCE4F0', ink: '#9D174D', icon: 'heart',     order: 4 },
  { id: 'health',   name: 'בריאות וספורט', color: '#0891B2', tint: '#DAF2F8', ink: '#155E75', icon: 'pulse',     order: 5 },
  { id: 'personal', name: 'אישי',          color: '#7C3AED', tint: '#EEE6FF', ink: '#5B21B6', icon: 'star',      order: 6 }
];
const EXTRA_COLORS = ['#2563EB', '#059669', '#EA580C', '#DB2777', '#0891B2', '#7C3AED',
  '#0D9488', '#D97706', '#4F46E5', '#DC2626', '#65A30D', '#475569'];
const DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const MONTHS = ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'];
const MONTHS_FULL = ['בינואר', 'בפברואר', 'במרץ', 'באפריל', 'במאי', 'ביוני', 'ביולי', 'באוגוסט', 'בספטמבר', 'באוקטובר', 'בנובמבר', 'בדצמבר'];
const AI_SUGGESTIONS = ['מה נשאר לי היום?', 'תעביר את משימות הבית לשבת', 'מה מתוכנן לי השבוע?'];

const ICONS = {
  check: '<path d="M5 12l5 5 9-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  back: '<path d="M9 6l6 6-6 6"/>',
  send: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  sync: '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  spark: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
  today: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  tag: '<path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  clip: '<path d="M21.4 11.1l-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
  external: '<path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>'
};

function icon(name, size = 20, stroke = 2, color = 'currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.tag}</svg>`;
}

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const clone = (o) => JSON.parse(JSON.stringify(o));
const uid = () => (crypto.randomUUID ? crypto.randomUUID() :
  'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
const pad = (n) => (n < 10 ? '0' : '') + n;
const ymd = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const todayStr = () => ymd(new Date());
function parseYmd(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function addDays(s, n) { const d = parseYmd(s); d.setDate(d.getDate() + n); return ymd(d); }
function dayDiff(s) { return Math.round((parseYmd(s) - parseYmd(todayStr())) / 86400000); }

function dateLabel(s) {
  if (!s) return '';
  const diff = dayDiff(s);
  if (diff === 0) return 'היום';
  if (diff === 1) return 'מחר';
  if (diff === -1) return 'אתמול';
  const d = parseYmd(s);
  if (diff > 1 && diff < 7) return 'יום ' + DAYS[d.getDay()];
  if (diff < -1 && diff > -7) return 'לפני ' + (-diff) + ' ימים';
  return d.getDate() + ' ' + MONTHS[d.getMonth()];
}
const DAY_SHORT = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
const weekdayOf = (s) => parseYmd(s).getDay();
const isRepeating = (t) => !!(t && t.repeat && t.repeat.type);

/** התאריך הבא של משימה חוזרת – אחרי max(התאריך שלה, היום). זהה ללוגיקה בשרת. */
function nextOcc(rep, date, today) {
  const base = date && date > today ? date : today;
  if (rep.type === 'interval') return addDays(base, Math.max(1, rep.n || 1));
  if (rep.type === 'weekly') {
    for (let k = 1; k <= 7; k++) { const c = addDays(base, k); if (rep.days.includes(weekdayOf(c))) return c; }
    return addDays(base, 7);
  }
  if (rep.type === 'monthly') {
    const b = parseYmd(base);
    for (let i = 0; i < 3; i++) {
      const y = b.getFullYear() + Math.floor((b.getMonth() + i) / 12), m = (b.getMonth() + i) % 12;
      const last = new Date(y, m + 1, 0).getDate();
      const c = ymd(new Date(y, m, Math.min(rep.dom, last)));
      if (c > base) return c;
    }
  }
  return addDays(base, 1);
}
/** המופע הראשון (כולל היום) – כשמגדירים חזרה למשימה חדשה. */
function occursOn(rep, day) {
  if (rep.type === 'interval') return true;
  if (rep.type === 'weekly') return rep.days.includes(weekdayOf(day));
  if (rep.type === 'monthly') {
    const d = parseYmd(day); const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    return d.getDate() === Math.min(rep.dom, last);
  }
  return true;
}
function firstOcc(rep, from) {
  return occursOn(rep, from) ? from : nextOcc(rep, from, from);
}
function repeatLabel(rep) {
  if (!rep || !rep.type) return '';
  if (rep.type === 'weekly') return rep.days.length === 7 ? 'כל יום' : 'כל ' + rep.days.map((d) => DAY_SHORT[d]).join(', ');
  if (rep.type === 'monthly') return 'כל חודש ב-' + rep.dom;
  return rep.n === 1 ? 'כל יום' : 'כל ' + rep.n + ' ימים';
}
/** מה קורה כשמסמנים משימה: חוזרת – עוברת לתאריך הבא; רגילה – מסומנת כהושלמה. */
function completeLocal(t) {
  const next = clone(t);
  if (isRepeating(t)) {
    next.lastDone = { at: new Date().toISOString(), from: t.date || todayStr() };
    next.date = nextOcc(t.repeat, t.date, todayStr());
    next.remindAt = '';
    next.done = false; next.doneAt = '';
    return { next, rolled: true };
  }
  next.done = true; next.doneAt = new Date().toISOString();
  return { next, rolled: false };
}

function longDate(s) {
  const d = parseYmd(s);
  return 'יום ' + DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS_FULL[d.getMonth()];
}

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage full or blocked */ }
}

function mix(hex, target, amount) {
  const h = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16));
  const t = target === 'white' ? [255, 255, 255] : [0, 0, 0];
  return '#' + c.map((v, i) => Math.round(v + (t[i] - v) * amount).toString(16).padStart(2, '0')).join('');
}

/* ================================================================== */
/* מצב                                                                 */
/* ================================================================== */

const S = {
  cfg: load('tm.cfg', { apiUrl: '', token: '' }),
  data: load('tm.data', { tasks: [], categories: DEFAULT_CATS, aiEnabled: false, lastSync: null, sheetUrl: '' }),
  outbox: load('tm.outbox', []),
  chat: load('tm.chat', []),
  ui: {
    view: 'today', filter: 'all', sheet: null, aiBusy: false, syncing: false, syncError: '',
    dismissedSuggest: load('tm.dismissed', ''), recording: false
  }
};
if (!S.data.categories || !S.data.categories.length) S.data.categories = DEFAULT_CATS;

const persistData = () => save('tm.data', S.data);
const persistOutbox = () => save('tm.outbox', S.outbox.map((o) => Object.assign({}, o, { inflight: false })));
const persistChat = () => save('tm.chat', S.chat.slice(-40));
const configured = () => !!(S.cfg.apiUrl && S.cfg.token);

function cat(id) {
  return S.data.categories.find((c) => c.id === id) ||
    { id, name: 'ללא קטגוריה', color: '#6B7280', tint: '#F3F4F6', ink: '#374151', icon: 'tag' };
}
const findTask = (id) => S.data.tasks.find((t) => t.id === id);

/* ================================================================== */
/* שרת וסנכרון                                                         */
/* ================================================================== */

async function api(action, payload = {}) {
  if (!configured()) { const e = new Error('not_configured'); e.server = false; throw e; }
  let res;
  try {
    res = await fetch(S.cfg.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ token: S.cfg.token, action }, payload)),
      redirect: 'follow'
    });
  } catch (err) {
    const e = new Error('network'); e.server = false; throw e;
  }
  let data;
  try { data = await res.json(); } catch (err) {
    const e = new Error('bad_response'); e.server = true; throw e;
  }
  if (!data.ok) { const e = new Error(data.error || 'server_error'); e.server = true; throw e; }
  return data;
}

function enqueue(item) {
  if (item.action === 'upsertTask' || item.action === 'deleteTask') {
    const id = item.action === 'upsertTask' ? item.task.id : item.id;
    S.outbox = S.outbox.filter((o) => o.inflight || !(o.action === 'upsertTask' && o.task.id === id));
  }
  S.outbox.push(item);
  persistOutbox();
  flush();
}

let flushing = null;
function flush() {
  if (flushing) return flushing;
  if (!configured() || !navigator.onLine || !S.outbox.length) return Promise.resolve();
  flushing = (async () => {
    renderStatus();
    while (S.outbox.length) {
      const item = S.outbox[0];
      item.inflight = true;
      try {
        const res = await api(item.action, item);
        S.outbox.shift();
        persistOutbox();
        if (item.action === 'upsertTask' && res.task) {
          const stillPending = S.outbox.some((o) => o.action === 'upsertTask' && o.task.id === res.task.id);
          const i = S.data.tasks.findIndex((t) => t.id === res.task.id);
          if (!stillPending && i >= 0) { S.data.tasks[i] = res.task; persistData(); }
        }
        S.ui.syncError = '';
      } catch (err) {
        item.inflight = false;
        if (err.server) {
          S.outbox.shift();
          persistOutbox();
          S.ui.syncError = err.message;
          if (err.message === 'unauthorized') { toast('הטוקן לא תקין – בדוק בהגדרות'); break; }
          toast('שגיאה בשמירה בשרת: ' + err.message);
        } else {
          break;
        }
      }
    }
  })().finally(() => { flushing = null; renderStatus(); });
  return flushing;
}

async function sync(manual) {
  if (!configured()) { if (manual) toast('צריך קודם לחבר את השרת בהגדרות'); return; }
  if (S.ui.syncing) return;
  S.ui.syncing = true;
  renderStatus();
  try {
    await flush();
    if (!S.outbox.length) {
      const res = await api('bootstrap', { apiUrl: S.cfg.apiUrl, appUrl: location.origin + location.pathname });
      S.data.tasks = res.tasks || [];
      S.data.categories = (res.categories && res.categories.length) ? res.categories : DEFAULT_CATS;
      S.data.aiEnabled = !!res.aiEnabled;
      S.data.aiProvider = res.aiProvider || '';
      S.data.sheetUrl = res.sheetUrl || '';
      S.data.ntfyTopic = res.ntfyTopic || '';
      S.data.ntfyServer = res.ntfyServer || 'https://ntfy.sh';
      S.data.remindersActive = !!res.remindersActive;
      S.data.notifyChannel = res.notifyChannel || '';
      S.data.telegramBot = res.telegramBot || '';
      S.data.telegramConnected = !!res.telegramConnected;
      S.data.lastSync = new Date().toISOString();
      S.ui.syncError = '';
      persistData();
      if (manual) toast('מסונכרן');
    }
  } catch (err) {
    S.ui.syncError = err.message;
    if (manual) toast(err.message === 'network' ? 'אין חיבור לשרת' :
      err.message === 'unauthorized' ? 'הטוקן לא תקין' : 'שגיאה: ' + err.message);
  } finally {
    S.ui.syncing = false;
    render();
  }
}

/* ================================================================== */
/* פעולות על משימות                                                    */
/* ================================================================== */

function saveTask(task) {
  task.updatedAt = new Date().toISOString();
  if (!task.createdAt) task.createdAt = task.updatedAt;
  if (!task.date) task.calendar = false;
  const i = S.data.tasks.findIndex((t) => t.id === task.id);
  if (i >= 0) S.data.tasks[i] = task; else S.data.tasks.push(task);
  persistData();
  enqueue({ action: 'upsertTask', task: clone(task) });
}

function removeTask(id) {
  S.data.tasks = S.data.tasks.filter((t) => t.id !== id);
  persistData();
  enqueue({ action: 'deleteTask', id });
}

function toggleTask(id) {
  const t = findTask(id);
  if (!t) return;
  const prev = clone(t);
  if (t.done) {
    const n = clone(t); n.done = false; n.doneAt = ''; saveTask(n); render(); return;
  }
  const { next, rolled } = completeLocal(t);
  saveTask(next);
  render();
  toast(rolled ? 'בוצע · הבא: ' + dateLabel(next.date) : 'סומן כהושלם', 'ביטול', () => { saveTask(clone(prev)); render(); });
}

/** ביטול סימון "בוצע" מתוך רשימת המשימות שהושלמו. */
function undoComplete(id) {
  const t = findTask(id);
  if (!t) return;
  const n = clone(t);
  if (t.done) { n.done = false; n.doneAt = ''; }
  else if (t.lastDone) { if (t.lastDone.from) n.date = t.lastDone.from; n.lastDone = ''; }
  else return;
  saveTask(n);
  render();
  toast('הוחזר לרשימה');
}

function recentlyDone(list) {
  const since = Date.now() - 7 * 86400000;
  const today = todayStr();
  const at = (t) => t.done ? t.doneAt : (t.lastDone && t.lastDone.at);
  return list.filter((t) => {
    if (t.done) return !(t.date === today) && t.doneAt && Date.parse(t.doneAt) >= since;
    return isRepeating(t) && t.lastDone && t.lastDone.at && Date.parse(t.lastDone.at) >= since;
  }).sort((a, b) => (at(b) || '').localeCompare(at(a) || ''));
}

function doneAgo(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const day = dateLabel(ymd(d));
  return (day === 'היום' || day === 'אתמול' ? day : day) + ', ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function doneRow(t) {
  const c = cat(t.category);
  const rolled = !t.done && t.lastDone;
  const when = doneAgo(t.done ? t.doneAt : t.lastDone.at);
  return `<div class="task done" data-open="${esc(t.id)}">
    <button class="check" data-undone="${esc(t.id)}" style="--c:${c.color}" aria-label="החזרה לרשימה: ${esc(t.title)}"><i>${icon('check', 14, 3, '#fff')}</i></button>
    <div class="task-body">
      <span class="task-title">${esc(t.title)}</span>
      <div class="meta">
        <span class="cat-chip" style="background:${c.tint};color:${c.ink}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</span>
        <span class="meta-item">${icon('check', 13)}בוצע ${esc(when)}</span>
        ${rolled ? `<span class="meta-item">${icon('repeat', 13)}הבא: ${esc(dateLabel(t.date))}</span>` : ''}
      </div>
    </div>
  </div>`;
}

/* ---------------- קישורים ותמונות ---------------- */

const hostOf = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return u; } };
const imgUrls = {};

async function imageCache() { return 'caches' in window ? caches.open('tm-images') : null; }

async function getImageUrl(id) {
  if (imgUrls[id]) return imgUrls[id];
  const cache = await imageCache().catch(() => null);
  let blob = null;
  if (cache) { const hit = await cache.match('img/' + id); if (hit) blob = await hit.blob(); }
  if (!blob) {
    const res = await api('getImage', { id });
    const bin = atob(res.data); const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    blob = new Blob([arr], { type: res.mime || 'image/jpeg' });
    if (cache) cache.put('img/' + id, new Response(blob)).catch(() => {});
  }
  imgUrls[id] = URL.createObjectURL(blob);
  return imgUrls[id];
}

function hydrateImages() {
  document.querySelectorAll('img[data-img]:not([data-loaded])').forEach((img) => {
    img.setAttribute('data-loaded', '1');
    getImageUrl(img.dataset.img).then((u) => { img.src = u; })
      .catch(() => { img.closest('.att-img, .lightbox') && img.closest('.att-img, .lightbox').classList.add('broken'); });
  });
}

/** מקטין תמונה בטלפון לפני העלאה (עד 1600px, JPEG). */
async function resizeImage(file) {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = url; });
    const scale = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * scale); c.height = Math.round(img.naturalHeight * scale);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    const blob = await new Promise((ok) => c.toBlob(ok, 'image/jpeg', 0.82));
    const dataUrl = await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result); r.readAsDataURL(blob); });
    return { blob, dataUrl };
  } finally { URL.revokeObjectURL(url); }
}

async function uploadFiles(files) {
  const sh = S.ui.sheet;
  if (!sh || sh.type !== 'task' || !files || !files.length) return;
  if (!configured()) { toast('כדי לשמור תמונות צריך חיבור לשרת'); return; }
  if (!navigator.onLine) { toast('אין רשת – אפשר להוסיף תמונות כשתחזור'); return; }
  const d = sh.draft;
  d.attachments = d.attachments || [];
  sh.uploaded = sh.uploaded || [];
  for (const f of Array.from(files)) {
    if (!/^image\//.test(f.type)) { toast('אפשר לצרף רק תמונות'); continue; }
    captureDraft(); sh.uploading = (sh.uploading || 0) + 1; renderSheet();
    try {
      const { blob, dataUrl } = await resizeImage(f);
      const res = await api('uploadImage', { dataUrl, name: f.name || 'image' });
      const cache = await imageCache().catch(() => null);
      if (cache) await cache.put('img/' + res.id, new Response(blob)).catch(() => {});
      sh.uploaded.push(res.id);
      if (S.ui.sheet === sh) { captureDraft(); d.attachments.push({ type: 'image', id: res.id, name: res.name }); }
      else api('deleteImage', { id: res.id }).catch(() => {});
    } catch (err) {
      toast(err.message === 'network' ? 'ההעלאה נכשלה – אין חיבור' : 'ההעלאה נכשלה: ' + err.message);
    } finally {
      sh.uploading--;
      if (S.ui.sheet === sh) { captureDraft(); renderSheet(); }
    }
  }
}

function attachmentsSection(sh) {
  const d = sh.draft;
  const list = d.attachments || [];
  const links = list.map((a, i) => a.type !== 'link' ? '' : `<div class="att-link">
      <span class="att-ico">${icon('link', 16)}</span>
      <a href="${esc(a.url)}" target="_blank" rel="noopener" dir="ltr">${esc(a.title || hostOf(a.url))}</a>
      <button type="button" class="att-x" data-att-remove="${i}" aria-label="הסרת הקישור">${icon('close', 14, 2.2)}</button></div>`).join('');
  const imgs = list.map((a, i) => a.type !== 'image' ? '' : `<div class="att-img">
      <button type="button" class="att-view" data-att-view="${esc(a.id)}" aria-label="הצגת התמונה"><img data-img="${esc(a.id)}" alt=""></button>
      <button type="button" class="att-x" data-att-remove="${i}" aria-label="הסרת התמונה">${icon('close', 14, 2.2)}</button></div>`).join('');
  const loading = Array.from({ length: sh.uploading || 0 }).map(() => '<div class="att-img loading"><span>מעלה…</span></div>').join('');
  return `<div class="field"><span class="label">${icon('clip', 14)} קישורים ותמונות</span>
    ${links ? `<div class="att-links">${links}</div>` : ''}
    ${imgs || loading ? `<div class="att-grid">${imgs}${loading}</div>` : ''}
    <div class="att-add">
      <input class="input" id="f-link" type="url" inputmode="url" dir="ltr" placeholder="https://…" value="${esc(sh.linkInput || '')}" aria-label="קישור">
      <button type="button" class="btn outline" data-action="add-link">${icon('link', 16)}הוספה</button>
    </div>
    <label class="btn outline att-photo" for="f-image">${icon('image', 16)}הוספת תמונה</label>
    <input id="f-image" type="file" accept="image/*" multiple class="sr-only">
  </div>`;
}

function newTaskDraft(extra) {
  return Object.assign({
    id: uid(), title: '', category: S.ui.filter !== 'all' ? S.ui.filter : (S.data.categories[0] || DEFAULT_CATS[0]).id,
    date: S.ui.view === 'today' ? todayStr() : '', time: '', priority: 'mid', done: false, doneAt: '',
    calendar: false, reminder: 15, eventId: '', notes: '', repeat: '', remind: 'none', remindAt: '', attachments: [], _new: true
  }, extra || {});
}

/* ================================================================== */
/* ניתוב ורינדור                                                       */
/* ================================================================== */

const VIEWS = ['today', 'calendar', 'ai', 'categories', 'settings'];
function route() {
  const v = (location.hash || '#today').slice(1);
  S.ui.view = VIEWS.includes(v) ? v : 'today';
  render();
  window.scrollTo(0, S.ui.view === 'ai' ? document.body.scrollHeight : 0);
}
function go(view) { if (location.hash !== '#' + view) location.hash = view; else route(); }

function render() {
  const v = S.ui.view;
  const html = v === 'today' ? viewToday() : v === 'calendar' ? viewCalendar() : v === 'ai' ? viewAI() :
    v === 'categories' ? viewCategories() : viewSettings();
  document.getElementById('view').innerHTML = html;
  renderNav();
  document.getElementById('fab-slot').innerHTML = ['today', 'calendar', 'categories'].includes(v)
    ? `<button class="fab" data-action="new-task" aria-label="משימה חדשה">${icon('plus', 26, 2.2)}</button>` : '';
  document.getElementById('composer-slot').innerHTML = v === 'ai' ? composerHtml() : '';
  renderSheet();
}

function renderNav() {
  const items = [['today', 'היום', 'today'], ['calendar', 'יומן', 'cal'], ['ai', 'עוזר', 'spark'],
    ['categories', 'קטגוריות', 'grid'], ['settings', 'הגדרות', 'gear']];
  document.getElementById('nav').innerHTML = items.map(([v, label, ic]) =>
    `<a href="#${v}" class="${S.ui.view === v ? 'on' : ''}" ${S.ui.view === v ? 'aria-current="page"' : ''}>${icon(ic, 22)}${label}</a>`).join('');
}

function statusHtml() {
  let cls = 'ok', text = '';
  if (!configured()) { cls = 'warn'; text = 'לא מחובר לשרת – המשימות נשמרות רק בטלפון'; }
  else if (!navigator.onLine) { cls = 'warn'; text = 'אין רשת – השינויים יישמרו כשתחזור'; }
  else if (S.ui.syncError === 'unauthorized') { cls = 'warn'; text = 'הטוקן לא תקין – בדוק בהגדרות'; }
  else if (S.outbox.length) { cls = 'warn'; text = 'שומר ' + S.outbox.length + ' שינויים…'; }
  else if (S.ui.syncError) { cls = 'warn'; text = 'הסנכרון האחרון נכשל'; }
  else return '';
  return `<div class="status-line"><span class="status-dot ${cls}"></span>${esc(text)}</div>`;
}
function renderStatus() {
  const el = document.getElementById('status-slot');
  if (el) el.innerHTML = statusHtml();
  const btn = document.getElementById('sync-btn');
  if (btn) btn.classList.toggle('spin', S.ui.syncing || !!flushing);
}

/* ---------------- היום ---------------- */

function taskRow(t, mode) {
  const c = cat(t.category);
  const today = todayStr();
  const late = !t.done && t.date && t.date < today;
  let when = '';
  if (mode === 'today') when = t.time;
  else if (mode === 'day') when = t.time;
  else when = [dateLabel(t.date), t.time].filter(Boolean).join(' · ');
  return `<div class="task ${t.done ? 'done' : ''}" data-open="${esc(t.id)}">
    <button class="check" data-toggle="${esc(t.id)}" style="--c:${c.color}" aria-label="${t.done ? 'בטל סימון' : 'סמן כהושלם'}: ${esc(t.title)}"><i>${t.done ? icon('check', 14, 3, '#fff') : ''}</i></button>
    <div class="task-body">
      <span class="task-title">${esc(t.title)}</span>
      <div class="meta">
        <span class="cat-chip" style="background:${c.tint};color:${c.ink}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</span>
        ${when ? `<span class="meta-item ${late ? 'late' : ''}">${icon('clock', 13)}${esc(when)}</span>` : ''}
        ${t.calendar && t.date ? `<span class="meta-item">${icon('cal', 13)}ביומן</span>` : ''}
        ${isRepeating(t) ? `<span class="meta-item">${icon('repeat', 13)}${esc(repeatLabel(t.repeat))}</span>` : ''}
        ${t.remind && t.remind !== 'none' && !t.done ? `<span class="meta-item">${icon('bell', 13)}${t.remindAt && t.remindAt.d === today ? esc(t.remindAt.t) : ''}${t.remind === 'nag' ? ' נודניק' : ''}</span>` : ''}
        ${t.attachments && t.attachments.length ? `<span class="meta-item">${icon('clip', 13)}${t.attachments.length}</span>` : ''}
        ${t.priority === 'high' && !t.done ? '<span class="badge-high">חשוב</span>' : ''}
      </div>
    </div>
  </div>`;
}

function sortTasks(list) {
  const pr = { high: 0, mid: 1, low: 2 };
  return list.slice().sort((a, b) =>
    (a.done - b.done) || (a.date || '9999').localeCompare(b.date || '9999') ||
    (a.time || '99').localeCompare(b.time || '99') || (pr[a.priority] - pr[b.priority]) ||
    (a.createdAt || '').localeCompare(b.createdAt || ''));
}

function section(title, list, mode, danger) {
  if (!list.length) return '';
  return `<section class="section">
    <div class="section-head ${danger ? 'danger' : ''}"><h2>${title}</h2><span class="n">${list.length}</span></div>
    ${sortTasks(list).map((t) => taskRow(t, mode)).join('')}
  </section>`;
}

function viewToday() {
  const today = todayStr();
  const all = S.data.tasks;
  const f = S.ui.filter;
  const shown = f === 'all' ? all : all.filter((t) => t.category === f);

  const overdue = shown.filter((t) => !t.done && t.date && t.date < today);
  const todays = shown.filter((t) => t.date === today);
  const later = shown.filter((t) => !t.done && t.date && t.date > today);
  const nodate = shown.filter((t) => !t.done && !t.date);

  const todayAll = all.filter((t) => t.date === today);
  const doneToday = todayAll.filter((t) => t.done).length;
  const pct = todayAll.length ? Math.round(doneToday / todayAll.length * 100) : 0;

  const openCount = (id) => all.filter((t) => !t.done && (id === 'all' || t.category === id)).length;
  const chips = [{ id: 'all', name: 'הכול', color: '#9CA3AF' }].concat(S.data.categories).map((c) =>
    `<button class="chip ${f === c.id ? 'on' : ''}" data-filter="${esc(c.id)}" aria-pressed="${f === c.id}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}<span class="n">${openCount(c.id)}</span></button>`).join('');

  const allOverdue = all.filter((t) => !t.done && t.date && t.date < today);
  let suggest = '';
  if (allOverdue.length && S.ui.dismissedSuggest !== today) {
    const text = allOverdue.length === 1
      ? `"${esc(allOverdue[0].title)}" באיחור (${esc(dateLabel(allOverdue[0].date))}). להעביר למחר?`
      : `יש ${allOverdue.length} משימות באיחור. להעביר את כולן למחר?`;
    suggest = `<div class="card">
      <div class="suggest-row"><span class="mini-mark">${icon('spark', 15)}</span><p>${text}</p></div>
      <div class="btn-row"><button class="btn ghost" data-action="dismiss-suggest">לא עכשיו</button><button class="btn" data-action="apply-suggest">העבר למחר</button></div>
    </div>`;
  }

  const setup = !configured() ? `<div class="card">
      <div class="suggest-row"><span class="mini-mark">${icon('gear', 15)}</span><p>כדי לסנכרן עם Google Sheets ו-Google Calendar צריך לחבר את השרת. בינתיים המשימות נשמרות בטלפון.</p></div>
      <div class="btn-row"><a class="btn" href="#settings">לחיבור</a></div></div>` : '';

  const doneList = recentlyDone(shown);
  const doneBlock = doneList.length ? `<section class="section">
      <button class="done-toggle" data-action="toggle-done" aria-expanded="${!!S.ui.showDone}">
        ${icon('check', 16)}<span>הושלמו ב-7 הימים האחרונים</span><span class="n">${doneList.length}</span>
        <span class="chev ${S.ui.showDone ? 'open' : ''}">${icon('back', 16)}</span></button>
      ${S.ui.showDone ? doneList.map(doneRow).join('') + '<p class="hint" style="padding:0 4px">לחיצה על ה-✓ מחזירה את המשימה לרשימה.</p>' : ''}
    </section>` : '';
  const body = section('באיחור', overdue, 'list', true) + section('היום', todays, 'today') +
    section('מחר והלאה', later, 'list') + section('ללא תאריך', nodate, 'list');

  return `<div class="screen">
    <div class="head">
      <div class="head-text">
        <span class="h-sub">${esc(longDate(today))}</span>
        <h1 class="h-title">היום</h1>
        <div id="status-slot">${statusHtml()}</div>
      </div>
      <button class="icon-btn ${S.ui.syncing ? 'spin' : ''}" id="sync-btn" data-action="sync" aria-label="סנכרון">${icon('sync', 20)}</button>
    </div>
    <button class="ai-bar" data-action="open-ai">
      <span class="ai-mark">${icon('spark', 18, 1.8)}</span>
      <span class="ai-text">ספר לי מה צריך לעשות…</span>
      <span class="mic" data-action="open-ai-voice" aria-label="הכתבה">${icon('mic', 20)}</span>
    </button>
    ${todayAll.length ? `<div class="progress-card">
      <div class="progress-top"><b>ההתקדמות של היום</b><span>${doneToday} מתוך ${todayAll.length}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>` : ''}
    ${setup}
    <div class="chips" role="group" aria-label="סינון לפי קטגוריה">${chips}</div>
    ${suggest}
    ${body || `<div class="empty"><b>אין משימות${f !== 'all' ? ' בקטגוריה הזו' : ''}</b>אפשר להוסיף עם הכפתור + או לכתוב לעוזר.</div>`}
    ${doneBlock}
  </div>`;
}

/* ---------------- יומן ---------------- */

function viewCalendar() {
  const today = todayStr();
  const upcoming = S.data.tasks.filter((t) => t.date && t.date >= today && t.date <= addDays(today, 30));
  const byDay = {};
  upcoming.forEach((t) => { (byDay[t.date] = byDay[t.date] || []).push(t); });
  const days = Object.keys(byDay).sort();
  const body = days.map((d) => `<section class="section">
      <div class="day-head"><h2>${esc(dayDiff(d) === 0 ? 'היום' : dayDiff(d) === 1 ? 'מחר' : 'יום ' + DAYS[parseYmd(d).getDay()])}</h2><span>${parseYmd(d).getDate()} ${MONTHS_FULL[parseYmd(d).getMonth()]}</span></div>
      ${sortTasks(byDay[d]).map((t) => taskRow(t, 'day')).join('')}
    </section>`).join('');
  return `<div class="screen">
    <div class="head"><div class="head-text"><span class="h-sub">30 הימים הקרובים</span><h1 class="h-title">יומן</h1></div></div>
    ${body || '<div class="empty"><b>אין משימות מתוזמנות</b>משימות עם תאריך יופיעו כאן לפי ימים.</div>'}
  </div>`;
}

/* ---------------- קטגוריות ---------------- */

function viewCategories() {
  const open = S.data.tasks.filter((t) => !t.done).length;
  const cards = S.data.categories.map((c) => {
    const list = S.data.tasks.filter((t) => t.category === c.id);
    const o = list.filter((t) => !t.done).length;
    const d = list.length - o;
    const pct = list.length ? Math.round(d / list.length * 100) : 0;
    return `<button class="cat-card" data-goto-cat="${esc(c.id)}">
      <span class="cat-icon" style="background:${c.tint};color:${c.ink}">${icon(c.icon, 22)}</span>
      <span><b>${esc(c.name)}</b><small>${o} פתוחות · ${d} הושלמו</small></span>
      <span class="bar" style="background:${c.tint}"><div style="width:${pct}%;background:${c.color}"></div></span>
    </button>`;
  }).join('');
  return `<div class="screen">
    <div class="head">
      <div class="head-text"><span class="h-sub">${open} משימות פתוחות</span><h1 class="h-title">קטגוריות</h1></div>
      <button class="btn outline" data-action="new-category">${icon('plus', 16, 2.2)}חדשה</button>
    </div>
    <div class="cat-cards">${cards}</div>
  </div>`;
}

/* ---------------- עוזר ---------------- */

function greeting() {
  const today = todayStr();
  const list = S.data.tasks.filter((t) => t.date === today);
  const done = list.filter((t) => t.done).length;
  const h = new Date().getHours();
  const hello = h < 12 ? 'בוקר טוב' : h < 17 ? 'צהריים טובים' : 'ערב טוב';
  const summary = list.length ? `היום יש לך ${list.length} משימות, ${done} כבר הושלמו.` : 'אין לך משימות להיום עדיין.';
  return `${hello}! ${summary} אפשר לכתוב לי משימות חדשות במשפט חופשי, או לבקש שאזיז, אסמן או אסכם.`;
}

function describeAction(a) {
  const ex = a.id ? findTask(a.id) : null;
  if (a.type === 'create') {
    const c = cat(a.category);
    const when = [dateLabel(a.date), a.time].filter(Boolean).join(', ') || 'בלי תאריך';
    return `<div class="preview-row"><span class="kind">משימה חדשה</span><b>${esc(a.title)}</b>
      <div class="meta"><span class="cat-chip" style="background:${c.tint};color:${c.ink}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</span>
      <span>${esc(when)}</span>${a.calendar && a.date ? `<span class="meta-item">${icon('cal', 13)}ביומן</span>` : ''}
      ${a.repeat && a.repeat.type ? `<span class="meta-item">${icon('repeat', 13)}${esc(repeatLabel(a.repeat))}</span>` : ''}
      ${a.remind && a.remind !== 'none' && a.time ? `<span class="meta-item">${icon('bell', 13)}${a.remind === 'nag' ? 'נודניק' : 'תזכורת'}</span>` : ''}
      ${a.priority === 'high' ? '<span class="badge-high">חשוב</span>' : ''}</div></div>`;
  }
  const title = ex ? ex.title : '(משימה שנמחקה)';
  if (a.type === 'complete') return `<div class="preview-row"><span class="kind">סימון כהושלם</span><b>${esc(title)}</b></div>`;
  if (a.type === 'delete') return `<div class="preview-row"><span class="kind del">מחיקה</span><b>${esc(title)}</b></div>`;
  const ch = [];
  if (a.title != null && ex && a.title !== ex.title) ch.push('שם: ' + a.title);
  if (a.date != null) ch.push('תאריך: ' + (a.date ? dateLabel(a.date) : 'ללא'));
  if (a.time != null) ch.push('שעה: ' + (a.time || 'ללא'));
  if (a.category != null) ch.push('קטגוריה: ' + cat(a.category).name);
  if (a.priority != null) ch.push('עדיפות: ' + ({ low: 'נמוכה', mid: 'רגילה', high: 'גבוהה' }[a.priority]));
  if (a.calendar != null) ch.push(a.calendar ? 'להוסיף ליומן' : 'להוריד מהיומן');
  if (a.repeat) ch.push(a.repeat.type ? repeatLabel(a.repeat) : 'בלי חזרה');
  if (a.remind != null) ch.push({ none: 'בלי תזכורת', notify: 'תזכורת', nag: 'נודניק' }[a.remind] || '');
  return `<div class="preview-row"><span class="kind">עדכון</span><b>${esc(title)}</b><div class="meta">${esc(ch.join(' · ') || 'ללא שינוי')}</div></div>`;
}

function chatMsgHtml(m) {
  if (m.role === 'user') return `<div class="msg-user">${esc(m.text)}</div>`;
  let extra = '';
  if (m.actions && m.actions.length) {
    if (m.status === 'pending') {
      extra = `<div class="preview">${m.actions.map(describeAction).join('')}
        <div class="preview-actions"><button class="btn outline" data-cancel="${m.id}">ביטול</button><button class="btn primary" data-apply="${m.id}">אישור</button></div></div>`;
    } else if (m.status === 'applied') {
      extra = `<div class="done-note"><span class="tick">${icon('check', 14, 3, '#fff')}</span><span>${esc(m.summary || 'בוצע')}</span><button class="btn ghost" data-undo="${m.id}">ביטול</button></div>`;
    } else if (m.status === 'undone') {
      extra = '<div class="done-note muted"><span>הפעולה בוטלה</span></div>';
    } else if (m.status === 'cancelled') {
      extra = '<div class="done-note muted"><span>לא בוצע כלום</span></div>';
    }
  }
  return `<div class="msg-ai ${m.error ? 'err' : ''}"><span class="avatar">${icon('spark', 15)}</span><div class="body"><p>${esc(m.text)}</p>${extra}</div></div>`;
}

function viewAI() {
  const status = !configured() ? 'לא מחובר לשרת' : !S.data.aiEnabled ? 'העוזר עוד לא הופעל בשרת' : 'מחובר למשימות ול-Google Calendar';
  const ok = configured() && S.data.aiEnabled;
  return `<div class="screen chat-screen" id="chat">
    <div class="chat-head">
      <a class="icon-btn" href="#today" aria-label="חזרה">${icon('back', 22)}</a>
      <div class="head-text"><h1>העוזר</h1><div class="status-line"><span class="status-dot ${ok ? 'ok' : 'warn'}"></span>${esc(status)}</div></div>
    </div>
    ${chatMsgHtml({ role: 'assistant', text: greeting() })}
    ${S.chat.map(chatMsgHtml).join('')}
    ${S.ui.aiBusy ? `<div class="msg-ai"><span class="avatar">${icon('spark', 15)}</span><div class="body"><span class="typing"><i></i><i></i><i></i></span></div></div>` : ''}
  </div>`;
}

const hasVoice = () => 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

function composerHtml() {
  return `<div class="composer"><div class="composer-inner">
    ${S.ui.aiBusy ? '' : `<div class="chips">${AI_SUGGESTIONS.map((s) => `<button class="chip" data-suggest="${esc(s)}">${esc(s)}</button>`).join('')}</div>`}
    <form class="compose-box" id="ai-form">
      <label for="ai-input" class="sr-only">הודעה לעוזר</label>
      <input id="ai-input" type="text" autocomplete="off" enterkeyhint="send" placeholder="כתוב או הכתב משימה…">
      ${hasVoice() ? `<button type="button" data-action="voice" class="${S.ui.recording ? 'rec' : ''}" aria-label="הקלטה קולית">${icon('mic', 20)}</button>` : ''}
      <button type="submit" aria-label="שליחה" ${S.ui.aiBusy ? 'disabled' : ''}>${icon('send', 20)}</button>
    </form>
  </div></div>`;
}

async function sendAI(text) {
  text = (text || '').trim();
  if (!text || S.ui.aiBusy) return;
  if (!configured()) { toast('צריך קודם לחבר את השרת בהגדרות'); return; }
  // היסטוריה נקייה: בלי הודעות שגיאה, ועם מה שבאמת קרה לכל הצעה
  const history = S.chat.filter((m) => !m.error).slice(-8).map((m) => {
    let text = m.text;
    if (m.role === 'assistant' && m.actions && m.actions.length) {
      text += m.status === 'applied' ? ' [המשתמש אישר: ' + (m.summary || 'בוצע') + ']'
        : m.status === 'cancelled' ? ' [המשתמש ביטל, לא בוצע כלום]'
        : m.status === 'undone' ? ' [בוצע ואז בוטל]' : ' [ממתין לאישור]';
    }
    return { role: m.role, text };
  });
  S.chat.push({ id: uid(), role: 'user', text });
  if (!S.data.aiEnabled) {
    S.chat.push({ id: uid(), role: 'assistant', error: true,
      text: 'העוזר עוד לא מופעל. צריך להוסיף בשרת מפתח GEMINI_API_KEY (או ANTHROPIC_API_KEY) ב-Script Properties ואז לסנכרן. ההוראות בקובץ README.' });
    persistChat(); render(); scrollChat(); return;
  }
  S.ui.aiBusy = true;
  persistChat(); render(); scrollChat();
  try {
    await flush();
    const res = await api('ai', { message: text, history });
    const actions = res.actions || [];
    S.chat.push({ id: uid(), role: 'assistant', text: res.reply || (actions.length ? 'אלה הפעולות שאבצע:' : 'בסדר.'),
      actions, status: actions.length ? 'pending' : null });
  } catch (err) {
    const msg = err.message === 'network' ? 'אין חיבור כרגע. נסה שוב כשתחזור לרשת.'
      : err.message === 'ai_not_configured' ? 'העוזר לא מופעל בשרת (חסר מפתח AI).'
      : err.message.indexOf('ai_busy') === 0 ? 'שירות ה-AI עמוס כרגע. נסה שוב בעוד דקה – ההודעה שלך עדיין למטה.'
      : 'משהו השתבש: ' + err.message;
    S.chat.push({ id: uid(), role: 'assistant', text: msg, error: true });
    S.ui.retryText = text;
  } finally {
    S.ui.aiBusy = false;
    persistChat(); render(); scrollChat();
    if (S.ui.retryText) { const i = document.getElementById('ai-input'); if (i) i.value = S.ui.retryText; S.ui.retryText = ''; }
  }
}

function scrollChat() { requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight)); }

function applyActions(msgId) {
  const m = S.chat.find((x) => x.id === msgId);
  if (!m || m.status !== 'pending') return;
  const undo = [];
  let created = 0, updated = 0, completed = 0, deleted = 0, onCal = 0;
  m.actions.forEach((a) => {
    if (a.type === 'create') {
      const t = newTaskDraft({
        title: a.title, category: a.category || 'personal', date: a.date || '', time: a.time || '',
        priority: a.priority || 'mid', calendar: !!(a.calendar && a.date), reminder: a.time ? 15 : '', notes: a.notes || '',
        repeat: a.repeat && a.repeat.type ? a.repeat : '', remind: a.remind && a.time ? a.remind : 'none'
      });
      delete t._new;
      if (isRepeating(t) && (!t.date || !occursOn(t.repeat, t.date))) t.date = firstOcc(t.repeat, t.date && t.date > todayStr() ? t.date : todayStr());
      saveTask(t); undo.push({ type: 'delete', id: t.id }); created++; if (t.calendar) onCal++;
      return;
    }
    const ex = findTask(a.id);
    if (!ex) return;
    const prev = clone(ex);
    if (a.type === 'delete') { removeTask(a.id); prev.eventId = ''; undo.push({ type: 'restore', task: prev }); deleted++; return; }
    const next = clone(ex);
    if (a.type === 'complete') { saveTask(completeLocal(ex).next); undo.push({ type: 'restore', task: prev }); completed++; return; }
    else {
      ['title', 'category', 'date', 'time', 'priority', 'calendar', 'notes', 'remind'].forEach((k) => { if (a[k] != null) next[k] = a[k]; });
      if (a.repeat) next.repeat = a.repeat.type ? a.repeat : '';
      if (next.remind !== 'none' && !next.time) next.remind = 'none';
      if (next.calendar && next.time && next.reminder === '') next.reminder = 15;
      updated++;
    }
    saveTask(next); undo.push({ type: 'restore', task: prev });
  });
  const parts = [];
  if (created) parts.push(created === 1 ? 'נוספה משימה' : `נוספו ${created} משימות`);
  if (updated) parts.push(updated === 1 ? 'עודכנה משימה' : `עודכנו ${updated} משימות`);
  if (completed) parts.push(completed === 1 ? 'סומנה משימה כהושלמה' : `${completed} סומנו כהושלמו`);
  if (deleted) parts.push(deleted === 1 ? 'נמחקה משימה' : `נמחקו ${deleted} משימות`);
  if (onCal) parts.push(onCal === 1 ? 'אחת נכנסה ליומן' : `${onCal} נכנסו ליומן`);
  m.status = 'applied'; m.undo = undo; m.summary = parts.join(' · ') || 'בוצע';
  persistChat(); render();
}

function undoActions(msgId) {
  const m = S.chat.find((x) => x.id === msgId);
  if (!m || m.status !== 'applied') return;
  (m.undo || []).slice().reverse().forEach((u) => {
    if (u.type === 'delete') removeTask(u.id);
    else saveTask(clone(u.task));
  });
  m.status = 'undone';
  persistChat(); render();
}

let recognizer = null;
function toggleVoice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  if (recognizer) { recognizer.stop(); return; }
  recognizer = new SR();
  recognizer.lang = 'he-IL';
  recognizer.interimResults = true;
  recognizer.continuous = false;
  const input = document.getElementById('ai-input');
  const base = input ? input.value : '';
  recognizer.onresult = (e) => {
    let txt = '';
    for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
    const el = document.getElementById('ai-input');
    if (el) el.value = (base ? base + ' ' : '') + txt;
  };
  recognizer.onerror = (e) => { if (e.error === 'not-allowed') toast('צריך לאשר גישה למיקרופון'); };
  recognizer.onend = () => {
    recognizer = null; S.ui.recording = false;
    const keep = document.getElementById('ai-input');
    const val = keep ? keep.value : '';
    document.getElementById('composer-slot').innerHTML = composerHtml();
    const el = document.getElementById('ai-input');
    if (el) { el.value = val; el.focus(); }
  };
  S.ui.recording = true;
  const val = input ? input.value : '';
  document.getElementById('composer-slot').innerHTML = composerHtml();
  const el = document.getElementById('ai-input');
  if (el) el.value = val;
  recognizer.start();
}

/* ---------------- הגדרות ---------------- */

function remindersCard() {
  const d = S.data;
  let body = '';
  if (d.notifyChannel === 'telegram') {
    const bot = d.telegramBot ? '@' + d.telegramBot : 'הבוט';
    body = d.telegramConnected
      ? `<p><b>תזכורות בטלגרם</b><br>${d.remindersActive ? 'פעילות' : 'הבדיקה כל דקה לא פעילה – הרץ שוב את setupReminders'} · מחובר ל-<bdi dir="ltr">${esc(bot)}</bdi></p>`
      : `<p><b>תזכורות בטלגרם</b><br>כמעט מוכן: פתח את <bdi dir="ltr">${esc(bot)}</bdi> בטלגרם ולחץ Start. תוך דקה הבוט יענה "מחובר".</p>`;
    if (d.telegramBot && !d.telegramConnected) body += `<div class="btn-row"><a class="btn" href="https://t.me/${esc(d.telegramBot)}" target="_blank" rel="noopener">פתיחת הבוט בטלגרם</a></div>`;
  } else if (d.notifyChannel === 'ntfy') {
    body = `<p><b>תזכורות ב-ntfy</b><br>ערוץ: <code dir="ltr">${esc(d.ntfyTopic)}</code></p>`;
  } else {
    body = '<p><b>תזכורות בטלפון</b><br>עוד לא הופעלו. ההוראות ב-README, בפרק על טלגרם.</p>';
  }
  return `<div class="card"><div class="suggest-row"><span class="mini-mark">${icon('bell', 15)}</span><div>${body}</div></div>
    ${d.notifyChannel ? '<div class="btn-row"><button class="btn" data-action="test-notify">שליחת התראת בדיקה</button></div>' : ''}</div>`;
}

function viewSettings() {
  const last = S.data.lastSync ? new Date(S.data.lastSync) : null;
  const lastText = last ? `${dateLabel(ymd(last))}, ${pad(last.getHours())}:${pad(last.getMinutes())}` : 'עוד לא';
  return `<div class="screen">
    <div class="head"><div class="head-text"><span class="h-sub">חיבור, סנכרון ועוזר</span><h1 class="h-title">הגדרות</h1></div></div>
    <form class="card" id="cfg-form">
      <div class="field">
        <label class="label" for="cfg-url">כתובת השרת (Apps Script Web App URL)</label>
        <input class="input" id="cfg-url" type="url" dir="ltr" placeholder="https://script.google.com/macros/s/…/exec" value="${esc(S.cfg.apiUrl)}" autocomplete="off">
      </div>
      <div class="field">
        <label class="label" for="cfg-token">טוקן</label>
        <div class="pw-wrap">
          <input class="input" id="cfg-token" type="password" dir="ltr" value="${esc(S.cfg.token)}" autocomplete="off">
          <button type="button" data-action="toggle-token">הצג</button>
        </div>
      </div>
      <button class="btn primary block" type="submit">שמירה וחיבור</button>
    </form>
    <div class="card settings-status">
      <div><span>מצב</span><b>${!configured() ? 'לא מחובר' : S.ui.syncError ? 'שגיאה' : 'מחובר'}</b></div>
      <div><span>סנכרון אחרון</span><b>${esc(lastText)}</b></div>
      <div><span>שינויים שממתינים</span><b>${S.outbox.length}</b></div>
      <div><span>עוזר AI</span><b>${S.data.aiEnabled ? 'פעיל' + (S.data.aiProvider ? ' (' + (S.data.aiProvider === 'gemini' ? 'Gemini' : 'Claude') + ')' : '') : 'כבוי'}</b></div>
      <div><span>משימות</span><b>${S.data.tasks.length}</b></div>
      ${S.ui.syncError && configured() ? `<p class="hint">שגיאה אחרונה: ${esc(S.ui.syncError)}</p>` : ''}
      <div class="btn-row">
        ${S.data.sheetUrl ? `<a class="btn outline" href="${esc(S.data.sheetUrl)}" target="_blank" rel="noopener">פתיחת הגיליון</a>` : ''}
        <button class="btn" data-action="sync">${icon('sync', 16)}סנכרון עכשיו</button>
      </div>
    </div>
    ${remindersCard()}
    <div class="card">
      <p class="hint">כדי להתקין: בתפריט של Chrome (שלוש הנקודות) ← "הוספה למסך הבית" / "התקנת אפליקציה".</p>
      <div class="btn-row"><button class="btn danger" data-action="clear-chat">ניקוי היסטוריית העוזר</button></div>
    </div>
  </div>`;
}

/* ---------------- גיליון עריכה (sheet) ---------------- */

function openSheet(sheet) {
  if (!S.ui.sheet) history.pushState({ sheet: true }, '');
  S.ui.sheet = sheet;
  renderSheet();
  setTimeout(() => { const el = document.querySelector('#sheet-slot [autofocus]'); if (el && sheet.focus) el.focus(); }, 60);
}
function closeSheet() {
  if (!S.ui.sheet) return;
  const sh = S.ui.sheet;
  if (!sh.saved && sh.uploaded && sh.uploaded.length) {
    sh.uploaded.forEach((id) => api('deleteImage', { id }).catch(() => {}));
  }
  S.ui.sheet = null;
  renderSheet();
  if (history.state && history.state.sheet) history.back();
}

function captureDraft() {
  const sh = S.ui.sheet;
  if (!sh) return;
  const g = (id) => document.getElementById(id);
  if (sh.type === 'task') {
    if (g('f-title')) sh.draft.title = g('f-title').value;
    if (g('f-notes')) sh.draft.notes = g('f-notes').value;
    if (g('f-date')) sh.draft.date = g('f-date').value;
    if (g('f-time')) sh.draft.time = g('f-time').value;
    if (g('f-link')) sh.linkInput = g('f-link').value;
    if (g('f-reminder')) sh.draft.reminder = g('f-reminder').value === '' ? '' : Number(g('f-reminder').value);
    const r = sh.draft.repeat;
    if (r && r.type === 'monthly' && g('f-dom')) r.dom = Math.min(31, Math.max(1, Number(g('f-dom').value) || 1));
    if (r && r.type === 'interval' && g('f-interval')) r.n = Math.min(365, Math.max(1, Number(g('f-interval').value) || 1));
  } else if (sh.type === 'category') {
    if (g('c-name')) sh.draft.name = g('c-name').value;
  }
}

function renderSheet() {
  const slot = document.getElementById('sheet-slot');
  const sh = S.ui.sheet;
  if (!sh) { slot.innerHTML = ''; document.body.style.overflow = ''; return; }
  document.body.style.overflow = 'hidden';
  const keepScroll = slot.querySelector('.sheet') ? slot.querySelector('.sheet').scrollTop : 0;
  slot.innerHTML = `<div class="backdrop" data-action="close-sheet"></div>
    <div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">${sh.type === 'task' ? taskSheet(sh) : categorySheet(sh)}</div>`;
  if (keepScroll) slot.querySelector('.sheet').scrollTop = keepScroll;
  hydrateImages();
}

function renderLightbox() {
  const slot = document.getElementById('lightbox-slot');
  slot.innerHTML = S.ui.lightbox ? `<div class="lightbox" data-action="close-lightbox">
      <img data-img="${esc(S.ui.lightbox)}" alt="">
      <button class="icon-btn" data-action="close-lightbox" aria-label="סגירה">${icon('close', 18, 2.2)}</button></div>` : '';
  hydrateImages();
}

function taskSheet(sh) {
  const d = sh.draft;
  const today = todayStr();
  const cats = S.data.categories.map((c) => {
    const on = d.category === c.id;
    return `<button type="button" class="cat-opt ${on ? 'on' : ''}" data-cat="${esc(c.id)}" aria-pressed="${on}" style="${on ? `border-color:${c.color};background:${c.tint};color:${c.ink}` : ''}"><span class="dot" style="background:${c.color}"></span>${esc(c.name)}</button>`;
  }).join('');
  const quick = [['היום', today], ['מחר', addDays(today, 1)], ['ללא תאריך', '']].map(([l, v]) =>
    `<button type="button" class="${d.date === v ? 'on' : ''}" data-quick-date="${v}">${l}</button>`).join('');
  const prios = [['low', 'נמוכה'], ['mid', 'רגילה'], ['high', 'גבוהה']].map(([v, l]) =>
    `<button type="button" class="${d.priority === v ? 'on' : ''} ${v}" data-prio="${v}" aria-pressed="${d.priority === v}">${l}</button>`).join('');
  const reminders = [['', 'בלי תזכורת'], [0, 'בזמן האירוע'], [10, '10 דקות לפני'], [15, '15 דקות לפני'], [30, '30 דקות לפני'], [60, 'שעה לפני']]
    .map(([v, l]) => `<option value="${v}" ${String(d.reminder) === String(v) ? 'selected' : ''}>${l}</option>`).join('');
  return `<div class="grabber"></div>
    <div class="sheet-head"><h2 id="sheet-title">${d._new ? 'משימה חדשה' : 'עריכת משימה'}</h2>
      <button class="icon-btn" data-action="close-sheet" aria-label="סגירה">${icon('close', 18, 2.2)}</button></div>
    <div class="field"><label class="label" for="f-title">מה צריך לעשות?</label>
      <input class="input" id="f-title" type="text" value="${esc(d.title)}" ${d._new ? 'autofocus' : ''} autocomplete="off" enterkeyhint="done"></div>
    <div class="field"><span class="label">קטגוריה</span><div class="cat-grid">${cats}</div></div>
    <div class="field"><span class="label">מתי</span>
      <div class="quick">${quick}</div>
      <div class="row2">
        <input class="input" id="f-date" type="date" value="${esc(d.date)}" aria-label="תאריך">
        <input class="input" id="f-time" type="time" value="${esc(d.time)}" aria-label="שעה" ${d.date ? '' : 'disabled'}>
      </div></div>
    <div class="field"><span class="label">עדיפות</span><div class="seg">${prios}</div></div>
    ${repeatSection(d)}
    ${remindSection(d)}
    <div class="box">
      <div class="switch-row">
        <span class="cal-ico">${icon('cal', 18)}</span>
        <span class="switch-text"><b>הוספה ל-Google Calendar</b><span>${d.date ? 'עם התראה של היומן בטלפון' : 'צריך לבחור תאריך'}</span></span>
        <button type="button" class="switch ${d.calendar && d.date ? 'on' : ''}" data-action="toggle-cal" role="switch" aria-checked="${!!(d.calendar && d.date)}" aria-label="הוספה ליומן" ${d.date ? '' : 'disabled'}></button>
      </div>
      ${d.calendar && d.date && d.time ? `<div class="sub-row"><label for="f-reminder">התראה ביומן</label><select id="f-reminder">${reminders}</select></div>` : ''}
    </div>
    ${attachmentsSection(sh)}
    <div class="field"><label class="label" for="f-notes">הערות</label>
      <textarea class="input" id="f-notes" rows="2">${esc(d.notes || '')}</textarea></div>
    <button class="btn primary block" data-action="save-task">${d._new ? 'שמירת משימה' : 'שמירת שינויים'}</button>
    ${d._new ? '' : `<button class="btn danger" data-action="delete-task">מחיקת המשימה</button>`}`;
}

function repeatSection(d) {
  const r = d.repeat || {};
  const types = [['', 'לא חוזר'], ['weekly', 'ימים בשבוע'], ['monthly', 'חודשי'], ['interval', 'כל X ימים']];
  let extra = '';
  if (r.type === 'weekly') {
    extra = `<div class="wd-row">${DAY_SHORT.map((l, i) => `<button type="button" class="${r.days.includes(i) ? 'on' : ''}" data-wd="${i}" aria-pressed="${r.days.includes(i)}">${l}</button>`).join('')}
      <button type="button" class="wd-all ${r.days.length === 7 ? 'on' : ''}" data-wd="all">כל יום</button></div>`;
  } else if (r.type === 'monthly') {
    extra = `<div class="inline-num"><label for="f-dom">בכל</label><input class="input" id="f-dom" type="number" inputmode="numeric" min="1" max="31" value="${r.dom}"><span>לחודש</span></div>`;
  } else if (r.type === 'interval') {
    extra = `<div class="inline-num"><label for="f-interval">כל</label><input class="input" id="f-interval" type="number" inputmode="numeric" min="1" max="365" value="${r.n}"><span>ימים</span></div>`;
  }
  return `<div class="field"><span class="label">${icon('repeat', 14)} חזרה</span>
    <div class="seg seg4">${types.map(([v, l]) => `<button type="button" class="${(r.type || '') === v ? 'on' : ''}" data-repeat="${v}" aria-pressed="${(r.type || '') === v}">${l}</button>`).join('')}</div>
    ${extra}
    ${r.type ? '<p class="hint">כשמסמנים "בוצע", המשימה עוברת לבד לתאריך הבא.</p>' : ''}</div>`;
}

function remindSection(d) {
  const today = todayStr();
  const opts = [['none', 'בלי'], ['notify', 'התראה'], ['nag', 'נודניק']];
  const on = d.remind && d.remind !== 'none';
  let extra = '';
  if (on && !d.time) extra = '<p class="hint warn">התזכורת יוצאת בשעת המשימה – צריך לבחור שעה למעלה.</p>';
  else if (on) {
    const override = d.remindAt && d.remindAt.d === today ? d.remindAt.t : '';
    extra = `<p class="hint">${d.remind === 'nag' ? 'התראה בשעת המשימה, וחוזרת כל 5 דקות עד שמסמנים "בוצע" או "הפסק להיום" (עד שעתיים).' : 'התראה אחת בשעת המשימה.'}</p>
      ${d.date === today || override ? `<div class="sub-row box"><label for="f-today-time">רק היום, בשעה אחרת</label>
        <span class="today-time"><input id="f-today-time" type="time" value="${esc(override)}">${override ? '<button type="button" class="btn ghost" data-action="clear-today">ביטול</button>' : ''}</span></div>` : ''}`;
  }
  if (on && !configured()) extra += '<p class="hint warn">תזכורות עובדות רק כשהאפליקציה מחוברת לשרת.</p>';
  return `<div class="field"><span class="label">${icon('bell', 14)} תזכורת בטלפון</span>
    <div class="seg">${opts.map(([v, l]) => `<button type="button" class="${(d.remind || 'none') === v ? 'on' : ''}" data-remind="${v}" aria-pressed="${(d.remind || 'none') === v}">${l}</button>`).join('')}</div>
    ${extra}</div>`;
}

function categorySheet(sh) {
  const d = sh.draft;
  return `<div class="grabber"></div>
    <div class="sheet-head"><h2 id="sheet-title">קטגוריה חדשה</h2>
      <button class="icon-btn" data-action="close-sheet" aria-label="סגירה">${icon('close', 18, 2.2)}</button></div>
    <div class="field"><label class="label" for="c-name">שם</label>
      <input class="input" id="c-name" type="text" value="${esc(d.name)}" autofocus autocomplete="off"></div>
    <div class="field"><span class="label">צבע</span><div class="swatches">
      ${EXTRA_COLORS.map((c) => `<button type="button" class="swatch ${d.color === c ? 'on' : ''}" data-color="${c}" style="background:${c}" aria-label="צבע ${c}" aria-pressed="${d.color === c}"></button>`).join('')}
    </div></div>
    <button class="btn primary block" data-action="save-category">שמירה</button>`;
}

function saveFromSheet() {
  captureDraft();
  const d = clone(S.ui.sheet.draft);
  d.title = (d.title || '').trim();
  if (!d.title) { toast('צריך לכתוב מה המשימה'); const el = document.getElementById('f-title'); if (el) el.focus(); return; }
  if (isRepeating(d) && (!d.date || !occursOn(d.repeat, d.date))) {
    const today = todayStr();
    d.date = firstOcc(d.repeat, d.date && d.date > today ? d.date : today);
  }
  if (!d.date) { d.time = ''; d.calendar = false; }
  if (d.remind && d.remind !== 'none' && !d.time) { toast('לתזכורת צריך לבחור שעה'); return; }
  const isNew = d._new;
  delete d._new;
  delete d.calendarTouched;
  if (S.ui.sheet.uploading) { toast('רגע, התמונה עוד עולה…'); return; }
  const pending = (S.ui.sheet.linkInput || '').trim();
  if (pending) { const a = linkAttachment(pending); if (a) (d.attachments = d.attachments || []).push(a); }
  const before = findTask(d.id);
  const keep = new Set((d.attachments || []).filter((a) => a.type === 'image').map((a) => a.id));
  const had = ((before && before.attachments) || []).filter((a) => a.type === 'image').map((a) => a.id).concat(S.ui.sheet.uploaded || []);
  had.filter((id) => !keep.has(id)).forEach((id) => api('deleteImage', { id }).catch(() => {}));
  S.ui.sheet.saved = true;
  saveTask(d);
  closeSheet();
  render();
  toast(isNew ? 'המשימה נוספה' : 'נשמר');
}

function linkAttachment(raw) {
  let u = String(raw || '').trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  try { const p = new URL(u); if (!p.hostname.includes('.')) return null; } catch (e) { return null; }
  return { type: 'link', url: u, title: '' };
}

async function saveCategory() {
  captureDraft();
  const d = S.ui.sheet.draft;
  const name = (d.name || '').trim();
  if (!name) { toast('צריך לתת שם'); return; }
  const c = { id: 'c-' + uid().slice(0, 8), name, color: d.color, tint: mix(d.color, 'white', 0.86), ink: mix(d.color, 'black', 0.45),
    icon: 'tag', order: S.data.categories.length + 1 };
  S.data.categories.push(c);
  persistData();
  closeSheet();
  render();
  if (configured()) {
    try { await api('upsertCategory', { category: c }); } catch (err) { toast('הקטגוריה נשמרה בטלפון, אבל לא בשרת'); }
  }
}

/* ---------------- toast ---------------- */

let toastTimer = null;
function toast(text, actionLabel, actionFn) {
  const slot = document.getElementById('toast-slot');
  slot.innerHTML = `<div class="toast"><span>${esc(text)}</span>${actionLabel ? `<button data-action="toast-action">${esc(actionLabel)}</button>` : ''}</div>`;
  toast.fn = actionFn || null;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { slot.innerHTML = ''; toast.fn = null; }, actionLabel ? 4500 : 2600);
}

/* ================================================================== */
/* אירועים                                                             */
/* ================================================================== */

document.addEventListener('click', (e) => {
  const el = (sel) => e.target.closest(sel);
  let t;

  if ((t = el('[data-toggle]'))) { e.stopPropagation(); toggleTask(t.dataset.toggle); return; }
  if ((t = el('[data-undone]'))) { e.stopPropagation(); undoComplete(t.dataset.undone); return; }
  if ((t = el('[data-filter]'))) { S.ui.filter = t.dataset.filter; render(); return; }
  if ((t = el('[data-goto-cat]'))) { S.ui.filter = t.dataset.gotoCat; go('today'); return; }
  if ((t = el('[data-suggest]'))) { sendAI(t.dataset.suggest); return; }
  if ((t = el('[data-apply]'))) { applyActions(t.dataset.apply); return; }
  if ((t = el('[data-cancel]'))) { const m = S.chat.find((x) => x.id === t.dataset.cancel); if (m) { m.status = 'cancelled'; persistChat(); render(); } return; }
  if ((t = el('[data-undo]'))) { undoActions(t.dataset.undo); return; }
  if ((t = el('[data-cat]'))) { captureDraft(); S.ui.sheet.draft.category = t.dataset.cat; renderSheet(); return; }
  if ((t = el('[data-prio]'))) { captureDraft(); S.ui.sheet.draft.priority = t.dataset.prio; renderSheet(); return; }
  if ((t = el('[data-color]'))) { captureDraft(); S.ui.sheet.draft.color = t.dataset.color; renderSheet(); return; }
  if ((t = el('[data-repeat]'))) {
    captureDraft(); const d = S.ui.sheet.draft; const type = t.dataset.repeat;
    const base = d.date || todayStr();
    d.repeat = !type ? '' : type === 'weekly' ? { type, days: [weekdayOf(base)] }
      : type === 'monthly' ? { type, dom: parseYmd(base).getDate() } : { type, n: 3 };
    if (d.repeat && !d.date) d.date = firstOcc(d.repeat, todayStr());
    renderSheet(); return;
  }
  if ((t = el('[data-wd]'))) {
    captureDraft(); const r = S.ui.sheet.draft.repeat; const v = t.dataset.wd;
    if (v === 'all') r.days = r.days.length === 7 ? [weekdayOf(S.ui.sheet.draft.date || todayStr())] : [0, 1, 2, 3, 4, 5, 6];
    else { const n = Number(v); r.days = r.days.includes(n) ? (r.days.length > 1 ? r.days.filter((x) => x !== n) : r.days) : r.days.concat(n).sort(); }
    renderSheet(); return;
  }
  if ((t = el('[data-att-remove]'))) {
    captureDraft(); S.ui.sheet.draft.attachments.splice(Number(t.dataset.attRemove), 1); renderSheet(); return;
  }
  if ((t = el('[data-att-view]'))) { S.ui.lightbox = t.dataset.attView; renderLightbox(); return; }
  if ((t = el('[data-remind]'))) { captureDraft(); S.ui.sheet.draft.remind = t.dataset.remind; renderSheet(); return; }
  if ((t = el('[data-quick-date]'))) {
    captureDraft(); const d = S.ui.sheet.draft; d.date = t.dataset.quickDate;
    if (!d.date) { d.time = ''; d.calendar = false; }
    renderSheet(); return;
  }

  const a = el('[data-action]');
  if (a) {
    const act = a.dataset.action;
    switch (act) {
      case 'new-task': openSheet({ type: 'task', draft: newTaskDraft(), focus: true }); return;
      case 'close-sheet': closeSheet(); return;
      case 'save-task': saveFromSheet(); return;
      case 'delete-task': {
        const id = S.ui.sheet.draft.id; const prev = clone(findTask(id) || S.ui.sheet.draft);
        removeTask(id); closeSheet(); render();
        toast('המשימה נמחקה', 'ביטול', () => { prev.eventId = ''; delete prev._new; saveTask(prev); render(); });
        return;
      }
      case 'toggle-cal': captureDraft(); S.ui.sheet.draft.calendar = !S.ui.sheet.draft.calendar; S.ui.sheet.draft.calendarTouched = true;
        if (S.ui.sheet.draft.calendar && S.ui.sheet.draft.reminder === '') S.ui.sheet.draft.reminder = 15;
        renderSheet(); return;
      case 'add-link': {
        captureDraft(); const sh = S.ui.sheet; const a = linkAttachment(sh.linkInput);
        if (!a) { toast('הקישור לא נראה תקין'); return; }
        (sh.draft.attachments = sh.draft.attachments || []).push(a); sh.linkInput = ''; renderSheet(); return;
      }
      case 'close-lightbox': S.ui.lightbox = null; renderLightbox(); return;
      case 'toggle-done': S.ui.showDone = !S.ui.showDone; render(); return;
      case 'clear-today': captureDraft(); S.ui.sheet.draft.remindAt = ''; renderSheet(); return;
      case 'test-notify':
        api('testNotify').then(() => toast('נשלחה התראת בדיקה'))
          .catch((err) => toast(err.message === 'reminders_not_set_up' ? 'צריך קודם להריץ setupReminders בשרת'
            : err.message === 'telegram_not_connected' ? 'צריך קודם ללחוץ Start בבוט בטלגרם' : 'שגיאה: ' + err.message));
        return;
      case 'copy-topic':
        (navigator.clipboard ? navigator.clipboard.writeText(S.data.ntfyTopic) : Promise.reject())
          .then(() => toast('הועתק')).catch(() => toast(S.data.ntfyTopic));
        return;
      case 'new-category': openSheet({ type: 'category', draft: { name: '', color: EXTRA_COLORS[6] } }); return;
      case 'save-category': saveCategory(); return;
      case 'sync': sync(true); return;
      case 'open-ai-voice': e.stopPropagation(); go('ai'); setTimeout(() => { if (hasVoice()) toggleVoice(); else focusAI(); }, 120); return;
      case 'open-ai': go('ai'); setTimeout(focusAI, 120); return;
      case 'voice': toggleVoice(); return;
      case 'dismiss-suggest': S.ui.dismissedSuggest = todayStr(); save('tm.dismissed', S.ui.dismissedSuggest); render(); return;
      case 'apply-suggest': {
        const today = todayStr(); const tomorrow = addDays(today, 1);
        const moved = S.data.tasks.filter((x) => !x.done && x.date && x.date < today).map(clone);
        moved.forEach((x) => { const n = clone(x); n.date = tomorrow; saveTask(n); });
        render();
        toast(moved.length === 1 ? 'הועבר למחר' : `הועברו ${moved.length} משימות למחר`, 'ביטול', () => { moved.forEach((x) => saveTask(clone(x))); render(); });
        return;
      }
      case 'toggle-token': { const i = document.getElementById('cfg-token'); i.type = i.type === 'password' ? 'text' : 'password'; a.textContent = i.type === 'password' ? 'הצג' : 'הסתר'; return; }
      case 'clear-chat': S.chat = []; persistChat(); toast('ההיסטוריה נוקתה'); return;
      case 'toast-action': { const fn = toast.fn; document.getElementById('toast-slot').innerHTML = ''; toast.fn = null; if (fn) fn(); return; }
    }
  }

  if ((t = el('[data-open]'))) {
    const task = findTask(t.dataset.open);
    if (task) openSheet({ type: 'task', draft: clone(task) });
  }
});

function focusAI() { const i = document.getElementById('ai-input'); if (i) i.focus(); }

document.addEventListener('change', (e) => {
  if (!S.ui.sheet || S.ui.sheet.type !== 'task') return;
  if (e.target.id === 'f-image') { const files = Array.from(e.target.files || []); e.target.value = ''; uploadFiles(files); return; }
  if (e.target.id === 'f-today-time') {
    captureDraft();
    S.ui.sheet.draft.remindAt = e.target.value ? { d: todayStr(), t: e.target.value } : '';
    renderSheet(); return;
  }
  if (e.target.id === 'f-dom' || e.target.id === 'f-interval') { captureDraft(); return; }
  if (e.target.id === 'f-date' || e.target.id === 'f-time') {
    const d = S.ui.sheet.draft;
    captureDraft();
    if (!d.date) { d.time = ''; d.calendar = false; }
    renderSheet();
  }
});

document.addEventListener('submit', (e) => {
  if (e.target.id === 'ai-form') {
    e.preventDefault();
    const i = document.getElementById('ai-input');
    const v = i.value; i.value = '';
    sendAI(v);
  } else if (e.target.id === 'cfg-form') {
    e.preventDefault();
    S.cfg.apiUrl = document.getElementById('cfg-url').value.trim();
    S.cfg.token = document.getElementById('cfg-token').value.trim();
    save('tm.cfg', S.cfg);
    S.ui.syncError = '';
    sync(true);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && e.target.id === 'f-title') { e.preventDefault(); saveFromSheet(); }
  if (e.key === 'Enter' && e.target.id === 'f-link') { e.preventDefault(); const b = document.querySelector('[data-action="add-link"]'); if (b) b.click(); }
  if (e.key === 'Escape' && S.ui.lightbox) { S.ui.lightbox = null; renderLightbox(); return; }
  if (e.key === 'Escape' && S.ui.sheet) closeSheet();
});

window.addEventListener('popstate', () => { if (S.ui.sheet) { S.ui.sheet = null; renderSheet(); } });
window.addEventListener('hashchange', route);
window.addEventListener('online', () => { renderStatus(); sync(); });
window.addEventListener('offline', renderStatus);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { render(); sync(); } });

/* ================================================================== */
/* הפעלה                                                               */
/* ================================================================== */

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
/** שיתוף מאפליקציות אחרות ("שתף" ← המשימות שלי): פותח משימה חדשה עם הקישור/התמונות. */
async function handleShare() {
  if (!/[?&]shared=1/.test(location.search) || !('caches' in window)) return;
  history.replaceState(null, '', location.pathname + '#today');
  const cache = await caches.open('tm-share');
  const metaRes = await cache.match('share-meta');
  if (!metaRes) return;
  const meta = await metaRes.json();
  const files = [];
  for (let i = 0; i < (meta.files || 0); i++) {
    const r = await cache.match('share-file-' + i);
    if (r) { const b = await r.blob(); files.push(new File([b], meta.names[i] || 'image.jpg', { type: b.type || 'image/jpeg' })); }
  }
  await caches.delete('tm-share');
  const text = [meta.title, meta.text].filter(Boolean).join(' ');
  const urlMatch = meta.url || (text.match(/https?:\/\/\S+/) || [])[0] || '';
  let title = (meta.title || (meta.text || '').replace(/https?:\/\/\S+/g, '').trim()).split('\n')[0].slice(0, 120);
  const draft = newTaskDraft({ title, date: '' });
  if (urlMatch) draft.attachments.push({ type: 'link', url: urlMatch, title: meta.title || '' });
  if (!title) draft.title = urlMatch ? 'לבדוק: ' + hostOf(urlMatch) : '';
  openSheet({ type: 'task', draft, focus: true });
  if (files.length) uploadFiles(files);
}

route();
handleShare().catch(() => {});
sync();
setInterval(() => { if (document.visibilityState === 'visible') sync(); }, 5 * 60 * 1000);
