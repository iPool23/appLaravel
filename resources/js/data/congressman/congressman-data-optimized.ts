import { CongressMan } from "@/interfaces/congressMan.interface";

// Optimized congressman data with preload hints and efficient structure
const congressManData: CongressMan[] = [
    {
        src: "/imgs/congressman/mary.jpg",
        centerText: "MARÍA GRIMANEZA ACUÑA PERALTA",
        bottomText: "Congresista de Lambayeque",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/appmary" },
            { provider: "instagram", href: "https://www.instagram.com/mary_acunaperalta/" },
            { provider: "x", href: "http://x.com/MAP_Congresista" },
            { provider: "tiktok", href: "https://www.tiktok.com/@maryacunap" }
        ],
    },
    {
        src: "/imgs/congressman/lady.jpg",
        centerText: "LADY MERCEDES CAMONES SORIANO",
        bottomText: "Congresista de Áncash",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/LadyCamones" },
            { provider: "instagram", href: "https://www.instagram.com/lady_camones/" },
            { provider: "x", href: "https://x.com/LadyCamones" },
            { provider: "tiktok", href: "https://www.tiktok.com/@ladycamones1" },
            { provider: "web", href: "https://ladycamonessoriano.com/" }
        ],
    },
    // {
    //     src: "/imgs/congressman/chiabra.jpg",
    //     centerText: "ROBERTO ENRIQUE CHIABRA LEÓN",
    //     bottomText: "Congresista de Lima",
    //     socialLinks: [
    //         { provider: "facebook", href: "https://web.facebook.com/chiabra.pe" },
    //         { provider: "instagram", href: "https://www.instagram.com/robertochiabra" },
    //         { provider: "x", href: "https://x.com/robertochiabra" },
    //         { provider: "tiktok", href: "https://www.tiktok.com/@robertochiabra" },
    //         { provider: "youtube", href: "https://www.youtube.com/channel/UCu1Q9mM4tF9ZnM0mLe2XY3g" },
    //         { provider: "web", href: "http://www.chiabra.pe" }
    //     ],
    // },
    {
        src: "/imgs/congressman/CORDERO.jpg",
        centerText: "LUIS GUSTAVO CORDERO JON TAY",
        bottomText: "Congresista de Lima Provincias",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/gcorderojontay" },
            { provider: "instagram", href: "https://www.instagram.com/gcorderojontay/" },
            { provider: "tiktok", href: "https://www.tiktok.com/@jcorderojontay" }
        ],
    },
    {
        src: "/imgs/congressman/joseelias.jpg",
        centerText: "JOSÉ LUIS ELÍAS ÁVALOS",
        bottomText: "Congresista de Ica",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/coneliassipodemos" },
            { provider: "x", href: "https://x.com/JoseluiseliasAv" },
            { provider: "tiktok", href: "https://www.tiktok.com/@joseluiseliascongresista" },
            { provider: "youtube", href: "https://www.youtube.com/@JoseluisEliasAv" },
            { provider: "web", href: "https://joseluiselias.com" }
        ],
    },
    {
        src: "/imgs/congressman/flores.jpg",
        centerText: "JORGE LUIS FLORES ANCACHI",
        bottomText: "Congresista de Puno",
        socialLinks: [
            { provider: "facebook", href: "https://www.facebook.com/CongresistaJorgeLuisFloresAncachi" },
            { provider: "instagram", href: "https://www.instagram.com/congresistajorgefloresancachi/" },
            { provider: "x", href: "https://x.com/JorgeFlores_pe" },
            { provider: "tiktok", href: "https://www.tiktok.com/@congresistafloresancachi" },
            { provider: "youtube", href: "https://www.youtube.com/@jorgeluisfloresancachi2578" }
        ],
    },
    {
        src: "/imgs/congressman/manuelgarcia.jpg",
        centerText: "IDELSO MANUEL GARCÍA CORREA",
        bottomText: "Congresista de Piura",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/ManoloGarciaCorrea.Oficial" },
            { provider: "instagram", href: "https://www.instagram.com/manoloconelpueblo/" },
            { provider: "x", href: "https://x.com/IdelsoManuel" },
            { provider: "tiktok", href: "https://www.tiktok.com/@manolo.garcia_piura" },
            { provider: "youtube", href: "https://www.youtube.com/@ManoloGarciaPiura" }
        ],
    },
    {
        src: "/imgs/congressman/heidinger.jpg",
        centerText: "NELCY LIDIA HEIDINGER BALLESTEROS",
        bottomText: "Congresista de Pasco",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/NelcyHeindingerB" },
            { provider: "instagram", href: "https://www.instagram.com/nelcyheidingerb/" },
            { provider: "x", href: "https://x.com/NelcyHeidingerB" },
            { provider: "tiktok", href: "https://www.tiktok.com/@nelcyheidingerb" },
            { provider: "youtube", href: "https://www.youtube.com/@nelcyheidingerballesteros" }
        ],
    },
    {
        src: "/imgs/congressman/edhitjulon.jpg",
        centerText: "ELVA EDHIT JULÓN IRIGOIN",
        bottomText: "Congresista de Cajamarca",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/edihtjulon" },
            { provider: "instagram", href: "https://www.instagram.com/edhit_julon/" },
            { provider: "x", href: "https://x.com/JulonEdhit" },
            { provider: "tiktok", href: "https://www.tiktok.com/@edhit_julon" }
        ],
    },
    {
        src: "/imgs/congressman/kamiche.jpg",
        centerText: "LUIS ROBERTO KAMICHE MORANTE",
        bottomText: "Congresista de La Libertad",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/CongresistaRobertoKamiche" },
            { provider: "instagram", href: "https://www.instagram.com/rkamiche/" },
            { provider: "x", href: "https://x.com/CongKamiche" },
            { provider: "tiktok", href: "https://www.tiktok.com/@congresistakamiche" },
            { provider: "youtube", href: "https://www.youtube.com/@congresistakamiche" }
        ],
    },
    {
        src: "/imgs/congressman/lizarsaburu.jpg",
        centerText: "JUAN CARLOS MARTÍN LIZARZABURU",
        bottomText: "Congresista de Peruanos en el Extranjero",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/juan.carlos.lizarzaburu.2025" },
            { provider: "instagram", href: "https://www.instagram.com/juancarloslizarzaburu/" },
            { provider: "x", href: "https://x.com/LizarzaburuJuan" },
            { provider: "tiktok", href: "https://www.tiktok.com/@jc.lizarzaburu" }
        ],
    },
    {
        src: "/imgs/congressman/marticorena.jpg",
        centerText: "JORGE ALFONSO MARTICORENA MENDOZA",
        bottomText: "Congresista de Ica",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/marticorenaperu" },
            { provider: "instagram", href: "https://www.instagram.com/marticorenaperu/" },
            { provider: "x", href: "https://x.com/marticorenaperu" },
            { provider: "tiktok", href: "https://www.tiktok.com/@jorgemarticorenaporica" },
            { provider: "youtube", href: "https://www.youtube.com/@marticorenaperu" }
        ],
    },
    {
        src: "/imgs/congressman/QUIROZ.jpg",
        centerText: "SEGUNDO TEODOMIRO QUIROZ BARBOZA",
        bottomText: "Congresista de Cajamarca",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/SegundoQuirozCongresista" },
            { provider: "instagram", href: "https://www.instagram.com/segundo_quiroz_/" },
            { provider: "x", href: "https://x.com/SegundoQuirozB" },
            { provider: "tiktok", href: "https://www.tiktok.com/@segundo_quiroz_" }
        ],
    },
    {
        src: "/imgs/congressman/Magaly1.jpg",
        centerText: "MAGALY ROSMERY RUIZ RODRÍGUEZ",
        bottomText: "Congresista de La Libertad",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/MagalyRuizRo" },
            { provider: "instagram", href: "https://www.instagram.com/magalyruizrodr/" },
            { provider: "x", href: "https://x.com/MagalyRuizRo" },
            { provider: "tiktok", href: "https://www.tiktok.com/@magalyruizrodr" }
        ],
    },
    {
        src: "/imgs/congressman/salhuana.jpg",
        centerText: "EDUARDO SALHUANA CAVIDES",
        bottomText: "Congresista de Madre de Dios",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/salhuanacavides" },
            { provider: "instagram", href: "https://www.instagram.com/edusalhuana/" },
            { provider: "x", href: "https://x.com/salhuanacavides" },
            { provider: "tiktok", href: "https://www.tiktok.com/@esalhuana" }
        ],
    },
    {
        src: "/imgs/congressman/soto.jpg",
        centerText: "ALEJANDRO SOTO REYES",
        bottomText: "Congresista de Cusco",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/AlejandroSoto2021" },
            { provider: "instagram", href: "https://www.instagram.com/alejandrosoto.pe/" },
            { provider: "x", href: "https://x.com/AlejandroSotoRe" },
            { provider: "tiktok", href: "https://www.tiktok.com/@alejandro.soto.reyes" }
        ],
    },
    {
        src: "/imgs/congressman/rosiotorres.jpg",
        centerText: "ROSIO TORRES SALINAS",
        bottomText: "Congresista de Loreto",
        socialLinks: [
            { provider: "facebook", href: "https://web.facebook.com/rosiotorressalinasoficial" },
            { provider: "instagram", href: "https://www.instagram.com/rosiotorressalinas/" },
            { provider: "x", href: "https://x.com/rosiotorressali" },
            { provider: "tiktok", href: "https://www.tiktok.com/@rosiotorres.2023" }
        ],
    }
] as CongressMan[];

// Create a function that returns the data to enable tree-shaking
export const getCongressmanData = (): CongressMan[] => congressManData;

export default congressManData;
