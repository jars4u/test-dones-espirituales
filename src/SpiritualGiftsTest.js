
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
import { QUESTIONS, CATEGORIES_LABEL, DEFINICIONES, MINISTERIOS_SUGERIDOS } from "./DATA";

const WEIGHTED_VALUES = { 1: 0, 2: 1, 3: 2, 4: 3 };

const calculateTopResults = (responses, questions) => {
  const scores = {};
  const counts = {};

  questions.forEach((q) => {
    if (!q.category) return;
    scores[q.category] =
      (scores[q.category] || 0) + WEIGHTED_VALUES[responses[q.id] || 0];
    counts[q.category] = (counts[q.category] || 0) + 1;
  });

  const results = Object.keys(scores).map((cat) => {
    const score = scores[cat];
    const max = counts[cat] * WEIGHTED_VALUES[4];
    const percent = Math.round((score / max) * 100);
    return { cat, percent, label: CATEGORIES_LABEL[cat] };
  });

  const filtered = results
    .filter((r) => r.percent >= 70)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3);

  return filtered.length > 0 ? filtered : null;
};

const SpiritualGiftsTest = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [started, setStarted] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showIgleModal, setShowIgleModal] = useState(false);
  console.log("responses", responses);

  const realQuestions = QUESTIONS.filter((q) => !q.isFinalSlide);
  const realResponsesCount = Object.keys(responses).filter(
    (id) => parseInt(id) <= realQuestions.length
  ).length;
  const progress = (realResponsesCount / realQuestions.length) * 100;
  let progressVariant = "warning";
  if (progress >= 66) progressVariant = "success";
  else if (progress >= 33) progressVariant = "info";

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

  const handleBack = () => {
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentIndex(currentIndex - 1);
      setSlideDirection("");
    }, 600);
  };

  const handleSubmit = () => {
    if (realResponsesCount === realQuestions.length) {
      setSubmitted(true);
    }
  };

  const resultData = calculateTopResults(responses, QUESTIONS);
  console.log("resultData", resultData);

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
                style={{ maxWidth: 250, height: "auto", cursor: "pointer" }}
                onClick={() => setShowIgleModal(true)}
              />
            </div>
            {/* Modal de advertencia para redirección */}
            <Modal
              show={showIgleModal}
              onHide={() => setShowIgleModal(false)}
              centered
            >
              <Modal.Body>
                Serás redirigido a la página web de la Iglesia Cristiana
                Filadelfia y se cancelará el test. ¿Deseas continuar?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowIgleModal(false)}
                >
                  No, permanecer aquí
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowIgleModal(false);
                    setStarted(false);
                    setSubmitted(false);
                    setResponses({});
                    setCurrentIndex(0);
                    window.location.href = "https://iglefiladelfia.com/";
                  }}
                >
                  Sí, ir a la web
                </Button>
              </Modal.Footer>
            </Modal>
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
                style={{ maxWidth: 250, height: "auto", cursor: "pointer" }}
                onClick={() => setShowIgleModal(true)}
              />
            </div>
            {/* Modal de advertencia para redirección */}
            <Modal
              show={showIgleModal}
              onHide={() => setShowIgleModal(false)}
              centered
            >
              <Modal.Body>
                Serás redirigido a la página web de la Iglesia Cristiana
                Filadelfia y se cancelará el test. ¿Deseas continuar?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowIgleModal(false)}
                >
                  No, permanecer aquí
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowIgleModal(false);
                    setStarted(false);
                    setSubmitted(false);
                    setResponses({});
                    setCurrentIndex(0);
                    window.location.href = "https://iglefiladelfia.com/";
                  }}
                >
                  Sí, ir a la web
                </Button>
              </Modal.Footer>
            </Modal>
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
                          style={{ gap: "25px" }}
                        >
                          {[1, 2, 3, 4].map((n) => (
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
                          Alguna vez
                        </span>
                        <span
                          style={{
                            fontSize: "0.78rem",
                            minWidth: 38,
                            textAlign: "center",
                          }}
                        >
                          A menudo
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

                {/* Botón cancelar solo si NO está el botón VER RESULTADOS */}
                {!(
                  currentIndex === QUESTIONS.length - 1 &&
                  realResponsesCount === realQuestions.length
                ) && (
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShowExitModal(true)}
                      className="mt-5"
                    >
                      <b>CANCELAR TEST</b>
                    </Button>
                  </div>
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
                <h3 className="mb-4">
                  {resultData ? "Tus Dones Principales" : "Resultado del Test"}
                </h3>
                {resultData ? (
                  resultData.map((r) => (
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
                          — Afinidad: <strong>{r.percent}%</strong>
                        </Card.Title>
                        <Card.Text className="mt-2">
                          {DEFINICIONES[r.cat]}
                        </Card.Text>
                        <hr />
                        <strong>Ministerios sugeridos de nuestra iglesia:</strong>
                        <div>
                          {MINISTERIOS_SUGERIDOS[r.cat].map((m, i) => (
                            <div key={i}>{m}</div>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p
                    className="text-center mb-3 px-5"
                    style={{ fontSize: "0.9rem" }}
                  >
                    ⚠️{" "}
                    <strong>No pudimos detectar afinidad con algún don.</strong>{" "}
                    <br />
                    ¡Sigue creciendo en tu fe 🕊️ y en tu experiencia con el
                    Señor, y vuelve a intentarlo más adelante! 💪📖
                  </p>
                )}
                <p
                  className="text-center bg-warning p-2 border rounded"
                  style={{ fontSize: "0.75rem" }}
                >
                  <strong>Recuerda:</strong> este resultado no es absoluto. Solo
                  el Espíritu Santo, a través de tu caminar fiel y la comunidad
                  de creyentes, puede confirmar tus dones.
                </p>
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
