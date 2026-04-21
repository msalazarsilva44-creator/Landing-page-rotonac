import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { categorias } from './data/productos';
import ProductosPage from './pages/ProductosPage';

// ─── Landing Page Component ──────────────────────────────────────────
function LandingPage() {
  const sliderImages = ['/hero1.png', '/hero2.png', '/hero3.png'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
      }
    }
  };
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    interes: '',
    mensaje: ''
  });
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email, interes, mensaje } = formData;
    if (!nombre.trim() || !mensaje.trim()) return;
    
    setFormStatus({ loading: true, success: false, error: null });

    try {
      // 1. Enviar Email vía API (Resend)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al enviar el email');

      setFormStatus({ loading: false, success: true, error: null });

      // 2. Preparar WhatsApp
      const phoneNumber = "584144436607"; 
      const interesLabel = interes ? `Estoy interesado en: ${interes}` : 'Consulta General';
      const text = `Hola Rotonac, mi nombre es ${nombre}.%0A%0A${interesLabel}%0A%0A${mensaje}%0A%0A(Mi correo es: ${email})`;
      const waUrl = `https://wa.me/${phoneNumber}?text=${text}`;
      
      // Abrir WhatsApp después de un breve delay
      setTimeout(() => {
        window.open(waUrl, "_blank");
        // Resetear formulario
        setFormData({ nombre: '', email: '', interes: '', mensaje: '' });
        setTimeout(() => setFormStatus({ loading: false, success: false, error: null }), 5000);
      }, 1000);

    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
      // Si falla el email, al menos intentar WhatsApp directly?
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] lg:min-h-[921px] flex items-center overflow-hidden bg-surface hero-gradient" id="home">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-0">
          {/* Image Slider - shown first on mobile (order-first), second on desktop */}
          <div className="relative z-10 group order-first lg:order-last">
            <div
              className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden ambient-shadow inner-glow cursor-pointer"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {sliderImages.map((src, idx) => (
                <img
                  key={src}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${currentImageIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  alt={`Tanque Industrial Rotonac ${idx + 1}`}
                  src={src}
                />
              ))}
              {/* Slider Indicators */}
              <div className="absolute bottom-16 lg:bottom-32 left-0 right-0 flex justify-center gap-2.5 z-20">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2.5 lg:h-2 rounded-full transition-all duration-300 ${currentImageIndex === idx ? 'bg-primary w-8' : 'w-2.5 lg:w-2 bg-white/60 hover:bg-white'} backdrop-blur-sm shadow-sm`}
                    style={{ minWidth: '10px', minHeight: '10px' }}
                    aria-label={`Mostrar diapositiva ${idx + 1}`}
                  />
                ))}
              </div>
              {/* Floating Glass Card */}
              <div className="absolute bottom-3 left-3 right-3 lg:bottom-8 lg:left-8 lg:right-8 glass-panel rounded-xl lg:rounded-2xl p-4 lg:p-6 inner-glow z-30">
                <div className="flex justify-between items-center mb-1 lg:mb-2">
                  <span className="font-headline font-bold text-base lg:text-lg text-on-surface">Serie Industrial X</span>
                  <span className="bg-secondary-container text-on-secondary-container px-2.5 lg:px-3 py-1 rounded-full text-xs font-bold tracking-wider">10,000L</span>
                </div>
                <p className="text-xs lg:text-sm text-on-surface-variant font-medium">Construcción en polietileno de alta densidad.</p>
              </div>
            </div>
          </div>
          {/* Text Content */}
          <div className="z-10 space-y-6 lg:space-y-8 order-last lg:order-first">
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-[4rem] leading-tight text-on-surface tracking-tight">
              <span className="text-gradient-primary">Fábrica</span> de<br />
              Tanques de Agua
            </h1>
            <p className="font-body text-base lg:text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Especialistas en rotomoldeo industrial para un almacenamiento de fluidos sin filtraciones. Unimos arquitectura de precisión con materiales de última generación para ofrecerte tanques duraderos ante cualquier clima.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 lg:pt-4">
              <Link className="bg-gradient-primary text-on-primary px-8 py-3.5 rounded-xl font-semibold text-center hover:scale-105 ambient-shadow transition-transform duration-300" to="/productos">
                Explorar Productos
              </Link>
              <a className="px-8 py-3.5 rounded-xl font-semibold text-center border border-secondary/40 text-secondary hover:bg-secondary/5 transition-colors duration-300" href="#contact">
                Solicitar Más información
              </a>
            </div>
            <div className="flex items-center gap-4 lg:gap-6 pt-6 lg:pt-8 mt-6 lg:mt-8 border-t border-surface-container-high/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs lg:text-sm font-medium text-on-surface-variant">Certificación ISO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <span className="text-xs lg:text-sm font-medium text-on-surface-variant">10 Años de Garantía</span>
              </div>
            </div>
          </div>
        </div>
        {/* Abstract background shape */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-surface-container-low -z-0 rounded-l-[100px] opacity-50 hidden lg:block transform translate-x-1/4"></div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-surface-container-low transition-colors duration-500" id="about">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight">Quiénes Somos</h2>
              <div className="w-16 h-1 bg-gradient-primary rounded-full mb-8"></div>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                En Rotonac, transcendemos la manufactura tradicional. Somos arquitectos de la contención de fluidos. Con más de dos décadas de experiencia en ingeniería de rotomoldeo, proveemos soluciones estructurales en las que las industrias confían para una seguridad y longevidad absolutas.
              </p>
              <p className="font-body text-base text-on-surface-variant leading-relaxed">
                Nuestro proceso asegura contenedores sin costuras y libres de tensión, capaces de soportar condiciones ambientales extremas, asegurando que tus recursos se preserven con una integridad inquebrantable.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow inner-glow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">target</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-4">Misión</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-auto">
                  Diseñar los sistemas de almacenamiento de fluidos más confiables y estructuralmente sólidos mediante tecnología de polímeros innovadora y procesos de manufactura de precisión.
                </p>
              </div>
              {/* Vision Card */}
              <div className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow inner-glow flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-secondary text-2xl">visibility</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-4">Visión</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mt-auto">
                  Establecer el estándar arquitectónico global para la contención de fluidos industrial y residencial, asegurando la gestión sustentable de los recursos para las futuras generaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Product Categories Grid ─── */}
      <section className="py-24 bg-surface" id="products">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight mb-4">Nuestra Línea de Productos</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Selecciona una categoría para explorar todos los modelos disponibles con sus especificaciones técnicas completas.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {categorias.map(cat => (
              <Link
                key={cat.id}
                to={`/productos?categoria=${cat.id}`}
                className="group bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow inner-glow hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    alt={cat.nombre}
                    src={cat.imagen}
                  />
                </div>
                <div className="p-4 md:p-6 text-center">
                  <h3 className="font-headline font-bold text-lg md:text-xl text-on-surface group-hover:text-primary transition-colors">
                    {cat.nombre}
                  </h3>
                  <p className="text-xs md:text-sm text-on-surface-variant mt-1 hidden md:block">{cat.descripcion}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver modelos <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-gradient-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:scale-105 ambient-shadow transition-transform duration-300"
            >
              Ver Catálogo Completo
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-surface-container-low relative overflow-hidden" id="contact">
        {/* Decorative Background Element */}
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent -z-0"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-surface tracking-tight mb-6">Inicia tu Proyecto</h2>
              <p className="text-on-surface-variant mb-12 max-w-md">Conéctate con nuestro equipo de ingeniería para discutir configuraciones a medida, especificaciones de los materiales o necesidades inmediatas de abastecimiento.</p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface text-lg">Sede Principal</h4>
                    <a 
                      href="https://www.google.com/maps/place/Rotonac+C.A./@10.2215452,-67.3337934,18.75z/data=!4m18!1m11!4m10!1m2!1m1!2sZona+Industrial+Soco+Prolongacion+Av+Inter-Industrial+Galpon+1!1m6!1m2!1s0x8c2a9e634574d085:0x8e12163158540335!2sLa+Victoria,+2121,+Aragua!2m2!1d-67.326501!2d10.218625!3m5!1s0x8c2a9ffa15159e0d:0x4de1f3c01c9ca56e!8m2!3d10.2215566!4d-67.3332265!16s%2Fg%2F11frb5fx66?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-on-surface-variant mt-1 hover:text-secondary transition-colors underline-offset-2 hover:underline inline-block"
                    >
                      Zona Industrial Soco, Prolongación Av. Inter-Industrial <br />Galpón 1-A, La Victoria, Edo. Aragua
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-secondary text-sm">mail</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-on-surface text-lg">Contacto Directo</h4>
                    <p className="text-sm text-on-surface-variant mt-1">viplas.ca@gmail.com<br />Rotonac@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-10 ambient-shadow inner-glow">
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="ghost-border pb-2 group">
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider group-focus-within:text-secondary transition-colors">Nombre Completo</label>
                    <input required value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} className="w-full bg-transparent border-none p-0 text-on-surface focus:ring-0 text-sm" placeholder="Juan Pérez" type="text" />
                  </div>
                  <div className="ghost-border pb-2 group">
                    <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider group-focus-within:text-secondary transition-colors">Correo Electrónico</label>
                    <input required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-none p-0 text-on-surface focus:ring-0 text-sm" placeholder="juan@empresa.com" type="email" />
                  </div>
                </div>
                <div className="ghost-border pb-2 group">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider group-focus-within:text-secondary transition-colors">Estoy Interesado En</label>
                  <select required value={formData.interes} onChange={(e) => setFormData({...formData, interes: e.target.value})} className="w-full bg-transparent border-none p-0 text-on-surface focus:ring-0 text-sm cursor-pointer appearance-none">
                    <option disabled value="">Selecciona una opción</option>
                    <option value="Tanques Residenciales (Mono / Doble / Triple Capa)">Tanques Residenciales</option>
                    <option value="Almacenamiento Industrial y Tambores">Almacenamiento Industrial</option>
                    <option value="Línea RotoAgro / Bebederos">Línea RotoAgro / Bebederos</option>
                    <option value="Cavas / Coolers">Cavas (Todo Terreno, Musicales, etc)</option>
                    <option value="Accesorios e Instalación">Accesorios (Filtros, Válvulas)</option>
                  </select>
                </div>
                <div className="ghost-border pb-2 group">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2 uppercase tracking-wider group-focus-within:text-secondary transition-colors">Mensaje</label>
                  <textarea required value={formData.mensaje} onChange={(e) => setFormData({...formData, mensaje: e.target.value})} className="w-full bg-transparent border-none p-0 text-on-surface focus:ring-0 text-sm resize-none" placeholder="Detalles o especificaciones del proyecto..." rows={3}></textarea>
                </div>
                <button 
                  disabled={formStatus.loading}
                  className={`w-full text-white py-4 rounded-xl font-bold text-sm hover:scale-[1.02] hover:shadow-lg transition-all duration-300 mt-4 flex items-center justify-center gap-2 ${formStatus.loading ? 'bg-slate-400' : 'bg-[#D93025] shadow-sm'}`} 
                  type="submit"
                >
                  {formStatus.loading ? (
                    <span className="flex items-center gap-2">
                       <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">mail</span>
                      Enviar Consulta por Email
                    </>
                  )}
                </button>
                {formStatus.success && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center font-medium animate-bounce">
                    ¡Mensaje enviado con éxito! Abriendo WhatsApp...
                  </div>
                )}
                {formStatus.error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center font-medium">
                    Error: {formStatus.error}. Intenta de nuevo.
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Shared Header ───────────────────────────────────────────────────
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    const handleClick = () => setMobileMenuOpen(false);
    return () => handleClick;
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center">
          <img src="/logo.jpg" alt="Rotonac Logo" className="h-12 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center space-x-8 font-manrope text-sm font-semibold tracking-tight">
          <Link className="text-primary border-b-2 border-primary pb-1" to="/">Inicio</Link>
          <a className="text-slate-700 hover:text-secondary transition-colors" href="/#about">Nosotros</a>
          <Link className="text-slate-700 hover:text-secondary transition-colors" to="/productos">Productos</Link>
          <a className="text-slate-700 hover:text-secondary transition-colors" href="/#contact">Contacto</a>
        </div>
        <div className="hidden md:block">
          <a className="bg-gradient-primary text-on-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 hover:shadow-lg transition-transform duration-300 inline-block" href="/#contact">
            Cotizar
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary p-2 -mr-2 rounded-lg hover:bg-primary/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-[72px] bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[72px] left-0 right-0 bg-white/95 backdrop-blur-xl z-50 shadow-xl transition-all duration-300 ease-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 py-6 space-y-1">
          <Link
            className="text-primary font-semibold text-lg py-3 px-4 rounded-xl bg-primary/5"
            to="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <a
            className="text-slate-700 font-semibold text-lg py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            Nosotros
          </a>
          <Link
            className="text-slate-700 font-semibold text-lg py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            to="/productos"
            onClick={() => setMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <a
            className="text-slate-700 font-semibold text-lg py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors"
            href="/#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contacto
          </a>
          <div className="pt-4 border-t border-slate-100 mt-2">
            <a
              className="bg-gradient-primary text-on-primary px-6 py-3.5 rounded-xl font-semibold text-center block hover:shadow-lg transition-all duration-300"
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cotizar Ahora
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Shared Footer ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full py-16 px-8 bg-secondary text-on-secondary transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 max-w-7xl mx-auto">
        {/* Brand & Copy */}
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-bold font-headline">
            Rotonac
          </div>
          <p className="font-body text-sm text-secondary-fixed-dim leading-relaxed">
            Excelencia en Ingeniería para el Almacenamiento de Fluidos. Soluciones de la más alta calidad y resistencia.
          </p>
          <p className="font-body text-xs text-secondary-fixed-dim mt-auto pt-4">
            © 2024 Rotonac.<br />Todos los derechos reservados.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col">
          <h4 className="font-headline font-bold text-lg mb-6">Empresa</h4>
          <div className="flex flex-col space-y-3 font-inter text-sm">
            <a className="text-secondary-fixed-dim hover:text-on-secondary transition-colors" href="#">Política de Privacidad</a>
            <a className="text-secondary-fixed-dim hover:text-on-secondary transition-colors" href="#">Términos de Servicio</a>
            <a className="text-secondary-fixed-dim hover:text-on-secondary transition-colors" href="#">Guía de Instalación</a>
            <a className="text-secondary-fixed-dim hover:text-on-secondary transition-colors" href="#">Distribuidores</a>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col xl:col-span-1">
          <h4 className="font-headline font-bold text-lg mb-6">Información de Contacto</h4>
          <div className="flex flex-col space-y-4 font-inter text-sm text-secondary-fixed-dim">
            <a 
              href="https://www.google.com/maps/place/Rotonac+C.A./@10.2215452,-67.3337934,18.75z/data=!4m18!1m11!4m10!1m2!1m1!2sZona+Industrial+Soco+Prolongacion+Av+Inter-Industrial+Galpon+1!1m6!1m2!1s0x8c2a9e634574d085:0x8e12163158540335!2sLa+Victoria,+2121,+Aragua!2m2!1d-67.326501!2d10.218625!3m5!1s0x8c2a9ffa15159e0d:0x4de1f3c01c9ca56e!8m2!3d10.2215566!4d-67.3332265!16s%2Fg%2F11frb5fx66?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 hover:text-on-secondary transition-colors group"
            >
              <span className="material-symbols-outlined text-lg translate-y-0.5 group-hover:text-on-secondary transition-colors">location_on</span>
              <span className="leading-relaxed underline-offset-2 group-hover:underline">Zona Industrial Soco, Prolongación Av. Inter-Industrial Galpón 1-A,<br />La Victoria, Edo. Aragua</span>
            </a>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-lg translate-y-0.5">call</span>
              <span className="leading-relaxed">Fijo: 0244-3224942 / 3222181<br />Móvil: 0414-3182581</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-lg translate-y-0.5">badge</span>
              <span>RIF: J-31081381-7</span>
            </div>
            <div className="flex items-start gap-3 border-t border-on-secondary/10 pt-4 mt-2">
              <span className="material-symbols-outlined text-lg translate-y-0.5">mail</span>
              <span className="leading-relaxed">viplas.ca@gmail.com<br />Rotonac@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col xl:items-end">
          <h4 className="font-headline font-bold text-lg mb-6 w-full xl:text-right">Nuestras Redes</h4>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a className="w-10 h-10 rounded-full bg-secondary-fixed/10 flex items-center justify-center text-secondary-fixed-dim hover:text-on-secondary hover:bg-secondary-fixed/30 hover:-translate-y-1 transition-all duration-300 shadow-sm" href="#" title="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Facebook */}
            <a className="w-10 h-10 rounded-full bg-secondary-fixed/10 flex items-center justify-center text-secondary-fixed-dim hover:text-on-secondary hover:bg-secondary-fixed/30 hover:-translate-y-1 transition-all duration-300 shadow-sm" href="#" title="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a className="w-10 h-10 rounded-full bg-secondary-fixed/10 flex items-center justify-center text-secondary-fixed-dim hover:text-on-secondary hover:bg-secondary-fixed/30 hover:-translate-y-1 transition-all duration-300 shadow-sm" href="#" title="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.031 2C6.486 2 2 6.486 2 12.031c0 1.761.458 3.486 1.332 5l-1.328 4.887 5-1.314c1.472.843 3.149 1.288 4.88 1.288h.001c5.546 0 10.035-4.485 10.035-10.03C22.066 6.467 17.58 2 12.031 2zm6.002 14.538c-.247.697-1.42 1.353-1.954 1.439-.512.083-1.17.15-3.342-.748-3.093-1.276-5.076-4.42-5.232-4.629-.153-.207-1.253-1.666-1.253-3.176 0-1.51.782-2.253 1.06-2.548.277-.294.606-.367.808-.367.202 0 .404.004.582.012.185.008.435-.067.68.536.257.632.833 2.038.908 2.189.073.151.122.327.024.524-.099.195-.148.318-.295.49-.148.171-.31.365-.443.513-.146.166-.301.346-.129.645.171.298.761 1.26 1.637 2.037 1.132.1 2.138 1.314 2.457 1.51.319.196.505.172.695-.049.19-.22.825-.964 1.045-1.296.22-.332.44-.277.734-.167.294.11 1.86.88 2.18 1.038.319.158.533.245.61.382.078.136.078.789-.169 1.486z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* VIPLAS Logo */}
          <div className="mt-8 flex w-full xl:justify-end">
            <div className="bg-white rounded-xl p-2 w-fit shadow-lg shadow-black/10 hover:scale-105 transition-transform duration-300">
              <img src="/viplas-logo.jpg" alt="VIPLAS Victoriana de plástico" className="h-10 w-auto object-contain" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

// ─── Scroll to Top Component ───────────────────────────────────────────
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-32 right-6 z-[90] bg-primary text-on-primary w-12 h-12 rounded-xl shadow-lg flex items-center justify-center hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Volver arriba"
    >
      <span className="material-symbols-outlined font-bold text-2xl">expand_less</span>
    </button>
  );
}

// ─── Scroll Restoration on Route Change ────────────────────────────────
function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productos" element={<ProductosPage />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
      {/* Botón Flotante Global WhatsApp */}
      <a 
        href="https://wa.me/584144436607?text=Hola,%20vengo%20de%20la%20p%C3%A1gina%20web,%20necesito%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20los%20productos%20que%20venden." 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-3.5 rounded-full shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center animate-[bounce_3s_infinite]"
        title="Contáctanos por WhatsApp"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12.031 2C6.486 2 2 6.486 2 12.031c0 1.761.458 3.486 1.332 5l-1.328 4.887 5-1.314c1.472.843 3.149 1.288 4.88 1.288h.001c5.546 0 10.035-4.485 10.035-10.03C22.066 6.467 17.58 2 12.031 2zm6.002 14.538c-.247.697-1.42 1.353-1.954 1.439-.512.083-1.17.15-3.342-.748-3.093-1.276-5.076-4.42-5.232-4.629-.153-.207-1.253-1.666-1.253-3.176 0-1.51.782-2.253 1.06-2.548.277-.294.606-.367.808-.367.202 0 .404.004.582.012.185.008.435-.067.68.536.257.632.833 2.038.908 2.189.073.151.122.327.024.524-.099.195-.148.318-.295.49-.148.171-.31.365-.443.513-.146.166-.301.346-.129.645.171.298.761 1.26 1.637 2.037 1.132.1 2.138 1.314 2.457 1.51.319.196.505.172.695-.049.19-.22.825-.964 1.045-1.296.22-.332.44-.277.734-.167.294.11 1.86.88 2.18 1.038.319.158.533.245.61.382.078.136.078.789-.169 1.486z" clipRule="evenodd" />
        </svg>
      </a>
    </BrowserRouter>
  );
}

export default App;
