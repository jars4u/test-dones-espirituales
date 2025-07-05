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
    text: "He sentido en momentos importantes una claridad que me ayuda a tomar decisiones difíciles.",
    category: "palabra_sabiduria",
  },
  {
    id: 2,
    text: "He sentido la capacidad de interpretar mensajes en lenguas para beneficio del grupo o iglesia.",
    category: "interpretacion",
  },
  {
    id: 3,
    text: "He experimentado hablar en lenguas que no conozco y que me han edificado espiritualmente.",
    category: "lenguas",
  },
  {
    id: 4,
    text: "He visto cómo oraciones hechas con fe han producido cambios concretos en la vida de alguien.",
    category: "fe",
  },
  {
    id: 5,
    text: "He reconocido cuando una manifestación espiritual no provenía del Espíritu Santo.",
    category: "discernimiento",
  },
  {
    id: 6,
    text: "He aplicado enseñanzas bíblicas que han cambiado el rumbo de situaciones en mi vida o en la de otros.",
    category: "palabra_sabiduria",
  },
  {
    id: 7,
    text: "He sentido que la oración ha sido respondida con sanidad física o espiritual.",
    category: "sanidades",
  },
  {
    id: 8,
    text: "En reuniones, he expresado mensajes que han ayudado a otros a entender la voluntad de Dios.",
    category: "profecia",
  },
  {
    id: 9,
    text: "He tenido momentos en que una palabra en lenguas fue claramente interpretada y edificó a otros.",
    category: "interpretacion",
  },
  {
    id: 10,
    text: "He participado en momentos donde alguien fue sanado o consolado de forma evidente.",
    category: "sanidades",
  },
  {
    id: 11,
    text: "He vivido situaciones en las que Dios ha intervenido de manera sobrenatural a través de mi oración.",
    category: "milagros",
  },
  {
    id: 12,
    text: "He sentido confianza para actuar en circunstancias que parecían desesperadas.",
    category: "palabra_ciencia",
  },
  {
    id: 13,
    text: "He sentido una convicción fuerte y clara para hablar de parte de Dios en momentos precisos.",
    category: "profecia",
  },
  {
    id: 14,
    text: "He podido distinguir cuando una enseñanza o experiencia no estaba alineada con la verdad bíblica.",
    category: "discernimiento",
  },
  {
    id: 15,
    text: "He orado con expectativa y he visto respuestas que me sorprendieron por su naturaleza milagrosa.",
    category: "milagros",
  },
  {
    id: 16,
    text: "He visto que mi fe ha inspirado a otros a confiar en Dios en medio de problemas.",
    category: "interpretacion",
  },
  {
    id: 17,
    text: "He hablado en público con palabras que han motivado o guiado a otros hacia Dios.",
    category: "milagros",
  },
  {
    id: 18,
    text: "En circunstancias difíciles, he recibido una percepción profunda para actuar con sabiduría espiritual.",
    category: "interpretacion",
  },
  {
    id: 19,
    text: "He experimentado una fe firme que me ha sostenido cuando parecía imposible seguir adelante.",
    category: "palabra_ciencia",
  },
  {
    id: 20,
    text: "He sentido que Dios me guía en mi manera de hablar para fortalecer a otros en la fe.",
    category: "profecia",
  },
  {
    id: 21,
    text: "He sentido la convicción de que Dios obró milagrosamente en alguna situación cercana.",
    category: "sanidades",
  },
  {
    id: 22,
    text: "He sentido en mi interior que debo tener cuidado con ciertas doctrinas o enseñanzas por no ser bíblicas.",
    category: "discernimiento",
  },
  {
    id: 23,
    text: "En alguna ocasión, he sido testigo de eventos que no tienen explicación natural.",
    category: "sanidades",
  },
  {
    id: 24,
    text: "He sabido cuándo era necesario advertir a otros sobre algo que venía en contra de la palabra de Dios.",
    category: "profecia",
  },
  {
    id: 25,
    text: "He experimentado paz y confirmación interior después de entregar una palabra o consejo espiritual.",
    category: "palabra_sabiduria",
  },
  {
    id: 26,
    text: "He podido explicar verdades bíblicas que otros no entendían claramente.",
    category: "palabra_ciencia",
  },
  {
    id: 27,
    text: "He discernido entre diferentes influencias espirituales en un ambiente de iglesia o grupo cristiano.",
    category: "discernimiento",
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
  sanidades:
    "Capacidad espiritual para sanar enfermedades como señal apostólica.",
  milagros: "Actos sobrenaturales que confirman la autoridad del evangelio.",
  profecia:
    "Declaración inspirada para exhortar o revelar la voluntad de Dios.",
  discernimiento:
    "Habilidad para distinguir si una manifestación es del Espíritu.",
  lenguas: "Hablar en lenguas no aprendidas, señal temporal para edificación.",
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
              now={((Math.min(currentIndex + 1, realQuestions.length)) / realQuestions.length) * 100}
              label={
                <span style={{ fontWeight: "bold", fontSize: "1.35em" }}>
                  {Math.min(currentIndex + 1, realQuestions.length)}/{realQuestions.length}
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
