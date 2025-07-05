import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Card,
  Button,
  ProgressBar,
  Badge,
  Modal,
} from "react-bootstrap";
import SlideQuestion from "./slideQuestion";

const QUESTIONS = [
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
    text: "He sentido con claridad que debía evitar ciertas enseñanzas o líderes espirituales.",
    category: "discernimiento",
  },
  {
    id: 4,
    text: "He experimentado paz y confirmación interior después de entregar una palabra o consejo espiritual.",
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
    text: "He sido instrumento para traer consuelo profundo a personas quebrantadas.",
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
    text: "He sido testigo de provisiones o respuestas que claramente fueron sobrenaturales.",
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

const CATEGORIES_LABEL = {
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

const DEFINICIONES = {
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

const SpiritualGiftsTest = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [started, setStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const questionRef = useRef();
  // Solo preguntas reales (sin el slide final)
  const realQuestions = QUESTIONS.filter((q) => !q.isFinalSlide);
  // Solo contar respuestas a preguntas reales (id <= realQuestions.length)
  const realResponsesCount = Object.keys(responses).filter(
    (id) => parseInt(id) <= realQuestions.length
  ).length;
  const progress = (realResponsesCount / realQuestions.length) * 100;
  let progressVariant = "warning"; // Naranja para poco progreso
  if (progress >= 66) {
    progressVariant = "success";
  } else if (progress >= 33) {
    progressVariant = "info";
  }

  const handleSelect = (id, val) => {
    setResponses((prev) => ({ ...prev, [id]: val }));
    setSlideDirection("left");
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
      setSlideDirection("");
    }, 600);
  };

  // Animación para retroceder
  const handleBack = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setSlideDirection("");
    }, 600);
  };

  // Mostrar resultados si todas las preguntas reales han sido respondidas
  const handleSubmit = () => {
    if (realResponsesCount === realQuestions.length) {
      setSubmitted(true);
    }
  };

  const topResults = () => {
    const scores = {};
    QUESTIONS.forEach((q) => {
      scores[q.category] = (scores[q.category] || 0) + (responses[q.id] || 0);
    });
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, score]) => ({ cat, score, label: CATEGORIES_LABEL[cat] }));
  };

  return (
    <Container className="my-5">
      {!started ? (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            className="p-4 mx-auto border-0"
            style={{
              maxWidth: window.innerWidth <= 576 ? 420 : undefined,
              borderRadius: 18,
            }}
          >
            <div className="d-flex justify-content-center mb-5">
              <img
                src="/Jovenes LOGO.png"
                alt="Logo Jóvenes"
                style={{ maxWidth: 250, height: "auto" }}
              />
            </div>
            {/* <h5 className="text-center">Ministerio de Jóvenes con propósito</h5>
            <h5 className="text-center mb-4">Iglesia Cristiana Filadelfia</h5> */}
            <h1 className="text-center mb-4">
              <b>Bienvenido al Test de Dones Espirituales</b>
            </h1>
            <span className="text-center">
              Solo el Señor revela con claridad los dones espirituales en su
              tiempo. Esta herramienta no pretende reemplazar esa obra, sino
              ayudarte a reflexionar, a la luz de la Palabra, sobre cómo podrías
              estar siendo equipado por el Espíritu para edificar su Iglesia.
            </span>
            {/* <p className='text-center'>Hay diversidad de dones, pero el mismo Espíritu los distribuye. Hay diversidad de servicios, pero el mismo Señor. - 1 Corintios 12:4 NVI</p> */}
            <div className="d-flex justify-content-center mt-5">
              <Button
                variant="primary"
                size="lg"
                style={{ fontWeight: "bold", minWidth: 180 }}
                onClick={() => setStarted(true)}
              >
                <b>COMENZAR</b>
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <>
          {/* Barra de progreso sticky siempre visible */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              background: "#fff",
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            <ProgressBar
              now={
                (Math.min(currentIndex + 1, realQuestions.length) /
                  realQuestions.length) *
                100
              }
              label={
                <span style={{ fontWeight: "bold", fontSize: "1.35em" }}>
                  {Math.min(currentIndex + 1, realQuestions.length)}/
                  {realQuestions.length}
                </span>
              }
              className="mb-3"
              variant={progressVariant}
            />
          </div>
          <Card
            className="p-3 p-md-4 shadow-sm"
            style={{ borderRadius: 18, overflow: "hidden" }}
          >
            {/* Logo en la cabecera del test */}
            <div className="d-flex justify-content-center mb-4">
              <img
                src="/Jovenes LOGO.png"
                alt="Logo Jóvenes"
                style={{
                  maxWidth: window.innerWidth <= 576 ? 150 : 250,
                  width: "100%",
                  height: "auto",
                  cursor: "pointer",
                }}
                onClick={() => setShowExitModal(true)}
              />
            </div>
            {/* Modal de confirmación para salir */}
            <Modal
              show={showExitModal}
              onHide={() => setShowExitModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>¿Cancelar el test?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de querer cancelar el test y salir a la página de
                inicio?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowExitModal(false)}
                >
                  No, continuar con el test
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setStarted(false);
                    setSubmitted(false);
                    setResponses({});
                    setCurrentIndex(0);
                    setShowExitModal(false);
                  }}
                >
                  Sí, cancelar y salir
                </Button>
              </Modal.Footer>
            </Modal>
            {/* <h2 className="text-center">
              <b>Ministerio de Jóvenes con Propósito</b>
            </h2> */}
            <h1 className="mb-2 text-center">
              <b>TEST DE DONES ESPIRITUALES</b>
            </h1>
            <hr />
            {!submitted ? (
              <>
                {/* Carousel de preguntas con navegación siguiente/atrás solo con iconos */}
                {/* Slide final de cierre */}
                {QUESTIONS[currentIndex].isFinalSlide ? (
                  <div
                    className="w-100 text-center"
                    style={{
                      minHeight: 180,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h3
                      className="text-center my-3 my-md-4"
                      style={{ fontSize: "1.1rem", fontWeight: 700 }}
                    >
                      <strong>Fin del Test</strong>
                    </h3>
                    <span
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "#0d6efd",
                      }}
                    >
                      {QUESTIONS[currentIndex].text}
                    </span>
                    {/* Botón para regresar a la pregunta anterior */}
                    <Button
                      variant="light"
                      style={{
                        border: "none",
                        background: "none",
                        boxShadow: "none",
                        fontSize: "2.5rem",
                        color: "#0d6efd",
                        marginTop: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      aria-label="Regresar"
                      onClick={handleBack}
                    >
                      <span style={{ display: "inline-block" }}>&larr;</span>
                    </Button>
                  </div>
                ) : (
                  <SlideQuestion
                    key={QUESTIONS[currentIndex].id}
                    direction={slideDirection}
                  >
                    <h3
                      className="text-center my-3 my-md-4"
                      style={{ fontSize: "1.1rem", fontWeight: 700 }}
                    >
                      <strong>
                        {currentIndex + 1}. {QUESTIONS[currentIndex].text}
                      </strong>
                    </h3>
                    <div className="d-flex flex-column align-items-center w-100">
                      {/* Línea de flechas y círculos, responsiva */}
                      <div
                        className="d-flex justify-content-center align-items-center w-100 flex-nowrap"
                        style={{ gap: "12px", maxWidth: 420 }}
                      >
                        {/* Atrás: solo si no es la primera pregunta */}
                        {currentIndex > 0 ? (
                          <Button
                            variant="light"
                            style={{
                              border: "none",
                              fontSize: "2rem",
                              color: "#0d6efd",
                              background: "none",
                              boxShadow: "none",
                              minWidth: 36,
                              minHeight: 36,
                              padding: 0,
                            }}
                            aria-label="Anterior"
                            onClick={handleBack}
                          >
                            <span>&larr;</span>
                          </Button>
                        ) : (
                          <div style={{ width: 36 }}></div>
                        )}
                        {/* Círculos de opciones */}
                        <div
                          className="d-flex justify-content-center align-items-center flex-nowrap"
                          style={{ gap: "12px" }}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              style={{
                                width: 38,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                variant={
                                  responses[QUESTIONS[currentIndex].id] === n
                                    ? "primary"
                                    : "outline-primary"
                                }
                                className="rounded-circle"
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderWidth: 2,
                                  borderStyle: "solid",
                                  fontWeight: "bold",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "1.05rem",
                                  padding: 0,
                                }}
                                onClick={() =>
                                  handleSelect(QUESTIONS[currentIndex].id, n)
                                }
                              >
                                <span style={{ fontWeight: "bold" }}>{n}</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                        {/* Siguiente: solo si no es la última pregunta */}
                        {currentIndex < QUESTIONS.length - 2 ? (
                          <Button
                            variant="light"
                            style={{
                              border: "none",
                              fontSize: "2rem",
                              color: "#0d6efd",
                              background: "none",
                              boxShadow: "none",
                              minWidth: 36,
                              minHeight: 36,
                              padding: 0,
                            }}
                            aria-label="Siguiente"
                            disabled={
                              responses[QUESTIONS[currentIndex].id] == null
                            }
                            onClick={() => {
                              if (responses[QUESTIONS[currentIndex].id] == null)
                                return;
                              setSlideDirection("left");
                              setTimeout(() => {
                                setCurrentIndex(currentIndex + 1);
                                setSlideDirection("");
                              }, 600);
                            }}
                          >
                            <span>&rarr;</span>
                          </Button>
                        ) : (
                          <div style={{ width: 36 }}></div>
                        )}
                      </div>
                      {/* Etiquetas debajo, responsivas */}
                      <div
                        className="d-flex justify-content-center align-items-center mt-2 flex-nowrap"
                        style={{ gap: "12px" }}
                      >
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          Nunca
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          Rara vez
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          A veces
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          Casi siempre
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          Siempre
                        </span>
                      </div>
                    </div>
                  </SlideQuestion>
                )}

                {currentIndex === QUESTIONS.length - 1 &&
                  realResponsesCount === realQuestions.length && (
                    <Button
                      variant="success"
                      className="w-100"
                      onClick={handleSubmit}
                    >
                      <b>VER RESULTADOS</b>
                    </Button>
                  )}
              </>
            ) : (
              <div className="text-center">
                <h3 className="mb-4">Tus 3 Dones Principales</h3>
                {topResults().map((r) => (
                  <Card
                    key={r.cat}
                    className="mb-3 mx-auto"
                    style={{ maxWidth: "600px" }}
                  >
                    <Card.Body>
                      <Card.Title>
                        <Badge bg="info" pill>
                          {r.label}
                        </Badge>{" "}
                        — Puntaje: <strong>{r.score}</strong>
                      </Card.Title>
                      <Card.Text className="mt-2">
                        {DEFINICIONES[r.cat]}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setResponses({});
                    setCurrentIndex(0);
                    setStarted(true);
                  }}
                  className="mt-3"
                >
                  <b>REINICIAR TEST</b>
                </Button>
              </div>
            )}
          </Card>
        </>
      )}
    </Container>
  );
};

export default SpiritualGiftsTest;
