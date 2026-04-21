import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categorias, productos } from '../data/productos';

function ProductosPage() {
  const [searchParams] = useSearchParams();
  const categoriaParam = searchParams.get('categoria') || 'todos';
  const [filtroActivo, setFiltroActivo] = useState(categoriaParam);
  const [busqueda, setBusqueda] = useState('');
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const [imagenIndex, setImagenIndex] = useState(0);

  const productosFiltrados = useMemo(() => {
    let lista = filtroActivo === 'todos' ? productos : productos.filter(p => p.categoria === filtroActivo);
    if (busqueda.trim()) {
      const query = busqueda.trim().toLowerCase();
      lista = lista.filter(p => p.modelo.toLowerCase().startsWith(query) || p.modelo.toLowerCase().includes(query));
    }
    return lista;
  }, [filtroActivo, busqueda]);

  return (
    <main className="pt-24">
      {/* Page Header */}
      <section className="py-16 bg-surface hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-medium text-sm">Volver al Inicio</span>
          </Link>
          <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight mb-4">
            Nuestros <span className="text-gradient-primary">Productos</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl">
            Explora nuestro catálogo completo de tanques fabricados con tecnología de rotomoldeo de última generación.
          </p>
        </div>
      </section>

      <section className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-xl border-b border-surface-container-highest/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Barra de búsqueda */}
            <div className="relative flex-shrink-0 w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
              <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 border border-transparent focus:border-primary/40 focus:ring-0 focus:outline-none transition-all duration-200"
              />
              {busqueda && (
                <button
                  onClick={() => setBusqueda('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
            {/* Separador */}
            <div className="hidden sm:block h-6 w-px bg-surface-container-highest/50"></div>
            {/* Filtros de categoría */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setFiltroActivo('todos')}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  filtroActivo === 'todos'
                    ? 'bg-gradient-primary text-on-primary shadow-md'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Todos
              </button>
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFiltroActivo(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    filtroActivo === cat.id
                      ? 'bg-gradient-primary text-on-primary shadow-md'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Results count */}
          <p className="text-sm text-on-surface-variant mb-8">
            Mostrando <span className="font-bold text-on-surface">{productosFiltrados.length}</span> producto{productosFiltrados.length !== 1 ? 's' : ''}
            {filtroActivo !== 'todos' && (
              <> en <span className="font-bold text-primary">{categorias.find(c => c.id === filtroActivo)?.nombre}</span></>
            )}
            {busqueda.trim() && (
              <> para <span className="font-bold text-secondary">&ldquo;{busqueda}&rdquo;</span></>
            )}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {productosFiltrados.map(producto => (
              <div key={producto.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden ambient-shadow inner-glow group">
                <div className="relative h-56 sm:h-64 overflow-hidden bg-white">
                  <img
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-4 cursor-pointer"
                    alt={`Tanque ${producto.modelo} Rotonac`}
                    src={producto.imagen}
                    onClick={() => {
                      setImagenAmpliada(producto);
                      setImagenIndex(0);
                    }}
                  />
                  <div className={`absolute top-4 right-4 ${
                    producto.badgeColor === 'primary'
                      ? 'bg-primary text-on-primary'
                      : 'bg-secondary-container text-on-secondary-container'
                  } px-3 py-1 rounded-full text-xs font-bold tracking-wider`}>
                    {producto.badge}
                  </div>
                </div>
                <div className="p-5 sm:p-8">
                  <h3 className="font-headline font-bold text-2xl text-on-surface mb-2">{producto.modelo}</h3>
                  <p className="text-sm text-on-surface-variant mb-6">{producto.descripcion}</p>
                  <div className="bg-surface-container-low rounded-xl p-4">
                    <table className="w-full text-sm">
                      <tbody>
                        {producto.specs.map((spec, idx) => (
                          <tr key={idx} className={idx < producto.specs.length - 1 ? 'border-b border-surface-container-highest/50' : ''}>
                            <td className="py-2 text-on-surface-variant font-medium">{spec.label}</td>
                            <td className="py-2 text-right font-semibold text-on-surface">{spec.value}</td>
                          </tr>
                        ))}
                        {producto.tecnologia && (
                          <tr className="border-t border-surface-container-highest/50">
                            <td className="py-2 text-on-surface-variant font-medium">Tecnología</td>
                            <td className="py-2 text-right font-semibold text-primary">{producto.tecnologia}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {productosFiltrados.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">inventory_2</span>
              <p className="text-on-surface-variant text-lg">No hay productos en esta categoría aún.</p>
              <button
                onClick={() => setFiltroActivo('todos')}
                className="mt-4 text-primary font-semibold hover:underline"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Expanded Image Modal */}
      {imagenAmpliada && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setImagenAmpliada(null)}
        >
          <div 
            className="relative bg-white rounded-3xl p-2 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-surface-container-highest/80 hover:bg-error hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
              onClick={() => setImagenAmpliada(null)}
            >
              <span className="material-symbols-outlined font-bold">close</span>
            </button>
            <div className="flex-1 overflow-hidden p-6 flex flex-col items-center justify-center bg-surface-container-lowest rounded-2xl relative">
              {imagenAmpliada.imagenes && imagenAmpliada.imagenes.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImagenIndex((prev) => (prev - 1 + imagenAmpliada.imagenes.length) % imagenAmpliada.imagenes.length); }}
                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all shadow-md z-10"
                  >
                    <span className="material-symbols-outlined font-bold">chevron_left</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImagenIndex((prev) => (prev + 1) % imagenAmpliada.imagenes.length); }}
                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all shadow-md z-10"
                  >
                    <span className="material-symbols-outlined font-bold">chevron_right</span>
                  </button>
                </>
              )}
              <img 
                src={imagenAmpliada.imagenes ? imagenAmpliada.imagenes[imagenIndex] : imagenAmpliada.imagen} 
                alt={`Vista ampliada de ${imagenAmpliada.modelo}`} 
                className="max-w-full max-h-[60vh] object-contain mb-4 drop-shadow-xl"
              />
              {imagenAmpliada.imagenes && imagenAmpliada.imagenes.length > 1 && (
                <div className="flex gap-2 mb-4">
                  {imagenAmpliada.imagenes.map((_, i) => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === imagenIndex ? 'bg-primary' : 'bg-surface-container-highest'}`} />
                  ))}
                </div>
              )}
              <div className="text-center">
                <h3 className="font-headline font-bold text-2xl text-on-surface mb-2">{imagenAmpliada.modelo}</h3>
                <p className="text-sm text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full inline-block">
                  {imagenAmpliada.descripcion}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductosPage;
