import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { uploadReceipt } from './lib/registrations';
import './theme.css';
import html2canvas from 'html2canvas';

/* ========== HEADER ========== */
function Header() {
  return (
    <header className="header container">
      <div className="brand">
        <span role="img" aria-label="corazón">
          💙
        </span>
        <span>Apoya a Alejandrito · AltruistamenteLocos</span>
      </div>
      <span className="badge">Carrera con causa · 5KM</span>
    </header>
  );
}

/* ========== INFO ========== */
function Info() {
  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Carrera con Causa: ¡Corremos por Alejandrito!</h2>
      <p style={{ color: 'var(--muted)' }}>
        Organiza <strong>AltruistamenteLocos</strong>
      </p>
      <p>
        📅 Domingo 12 de julio <br />
        ⏰ 6:30 a.m. <br />
        📍 Plaza Miguel Hidalgo (salida y meta) <br />
        📏 5 kilómetros
      </p>
      <p>
        Inscripción: <strong>$200 MXN</strong>
      </p>
      <p style={{ color: 'var(--muted)' }}>
        Alejandrito vive con Atrofia Muscular Espinal (AME), una condición que afecta sus músculos y movilidad. Todo lo recaudado será destinado a la
        compra del <strong>exoesqueleto para la movilidad y rehabilitación de Alejandrito.</strong> ¡Gracias por sumarte!
      </p>
    </section>
  );
}

/* ========== EXTRAS ========== */
function Extras() {
  return (
    <section className="card">
      <h2>🎉 Extras del evento</h2>
      <p>
        Habrá <strong>medalla de finisher</strong> garantizada para los primeros 300 en cruzar la meta.
      </p>

      <h3>🏅 Premiación</h3>
      <p>Premiación para los tres primeros lugares en cada categoría:</p>
      <ul>
        <li>Femenil</li>
        <li>Varonil</li>
      </ul>
      <p>🏆 Trofeo especial al equipo con más inscritos.</p>

    </section>
  );
}

/* ========== WHY PARTICIPATE ========== */
/* ========== WHY PARTICIPATE ========== */
function WhyParticipate() {
  return (
    <section className="card">
      <h2>💙 ¿Por qué participar?</h2>
      <p>
        Alejandrito vive con <strong>Atrofia Muscular Espinal (AME)</strong>, una condición que
        afecta sus músculos y movilidad. Su familia trabaja incansablemente para darle una mejor
        calidad de vida.
      </p>
      <p>
        Todo lo recaudado en esta carrera será destinado a la compra de un{' '}
        <strong>exoesqueleto Roki Robotics</strong>, una tecnología de origen tapatío que ayuda a personas con
        movilidad reducida a ponerse de pie, caminar y ganar independencia.
      </p>
      <p>
        Con tu participación, Alejandrito estará más cerca de lograr sus sueños y ganar
        independencia. <strong>Tu apoyo hace la diferencia.</strong>
      </p>
      <p>
        <em>Juntos podemos más. 💚</em>
      </p>
    </section>
  );
}

/* ========== COUNTDOWN ========== */
function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return <p className="countdown-finished">¡Ya es el día del evento! 🎉</p>;

  return (
    <div className="countdown">
      <h3>⏳ ¿Cuánto falta? 👀</h3>
      <div className="countdown-box">
        <span>{timeLeft.days}d</span>
        <span>{timeLeft.hours}h</span>
        <span>{timeLeft.minutes}m</span>
        <span>{timeLeft.seconds}s</span>
      </div>
    </div>
  );
}

/* ========== HERO ========== */
function Hero({ onStart }) {
  return (
    <section className="hero">
      <img
        src="/media/logo2.jpeg"
        alt="AltruistamenteLocos"
        style={{ maxHeight: 100, margin: '0 auto 16px' }}
      />
      <img src="/media/alejandrito2.jpeg" alt="Alejandrito" className="photo" />
      <h1>Corre con el corazón 💙</h1>
      <p>¿Quién es Alejandrito? ¡Conócelo con este video! 👇</p>
      <video
        src="/media/video-bio.mov"
        controls
        poster="/media/alejandrito.jpeg"
        style={{ maxHeight: 280 }}
      />

      <Countdown targetDate="2026-07-12T06:30:00" />

      <button className="cta" style={{ marginTop: 14 }} onClick={onStart}>
        Regístrate con estos pasos 👇
      </button>
    </section>
  );
}

/* ========== STEPPER ========== */
function Stepper({ step }) {
  const labels = [
    { icon: '📝', text: 'Registro' },
    { icon: '💾', text: 'Datos' },
    { icon: '💲', text: 'Pago' },
    { icon: '🎟️', text: 'Tu boleto' },
  ];
  return (
    <nav className="stepper" aria-label="Progreso del registro">
      {labels.map((label, idx) => (
        <div key={label.text} className={`step-item ${idx + 1 <= step ? 'active' : ''}`}>
          <span className="step-icon">{label.icon}</span>
          <span className="step-text">
            {idx + 1}. {label.text}
          </span>
        </div>
      ))}
    </nav>
  );
}

/* ========== REGISTRATION FORM ========== */
function RegistrationForm({ onBack, onSubmit }) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const fee = 200;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !age || !phone || !email || !team) return;
    onSubmit({ fullName, age: Number(age), phone, email, team, fee });
  };
  return (
    <section className="card">
      <h2>Datos del participante</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <label>
          Nombre completo
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </label>
        <label>
          Edad
          <input
            type="number"
            min="1"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <label>
          Teléfono / WhatsApp
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
        <label>
          Correo electrónico
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Nombre del equipo
          <input value={team} onChange={(e) => setTeam(e.target.value)} required />
        </label>
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="cta" onClick={onBack}>
            Cambié de opinión...
          </button>
          <button type="submit" className="cta">
            Continuar · ${fee} MXN
          </button>
        </div>
      </form>
    </section>
  );
}

/* ========== PAYMENT STEP ========== */
// FIX: onFinalize now accepts fileOverride so we don't depend on stale React state
function PaymentStep({ order, onFinalize, saving = false, show }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const clabe = import.meta.env.VITE_NUMCARD || '0000000000000000';
  const bank = import.meta.env.VITE_BANK || 'BANCO';
  const beneficiary = import.meta.env.VITE_BENEFICIARY || 'Laura Gloriela Ayala Cruz';

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const max = 5 * 1024 * 1024;
    const okTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'image/jpg'];
    if (!okTypes.includes(f.type)) {
      show('error', 'Formato inválido. Solo se permiten imágenes (JPG, PNG, WEBP) o PDF.');
      return;
    }
    if (f.size > max) {
      show('error', 'El archivo supera 5MB. Por favor selecciona un archivo más pequeño.');
      return;
    }

    setFile(f);
    setIsProcessing(true);
    show('success', 'Comprobante cargado. Procesando registro...');

    // FIX: pass `f` directly instead of calling onUpload first and relying on
    // React state being updated (it's async — receipt would still be null by
    // the time handleFinalize checks it).
    try {
      await onFinalize(f);
    } catch (error) {
      show('error', 'Error al procesar el registro');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      show('error', 'Por favor selecciona un comprobante antes de continuar');
      return;
    }

    setIsProcessing(true);
    show('info', 'Enviando tu registro...');

    // FIX: same here — pass `file` directly
    try {
      await onFinalize(file);
    } catch (error) {
      show('error', 'Error al enviar el registro');
    } finally {
      setIsProcessing(false);
    }
  };

  const feeFmt = order.fee.toLocaleString('es-MX');
  return (
    <section className="card">
      <h2>Pago SPEI</h2>
      <p style={{ color: 'var(--muted)' }}>
        Transfiere exactamente <strong>${feeFmt} MXN</strong> y usa esta referencia:
      </p>
      <div className="card">
        <p>
          <strong>Beneficiario:</strong> {beneficiary}
        </p>
        <p>
          <strong>Banco:</strong> {bank}
        </p>
        <p>
          <strong>Tarjeta:</strong> {clabe}
        </p>
        <p>
          <strong>Referencia/Concepto:</strong> {order.paymentRef}
        </p>
        <p>
          <strong>Monto:</strong> ${feeFmt} MXN
        </p>
      </div>
      <div className="row" style={{ marginTop: 8, gap: 8 }}>
        <button
          className="cta"
          onClick={async () => {
            const ok = await copy(order.paymentRef);
            show(ok ? 'success' : 'error', ok ? 'Referencia copiada' : 'Error');
          }}
        >
          Copiar referencia
        </button>
        <button
          className="cta"
          onClick={async () => {
            const ok = await copy(clabe);
            show(ok ? 'success' : 'error', ok ? 'CLABE copiada' : 'Error');
          }}
        >
          Copiar Tarjeta
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        <label className="upload">
          {saving || isProcessing
            ? 'Procesando registro...'
            : 'Subir comprobante SPEI (se procesará automáticamente)'}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFile}
            disabled={saving || isProcessing}
          />
        </label>
        {file && (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              backgroundColor: 'var(--success-bg)',
              borderRadius: 4,
            }}
          >
            <p style={{ color: 'var(--success)', margin: 0 }}>✅ Archivo cargado: {file.name}</p>
            <p style={{ color: 'var(--muted)', margin: '4px 0 0 0', fontSize: '0.9em' }}>
              Listo para enviar tu registro
            </p>
          </div>
        )}
        {file && (
          <button
            className="cta"
            style={{ marginTop: 12, width: '100%' }}
            onClick={handleSubmit}
            disabled={saving || isProcessing}
          >
            {saving || isProcessing ? 'Enviando registro...' : 'Enviar comprobante y continuar'}
          </button>
        )}
      </div>
    </section>
  );
}

/* ========== TICKET ========== */
function Ticket({ order, show }) {
  return (
    <section className="card">
      <h2>¡Registro enviado!</h2>
      <p style={{ color: 'var(--muted)' }}>
        Aquí tienes tu boleto digital 🎟️ Puedes tomar captura o descargarlo.
      </p>
      <div id="ticket" className="ticket">
        <p>
          <strong>Código único</strong>
        </p>
        <p className="ticket-code">{order.ticketCode}</p>
        <div className="ticket-divider"></div>
        <p className="ticket-details">Equipo: {order.team}</p>
        <p className="ticket-details">${order.fee} MXN · {order.fullName}</p>
        <p className="ticket-details">{order.email}</p>
      </div>
      <div className="row" style={{ justifyContent: 'center', gap: 8, marginTop: 16 }}>
        <button
          className="cta"
          onClick={async () => {
            const ok = await copy(order.ticketCode);
            show(ok ? 'success' : 'error', ok ? 'Código copiado' : 'Error');
          }}
        >
          Copiar código
        </button>
        <button className="cta" onClick={saveAsImage}>
          Descargar boleto
        </button>
      </div>
    </section>
  );
}

/* ========== RECEIPT VIEWER COMPONENT ========== */
function ReceiptViewer({ url, onError }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
    onError?.();
  };

  if (error) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
        }}
      >
        <p>❌ Error al cargar el comprobante</p>
        <button onClick={() => window.open(url, '_blank')} className="cta">
          Abrir en nueva pestaña
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#666',
          }}
        >
          Cargando...
        </div>
      )}
      {url.toLowerCase().includes('.pdf') ? (
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '500px',
            border: 'none',
            borderRadius: '4px',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <img
          src={url}
          alt="Comprobante de pago"
          style={{
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
            borderRadius: '4px',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

/* ========== ADMIN PANEL ========== */
function toCsv(rows) {
  if (!rows?.length) return '';
  const headers = Object.keys(rows[0]);
  const esc = (v) => {
    if (v == null) return '';
    const s = String(v).replace(/"/g, '""');
    return `"${s}"`;
  };
  const lines = [
    headers.map(esc).join(','),
    ...rows.map((r) => headers.map((h) => esc(r[h])).join(',')),
  ];
  return lines.join('\n');
}

function AdminPanel({ show }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [openReceiptId, setOpenReceiptId] = useState(null);
  const [receiptUrls, setReceiptUrls] = useState({});

  async function load() {
    setLoading(true);
    let query = supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (status !== 'all') query = query.eq('status', status);
    if (q) query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,ticket_code.ilike.%${q}%`);
    const { data, error } = await query;
    if (error) show('error', error.message);
    else setRows(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [status]);

  async function changeStatus(id, newStatus) {
    const { error } = await supabase
      .from('registrations')
      .update({ status: newStatus })
      .eq('id', id);
    if (error) {
      show('error', error.message);
      return;
    }
    show('success', 'Status actualizado');
    await load();
  }

  async function viewReceipt(registrationId, path) {
    if (!path) return;

    if (openReceiptId === registrationId) {
      setOpenReceiptId(null);
      return;
    }

    if (receiptUrls[registrationId]) {
      setOpenReceiptId(registrationId);
      return;
    }

    const { data, error } = await supabase.storage.from('receipts').createSignedUrl(path, 3600);
    if (error) {
      show('error', `Error al cargar recibo: ${error.message}`);
      return;
    }

    setReceiptUrls((prev) => ({ ...prev, [registrationId]: data.signedUrl }));
    setOpenReceiptId(registrationId);
  }

  function exportCsv() {
    const csv = toCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2>Admin — Registros</h2>

      {/* Tabs para status */}
      <div className="admin-tabs">
        {['all', 'pending', 'verified', 'rejected'].map((st) => (
          <div
            key={st}
            className={`admin-tab ${status === st ? 'active' : ''}`}
            onClick={() => setStatus(st)}
          >
            {st === 'all' && '📋 Todos'}
            {st === 'pending' && '⏳ Pendientes'}
            {st === 'verified' && '✅ Verificados'}
            {st === 'rejected' && '❌ Rechazados'}
          </div>
        ))}
      </div>

      {/* Search + export */}
      <div className="row" style={{ gap: 8, marginBottom: 10 }}>
        <input
          placeholder="Buscar nombre/email/ticket"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button className="cta" onClick={load} disabled={loading}>
          Buscar
        </button>
        <button className="cta" onClick={exportCsv}>
          Exportar CSV
        </button>
      </div>

      {/* Vista de tabla (desktop) */}
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Creado</th>
              <th>Nombre</th>
              <th>Equipo</th>
              <th>Monto</th>
              <th>Email</th>
              <th>Ticket</th>
              <th>Status</th>
              <th>Recibo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.created_at).toLocaleString()}</td>
                <td>{r.full_name}</td>
                <td>{r.team || '—'}</td>
                <td>${r.fee}</td>
                <td>{r.email}</td>
                <td>{r.ticket_code}</td>
                <td>{r.status}</td>
                <td>
                  {r.receipt_path ? (
                    <button
                      className="cta"
                      onClick={() => viewReceipt(r.id, r.receipt_path)}
                      style={{
                        backgroundColor:
                          openReceiptId === r.id ? 'var(--primary-dark)' : 'var(--primary)',
                        opacity: openReceiptId === r.id ? 0.8 : 1,
                      }}
                    >
                      {openReceiptId === r.id ? 'Ocultar' : 'Ver'}
                    </button>
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  <div className="row" style={{ gap: 6 }}>
                    <button className="cta" onClick={() => changeStatus(r.id, 'verified')}>
                      Verificar
                    </button>
                    <button className="cta" onClick={() => changeStatus(r.id, 'rejected')}>
                      Rechazar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista cards (mobile) */}
      <div className="admin-cards">
        {rows.map((r) => (
          <div key={r.id} className="admin-card">
            <h4>{r.full_name}</h4>
            <p>📧 {r.email}</p>
            <p>🎫 {r.ticket_code}</p>
            <p>
              Equipo: {r.team || '—'} · ${r.fee}
            </p>
            <p>
              Status: <strong>{r.status}</strong>
            </p>
            <div className="actions">
              {r.receipt_path && (
                <button
                  className="cta"
                  onClick={() => viewReceipt(r.id, r.receipt_path)}
                  style={{
                    backgroundColor:
                      openReceiptId === r.id ? 'var(--primary-dark)' : 'var(--primary)',
                    opacity: openReceiptId === r.id ? 0.8 : 1,
                  }}
                >
                  {openReceiptId === r.id ? 'Ocultar' : 'Ver recibo'}
                </button>
              )}
              <button className="cta" onClick={() => changeStatus(r.id, 'verified')}>
                ✔️
              </button>
              <button className="cta" onClick={() => changeStatus(r.id, 'rejected')}>
                ❌
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && !loading && <p style={{ color: 'var(--muted)' }}>Sin resultados</p>}
      </div>

      {/* Mostrar recibo inline debajo de cada registro */}
      {rows.map(
        (r) =>
          openReceiptId === r.id &&
          receiptUrls[r.id] && (
            <div
              key={`receipt-${r.id}`}
              style={{
                marginTop: 16,
                padding: 16,
                border: '2px solid var(--primary)',
                borderRadius: 8,
                backgroundColor: 'var(--card-bg)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <h4 style={{ margin: 0 }}>Comprobante de {r.full_name}</h4>
                <button
                  onClick={() => setOpenReceiptId(null)}
                  className="cta"
                  style={{ padding: '4px 8px', fontSize: '0.9em' }}
                >
                  ✕ Cerrar
                </button>
              </div>
              <ReceiptViewer
                url={receiptUrls[r.id]}
                onError={() => show('error', 'Error al cargar el comprobante.')}
              />
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <button onClick={() => window.open(receiptUrls[r.id], '_blank')} className="cta">
                  🔗 Abrir en nueva pestaña
                </button>
              </div>
            </div>
          )
      )}
    </section>
  );
}

/* ========== HELPERS ========== */
async function saveAsImage() {
  const element = document.getElementById('ticket');
  if (!element) return;
  const canvas = await html2canvas(element, { scale: 2, backgroundColor: null });
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'boleto.png';
  link.click();
}

function genId(len = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    ''
  );
}

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (type, msg, ms = 2500) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), ms);
  };
  const View = () => toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>;
  return { show, View };
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ========== MAIN APP ========== */
export default function App() {
  const { show, View: Toast } = useToast();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleStart = () => {
    setStep(2);
  };

  const handleSubmitData = (data) => {
    const fullOrder = {
      ...data,
      paymentRef: `Donativo - ${data.fullName}`,
      ticketCode: genId(8),
    };
    setOrder(fullOrder);
    setStep(3);
  };

  // FIX: accepts the file directly from PaymentStep instead of reading from
  // `receipt` state, which would be stale (null) due to async React state updates.
  async function handleFinalize(fileOverride) {
    if (!fileOverride) {
      show('error', 'Por favor, selecciona un comprobante antes de continuar.');
      return;
    }

    try {
      setSaving(true);
      const { count } = await supabase
        .from('registrations')
        .select('id', { count: 'exact', head: true })
        .or(
          `ticket_code.eq.${order.ticketCode},payment_ref.eq.${order.paymentRef},email.eq.${order.email}`
        );
      if (count && count > 0) {
        show(
          'error',
          'Ya existe un registro con estos datos. Si tienes problemas, contacta al organizador.'
        );
        return;
      }
      const receiptPath = await uploadReceipt(fileOverride, order.ticketCode);
      const { error } = await supabase.from('registrations').insert({
        full_name: order.fullName,
        age: order.age,
        phone: order.phone,
        email: order.email,
        team: order.team,
        fee: order.fee,
        payment_ref: order.paymentRef,
        status: 'pending',
        receipt_path: receiptPath,
        ticket_code: order.ticketCode,
      });
      if (error) {
        show('error', error.message);
        return;
      }
      show('success', 'Tu registro fue enviado, ¡Gracias!');
      setStep(4);
    } catch (err) {
      show('error', err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Header />
      <main className="container">
        {isAdmin ? (
          <AdminPanel show={show} />
        ) : (
          <>
            <Hero onStart={() => setStep(1)} />
            <Stepper step={step} />

            {step === 1 && (
              <section className="card">
                <h2>¿Quieres participar?</h2>
                <button className="cta" onClick={handleStart}>
                  👟 ¡Quiero unirme! · $200
                </button>
              </section>
            )}

            {step === 2 && (
              <RegistrationForm onBack={() => setStep(1)} onSubmit={handleSubmitData} />
            )}

            {step === 3 && order && (
              <PaymentStep
                order={order}
                onFinalize={handleFinalize}
                saving={saving}
                show={show}
              />
            )}

            {step === 4 && order && <Ticket order={order} show={show} />}

            <Info />
            <Extras />
            <WhyParticipate />
          </>
        )}

        <footer className="footer">
          <span>Hecho con ❤️ en Nogales.</span>
          <span>Contacto: 631 30 39334 · AltruistamenteLocos</span>
        </footer>

        <Toast />
      </main>
    </>
  );
}