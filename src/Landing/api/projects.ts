// Tipos
export type Project = {
    slug: string;
    file: string;              // nombre del archivo en /assets/FotosInicio
    title: string;
    place: string;
    year?: string;
    brief?: string;            // bajada corta bajo el círculo "Arrastra"
    categories?: string;       // linea chica de categorías
    description?: string;      // texto largo de la derecha
  };
  
  // Importa imágenes como URL (vite)
  const imgs = import.meta.glob("../../assets/FotosInicio/*.{png,jpg,jpeg}", {
    eager: true,
    query: "?url",
  }) as Record<string, { default: string }>;
  
  export const getImgUrl = (file: string) => {
    const entry = Object.entries(imgs).find(([p]) => p.endsWith("/" + file));
    return entry ? (entry[1] as any).default as string : "";
  };
  
  // Base de proyectos (puedes ir agregando más)
  export const PROJECTS: Project[] = [
    {
      slug: "casa-del-mar",
      file: "9 2.png",
      title: "Casa del Mar Residences",
      place: "PUERTO VALLARTA, JALISCO",
      year: "2022",
      brief: "Desarrollo de habitacional frente al mar",
      categories: "DISEÑO ARQUITECTÓNICO / DISEÑO DE INTERIOR",
      description:
        "Entre el océano abierto y las montañas que custodian el sur de Puerto Vallarta, surge Casa del Mar como una pieza incrustada en la línea costera, un volumen que no se impone, sino que se funde con el paisaje.\n\nEl edificio fue pensado como una extensión del terreno: sus recubrimientos evocan la textura pétrea del entorno, como si hubiese recogido fragmentos de la montaña para levantar sus propios muros. La fachada –limpia, serena– enmarca el horizonte con barandales de cristal, permitiendo que el mar entre visualmente a cada espacio.\n\nEn su interior, la arquitectura privilegia el aire y la luz: los espacios fluyen sin pasillos, abiertos a la ventilación cruzada y bañados por luz natural. La distribución vertical permite que cada unidad tenga una relación íntima con el exterior, ya sea el mar al frente, o la montaña al fondo.",
    },
    // ← cuando quieras, agrega más proyectos aquí
  ];
  
  export const findProjectBySlug = (slug: string) =>
    PROJECTS.find((p) => p.slug === slug);
  