import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import logo_creditplan from './assets/LOGO-CREDITPLAN.png'
import family_w_dog from './assets/family_with_dog.png'
import savingSvg from './assets/saving.svg'
import './App.css'
import aiQuintoLogo from './assets/ai_quinto_logo.png'
import { Helmet } from "react-helmet-async";
import ThankYouPage from './BookingPage'
import FormScreen from './FormScreen'
import { motion } from "framer-motion";
import ChatWidget from './components/ChatWidget'

function HeroWave() {
  return (
    <div className="relative h-40 overflow-hidden">
      <svg className="absolute block top-0 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#1e40af" // updated to blue-800
          fillOpacity="0.8"
          d="M0,160 C480,320 960,0 1440,160 L1440,320 L0,320 Z"
        />
      </svg>
      <svg className="absolute block top-4 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#0099ff"
          fillOpacity="0.6"
          d="M0,200 C480,100 960,300 1440,200 L1440,320 L0,320 Z"
        />
      </svg>
      <svg className="absolute block top-8 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#d1d5db"
          fillOpacity="0.8"
          d="M0,240 C480,80 960,240 1440,240 L1440,320 L0,320 Z"
        />
      </svg>
      <svg className="absolute block top-12 left-0 w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#d1d5db"
          fillOpacity="1"
          d="M0,260 C480,150 960,370 1440,260 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  )
}

function Wave() {
  return (
    <div className="wave-container">
      <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,256L1440,96L1440,320L0,320Z"
        ></path>
      </svg>
    </div>
  )
}

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)
  const faqs = [
    {
      question: "Cos'è la Cessione del Quinto?",
      answer:
        "La Cessione del Quinto è un prestito personale con una rata mensile che non supera il quinto (20%) del tuo stipendio netto o della tua pensione, trattenuta direttamente in busta paga o sulla pensione."
    },
    {
      question: "Quanto tempo serve per ottenere il prestito?",
      answer:
        "Con Creditplan puoi ottenere la liquidità necessaria in pochi giorni grazie ai nostri partner bancari specializzati e al team qualificato di Creditplan."
    },
    {
      question: "Quali requisiti devo avere per richiedere la Cessione del Quinto?",
      answer:
        "Puoi richiedere la Cessione del Quinto se sei un lavoratore dipendente (pubblico o privato) con contratto a tempo indeterminato o un pensionato. Non è richiesto alcun garante."
    },
    {
      question: "Esiste un limite massimo di età per la Cessione del Quinto?",
      answer:
        "Sì, i pensionati possono ottenere il prestito fino a 89 anni alla scadenza del finanziamento."
    },
    {
      question: "Cosa succede se non raggiungo i requisiti per rinnovare una Cessione del Quinto già in corso?",
      answer:
        "In caso di mancato raggiungimento dei termini per il rinnovo, possiamo valutare insieme la Delegazione di Pagamento, una seconda trattenuta sullo stipendio che permette di ottenere ulteriore liquidità."
    },
    {
      question: "Perché dovrei scegliere Creditplan?",
      answer:
        "Offriamo tempi rapidi di erogazione. Collaboriamo con partner bancari convenzionati INPS, garantendo sicurezza e affidabilità. Abbiamo un team dedicato di professionisti a tua disposizione. Nessuna spesa aggiuntiva la consulenza è gratuita. Tassi altamente competitivi."
    },
    {
      question: "Posso richiedere il prestito se sono stato segnalato come cattivo pagatore?",
      answer:
        "Sì, la Cessione del Quinto è accessibile anche in caso di segnalazioni o protesti, in quanto non si basa sulla tua storia creditizia, ma sul tuo stipendio o pensione."
    },
    {
      question: "È possibile estinguere anticipatamente la Cessione del Quinto?",
      answer:
        "Sì, puoi estinguere anticipatamente il prestito in qualsiasi momento beneficiando della riduzione degli interessi residui."
    },
    {
      question: "Quanto costa la consulenza iniziale con Creditplan?",
      answer:
        "La consulenza iniziale con i nostri esperti è completamente gratuita e senza impegno."
    }
  ]

  return (
    <div id="faq" className="scroll-mt-20 my-16 w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center mb-8">Domande Frequenti</h2>
      {faqs.map((faq, index) => {
        const isActive = index === activeIndex
        return (
          <div key={index} className="border-b border-gray-300">
            <button
              className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
              onClick={() => setActiveIndex(isActive ? null : index)}
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <FaArrowRight
                className={`transition-transform duration-300 ${isActive ? "rotate-90" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-40" : "max-h-0"}`}
            >
              <p className="text-gray-600 pb-4">{faq.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Nuevo componente ContactPage
function ContactPage({ onBack, onSubmit }) {
  const [loading, setLoading] = useState(true);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = "Campo obbligatorio";
    if (!cognome.trim()) newErrors.cognome = "Campo obbligatorio";
    if (!mail.trim()) newErrors.mail = "Campo obbligatorio";
    if (!telefono.trim()) newErrors.telefono = "Campo obbligatorio";
    if (!privacyAccepted) newErrors.privacy = "Campo obbligatorio";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmissionLoading(true);

    // Construye el objeto con las claves que espera el Apps Script.
    const data = {
      nome: nome,         // Primer valor: Nombre
      cognome: cognome,   // Segundo valor: Apellido
      email: mail,        // Tercer valor: Email
      telefono: telefono  // Cuarto valor: Teléfono
    };

    console.log("Datos a enviar:", data);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbzu0BMWs416ubQ8eH3g3bcY6eqkWjL0-uHldfGIkOce21YmSAPCT18CicAqQ5VyvxKF2g/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Dado que usamos "no-cors", asumimos que se envió correctamente.
      setTimeout(() => {
        setSubmissionLoading(false);
        onSubmit(); // Redirige a la ThankYouPage
      }, 2000);
    } catch (error) {
      console.error("Error en la petición:", error);
      setSubmissionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white rounded-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-700 border-t-transparent"></div>
      </div>
    );
  }

  if (submissionLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white rounded-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-700 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4 rounded-2xl">
      <div className="w-full max-w-[38.5rem]">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="mr-4">
            <FaArrowLeft className="text-2xl text-black" />
          </button>
          <h2 className="flex-1 text-3xl font-semibold text-center">
            Inserisci i tuoi dati per essere contattato
          </h2>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" id="contact-form">
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setErrors({ ...errors, nome: "" });
              }}
              className="border p-4 rounded-2xl text-xl w-full"
            />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Cognome"
              value={cognome}
              onChange={(e) => {
                setCognome(e.target.value);
                setErrors({ ...errors, cognome: "" });
                console.log("Cognome:", e.target.value);
              }}
              className="border p-4 rounded-2xl text-xl w-full"
            />
            {errors.cognome && <p className="text-red-500 text-sm">{errors.cognome}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={mail}
              onChange={(e) => {
                setMail(e.target.value);
                setErrors({ ...errors, mail: "" });
              }}
              className="border p-4 rounded-2xl text-xl w-full"
            />
            {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Telefono"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
                setErrors({ ...errors, telefono: "" });
              }}
              className="border p-4 rounded-2xl text-xl w-full"
            />
            {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono}</p>}
          </div>
        </form>
        {/* Bloque de privacidad */}
        <div className="mt-4 w-full">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="privacy1"
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked);
                setErrors({ ...errors, privacy: "" });
              }}
              className="mr-2 mt-1 transition-all duration-300"
            />
            <div>
              <label htmlFor="privacy1" className="text-sm text-gray-800 leading-snug">
                Dichiaro di aver preso visione dell'Informativa ai sensi del Decreto Legislativo 196/2003 e del Regolamento (UE) 2016/679 (GDPR).
              </label>
              {!privacyAccepted && errors.privacy && (
                <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>
              )}
            </div>
          </div>
          <div className="flex items-start mt-2">
            <input
              type="checkbox"
              id="privacy2"
              checked={privacyAccepted}
              onChange={(e) => {
                setPrivacyAccepted(e.target.checked);
                setErrors({ ...errors, privacy: "" });
              }}
              className="mr-2 mt-1 transition-all duration-300"
            />
            <div>
              <label htmlFor="privacy2" className="text-sm text-gray-800 leading-snug">
                Do il consenso a Creditplan al trattamento dei miei dati personali per contattarmi via email o telefono, valutare il mio profilo creditizio e creare un preventivo personalizzato. *Con l'invio della richiesta, dichiaro di aver preso visione dell'informativa sulla privacy.
              </label>
              {!privacyAccepted && errors.privacy && (
                <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>
              )}
            </div>
          </div>
        </div>
        <button
          className="mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300"
          onClick={handleSubmit}
        >
          Invia Richiesta
        </button>
      </div>
    </div>
  );
}

function MainApp() {
  const navigate = useNavigate()
  const [chatOpen, setChatOpen] = useState(false)
  const [showFormScreen, setShowFormScreen] = useState(false)
  const [showContactPage, setShowContactPage] = useState(false)
  const [showContactFields, setShowContactFields] = useState(false)
  const [submissionLoading, setSubmissionLoading] = useState(false)
  const [contactPrivacyAccepted, setContactPrivacyAccepted] = useState(false)

  const [contactNome, setContactNome] = useState("");
  const [contactCognome, setContactCognome] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [contactTelefono, setContactTelefono] = useState("");
  const [contactErrors, setContactErrors] = useState({});

  // Función de callback para envío de formulario
  const onFormSubmit = () => {
    // Muestra un spinner de envío
    setSubmissionLoading(true)
    setTimeout(() => {
      setSubmissionLoading(false)
      // Cierra el formulario y muestra la Thank You page
      setShowFormScreen(false)
      navigate("/thankyoupage") // Redirige a la ruta "/thankyoupage"
    }, 2000) // Ajusta el tiempo según tu necesidad
  }

  const handleContactSubmit = () => {
    const errors = {};
    if (!contactNome.trim()) errors.nome = "Campo obbligatorio";
    if (!contactCognome.trim()) errors.cognome = "Campo obbligatorio";
    if (!contactMail.trim()) errors.mail = "Campo obbligatorio";
    if (!contactTelefono.trim()) errors.telefono = "Campo obbligatorio";
    if (!contactPrivacyAccepted) errors.privacy = "Campo obbligatorio";

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    // Si no hay errores, muestra la Thank You page
    navigate("/thankyoupage")
  };

  if (submissionLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white rounded-2xl">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-700 border-t-transparent"></div>
      </div>
    )
  }

  if (showFormScreen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <FormScreen onClose={() => setShowFormScreen(false)} onFormSubmit={onFormSubmit} />
      </motion.div>
    );
  }

  if (showContactPage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <ContactPage
          onBack={() => setShowContactPage(false)}
          onSubmit={() => navigate("/thankyoupage")}
        />
      </motion.div>
    )
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Cessione del Quinto - Prestiti per Dipendenti e Pensionati",
    "description": "Ottieni un prestito sicuro con la cessione del quinto per dipendenti pubblici e pensionati con tassi agevolati e rate fisse.",
    "provider": {
      "@type": "FinancialService",
      "name": "Creditplan",
      "url": "https://aiquinto.it",
      "logo": "https://aiquinto.it/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "areaServed": "IT",
        "availableLanguage": ["Italian", "English"]
      }
    },
    "offers": {
      "@type": "LoanOrCredit",
      "name": "Cessione del Quinto Creditplan",
      "loanType": "Cessione del Quinto",
      "interestRate": "3.5",
      "loanTerm": "120 mesi",
      "amount": {
        "@type": "MonetaryAmount",
        "currency": "EUR",
        "value": "5000-75000"
      },
      "eligibleCustomerType": ["Pensionati", "Dipendenti Pubblici", "Dipendenti Privati"],
      "provider": {
        "@type": "FinancialService",
        "name": "Creditplan"
      },
      "termsOfService": "https://aiquinto.it/termini"
    },
    "review": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="flex flex-col min-h-screen animate-fadeIn overflow-x-hidden">
      <Helmet>
        <title>Cessione del Quinto - Creditplan</title>
        <meta name="description" content="Ottieni un prestito sicuro con la cessione del quinto per dipendenti pubblici e pensionati con tassi agevolati." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <main className="flex-grow">
        {/* Sección Hero con fondo celeste y olas */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-300 w-full pt-4 transition-all duration-500 ease-out">
          <div className="flex flex-col md:flex-row justify-center items-stretch mx-4 md:mx-12 gap-6">
            <div className="p-6 md:mr-12 mb-6 md:mb-0">
              <div className="px-4 md:px-16">
                <h1 className="flex items-center space-x-2 mt-8 animate-fadeIn">
                  <img
                    src={aiQuintoLogo}
                    alt="AI Quinto Logo"
                    className="w-32 sm:w-40 md:w-56 px-2 py-0 bg-blue-800 rounded-full transition-all duration-500 hover:scale-105"
                  />
                  <span className="text-center text-base sm:text-xl font-medium animate-fadeIn">by</span>
                  <img
                    src={logo_creditplan}
                    alt="Creditplan Logo"
                    className="w-40 sm:w-48 md:w-72 transition-all duration-500 hover:scale-105"
                  />
                </h1>
                <p className="inline-block text-xs font-medium text-green-950 mt-4 py-0.5 bg-green-200 px-2 border border-green-500 rounded-lg animate-fadeIn">
                  Offerta a tempo limitato
                </p>
                <h2 className="text-3xl md:text-5xl font-semibold mt-4 text-gray-800 animate-fadeIn">
                  Richiedi subito fino a € 75.000 per la tua Cessione del Quinto
                </h2>
                <p className="text-lg text-gray-900 mt-4 animate-fadeIn">
                  Risparmia tempo e denaro con AIquinto.it by Creditplan.
                </p>
                <p className="text-2xl font-medium text-gray-800 mt-5 animate-fadeIn">
                  Richiedi la Cessione del Quinto in pochi click.
                </p>
                <p>
                  Rispondi a poche domande per ricevere il tuo preventivo personalizzato.
                </p>
                <div className="mt-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="flex flex-col space-y-4">
                    {/* Box para iniciar el formulario */}
                    <div
                      className="relative bg-blue-800 w-full sm:w-[90%] md:w-[1000px] h-16 cursor-pointer border border-gray-400 hover:border-gray-700 rounded-2xl flex items-center justify-center px-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
                      onClick={() => setShowFormScreen(true)}
                    >
                      <span className="text-xl md:text-2xl font-medium text-white mr-2">
                        Inizia Ora
                      </span>
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                        <FaArrowRight className="text-sm text-blue-800" />
                      </div>
                    </div>
                    <p className="flex justify-center text-lg text-gray-500 animate-fadeIn">
                      Oppure
                    </p>
                    {/* Box para enlace de agente */}
                    <div>
                      <div
                        className="relative bg-white w-full sm:w-[90%] md:w-[1000px] h-16 cursor-pointer border border-gray-400 hover:border-gray-700 rounded-2xl flex items-center justify-center px-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
                        onClick={() => setShowContactPage(true)}
                      >
                        <span className="text-xl md:text-2xl font-medium text-black mr-2">
                          Richiedi di Essere Contattato
                        </span>
                        <div className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center">
                          <FaArrowRight className="text-sm text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              src={family_w_dog}
              alt="family with dog"
              className="w-full md:w-96 h-full object-cover rounded-3xl transition-all duration-500 hover:scale-105"
            />
          </div>
          <HeroWave />
        </div>
        {/* Resto de la página */}
        <div className="bg-white transition-all duration-500 ease-out">
          {/* Sección de Ilustración */}
          <div className="my-24 w-full max-w-4xl mx-auto px-4 flex justify-center animate-fadeIn">
            <div className="inline-flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="text-center md:text-left">
                <h5 className="font-medium text-4xl mb-2">
                  Il servizio 100% digitale 100% umano.
                </h5>
                <p className="text-gray-700 font-normal text-xl">
                  Gestito dalla nostra Intelligenza Artificiale e dagli esperti a te dedicati.
                </p>
              </div>
              <div>
                <img
                  src={savingSvg}
                  alt="Ilustración de ahorro"
                  className="max-w-sm transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Sección Reactiva */}
          <div className="my-32 text-center bg-gradient-to-r from-blue-100 to-blue-300 p-8 mx-0 md:mx-auto shadow-md transition-all duration-500 hover:scale-105">
            <p className="text-4xl font-semibold animate-fadeIn">
              Scopri subito quanto puoi ottenere!
            </p>
            <p className="text-lg text-gray-600 mt-4 animate-fadeIn">
              Calcola in pochi click il tuo finanziamento su misura: semplice, veloce e senza impegno.
            </p>
            <button
              onClick={() => setShowFormScreen(true)}
              className="bg-blue-700 text-white px-8 py-2 rounded-2xl mt-8 border border-gray-400 shadow-md transition-transform duration-500 hover:scale-105 hover:shadow-lg"
            >
              Inizia Ora
            </button>
          </div>
          {/* Sección de Preguntas Frecuentes */}
          <div className="my-16 animate-fadeIn">
            <FAQ />
          </div>
          {/* Sección de botones clicables */}
          {!showContactFields ? (
            <div className="w-full sm:w-[90%] md:w-[1000px] mx-0 md:mx-auto bg-gradient-to-r from-blue-100 to-blue-300 p-8 md:rounded-2xl shadow-md transition-all duration-500 hover:scale-105">
              <h2 className="text-3xl font-semibold text-center mb-8 animate-fadeIn">
                Richiedi subito la tua
                <br />
                Cessione del Quinto!
              </h2>
              <div className="my-8 flex flex-col md:flex-row gap-4">
                <div
                  onClick={() => setShowFormScreen(true)}
                  className="w-full md:flex-1 cursor-pointer bg-blue-800 hover:bg-blue-700 text-white px-8 py-3 text-xl transform transition-all duration-500 hover:scale-105 hover:shadow-lg flex items-center justify-between rounded-2xl"
                >
                  <span>Inizia Ora</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <FaArrowRight className="text-sm text-blue-800" />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setShowContactFields(true);
                    setChatOpen(true); // Opens the ChatWidget via Eugenio’s button
                  }}
                  className="w-full md:flex-1 cursor-pointer bg-white hover:bg-gray-100 text-black px-8 py-3 text-xl border border-gray-400 transform transition-all duration-500 hover:scale-105 hover:shadow-lg flex items-center justify-between rounded-2xl"
                >
                  <span>Richiedi di Essere Contattato</span>
                  <div className="w-6 h-6 rounded-full bg-blue-800 flex items-center justify-center">
                    <FaArrowRight className="text-sm text-white" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full sm:w-[90%] md:w-[1000px] mx-auto bg-gradient-to-r from-blue-100 to-blue-300 p-8 rounded-2xl shadow-md transition-all duration-500 hover:scale-105">
              <div className="flex items-center mb-8">
                <button
                  onClick={() => {
                    setShowContactFields(false);
                    setContactErrors({});
                  }}
                  className="mr-4 transition-all duration-500 hover:scale-105"
                >
                  <FaArrowLeft className="text-2xl text-black" />
                </button>
                <h2 className="flex-1 text-3xl font-semibold text-center animate-fadeIn">
                  Inserisci i tuoi dati per essere contattato
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={contactNome}
                    onChange={(e) => {
                      setContactNome(e.target.value);
                      setContactErrors({ ...contactErrors, nome: "" });
                    }}
                    className="border p-4 rounded-2xl text-xl w-full transition-all duration-500 focus:scale-105"
                  />
                  {contactErrors.nome && <p className="text-red-500 text-sm">{contactErrors.nome}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Cognome"
                    value={contactCognome}
                    onChange={(e) => {
                      setContactCognome(e.target.value);
                      setContactErrors({ ...contactErrors, cognome: "" });
                    }}
                    className="border p-4 rounded-2xl text-xl w-full transition-all duration-500 focus:scale-105"
                  />
                  {contactErrors.cognome && <p className="text-red-500 text-sm">{contactErrors.cognome}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={contactMail}
                    onChange={(e) => {
                      setContactMail(e.target.value);
                      setContactErrors({ ...contactErrors, mail: "" });
                    }}
                    className="border p-4 rounded-2xl text-xl w-full transition-all duration-500 focus:scale-105"
                  />
                  {contactErrors.mail && <p className="text-red-500 text-sm">{contactErrors.mail}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefono"
                    value={contactTelefono}
                    onChange={(e) => {
                      setContactTelefono(e.target.value);
                      setContactErrors({ ...contactErrors, telefono: "" });
                    }}
                    className="border p-4 rounded-2xl text-xl w-full transition-all duration-500 focus:scale-105"
                  />
                  {contactErrors.telefono && <p className="text-red-500 text-sm">{contactErrors.telefono}</p>}
                </div>
              </div>
              {/* Bloque de privacidad */}
              <div className="mt-4 w-full">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="contactPrivacy1"
                    checked={contactPrivacyAccepted}
                    onChange={(e) => {
                      setContactPrivacyAccepted(e.target.checked);
                      setContactErrors({ ...contactErrors, privacy: "" });
                    }}
                    className="mr-2 mt-1 transition-all duration-300"
                  />
                  <div>
                    <label htmlFor="contactPrivacy1" className="text-sm text-gray-800 leading-snug">
                      Dichiaro di aver preso visione dell'Informativa ai sensi del Decreto Legislativo 196/2003 e del Regolamento (UE) 2016/679 (GDPR).
                    </label>
                    {!contactPrivacyAccepted && contactErrors.privacy && (
                      <p className="text-red-500 text-sm mt-1">{contactErrors.privacy}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start mt-2">
                  <input
                    type="checkbox"
                    id="contactPrivacy2"
                    checked={contactPrivacyAccepted}
                    onChange={(e) => {
                      setContactPrivacyAccepted(e.target.checked);
                      setContactErrors({ ...contactErrors, privacy: "" });
                    }}
                    className="mr-2 mt-1 transition-all duration-300"
                  />
                  <div>
                    <label htmlFor="contactPrivacy2" className="text-sm text-gray-800 leading-snug">
                      Do il consenso a Creditplan al trattamento dei miei dati personali per contattarmi via email o telefono, valutare il mio profilo creditizio e creare un preventivo personalizzato. *Con l'invio della richiesta, dichiaro di aver preso visione dell'informativa sulla privacy.
                    </label>
                    {!contactPrivacyAccepted && contactErrors.privacy && (
                      <p className="text-red-500 text-sm mt-1">{contactErrors.privacy}</p>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="mt-8 block mx-auto w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300 transition-all duration-500 hover:scale-105"
                onClick={handleContactSubmit}
              >
                Invia Richiesta
              </button>
            </div>
          )}

          <Wave />
        </div>
      </main>

      <Footer />
      <ChatWidget
        open={chatOpen}
        setOpen={setChatOpen}
      />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/thankyoupage" element={<ThankYouPage />} />
      </Routes>
    </Router>
  )
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Informazioni Aziendali */}
          <div>
            <img
              src={logo_creditplan}
              alt="Logo Creditplan"
              className="w-32 mb-2"
            />
            <div className="flex flex-col items-start">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Creditplan Italia Network di Mediazione Creditizia SRL
                </h3>
                <p className="text-sm">
                  Iscr. OAM n.M30<br />
                  P.IVA 06197620963<br />
                  REA MB-1856950
                </p>
              </div>
              <a
                href="https://www.organismo-am.it/b/0/06197620963/F311BEF5-24B7-4A32-AB79-567598386DBC/g.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2"
              >
                <img
                  src="https://www.organismo-am.it/b/0/c3f18c274847902265f07537ce366a8eJO5NMdSW1LRcd_pl_8_eq_/1.png"
                  alt="Iscrizione OAM"
                  className="w-24"
                />
              </a>
            </div>
          </div>
          {/* Contatti */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contatti</h3>
            <p className="text-sm">
              Via Giacomo Tosi, 3<br />
              20900 Monza (MB)<br />
              Via Mazzini, 20<br />
              20123 Milano (MI)
            </p>
            <p className="text-sm mt-2">
              Tel: +39 039 2020978 (centralino unico)<br />
              Tel: +39 039 33050330
            </p>
            <p className="text-sm mt-2">
              Email:{" "}
              <a href="mailto:info@creditplan.it" className="underline">
                info@creditplan.it
              </a>
              <br />
              <a href="mailto:creditplan@pec.it" className="underline">
                creditplan@pec.it
              </a>
            </p>
          </div>
          {/* Link Utili */}
          <div>
            <a
              href="https://creditplan.it/dove-siamo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group inline-block transition-transform duration-300 transform hover:scale-105">
                <h3 className="text-lg font-bold mb-2 flex items-center">
                  Trova il tuo consulente Creditplan
                  <FaArrowRight className="ml-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                </h3>
              </div>
            </a>
            <h4 className="text-lg font-bold mb-2 mt-4">Link Utili</h4>
            <ul className="text-sm space-y-1">
              <li>
                <a href="/trasparenza" className="underline">
                  Trasparenza
                </a>
              </li>
              <li>
                <a href="/reclami" className="underline">
                  Reclami
                </a>
              </li>
              <li>
                <a href="/guida-ai-mutui" className="underline">
                  Guida ai mutui
                </a>
              </li>
              <li>
                <a href="/privacy" className="underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/faq" className="underline">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://creditplanservices.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  creditplanservices.it
                </a>
              </li>
              <li>
                <a
                  href="https://creditplanre.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  creditplanre.it
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-left">
            Copyright © 2025 – Creditplan Italia Network di mediazione creditizia srl. All Rights Reserved.
            <br />
          </p>
          <p className='text-xs text-left mb-5 mt-3'>
            Designed &amp; developed by Matias Galliani :)
          </p>
        </div>
      </div>
    </footer>
  )
}

export default App;
