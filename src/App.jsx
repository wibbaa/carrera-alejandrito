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
        <span>Todos por Saúl · TEApoyo Nogales</span>
      </div>
      <span className="badge">Carrera con causa · 5K</span>
    </header>
  );
}

/* ========== INFO ========== */
function Info() {
  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Carrera con Causa: Todos por Saúl</h2>
      <p style={{ color: 'var(--muted)' }}>
        Organiza <strong>TEApoyo Nogales</strong>
      </p>
      <p>
        📅 Domingo 28 de septiembre <br />
        ⏰ 7:00 a.m. <br />
        📍 Plaza Miguel Hidalgo (salida y meta) <br />
        📏 5 kilómetros
      </p>
      <p>
        Corredores: <strong>$200 MXN</strong> <br /> Caminantes: <strong>$100 MXN</strong>
      </p>
      <p style={{ color: 'var(--muted)' }}>
        Tu apoyo es para los estudios médicos de Saúl, un gran niño con autismo. ¡Gracias por
        sumarte!
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
        Al final habrá <strong>polvo de colores</strong> para celebrar, para quien guste quedarse.
      </p>

      <h3>💲 Inscripciones</h3>
      <p>
        <strong>Corredores: $200 MXN</strong>
      </p>
      <ul>
        <li>Incluye número</li>
        <li>Hidratación</li>
        <li>Un refrigerio energético</li>
        <li>Participación en rifas</li>
      </ul>
      <p>
        <strong>Caminantes: $100 MXN</strong>
      </p>
      <ul>
        <li>Incluye rifas (sin número ni medalla)</li>
      </ul>
      <p style={{ color: 'var(--muted)' }}>
        🙌 Participan sin categoría, integrando a familias y comunidad.
      </p>

      <h3>🏅 Premiación</h3>
      <p>Medallas para los tres primeros lugares en cada categoría:</p>
      <ul>
        <li>19 años y menores</li>
        <li>20–29</li>
        <li>30–39</li>
        <li>40–49</li>
        <li>50–59</li>
        <li>60+</li>
      </ul>
      <p>🏆 Trofeo al ganador absoluto hombre y mujer.</p>

      <h3>🎁 Rifas</h3>
      <p>Todos los participantes registrados entran a varias rifas durante el evento.</p>
    </section>
  );
}

/* ========== WHY PARTICIPATE ========== */
function WhyParticipate() {
  return (
    <section className="card">
      <h2>💙 ¿Por qué participar?</h2>
      <p>
        Esta carrera tiene como finalidad apoyar los estudios médicos de <strong>Saúl</strong>, un
        niño de 14 años con autismo severo. Sus padres luchan incansablemente por encontrar un
        diagnóstico y tratamiento adecuados.
      </p>
      <p>
        Aunque inicialmente se consideró un tratamiento con células madre en Monterrey, ahora los
        especialistas recomiendan continuar con investigaciones profundas, pues ni medicamentos ni
        terapias han sido efectivos.
      </p>
      <p>
        <strong>Tu apoyo es fundamental</strong> para brindar esperanza y soluciones a Saúl y su
        familia.
      </p>
      <p>
        Únete a esta causa y sé parte del cambio. <strong>TEApoyo Nogales</strong>, un colectivo de
        familias, organiza esta carrera con mucho corazón para visibilizar y apoyar el autismo en la
        comunidad.
      </p>
      <p>
        Durante el evento, podrás apoyar también a madres emprendedoras que ofrecerán sus productos
        en la plaza.
      </p>
      <p>
        <em>
          Corre, camina, participa y demuestra que juntos podemos construir un Nogales más
          inclusivo.
        </em>
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
        src="/media/logo.jpg"
        alt="TEApoyo Nogales"
        style={{ maxHeight: 100, margin: '0 auto 16px' }}
      />
      <img src="/media/saul.jpg" alt="Saúl" className="photo" />
      <h1>Corre con el corazón 💙</h1>
      <p>¿Quién es Saúl? ¡Conócelo con este video! 👇</p>
      <video
        src="/media/video-bio.mp4"
        controls
        poster="/media/saul.jpg"
        style={{ maxHeight: 280 }}
      />

      {/* 👇 Aquí el contador */}
      <Countdown targetDate="2025-09-28T07:00:00" />

      <button className="cta" style={{ marginTop: 14 }} onClick={onStart}>
        Regístrate con estos pasos 👇
      </button>
    </section>
  );
}

/* ========== STEPPER ========== */
function Stepper({ step }) {
  const labels = [
    { icon: '📝', text: 'Tipo' },
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
function RegistrationForm({ role, onBack, onSubmit }) {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const fee = role === 'runner' ? 200 : 100;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !age || !phone || !email) return;
    onSubmit({ fullName, age: Number(age), phone, email, role, fee });
  };
  return (
    <section className="card">
      <h2>Datos del participante — {role === 'runner' ? 'Corredor' : 'Caminante'}</h2>
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
function PaymentStep({ order, onUpload, onFinalize, saving = false, show }) {
  const [file, setFile] = useState(null);
  const clabe = import.meta.env.VITE_CLABE || '000000000000000000';
  const bank = import.meta.env.VITE_BANK || 'BANCO';
  const beneficiary = import.meta.env.VITE_BENEFICIARY || 'TEApoyo Nogales';
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const max = 5 * 1024 * 1024;
    const okTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'image/jpg'];
    if (!okTypes.includes(f.type)) return alert('Formato inválido.');
    if (f.size > max) return alert('Archivo supera 5MB.');
    setFile(f);
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
          <strong>CLABE:</strong> {clabe}
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
          Copiar CLABE
        </button>
      </div>
      <div style={{ marginTop: 12 }}>
        <label className="upload">
          Subir comprobante SPEI
          <input type="file" accept="image/*,application/pdf" onChange={handleFile} />
        </label>
        {file && <p style={{ color: 'var(--muted)' }}>Archivo: {file.name}</p>}
      </div>
      <button
        className="cta"
        style={{ marginTop: 12 }}
        onClick={() => {
          if (file) {
            onUpload(file);
            onFinalize();
          }
        }}
        disabled={!file || saving}
      >
        {saving ? 'Enviando…' : 'Enviar comprobante y continuar'}
      </button>
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
        <p className="ticket-details">
          {order.role === 'runner' ? '👟 Corredor' : '🚶 Caminante'} · ${order.fee} MXN
        </p>
        <p className="ticket-details">
          {order.fullName} · {order.email}
        </p>
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

/* ========== HELPERS ========== */
function genId(len = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    ''
  );
}
function genPaymentRef() {
  const dt = new Date();
  return `SAUL-${dt.getFullYear()}${String(dt.getMonth() + 1).padStart(2, '0')}${String(dt.getDate()).padStart(2, '0')}-${genId(4)}`;
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
  const [previewUrl, setPreviewUrl] = useState(null);

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

  async function viewReceipt(path) {
    if (!path) return;
    const { data, error } = await supabase.storage.from('receipts').createSignedUrl(path, 600);
    if (error) {
      show('error', error.message);
      return;
    }
    setPreviewUrl(data.signedUrl);
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
              <th>Rol</th>
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
                <td>{r.role}</td>
                <td>${r.fee}</td>
                <td>{r.email}</td>
                <td>{r.ticket_code}</td>
                <td>{r.status}</td>
                <td>
                  {r.receipt_path ? (
                    <button className="cta" onClick={() => viewReceipt(r.receipt_path)}>
                      Ver
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
              {r.role === 'runner' ? '👟 Corredor' : '🚶 Caminante'} · ${r.fee}
            </p>
            <p>
              Status: <strong>{r.status}</strong>
            </p>
            <div className="actions">
              {r.receipt_path && (
                <button className="cta" onClick={() => viewReceipt(r.receipt_path)}>
                  Ver recibo
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

      {/* Modal comprobante */}
      {previewUrl && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div className="card" style={{ maxWidth: '90vw', maxHeight: '85vh', overflow: 'auto' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <h3>Comprobante</h3>
              <button className="cta" onClick={() => setPreviewUrl(null)}>
                Cerrar
              </button>
            </div>
            <iframe
              src={previewUrl}
              style={{ width: '80vw', height: '70vh', border: 'none' }}
              title="recibo"
            />
          </div>
        </div>
      )}
    </section>
  );
}

/* ========== MAIN APP ========== */
export default function App() {
  const { show, View: Toast } = useToast();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [order, setOrder] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(window.location.hash === '#admin');

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const handleStart = (type) => {
    setRole(type);
    setStep(2);
  };
  const handleSubmitData = (data) => {
    const fullOrder = { ...data, paymentRef: genPaymentRef(), ticketCode: genId(8) };
    setOrder(fullOrder);
    setStep(3);
  };
  const handleUpload = (file) => setReceipt(file);

  async function handleFinalize() {
    if (!receipt)
      return alert(
        'Excelente, ya subiste el comprobante. Ahora vuelve a tocar el botón para enviarlo.'
      );
    try {
      setSaving(true);
      const { count } = await supabase
        .from('registrations')
        .select('id', { count: 'exact', head: true })
        .or(
          `ticket_code.eq.${order.ticketCode},payment_ref.eq.${order.paymentRef},email.eq.${order.email}`
        );
      if (count && count > 0) {
        show('error', 'Registro duplicado');
        return;
      }
      const receiptPath = await uploadReceipt(receipt, order.ticketCode);
      const { error } = await supabase.from('registrations').insert({
        full_name: order.fullName,
        age: order.age,
        phone: order.phone,
        email: order.email,
        role: order.role,
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
                <h2>Elige tu participación</h2>
                <button className="cta" onClick={() => handleStart('runner')}>
                  👟 Quiero correr · $200
                </button>
                <button className="cta" onClick={() => handleStart('walker')}>
                  🚶 Quiero caminar · $100
                </button>
              </section>
            )}

            {step === 2 && (
              <RegistrationForm role={role} onBack={() => setStep(1)} onSubmit={handleSubmitData} />
            )}
            {step === 3 && order && (
              <PaymentStep
                order={order}
                onUpload={handleUpload}
                onFinalize={handleFinalize}
                saving={saving}
                show={show}
              />
            )}
            {step === 4 && order && <Ticket order={order} show={show} />}

            {/* 👇 Aquí aparecen tus nuevas secciones */}
            <Info />
            <Extras />
            <WhyParticipate />
          </>
        )}
        <footer className="footer">
          <span>Hecho con ❤️ en Nogales.</span>
          <span>Contacto: 631 10 88310 · TEApoyo Nogales</span>
        </footer>
        <Toast />
      </main>
    </>
  );
}
