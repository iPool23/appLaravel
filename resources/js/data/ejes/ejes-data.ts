import { Eje } from "@/interfaces/axles.interface";
import WorkIcon from "@/components/svg/WorkIcon";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { IoMdBookmarks } from "react-icons/io";
import { GiHealthIncrease } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";
import { HiDocumentMagnifyingGlass } from "react-icons/hi2";

// Datos base de los ejes con traducciones en español
export const ejesData: Eje[] = [
  {
    id: "1",
    slug: "erradicar-la-pobreza",
    icon: WorkIcon,
    category: "Social",
    imageUrl: "/imgs/ejes/1/1.webp",
    order: 1,
    title: "Erradicar la Pobreza",
    shortDescription: "Propuestas para combatir la pobreza y mejorar la calidad de vida de los ciudadanos.",
    fullContent: "Detalles sobre las estrategias y programas para erradicar la pobreza, incluyendo iniciativas de desarrollo económico y social."
  },
  {
    id: "2",
    slug: "reforma-seguridad-ciudadana",
    icon: IoShieldCheckmarkSharp,
    category: "Seguridad",
    imageUrl: "/imgs/ejes/seguridad.webp",
    order: 3,
    title: "Reforma de la Seguridad Ciudadana",
    shortDescription: "Medidas para fortalecer la seguridad pública y garantizar la tranquilidad de la población.",
    fullContent: "Análisis de las reformas necesarias en el sistema de seguridad ciudadana, desde la modernización policial hasta la prevención del delito."
  },
  {
    id: "3",
    slug: "educacion-calidad",
    icon: IoMdBookmarks,
    category: "Educación",
    imageUrl: "/imgs/ejes/educacion.webp",
    order: 5,
    title: "Educación de Calidad",
    shortDescription: "Planes para mejorar el sistema educativo y asegurar una educación inclusiva y equitativa.",
    fullContent: "Propuestas para una educación de calidad que prepare a las nuevas generaciones para los desafíos del futuro, incluyendo acceso a tecnología y formación docente."
  },
  {
    id: "4",
    slug: "salud-publica-essalud-todos",
    icon: GiHealthIncrease,
    category: "Salud",
    imageUrl: "/imgs/ejes/salud.webp",
    order: 2,
    title: "Salud Pública y EsSalud para Todos",
    shortDescription: "Estrategias para fortalecer el sistema de salud pública y garantizar el acceso universal a servicios médicos.",
    fullContent: "Detalles sobre cómo mejorar la infraestructura de salud, ampliar la cobertura de EsSalud y optimizar la atención médica para todos los ciudadanos."
  },
  {
    id: "5",
    slug: "mas-empleo-formal",
    icon: FaHandshake,
    category: "Economía",
    imageUrl: "/imgs/ejes/empleo.webp",
    order: 4,
    title: "Más Empleo Formal",
    shortDescription: "Iniciativas para fomentar la creación de empleo formal y el crecimiento económico sostenible.",
    fullContent: "Planes para impulsar la inversión, reducir la informalidad laboral y generar oportunidades de trabajo digno para todos los peruanos."
  },
  {
    id: "6",
    slug: "lucha-contra-corrupcion",
    icon: HiDocumentMagnifyingGlass,
    category: "Institucional",
    imageUrl: "/imgs/ejes/anticorrupcion.webp",
    order: 6,
    title: "Lucha Contra la Corrupción",
    shortDescription: "Medidas firmes para combatir la corrupción en todas sus formas y fortalecer la institucionalidad.",
    fullContent: "Estrategias para promover la transparencia, la rendición de cuentas y la integridad en la gestión pública, garantizando un gobierno honesto y eficiente."
  },
];

// Función simple para obtener los ejes sin necesidad de traducciones externas
export function getEjes(): Eje[] {
  return ejesData;
}

export function getEjesIzquierda(): Eje[] {
  return getEjes().filter(
    (eje) => eje.order % 2 !== 0
  );
}

export function getEjesDerecha(): Eje[] {
  return getEjes().filter(
    (eje) => eje.order % 2 === 0
  );
}

export function getEjeBySlug(slug: string): Eje | undefined {
  return getEjes().find((eje) => eje.slug === slug);
}
