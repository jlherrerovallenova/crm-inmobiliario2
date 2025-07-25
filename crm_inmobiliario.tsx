import React, { useState, createContext, useContext, useMemo, useCallback, memo } from 'react';
import { 
  Building2, TrendingUp, Home, Users, FileText, Calendar, Bell, User, Plus, Edit, Eye, 
  Download, DollarSign, FileCheck, Phone, Mail, MapPin, Search, Trash2, Check, X,
  Heart, CreditCard, AlertCircle, Clock, CheckCircle
} from 'lucide-react';

// ===== CONTEXTO GLOBAL DE LA APLICACIÓN =====
const CRMContext = createContext();

const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM debe usarse dentro de CRMProvider');
  }
  return context;
};

const CRMProvider = ({ children }) => {
  const [data, setData] = useState({
    viviendas: [
      { 
        id: 1, portal: '1A', planta: '1º', letra: 'A', tipologia: 'Interior', orientacion: 'NORTE', 
        dormitorios: 1, superficieUtil: 48.27, superficieConstruida: 52.15, superficieTerraza: 5.56, 
        garaje: 'G-01', trastero: 'T-01', pvpFinal: 153000, estado: 'Reservada', fechaEntrega: '2025-12-15' 
      },
      { 
        id: 2, portal: '1A', planta: '1º', letra: 'B', tipologia: 'Interior', orientacion: 'NORTE', 
        dormitorios: 1, superficieUtil: 48.23, superficieConstruida: 52.10, superficieTerraza: 5.56, 
        garaje: '', trastero: '', pvpFinal: 153000, estado: 'Disponible', fechaEntrega: '2025-12-15' 
      },
      { 
        id: 3, portal: '1A', planta: '2º', letra: 'C', tipologia: 'Exterior', orientacion: 'SUR', 
        dormitorios: 2, superficieUtil: 70.22, superficieConstruida: 76.85, superficieTerraza: 7.89, 
        garaje: 'G-03', trastero: '', pvpFinal: 230000, estado: 'Contratada', fechaEntrega: '2025-12-15' 
      },
      { 
        id: 4, portal: '1B', planta: '3º', letra: 'D', tipologia: 'Exterior', orientacion: 'SUROESTE', 
        dormitorios: 3, superficieUtil: 85.40, superficieConstruida: 92.15, superficieTerraza: 16.13, 
        garaje: 'G-04', trastero: 'T-04', pvpFinal: 285000, estado: 'Disponible', fechaEntrega: '2025-12-15' 
      },
      { 
        id: 5, portal: '1B', planta: 'Ático', letra: 'A', tipologia: 'Exterior', orientacion: 'SUROESTE', 
        dormitorios: 3, superficieUtil: 95.75, superficieConstruida: 105.20, superficieTerraza: 25.50, 
        garaje: 'G-05', trastero: 'T-05', pvpFinal: 350000, estado: 'Reservada', fechaEntrega: '2025-12-15' 
      }
    ],
    compradores: [
      {
        id: 1, nombre: 'Juan', apellidos: 'Pérez García', dni: '12345678A', direccion: 'Calle Mayor 123',
        cp: '28001', municipio: 'Madrid', provincia: 'Madrid', email: 'juan.perez@email.com',
        tlf1: '666123456', tlf2: '917891234', numeroCuenta: 'ES91 2100 0418 4502 0005 1332',
        estadoCivil: 'Casado', estadoProceso: 'Comprador Activo', viviendaAsignada: 1,
        fechaRegistro: '2025-07-01', notas: 'Cliente muy interesado, tiene financiación preaprobada'
      },
      {
        id: 2, nombre: 'María', apellidos: 'García López', dni: '87654321B', direccion: 'Avenida Sol 456',
        cp: '28002', municipio: 'Madrid', provincia: 'Madrid', email: 'maria.garcia@email.com',
        tlf1: '677987654', tlf2: '', numeroCuenta: 'ES91 0049 0001 5025 1111 2222',
        estadoCivil: 'Soltera', estadoProceso: 'Contratado', viviendaAsignada: 3,
        fechaRegistro: '2025-06-15', notas: 'Contrato firmado, pendiente de escritura'
      },
      {
        id: 3, nombre: 'Carlos', apellidos: 'Martínez Ruiz', dni: '45678912C', direccion: 'Plaza España 78',
        cp: '28008', municipio: 'Madrid', provincia: 'Madrid', email: 'carlos.martinez@email.com',
        tlf1: '688555123', tlf2: '913456789', numeroCuenta: 'ES91 2038 0100 2200 1234 5678',
        estadoCivil: 'Soltero', estadoProceso: 'Reservado', viviendaAsignada: 5,
        fechaRegistro: '2025-07-18', notas: 'Reserva realizada, pendiente documentación'
      }
    ],
    documentos: [
      {
        id: 1, tipo: 'Documento de Reserva', viviendaId: 1, compradorId: 1,
        fechaGeneracion: '2025-07-15', estado: 'Generado', importeReserva: 6120,
        fechaVencimiento: '2025-07-30', notas: 'Reserva confirmada, documentación completa'
      },
      {
        id: 2, tipo: 'Contrato de Compraventa', viviendaId: 3, compradorId: 2,
        fechaGeneracion: '2025-07-10', estado: 'Firmado', importeTotal: 230000,
        fechaFirma: '2025-07-12', notas: 'Contrato firmado por ambas partes'
      }
    ],
    eventos: [
      {
        id: 1, titulo: 'Escritura Vivienda 1A-1º-A', tipo: 'Escritura', viviendaId: 1, compradorId: 1,
        fecha: '2025-09-15', hora: '10:00', ubicacion: 'Notaría García Martín', estado: 'Programada',
        notas: 'Confirmar asistencia 48h antes'
      },
      {
        id: 2, titulo: 'Firma Contrato 1A-2º-C', tipo: 'Contrato', viviendaId: 3, compradorId: 2,
        fecha: '2025-07-25', hora: '11:30', ubicacion: 'Oficina Inmobiliaria', estado: 'Confirmada',
        notas: 'Traer documentación original'
      },
      {
        id: 3, titulo: 'Visita Obra 1B-Ático-A', tipo: 'Visita', viviendaId: 5, compradorId: 3,
        fecha: '2025-07-28', hora: '16:00', ubicacion: 'Proyecto Farnesio', estado: 'Programada',
        notas: 'Mostrar acabados personalizables'
      }
    ]
  });

  const getVivienda = (id) => data.viviendas.find(v => v.id === id);
  const getComprador = (id) => data.compradores.find(c => c.id === id);
  
  // Helper para generar número de vivienda
  const getNumeroVivienda = (vivienda) => {
    if (!vivienda) return '';
    return `${vivienda.portal}-${vivienda.planta}-${vivienda.letra}`;
  };

  // Helper para obtener opciones de letra según portal y planta
  const getOpcionesLetra = (portal, planta) => {
    if (planta === 'Ático') {
      return portal === '1A' ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D', 'E'];
    }
    return portal === '1A' ? ['A', 'B', 'C', 'D', 'E'] : ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  };

  const actualizarVivienda = (id, datosActualizados) => {
    setData(prev => ({
      ...prev,
      viviendas: prev.viviendas.map(v => v.id === id ? { ...v, ...datosActualizados } : v)
    }));
  };

  const agregarVivienda = (vivienda) => {
    setData(prev => ({
      ...prev,
      viviendas: [...prev.viviendas, { ...vivienda, id: Date.now() }]
    }));
  };

  const actualizarComprador = (id, datosActualizados) => {
    setData(prev => ({
      ...prev,
      compradores: prev.compradores.map(c => c.id === id ? { ...c, ...datosActualizados } : c)
    }));
  };

  const agregarComprador = (comprador) => {
    setData(prev => ({
      ...prev,
      compradores: [...prev.compradores, { ...comprador, id: Date.now() }]
    }));
  };

  const agregarDocumento = (documento) => {
    setData(prev => ({
      ...prev,
      documentos: [...prev.documentos, { ...documento, id: Date.now() }]
    }));
  };

  const agregarEvento = (evento) => {
    setData(prev => ({
      ...prev,
      eventos: [...prev.eventos, { ...evento, id: Date.now() }]
    }));
  };

  return (
    <CRMContext.Provider value={{
      data,
      getVivienda,
      getComprador,
      getNumeroVivienda,
      getOpcionesLetra,
      actualizarVivienda,
      agregarVivienda,
      actualizarComprador,
      agregarComprador,
      agregarDocumento,
      agregarEvento
    }}>
      {children}
    </CRMContext.Provider>
  );
};

// ===== COMPONENTE MODAL REUTILIZABLE OPTIMIZADO =====
const Modal = memo(({ isOpen, onClose, children, title, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg p-6 w-full ${sizeClasses[size]} max-h-96 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>
        {children}
      </div>
    </div>
  );
});

// ===== MÓDULO DASHBOARD =====
const DashboardModule = () => {
  const { data, getNumeroVivienda } = useCRM();
  
  const viviendasVendidas = data.viviendas.filter(v => ['Reservada', 'Contratada', 'Escriturada'].includes(v.estado));
  const compradorActivos = data.compradores.filter(c => ['Comprador Activo', 'Contratado', 'Reservado'].includes(c.estadoProceso));
  const proximosEventos = data.eventos.filter(e => new Date(e.fecha) >= new Date()).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Viviendas Vendidas</p>
              <p className="text-2xl font-bold text-gray-900">{viviendasVendidas.length} / {data.viviendas.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compradores Activos</p>
              <p className="text-2xl font-bold text-gray-900">{compradorActivos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documentos Generados</p>
              <p className="text-2xl font-bold text-gray-900">{data.documentos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Eventos Programados</p>
              <p className="text-2xl font-bold text-gray-900">{data.eventos.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos eventos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Próximos Eventos</h2>
        <div className="space-y-3">
          {proximosEventos.map(evento => {
            const vivienda = data.viviendas.find(v => v.id === evento.viviendaId);
            const comprador = data.compradores.find(c => c.id === evento.compradorId);
            return (
              <div key={evento.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  evento.tipo === 'Escritura' ? 'bg-green-500' :
                  evento.tipo === 'Contrato' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{evento.titulo}</span>
                    <span className="text-sm text-gray-500">{evento.fecha} - {evento.hora}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {getNumeroVivienda(vivienda)} - {comprador?.nombre} {comprador?.apellidos}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen de ventas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Estado de Viviendas</h3>
          <div className="space-y-3">
            {['Disponible', 'Reservada', 'Contratada', 'Escriturada'].map(estado => {
              const count = data.viviendas.filter(v => v.estado === estado).length;
              const percentage = (count / data.viviendas.length) * 100;
              return (
                <div key={estado} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{estado}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          estado === 'Disponible' ? 'bg-gray-500' :
                          estado === 'Reservada' ? 'bg-yellow-500' :
                          estado === 'Contratada' ? 'bg-blue-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alertas y Notificaciones</h3>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Reserva por vencer</p>
                <p className="text-xs text-yellow-700">Vivienda 1A-1º-A expira el 30/07/2025</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">Escritura programada</p>
                <p className="text-xs text-blue-700">Juan Pérez - 15/09/2025</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Contrato firmado</p>
                <p className="text-xs text-green-700">María García - Vivienda 1A-C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== MÓDULO VIVIENDAS =====
const ViviendasModule = () => {
  const { data, actualizarVivienda, agregarVivienda, getNumeroVivienda, getOpcionesLetra } = useCRM();
  const [filtro, setFiltro] = useState('todas');
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [modalImportarVisible, setModalImportarVisible] = useState(false);
  const [viviendaEditando, setViviendaEditando] = useState(null);
  const [archivoImportar, setArchivoImportar] = useState(null);
  const [datosPreview, setDatosPreview] = useState([]);
  const [importando, setImportando] = useState(false);

  const viviendasFiltradas = data.viviendas.filter(v => {
    if (filtro === 'disponibles') return v.estado === 'Disponible';
    if (filtro === 'vendidas') return ['Reservada', 'Contratada', 'Escriturada'].includes(v.estado);
    return true;
  });

  // Funciones para importación de archivos
  const manejarArchivoSeleccionado = async (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;

    setArchivoImportar(archivo);
    setImportando(true);

    try {
      let datos = [];
      
      if (archivo.name.endsWith('.csv')) {
        datos = await leerCSV(archivo);
      } else if (archivo.name.endsWith('.xlsx') || archivo.name.endsWith('.xls')) {
        datos = await leerExcel(archivo);
      } else {
        alert('Formato de archivo no soportado. Use CSV o Excel (.xlsx, .xls)');
        setImportando(false);
        return;
      }

      setDatosPreview(datos.slice(0, 5)); // Mostrar solo 5 filas de preview
    } catch (error) {
      alert('Error al leer el archivo: ' + error.message);
    }
    
    setImportando(false);
  };

  const leerExcel = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          
          // Convertir a texto CSV simulado (implementación básica)
          // En una implementación real, usarías SheetJS: const workbook = XLSX.read(data);
          
          // Por ahora, pedimos al usuario que convierta a CSV
          reject(new Error('Para archivos Excel, por favor guarda el archivo como CSV primero. Esto asegura una importación más precisa.'));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo Excel'));
      reader.readAsArrayBuffer(archivo);
    });
  };

  const leerCSV = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const texto = e.target.result;
          const lineas = texto.split('\n').filter(linea => linea.trim());
          
          if (lineas.length < 2) {
            reject(new Error('El archivo debe tener al menos una fila de encabezados y una fila de datos'));
            return;
          }
          
          // Detectar separador (coma, punto y coma, tabulación)
          const primeraLinea = lineas[0];
          let separador = ',';
          if (primeraLinea.includes(';')) separador = ';';
          else if (primeraLinea.includes('\t')) separador = '\t';
          
          const headers = lineas[0].split(separador).map(h => h.trim().replace(/"/g, ''));
          
          const datos = lineas.slice(1).map((linea, index) => {
            try {
              // Manejar comillas y separadores dentro de campos
              const valores = linea.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || linea.split(separador);
              const fila = {};
              
              headers.forEach((header, headerIndex) => {
                let valor = valores[headerIndex] || '';
                valor = valor.trim().replace(/^"(.*)"$/, '$1'); // Quitar comillas
                fila[header] = valor;
              });
              
              return fila;
            } catch (error) {
              console.warn(`Error en línea ${index + 2}:`, error);
              return null;
            }
          }).filter(fila => fila !== null);
          
          console.log(`Leídas ${datos.length} filas del CSV`);
          resolve(datos);
        } catch (error) {
          reject(new Error(`Error al procesar CSV: ${error.message}`));
        }
      };
      reader.onerror = () => reject(new Error('Error al leer el archivo'));
      reader.readAsText(archivo, 'UTF-8');
    });
  };

  const procesarDatosImportacion = (datos) => {
    console.log('Procesando datos:', datos.length, 'filas');
    
    return datos.map((fila, index) => {
      try {
        // Buscar columnas con diferentes variaciones de nombres
        const portal = fila.portal || fila.Portal || fila.PORTAL || '1A';
        const planta = fila.planta || fila.Planta || fila.PLANTA || fila.piso || '1º';
        const letra = fila.letra || fila.Letra || fila.LETRA || 'A';
        const tipologia = fila.tipologia || fila.Tipologia || fila.TIPOLOGIA || fila.tipo || 'Interior';
        const orientacion = fila.orientacion || fila.Orientacion || fila.ORIENTACION || fila.orient || 'NORTE';
        const dormitorios = parseInt(fila.dormitorios || fila.Dormitorios || fila.DORMITORIOS || fila.dorm || fila.hab || 1);
        const superficieUtil = parseFloat(fila.superficieUtil || fila.SuperficieUtil || fila.SUPERFICIE_UTIL || fila.sup_util || fila.superficie || 0);
        const superficieConstruida = parseFloat(fila.superficieConstruida || fila.SuperficieConstruida || fila.SUPERFICIE_CONSTRUIDA || fila.sup_const || 0);
        const superficieTerraza = parseFloat(fila.superficieTerraza || fila.SuperficieTerraza || fila.SUPERFICIE_TERRAZA || fila.sup_terraza || fila.terraza || 0);
        const garaje = fila.garaje || fila.Garaje || fila.GARAJE || fila.parking || '';
        const trastero = fila.trastero || fila.Trastero || fila.TRASTERO || fila.tras || '';
        const pvpFinal = parseInt(fila.pvpFinal || fila.PvpFinal || fila.PVP_FINAL || fila.precio || fila.Precio || fila.PRECIO || fila.pvp || 0);
        const estado = fila.estado || fila.Estado || fila.ESTADO || fila.status || 'Disponible';
        const fechaEntrega = fila.fechaEntrega || fila.FechaEntrega || fila.FECHA_ENTREGA || fila.entrega || '2025-12-15';

        // Validar datos obligatorios
        if (!portal || !planta || !letra) {
          console.warn(`Fila ${index + 1}: Portal, Planta o Letra vacíos`);
          return null;
        }
        
        if (!pvpFinal || pvpFinal <= 0) {
          console.warn(`Fila ${index + 1}: PVP Final inválido (${pvpFinal})`);
          return null;
        }

        return {
          portal: portal.trim(),
          planta: planta.trim(),
          letra: letra.trim().toUpperCase(),
          tipologia: tipologia.trim(),
          orientacion: orientacion.trim().toUpperCase(),
          dormitorios: isNaN(dormitorios) ? 1 : Math.max(1, Math.min(3, dormitorios)),
          superficieUtil: isNaN(superficieUtil) ? 0 : superficieUtil,
          superficieConstruida: isNaN(superficieConstruida) ? 0 : superficieConstruida,
          superficieTerraza: isNaN(superficieTerraza) ? 0 : superficieTerraza,
          garaje: garaje.trim(),
          trastero: trastero.trim(),
          pvpFinal: pvpFinal,
          estado: estado.trim(),
          fechaEntrega: fechaEntrega.trim()
        };
      } catch (error) {
        console.warn(`Error en fila ${index + 1}:`, error);
        return null;
      }
    }).filter(vivienda => vivienda !== null);
  };

  const importarViviendas = async () => {
    if (!archivoImportar) {
      alert('Por favor, selecciona un archivo primero');
      return;
    }

    setImportando(true);

    try {
      let datos = [];
      
      if (archivoImportar.name.endsWith('.csv')) {
        datos = await leerCSV(archivoImportar);
      } else {
        // Para archivos Excel, mostrar advertencia
        alert('Los archivos Excel pueden no importarse completamente. Se recomienda convertir a CSV para mejores resultados.');
        datos = await leerExcel(archivoImportar);
      }

      console.log('Datos leídos del archivo:', datos.length);

      if (datos.length === 0) {
        alert('El archivo está vacío o no se pudo leer correctamente');
        return;
      }

      const viviendasProcesadas = procesarDatosImportacion(datos);
      console.log('Viviendas procesadas:', viviendasProcesadas.length);

      const viviendasValidas = viviendasProcesadas.filter(v => v && v.portal && v.planta && v.letra && v.pvpFinal > 0);
      console.log('Viviendas válidas:', viviendasValidas.length);

      if (viviendasValidas.length === 0) {
        alert(`No se encontraron viviendas válidas en el archivo. 
        
Verifica que el archivo contenga:
• Columnas "portal", "planta", "letra" con valores válidos
• Columna "pvpFinal" con valores numéricos
• Al menos una fila de datos además de los encabezados`);
        return;
      }

      // Verificar duplicados con viviendas existentes (usando portal+planta+letra)
      const viviendasExistentes = data.viviendas.map(v => `${v.portal}-${v.planta}-${v.letra}`);
      const viviendasSinDuplicados = viviendasValidas.filter(v => {
        const identificador = `${v.portal}-${v.planta}-${v.letra}`;
        return !viviendasExistentes.includes(identificador);
      });
      
      if (viviendasSinDuplicados.length < viviendasValidas.length) {
        const duplicados = viviendasValidas.length - viviendasSinDuplicados.length;
        if (!confirm(`Se encontraron ${duplicados} viviendas duplicadas que serán omitidas. ¿Continuar con la importación de ${viviendasSinDuplicados.length} viviendas nuevas?`)) {
          return;
        }
      }

      // Agregar todas las viviendas válidas
      viviendasSinDuplicados.forEach(vivienda => {
        agregarVivienda(vivienda);
      });

      alert(`✅ Importación completada:
      
• Total filas leídas: ${datos.length}
• Viviendas válidas: ${viviendasValidas.length}
• Viviendas importadas: ${viviendasSinDuplicados.length}
• Duplicados omitidos: ${viviendasValidas.length - viviendasSinDuplicados.length}`);
      
      setModalImportarVisible(false);
      setArchivoImportar(null);
      setDatosPreview([]);
      
    } catch (error) {
      console.error('Error en importación:', error);
      alert(`Error al importar viviendas: 

${error.message}

💡 Sugerencias:
• Si es un archivo Excel, conviértelo a CSV
• Verifica que el archivo tenga encabezados correctos
• Asegúrate de que no esté corrupto`);
    }
    
    setImportando(false);
  };

  const abrirModalEditar = (vivienda) => {
    setViviendaEditando({ ...vivienda });
    setModalEditarVisible(true);
  };

  const abrirModalCrear = () => {
    setViviendaEditando({
      portal: '1A',
      planta: '1º',
      letra: 'A',
      tipologia: 'Interior',
      orientacion: 'NORTE',
      dormitorios: 1,
      superficieUtil: 0,
      superficieConstruida: 0,
      superficieTerraza: 0,
      garaje: '',
      trastero: '',
      pvpFinal: 0,
      estado: 'Disponible',
      fechaEntrega: '2025-12-15'
    });
    setModalCrearVisible(true);
  };

  const guardarVivienda = () => {
    if (!viviendaEditando.portal || !viviendaEditando.planta || !viviendaEditando.letra) {
      alert('Los campos Portal, Planta y Letra son obligatorios');
      return;
    }

    if (!viviendaEditando.pvpFinal || viviendaEditando.pvpFinal <= 0) {
      alert('El PVP Final debe ser mayor que 0');
      return;
    }

    if (modalCrearVisible) {
      agregarVivienda(viviendaEditando);
      setModalCrearVisible(false);
    } else {
      actualizarVivienda(viviendaEditando.id, viviendaEditando);
      setModalEditarVisible(false);
    }
    setViviendaEditando(null);
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'Disponible': return 'bg-green-100 text-green-800';
      case 'Reservada': return 'bg-yellow-100 text-yellow-800';
      case 'Contratada': return 'bg-blue-100 text-blue-800';
      case 'Escriturada': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Home className="h-8 w-8 text-green-600 mr-3" />
            Gestión de Viviendas
          </h2>
          <p className="text-gray-600">{data.viviendas.length} viviendas en el proyecto</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setModalImportarVisible(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Importar Viviendas
          </button>
          <button 
            onClick={abrirModalCrear}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Vivienda
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtro === 'todas' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Todas ({data.viviendas.length})
          </button>
          <button
            onClick={() => setFiltro('disponibles')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtro === 'disponibles' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Disponibles ({data.viviendas.filter(v => v.estado === 'Disponible').length})
          </button>
          <button
            onClick={() => setFiltro('vendidas')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtro === 'vendidas' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Vendidas ({data.viviendas.filter(v => ['Reservada', 'Contratada', 'Escriturada'].includes(v.estado)).length})
          </button>
        </div>
      </div>

      {/* Tabla de viviendas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vivienda</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Portal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Planta</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipología</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sup. Útil</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dormitorios</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PVP Final</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {viviendasFiltradas.map(vivienda => (
              <tr key={vivienda.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getNumeroVivienda(vivienda)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vivienda.portal}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vivienda.planta}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vivienda.tipologia}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vivienda.superficieUtil}m²</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{vivienda.dormitorios}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vivienda.pvpFinal.toLocaleString('es-ES')}€
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getColorEstado(vivienda.estado)}`}>
                    {vivienda.estado}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => abrirModalEditar(vivienda)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1 rounded">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar */}
      <Modal 
        isOpen={modalCrearVisible || modalEditarVisible} 
        onClose={() => {
          setModalCrearVisible(false);
          setModalEditarVisible(false);
          setViviendaEditando(null);
        }}
        title={modalCrearVisible ? 'Nueva Vivienda' : `Editar ${getNumeroVivienda(viviendaEditando)}`}
        size="xl"
      >
        {viviendaEditando && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Identificación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portal *</label>
                <select
                  value={viviendaEditando.portal || ''}
                  onChange={(e) => {
                    const nuevoPortal = e.target.value;
                    setViviendaEditando(prev => ({ 
                      ...prev, 
                      portal: nuevoPortal,
                      letra: getOpcionesLetra(nuevoPortal, prev.planta)[0] // Reset letra
                    }));
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="1A">1A</option>
                  <option value="1B">1B</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planta *</label>
                <select
                  value={viviendaEditando.planta || ''}
                  onChange={(e) => {
                    const nuevaPlanta = e.target.value;
                    setViviendaEditando(prev => ({ 
                      ...prev, 
                      planta: nuevaPlanta,
                      letra: getOpcionesLetra(prev.portal, nuevaPlanta)[0] // Reset letra
                    }));
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="1º">1º</option>
                  <option value="2º">2º</option>
                  <option value="3º">3º</option>
                  <option value="4º">4º</option>
                  <option value="5º">5º</option>
                  <option value="6º">6º</option>
                  <option value="Ático">Ático</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Letra *</label>
                <select
                  value={viviendaEditando.letra || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, letra: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {getOpcionesLetra(viviendaEditando.portal, viviendaEditando.planta).map(letra => (
                    <option key={letra} value={letra}>{letra}</option>
                  ))}
                </select>
              </div>

              {/* Características */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipología</label>
                <select
                  value={viviendaEditando.tipologia || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, tipologia: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="Interior">Interior</option>
                  <option value="Exterior">Exterior</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orientación</label>
                <select
                  value={viviendaEditando.orientacion || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, orientacion: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="ESTE">ESTE</option>
                  <option value="NORTE">NORTE</option>
                  <option value="NOROESTE">NOROESTE</option>
                  <option value="OESTE">OESTE</option>
                  <option value="SUR">SUR</option>
                  <option value="SUROESTE">SUROESTE</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dormitorios</label>
                <select
                  value={viviendaEditando.dormitorios || 1}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, dormitorios: parseInt(e.target.value) }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              {/* Superficies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Útil Vivienda (m²)</label>
                <input
                  type="number"
                  step="0.01"
                  value={viviendaEditando.superficieUtil || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, superficieUtil: parseFloat(e.target.value) || 0 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="48.27"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Construida Vivienda (m²)</label>
                <input
                  type="number"
                  step="0.01"
                  value={viviendaEditando.superficieConstruida || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, superficieConstruida: parseFloat(e.target.value) || 0 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="52.15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Superficie Útil Terrazas (m²)</label>
                <input
                  type="number"
                  step="0.01"
                  value={viviendaEditando.superficieTerraza || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, superficieTerraza: parseFloat(e.target.value) || 0 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="5.56"
                />
              </div>

              {/* Anexos y Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Garaje</label>
                <input
                  type="text"
                  value={viviendaEditando.garaje || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, garaje: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="G-01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trastero</label>
                <input
                  type="text"
                  value={viviendaEditando.trastero || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, trastero: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="T-01"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PVP Final (Sin IVA) €*</label>
                <input
                  type="number"
                  value={viviendaEditando.pvpFinal || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, pvpFinal: parseInt(e.target.value) || 0 }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  placeholder="153000"
                />
              </div>

              {/* Estado y Entrega */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  value={viviendaEditando.estado || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Reservada">Reservada</option>
                  <option value="Contratada">Contratada</option>
                  <option value="Escriturada">Escriturada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Entrega Prevista</label>
                <input
                  type="date"
                  value={viviendaEditando.fechaEntrega || ''}
                  onChange={(e) => setViviendaEditando(prev => ({ ...prev, fechaEntrega: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Preview del número de vivienda */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Vista Previa</h4>
              <p className="text-blue-800">
                <strong>Número de Vivienda:</strong> {getNumeroVivienda(viviendaEditando)}
              </p>
              <p className="text-blue-800">
                <strong>Descripción:</strong> {viviendaEditando.tipologia} de {viviendaEditando.dormitorios} dormitorio{viviendaEditando.dormitorios > 1 ? 's' : ''}, 
                {viviendaEditando.superficieUtil}m² útiles, orientación {viviendaEditando.orientacion}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  setModalCrearVisible(false);
                  setModalEditarVisible(false);
                  setViviendaEditando(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={guardarVivienda}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
              >
                {modalCrearVisible ? 'Crear Vivienda' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Importar Viviendas */}
      <Modal 
        isOpen={modalImportarVisible} 
        onClose={() => {
          setModalImportarVisible(false);
          setArchivoImportar(null);
          setDatosPreview([]);
        }}
        title="Importar Viviendas desde Archivo"
        size="xl"
      >
        <div className="space-y-6">
          {/* Información del formato */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">📋 Formato de Archivo Recomendado</h4>
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-2">
                ✅ CSV (Recomendado)
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                ⚠️ Excel (Convertir a CSV)
              </span>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              <strong>Importante:</strong> Si tienes un archivo Excel, guárdalo como CSV para garantizar que se importen todas las filas correctamente.
            </p>
            <p className="text-sm text-blue-800 mb-3">
              El archivo debe contener las siguientes columnas:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
              <span>• <strong>portal</strong> (1A, 1B) *obligatorio</span>
              <span>• <strong>planta</strong> (1º, 2º, 3º, 4º, 5º, 6º, Ático) *obligatorio</span>
              <span>• <strong>letra</strong> (A, B, C, D, E, F, G) *obligatorio</span>
              <span>• <strong>tipologia</strong> (Interior, Exterior)</span>
              <span>• <strong>orientacion</strong> (ESTE, NORTE, NOROESTE, OESTE, SUR, SUROESTE)</span>
              <span>• <strong>dormitorios</strong> (1, 2, 3)</span>
              <span>• <strong>superficieUtil</strong> (ej: 48.27)</span>
              <span>• <strong>superficieConstruida</strong> (ej: 52.15)</span>
              <span>• <strong>superficieTerraza</strong> (ej: 5.56)</span>
              <span>• <strong>garaje</strong> (opcional: G-01)</span>
              <span>• <strong>trastero</strong> (opcional: T-01)</span>
              <span>• <strong>pvpFinal</strong> (ej: 153000) *obligatorio</span>
              <span>• <strong>estado</strong> (Disponible, Reservada, etc.)</span>
              <span>• <strong>fechaEntrega</strong> (opcional: 2025-12-15)</span>
            </div>
          </div>

          {/* Instrucciones para convertir Excel a CSV */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">🔄 ¿Tienes un archivo Excel?</h4>
            <p className="text-sm text-yellow-800 mb-2">
              Para importar <strong>todas las filas</strong> correctamente, convierte tu Excel a CSV:
            </p>
            <ol className="text-sm text-yellow-800 space-y-1 ml-4">
              <li>1. Abre tu archivo Excel</li>
              <li>2. Ve a <strong>Archivo → Guardar como</strong></li>
              <li>3. Selecciona formato <strong>"CSV (delimitado por comas)"</strong></li>
              <li>4. Guarda el archivo</li>
              <li>5. Usa ese archivo CSV aquí</li>
            </ol>
          </div>

          {/* Selector de archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Archivo CSV (Recomendado para importar todas las filas)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra el archivo
                  </p>
                  <p className="text-xs text-gray-500">
                    <span className="text-green-600 font-medium">CSV recomendado</span> | XLS, XLSX (se convertirán automáticamente)
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".csv,.xlsx,.xls"
                  onChange={manejarArchivoSeleccionado}
                  disabled={importando}
                />
              </label>
            </div>
            {archivoImportar && (
              <div className="mt-2 flex items-center text-sm">
                {archivoImportar.name.endsWith('.csv') ? (
                  <span className="text-green-600">✅ CSV detectado - Importación completa garantizada</span>
                ) : (
                  <span className="text-yellow-600">⚠️ Excel detectado - Se recomienda convertir a CSV para mejores resultados</span>
                )}
                <span className="ml-2 text-gray-500">({archivoImportar.name})</span>
              </div>
            )}
          </div>

          {/* Vista previa de datos */}
          {datosPreview.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">👀 Vista Previa (Primeras 5 filas)</h4>
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Portal</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Planta</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Letra</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipología</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Sup. Útil</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dormitorios</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">PVP Final</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datosPreview.map((fila, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.portal || fila.Portal || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.planta || fila.Planta || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.letra || fila.Letra || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.tipologia || fila.Tipologia || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.superficieUtil || fila.SuperficieUtil || fila.superficie || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.dormitorios || fila.Dormitorios || '---'}</td>
                        <td className="px-3 py-2 text-sm text-gray-900">{fila.pvpFinal || fila.PvpFinal || fila.precio || '---'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Estado de importación */}
          {importando && (
            <div className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600 mr-3"></div>
              <span className="text-yellow-800">Procesando archivo...</span>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button 
              onClick={() => {
                setModalImportarVisible(false);
                setArchivoImportar(null);
                setDatosPreview([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={importando}
            >
              Cancelar
            </button>
            <button 
              onClick={importarViviendas}
              disabled={!archivoImportar || importando}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {importando ? 'Importando...' : 'Importar Viviendas'}
            </button>
          </div>

          {/* Ejemplo de archivo CSV */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">💡 Ejemplo de archivo CSV:</h4>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">
{`portal,planta,letra,tipologia,orientacion,dormitorios,superficieUtil,superficieConstruida,superficieTerraza,garaje,trastero,pvpFinal,estado
1A,1º,A,Interior,NORTE,1,48.27,52.15,5.56,G-01,T-01,153000,Disponible
1A,1º,B,Interior,NORTE,1,48.23,52.10,5.56,,,153000,Disponible
1A,2º,C,Exterior,SUR,2,70.22,76.85,7.89,G-03,,230000,Disponible
1B,Ático,A,Exterior,SUROESTE,3,95.75,105.20,25.50,G-05,T-05,350000,Disponible`}
            </pre>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// ===== MÓDULO COMPRADORES COMPLETO =====
const CompradoresModule = () => {
  const { data, actualizarComprador, agregarComprador, getNumeroVivienda } = useCRM();
  const [filtro, setFiltro] = useState('todos');
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [compradorEditando, setCompradorEditando] = useState(null);

  const compradoresFiltrados = data.compradores.filter(c => {
    if (filtro === 'activos') return ['Comprador Activo', 'Contratado', 'Reservado'].includes(c.estadoProceso);
    if (filtro === 'leads') return ['Lead', 'Interesado'].includes(c.estadoProceso);
    return true;
  });

  const abrirModalCrear = () => {
    setCompradorEditando({
      nombre: '',
      apellidos: '',
      dni: '',
      direccion: '',
      cp: '',
      municipio: '',
      provincia: '',
      email: '',
      tlf1: '',
      tlf2: '',
      numeroCuenta: '',
      estadoCivil: '',
      estadoProceso: 'Lead',
      viviendaAsignada: null,
      notas: ''
    });
    setModalCrearVisible(true);
  };

  const abrirModalEditar = (comprador) => {
    setCompradorEditando({ ...comprador });
    setModalEditarVisible(true);
  };

  const guardarComprador = () => {
    if (!compradorEditando.nombre.trim() || !compradorEditando.apellidos.trim() || !compradorEditando.dni.trim()) {
      alert('Por favor, completa los campos obligatorios (Nombre, Apellidos, DNI)');
      return;
    }

    if (modalCrearVisible) {
      agregarComprador({
        ...compradorEditando,
        fechaRegistro: new Date().toISOString().split('T')[0]
      });
      setModalCrearVisible(false);
    } else {
      actualizarComprador(compradorEditando.id, compradorEditando);
      setModalEditarVisible(false);
    }
    
    setCompradorEditando(null);
  };

  const actualizarCampo = (campo, valor) => {
    setCompradorEditando(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const getColorEstadoProceso = (estado) => {
    switch (estado) {
      case 'Lead': return 'bg-gray-100 text-gray-800';
      case 'Interesado': return 'bg-yellow-100 text-yellow-800';
      case 'Reservado': return 'bg-orange-100 text-orange-800';
      case 'Comprador Activo': return 'bg-blue-100 text-blue-800';
      case 'Contratado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            Gestión de Compradores
          </h2>
          <p className="text-gray-600">{data.compradores.length} compradores registrados</p>
        </div>
        <button 
          onClick={abrirModalCrear}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Comprador
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtro === 'todos' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Todos ({data.compradores.length})
          </button>
          <button
            onClick={() => setFiltro('activos')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filtro === 'activos' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Activos ({data.compradores.filter(c => ['Comprador Activo', 'Contratado', 'Reservado'].includes(c.estadoProceso)).length})
          </button>
        </div>
      </div>

      {/* Grid de compradores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {compradoresFiltrados.map(comprador => {
          const vivienda = data.viviendas.find(v => v.id === comprador.viviendaAsignada);
          return (
            <div key={comprador.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {comprador.nombre} {comprador.apellidos}
                  </h3>
                  <p className="text-sm text-gray-600">{comprador.dni}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getColorEstadoProceso(comprador.estadoProceso)}`}>
                  {comprador.estadoProceso}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {comprador.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {comprador.tlf1}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {comprador.municipio}
                </div>
                {vivienda && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Home className="h-4 w-4 mr-2" />
                    Vivienda: {getNumeroVivienda(vivienda)}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Registrado: {comprador.fechaRegistro}
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => alert(`Ver detalles de ${comprador.nombre}`)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => abrirModalEditar(comprador)}
                    className="text-green-600 hover:text-green-900 p-1 rounded"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Crear/Editar Comprador */}
      <Modal 
        isOpen={modalCrearVisible || modalEditarVisible} 
        onClose={() => {
          setModalCrearVisible(false);
          setModalEditarVisible(false);
          setCompradorEditando(null);
        }}
        title={modalCrearVisible ? 'Nuevo Comprador' : `Editar ${compradorEditando?.nombre} ${compradorEditando?.apellidos}`}
        size="xl"
      >
        {compradorEditando && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Datos personales */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={compradorEditando.nombre || ''}
                  onChange={(e) => actualizarCampo('nombre', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Nombre del comprador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos *</label>
                <input
                  type="text"
                  value={compradorEditando.apellidos || ''}
                  onChange={(e) => actualizarCampo('apellidos', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Apellidos del comprador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DNI *</label>
                <input
                  type="text"
                  value={compradorEditando.dni || ''}
                  onChange={(e) => actualizarCampo('dni', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="12345678A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
                <select
                  value={compradorEditando.estadoCivil || ''}
                  onChange={(e) => actualizarCampo('estadoCivil', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Soltero">Soltero/a</option>
                  <option value="Casado">Casado/a</option>
                  <option value="Divorciado">Divorciado/a</option>
                  <option value="Viudo">Viudo/a</option>
                  <option value="Pareja de hecho">Pareja de hecho</option>
                </select>
              </div>

              {/* Dirección */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <input
                  type="text"
                  value={compradorEditando.direccion || ''}
                  onChange={(e) => actualizarCampo('direccion', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Calle, número, piso..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input
                  type="text"
                  value={compradorEditando.cp || ''}
                  onChange={(e) => actualizarCampo('cp', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="28001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Municipio</label>
                <input
                  type="text"
                  value={compradorEditando.municipio || ''}
                  onChange={(e) => actualizarCampo('municipio', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Madrid"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                <input
                  type="text"
                  value={compradorEditando.provincia || ''}
                  onChange={(e) => actualizarCampo('provincia', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Madrid"
                />
              </div>

              {/* Contacto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={compradorEditando.email || ''}
                  onChange={(e) => actualizarCampo('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="ejemplo@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono 1</label>
                <input
                  type="tel"
                  value={compradorEditando.tlf1 || ''}
                  onChange={(e) => actualizarCampo('tlf1', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="666123456"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono 2 (opcional)</label>
                <input
                  type="tel"
                  value={compradorEditando.tlf2 || ''}
                  onChange={(e) => actualizarCampo('tlf2', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="917123456"
                />
              </div>

              {/* Datos bancarios y proceso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Cuenta</label>
                <input
                  type="text"
                  value={compradorEditando.numeroCuenta || ''}
                  onChange={(e) => actualizarCampo('numeroCuenta', e.target.value)}
                  placeholder="ES91 1234 5678 9012 3456 7890"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Proceso</label>
                <select
                  value={compradorEditando.estadoProceso || ''}
                  onChange={(e) => actualizarCampo('estadoProceso', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Lead">Lead</option>
                  <option value="Interesado">Interesado</option>
                  <option value="Reservado">Reservado</option>
                  <option value="Comprador Activo">Comprador Activo</option>
                  <option value="Contratado">Contratado</option>
                </select>
              </div>

              {/* Vivienda asignada */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vivienda Asignada</label>
                <select
                  value={compradorEditando.viviendaAsignada || ''}
                  onChange={(e) => actualizarCampo('viviendaAsignada', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Sin asignar</option>
                  {data.viviendas.filter(v => v.estado === 'Disponible' || v.id === compradorEditando.viviendaAsignada).map(vivienda => (
                    <option key={vivienda.id} value={vivienda.id}>
                      {getNumeroVivienda(vivienda)} - {vivienda.pvpFinal.toLocaleString('es-ES')}€
                    </option>
                  ))}
                </select>
              </div>

              {/* Notas */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={compradorEditando.notas || ''}
                  onChange={(e) => actualizarCampo('notas', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Observaciones, preferencias, comentarios..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button 
                onClick={() => {
                  setModalCrearVisible(false);
                  setModalEditarVisible(false);
                  setCompradorEditando(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={guardarComprador}
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700"
              >
                {modalCrearVisible ? 'Crear Comprador' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// ===== MÓDULO DOCUMENTOS SIMPLIFICADO =====
const DocumentosModule = () => {
  const { data, agregarDocumento, getNumeroVivienda } = useCRM();

  const getIconoTipo = (tipo) => {
    switch (tipo) {
      case 'Documento de Reserva': return <FileCheck className="h-5 w-5 text-yellow-600" />;
      case 'Contrato de Compraventa': return <FileText className="h-5 w-5 text-blue-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="h-8 w-8 text-orange-600 mr-3" />
            Generador de Documentos
          </h2>
          <p className="text-gray-600">{data.documentos.length} documentos generados</p>
        </div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Generar Documento
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {data.documentos.map(documento => {
          const vivienda = data.viviendas.find(v => v.id === documento.viviendaId);
          const comprador = data.compradores.find(c => c.id === documento.compradorId);
          
          return (
            <div key={documento.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getIconoTipo(documento.tipo)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{documento.tipo}</h3>
                    <div className="mt-1 flex items-center space-x-6 text-sm text-gray-600">
                      <span>Vivienda {getNumeroVivienda(vivienda)}</span>
                      <span>{comprador?.nombre} {comprador?.apellidos}</span>
                      <span>{documento.fechaGeneracion}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== MÓDULO CALENDARIO =====
const CalendarioModule = () => {
  const { data, agregarEvento, getNumeroVivienda } = useCRM();

  const getColorTipo = (tipo) => {
    switch (tipo) {
      case 'Escritura': return 'bg-green-100 text-green-800';
      case 'Contrato': return 'bg-blue-100 text-blue-800';
      case 'Visita': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-8 w-8 text-red-600 mr-3" />
            Agenda de Eventos
          </h2>
          <p className="text-gray-600">{data.eventos.length} eventos programados</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Evento
        </button>
      </div>

      <div className="space-y-4">
        {data.eventos.map(evento => {
          const vivienda = data.viviendas.find(v => v.id === evento.viviendaId);
          const comprador = data.compradores.find(c => c.id === evento.compradorId);
          
          return (
            <div key={evento.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{evento.titulo}</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getColorTipo(evento.tipo)}`}>
                      {evento.tipo}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {evento.fecha} a las {evento.hora}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {evento.ubicacion}
                    </div>
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Vivienda {getNumeroVivienda(vivienda)}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {comprador?.nombre} {comprador?.apellidos}
                    </div>
                  </div>
                  {evento.notas && (
                    <p className="mt-2 text-sm text-gray-500">{evento.notas}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ===== COMPONENTE PRINCIPAL =====
const CRMInmobiliario = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderModule = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardModule />;
      case 'viviendas': return <ViviendasModule />;
      case 'compradores': return <CompradoresModule />;
      case 'documentos': return <DocumentosModule />;
      case 'calendario': return <CalendarioModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <CRMProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="ml-3 text-xl font-semibold text-gray-900">
                  CRM Inmobiliario - Proyecto Farnesio
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-gray-400" />
                <User className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'viviendas', label: 'Viviendas', icon: Home },
                { id: 'compradores', label: 'Compradores', icon: Users },
                { id: 'documentos', label: 'Documentos', icon: FileText },
                { id: 'calendario', label: 'Calendario', icon: Calendar }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === id 
                      ? 'border-blue-500 text-blue-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderModule()}
        </main>
      </div>
    </CRMProvider>
  );
};

export default CRMInmobiliario;