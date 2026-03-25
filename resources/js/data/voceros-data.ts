import type { DirectiveMember } from "@/interfaces/member.interface";

// Data for Voceros Grid based on provided list
const vocerosData: DirectiveMember[] = [
  {
    src: "/imgs/placeholder.webp", // Placeholder for Martín Salas
    centerText: "MARTÍN SALAS",
    bottomText: "Vocero",
    socialLinks: [],
  },
  {
    src: "/imgs/placeholder.webp", // Placeholder for Luis Vivanco
    centerText: "LUIS VIVANCO",
    bottomText: "Vocero",
    socialLinks: [],
  },
  {
    src: "/imgs/directive/luis-valdez-para-web-scaled.webp", // From directiveMembers
    centerText: "LUIS VALDEZ FARIÁS",
    bottomText: "Secretario Ejecutivo Nacional",
    socialLinks: [
      {
        provider: "facebook",
        href: "https://www.facebook.com/LuisValdezFarias",
      },
      { provider: "x", href: "https://x.com/luisvaldezf" },
    ],
  },
  {
    src: "/imgs/congressman/salhuana.webp", // From congressMan
    centerText: "EDUARDO SALHUANA CAVIDES",
    bottomText: "Congresista de Madre de Dios",
    socialLinks: [
      {
        provider: "facebook",
        href: "https://web.facebook.com/salhuanacavides",
      },
      { provider: "instagram", href: "https://www.instagram.com/edusalhuana/" },
      { provider: "x", href: "https://x.com/salhuanacavides" },
      { provider: "tiktok", href: "https://www.tiktok.com/@esalhuana" },
    ],
  },
  {
    src: "/imgs/congressman/lady.webp", // From congressMan
    centerText: "LADY MERCEDES CAMONES SORIANO",
    bottomText: "Congresista de Áncash",
    socialLinks: [
      { provider: "facebook", href: "https://web.facebook.com/LadyCamones" },
      {
        provider: "instagram",
        href: "https://www.instagram.com/lady_camones/",
      },
      { provider: "x", href: "https://x.com/LadyCamones" },
      { provider: "tiktok", href: "https://www.tiktok.com/@ladycamones1" },
      { provider: "web", href: "https://ladycamonessoriano.com/" },
    ],
  },
  {
    src: "/imgs/placeholder.webp", // Placeholder for Elio Riera
    centerText: "ELIO RIERA",
    bottomText: "Vocero",
    socialLinks: [],
  },
  {
    src: "/imgs/directive/yessenia-lozano.webp", // From directiveMembers
    centerText: "YESSENIA LOZANO MILLONES",
    bottomText: "Secretaria Nacional de Juventudes",
    socialLinks: [
      {
        provider: "instagram",
        href: "https://www.instagram.com/yessenialozanos",
      },
      {
        provider: "facebook",
        href: "https://www.facebook.com/YesseniaLozanoS",
      },
      { provider: "x", href: "https://x.com/yessenialozanos" },
      { provider: "linkedin", href: "https://www.linkedin.com/in/lozanoy" },
    ],
  },
  {
    src: "/imgs/directive/marisol-espinoza.webp", // From directiveMembers
    centerText: "MARISOL ESPINOZA CRUZ",
    bottomText: "Gerencia General y Secretaria Nacional de la Mujer",
    socialLinks: [
      {
        provider: "instagram",
        href: "https://www.instagram.com/jorgegonzalesore",
      }, // Note: This seems to be a copy-paste error in original, but keeping as is
      { provider: "facebook", href: "https://www.facebook.com/jgonzales.ore" },
      { provider: "x", href: "https://x.com/jgonzalesore" },
      {
        provider: "linkedin",
        href: "https://www.linkedin.com/in/jorge-gonz%C3%A1les-or%C3%A9-0a79a138",
      },
    ],
  },
  {
    src: "/imgs/placeholder.webp", // Placeholder for Yessica Tumi
    centerText: "YESSICA TUMI",
    bottomText: "Vocero",
    socialLinks: [],
  },
];

export default vocerosData;
