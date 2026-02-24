import { 
  Car, 
  Scale, 
  Cpu, 
  Handshake, 
  GraduationCap, 
  ClipboardCheck, 
  ShieldAlert, 
  Paintbrush, 
  Settings, 
  Scan, 
  Gauge 
} from 'lucide-react';

export const siteContent = {
  metadata: {
    title: "M&L Consultorías y Peritajes | Peritaje Automotriz Costa Rica",
    description: "Servicio especializado en peritaje automotriz y consultoría técnica. Fortalecemos argumentos en sede administrativa y judicial.",
    keywords: ["peritaje automotriz", "consultoría técnica", "Costa Rica", "evaluación de daños", "investigación de accidentes"],
    og: {
      title: "M&L Consultorías y Peritajes",
      description: "Expertos en peritaje automotriz y consultoría técnica.",
      url: "https://mylconsultoriasyperitajes.com",
      image: "/og-image.jpg",
    },
  },
  about: {
    infographics: [
      {
        title: "Patrimonio y Movilidad",
        text: "En Costa Rica, un vehículo representa trabajo, movilidad y responsabilidad legal. En ese entorno, M&L Consultorías y Peritajes acompaña casos donde lo que está en juego es claridad técnica: qué pasó, qué se evidencia y qué corresponde asumir con fundamento.",
        icon: Car,
      },
      {
        title: "Fortaleza Argumentativa",
        text: "Nuestro enfoque está orientado a fortalecer argumentos en sede administrativa y judicial mediante informes periciales estructurados, verificables y comprensibles para personas sin formación técnica.",
        icon: Scale,
      },
      {
        title: "Excelencia y Tecnología",
        text: "Nos caracterizamos por poseer personal altamente capacitado con técnicas de avalúos eficientes, acceso a tecnologías innovadoras y altos controles de calidad en nuestros procesos periciales y ejecuciones constructivas.",
        icon: Cpu,
      },
      {
        title: "Alianzas Estratégicas",
        text: "Nuestra trayectoria se ve respaldada por alianzas estratégicas con instituciones de renombre como Cesvi Colombia y el Colegio de Abogados y Abogadas de Costa Rica, impartiendo capacitación especializada.",
        icon: Handshake,
      },
      {
        title: "Compromiso Educativo",
        text: "Bajo la dirección del Lic. Luis Diego Murillo, colaboramos con el IVTM y Economy Rent a Car en la formación de nuevos técnicos, reafirmando nuestro compromiso con la excelencia en el sector pericial.",
        icon: GraduationCap,
      },
    ],
    stats: [
      { value: "20+", label: "Años de Experiencia" },
      { value: "100%", label: "Objetividad Técnica" },
    ],
  },
  cases: [
    {
      title: "Condición General",
      description: "Determinación de condición general y estado de conservación del vehículo.",
      icon: ClipboardCheck,
    },
    {
      title: "Daños vs Preexistencias",
      description: "Verificación de daños por siniestro en contraste con daños preexistentes.",
      icon: ShieldAlert,
    },
    {
      title: "Calidad de Reparación",
      description: "Análisis riguroso de la calidad de reparaciones en carrocería y pintura.",
      icon: Paintbrush,
    },
    {
      title: "Sistemas de Seguridad",
      description: "Evaluación técnica de componentes de dirección, frenos y suspensión.",
      icon: Settings,
    },
    {
      title: "Diagnóstico Computarizado",
      description: "Lectura y análisis profundo de códigos de diagnóstico electrónico.",
      icon: Scan,
    },
    {
      title: "Veracidad de Kilometraje",
      description: "Valoración experta de inconsistencias en el recorrido del vehículo.",
      icon: Gauge,
    },
  ],
  navigation: [
    { name: 'Inicio', href: '/#' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Contacto', href: '/#contacto' },
  ],
  theme: {
    colors: {
      background: "#000000",
      foreground: "#ffffff",
      primary: "#002244",
      secondary: "#c0c0c0",
      accent: "#ff0000",
    },
  },
};
