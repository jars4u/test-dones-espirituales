// Archivo centralizado de datos para el test de dones espirituales

export const QUESTIONS = [
  {
    id: 1,
    text: "He experimentado una oración fluida en un idioma que no conozco y que edificó mi espíritu.",
    category: "lenguas",
  },
  {
    id: 2,
    text: "He sentido la convicción de interceder por sanidad y luego he visto resultados concretos.",
    category: "sanidades",
  },
  {
    id: 3,
    text: "He sentido con claridad cuando tengo que evitar ciertas enseñanzas o líderes espirituales.",
    category: "discernimiento",
  },
  {
    id: 4,
    text: "He experimentado paz y confirmación interior después de darle una palabra o consejo espiritual a alguien.",
    category: "palabra_sabiduria",
  },
  {
    id: 5,
    text: "He alentado a otros a confiar en Dios cuando enfrentaban pruebas duras.",
    category: "fe",
  },
  {
    id: 6,
    text: "He podido explicar verdades bíblicas que otros no entendían claramente.",
    category: "palabra_ciencia",
  },
  {
    id: 7,
    text: "He sido instrumento para traer consuelo profundo a personas enfermas o quebrantadas.",
    category: "sanidades",
  },
  {
    id: 8,
    text: "He sentido que debía hablar con alguien y lo que dije fue justo lo que necesitaba oír.",
    category: "profecia",
  },
  {
    id: 9,
    text: "He orado creyendo firmemente que Dios respondería, y lo ha hecho.",
    category: "fe",
  },
  {
    id: 10,
    text: "He presenciado eventos que no tienen explicación natural tras orar con fe.",
    category: "milagros",
  },
  {
    id: 11,
    text: "He sentido en momentos importantes una claridad que me ayuda a tomar decisiones difíciles.",
    category: "palabra_sabiduria",
  },
  {
    id: 12,
    text: "He entregado mensajes que ayudaron a otros a corregir su camino espiritual.",
    category: "profecia",
  },
  {
    id: 13,
    text: "He experimentado una comprensión profunda de pasajes bíblicos sin haberlos estudiado previamente.",
    category: "palabra_ciencia",
  },
  {
    id: 14,
    text: "He compartido palabras que han impactado profundamente a otros en su caminar con Dios.",
    category: "profecia",
  },
  {
    id: 15,
    text: "He aplicado conocimiento bíblico de manera precisa ante preguntas difíciles que otros me han hecho.",
    category: "palabra_ciencia",
  },
  {
    id: 16,
    text: "He orado con expectativa y he visto a Dios obrar de forma extraordinaria.",
    category: "milagros",
  },
  {
    id: 17,
    text: "He reconocido cuando una enseñanza o experiencia no provenía del Espíritu de Dios.",
    category: "discernimiento",
  },
  {
    id: 18,
    text: "He experimentado provisiones o respuestas de Dios que claramente fueron sobrenaturales.",
    category: "milagros",
  },
  {
    id: 19,
    text: "He aplicado enseñanzas bíblicas que han cambiado el rumbo de situaciones en mi vida o en la de otros.",
    category: "palabra_sabiduria",
  },
  {
    id: 20,
    text: "He comprendido claramente el significado de una lengua hablada por otro creyente.",
    category: "interpretacion",
  },
  {
    id: 21,
    text: "He ayudado a interpretar oraciones en lenguas en reuniones para que otros comprendieran el mensaje.",
    category: "interpretacion",
  },
  {
    id: 22,
    text: "He experimentado una fe firme que me ha sostenido cuando todo parecía en contra.",
    category: "fe",
  },
  {
    id: 23,
    text: "En momentos de adoración o intercesión he hablado en lenguas sin control consciente.",
    category: "lenguas",
  },
  {
    id: 24,
    text: "Después de una manifestación en lenguas, he recibido entendimiento para explicarlo a otros.",
    category: "interpretacion",
  },
  {
    id: 25,
    text: "He percibido influencias espirituales negativas en ambientes o personas sin que nadie me lo dijera.",
    category: "discernimiento",
  },
  {
    id: 26,
    text: "Siento que orar en lenguas fortalece mi relación personal con Dios.",
    category: "lenguas",
  },
  {
    id: 27,
    text: "He tenido una certeza profunda de que Dios obraría, incluso cuando todo parecía en contra.",
    category: "fe",
  },
  // Slide final de cierre (no es pregunta real)
  {
    id: 28,
    text: "¡Has llegado al final del test!",
    category: null,
    isFinalSlide: true,
  },
];

export const CATEGORIES_LABEL = {
  palabra_sabiduria: "Palabra de Sabiduría",
  palabra_ciencia: "Palabra de Ciencia",
  fe: "Fe",
  sanidades: "Sanidades",
  milagros: "Milagros",
  profecia: "Profecía",
  discernimiento: "Discernimiento de Espíritus",
  lenguas: "Diversos Géneros de Lenguas",
  interpretacion: "Interpretación de Lenguas",
};

export const DEFINICIONES = {
  palabra_sabiduria:
    "Aplicación práctica e iluminada de la verdad bíblica en situaciones complejas.",
  palabra_ciencia:
    "Comprensión sobrenatural de la Palabra para situaciones específicas.",
  fe: "Confianza extraordinaria en Dios, incluso en circunstancias imposibles.",
  sanidades: "Capacidad espiritual para sanar enfermedades.",
  milagros: "Actos sobrenaturales que confirman la autoridad del evangelio.",
  profecia:
    "Declaración inspirada para corregir, exhortar y revelar la voluntad de Dios.",
  discernimiento:
    "Habilidad para distinguir si una manifestación es del Espíritu.",
  lenguas: "Hablar en lenguas no aprendidas para edificación.",
  interpretacion:
    "Traducir lenguas para edificar la iglesia cuando se dan públicamente.",
};

export const MINISTERIOS_SUGERIDOS = {
  palabra_sabiduria: [
    "Células en las casas",
    "Familia (discipulados y consejería)",
    "Educación Cristiana (Discipulado)",
  ],
  palabra_ciencia: [
    "Educación Cristiana (Escuela de teología)",
    "Células en las casas",
  ],
  fe: [
    "Evangelismo y Misiones",
    "Oración y Ayuno",
    "Familia (liderazgo juvenil o discipulados)",
  ],
  sanidades: ["Cuidado (Atención social y visitas)", "Oración y Ayuno"],
  milagros: ["Evangelismo y Misiones", "Oración y Ayuno"],
  profecia: [
    "Células en las casas",
    "Educación Cristiana (Discipulado)",
    "Oración y Ayuno",
  ],
  discernimiento: ["Educación Cristiana", "Familia (consejería)", "Cuidado"],
  lenguas: ["Oración y Ayuno (Intercesión)", "Cultos (Alabanza y Adoración)"],
  interpretacion: [
    "Oración y Ayuno (Intercesión)",
    "Cultos (Alabanza y Adoración)",
  ],
};
