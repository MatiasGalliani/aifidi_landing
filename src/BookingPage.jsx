import React, { useEffect, useState } from 'react'; // 👈 Asegurate de importar useState también
import { Helmet } from 'react-helmet-async';
import aiQuintoLogo from './assets/logo.png';
import logo_creditplan from './assets/LOGO-CREDITPLAN.png';
import { Footer } from './App';
import { motion } from 'framer-motion';

function ThankYouPage() {
  const [showCheck, setShowCheck] = useState(true); // 👈 Acá agregás el estado

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCheck(false); // Oculta el check
      setTimeout(() => {
        setShowCheck(true); // Lo muestra de nuevo después de 0.5s
      }, 500);
    }, 2000); // Cada 3.5 segundos repite el ciclo

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-blue-200">
      <Helmet>
        <title>Grazie - Richiesta Inviata</title>
        <meta name="description" content="La tua richiesta è stata inviata con successo. Ti contatteremo al più presto." />
      </Helmet>

      {/* Contenedor principal que centra el contenido */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-10 max-w-md text-center mt-32 mb-48">
          <div className="flex justify-center items-center space-x-6 mb-8">
            <img
              src={aiQuintoLogo}
              alt="AI Quinto Logo"
              className="w-32 h-auto bg-blue-700 rounded-xl p-1"
            />
            <img
              src={logo_creditplan}
              alt="Creditplan Logo"
              className="w-32 h-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Grazie!</h1>
          <p className="text-lg text-gray-700 mb-6">
            La tua richiesta è stata inviata con successo. <strong>Riceverai una mail con le istruzioni su come continuare. Grazie!</strong>
          </p>
          <div className="flex justify-center mb-6 h-16"> {/* altura fija para reservar espacio */}
            <motion.div
              key="check-icon"
              animate={{ scale: showCheck ? 1 : 0, opacity: showCheck ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>

          <p className="mt-10 text-sm text-gray-500 m-0">
            Siamo qui per supportarti nel tuo percorso finanziario.
          </p>
        </div>
      </div>

      {/* Footer fijo al final */}
      <Footer />
    </div>
  );
}

export default ThankYouPage;
