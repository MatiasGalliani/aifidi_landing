import { useState, useEffect } from "react"
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

const pageTransition = { duration: 0.5, ease: "easeInOut" }

function FormScreen({ onClose, onFormSubmit }) {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState(null) // "pensionato" o "dipendente"
  const [depType, setDepType] = useState(null) // Opción del dropdown principal
  const [dropdownOpen, setDropdownOpen] = useState(false) // Controla el desplegable principal

  // NUEVOS estados para el dropdown secundario
  const [secondaryDropdownOpen, setSecondaryDropdownOpen] = useState(false)
  const [secondarySelection, setSecondarySelection] = useState(null)

  // NUEVOS estados para la pagina adicional de "Pubblico"
  const [contractType, setContractType] = useState("")
  const [birthDate, setBirthDate] = useState("1968-05-23")
  const [province, setProvince] = useState("")
  // New state to determine if the device is mobile
  const [isMobile, setIsMobile] = useState(false)

  // Estados de Informazioni Contatto
  const [nome, setNome] = useState("")
  const [cognome, setCognome] = useState("")
  const [mail, setMail] = useState("")
  const [telefono, setTelefono] = useState("")
  // Estado para aceptar la Privacy Policy
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  // NUEVOS estados para el dropdown de contrato y provincia
  const [contractDropdownOpen, setContractDropdownOpen] = useState(false);
  const [provinceDropdownOpen, setProvinceDropdownOpen] = useState(false);

  // NUEVOS estados para el flujo "Dipendente"
  const [amountRequested, setAmountRequested] = useState("")
  const [netSalary, setNetSalary] = useState("")

  // NUEVOS estados para el flujo "Dipendente Privato"
  const [over12Months, setOver12Months] = useState("")
  const [numEmployees, setNumEmployees] = useState("")

  // NUEVOS estados para el flujo "Pensionato"
  const [pensionAmount, setPensionAmount] = useState("")
  const [pensioneNetta, setPensioneNetta] = useState("")
  const [entePensionistico, setEntePensionistico] = useState("");
  const [pensioneType, setPensioneType] = useState("");
  const [entePensionisticoDropdownOpen, setEntePensionisticoDropdownOpen] = useState(false);

  // Agrega este estado al inicio del componente junto a los demás:
  const [tipologiaDropdownOpen, setTipologiaDropdownOpen] = useState(false)

  // Nuevo estado para almacenar errores de cada paso:
  const [stepErrors, setStepErrors] = useState({})

  // Check viewport width to set isMobile (adjust the px threshold as needed)
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  const secondaryOptionsMapping = {
    "Pubblico": ["Ospedale", "Comune", "Medico convenzionato", "Altro"],
    "Statale": ["Carabinieri", "Guardia di finanza", "Vigili del Fuoco", "Esercito", "Marina Militare", "Aeronautica", "Polizia", "Scuole", "Università", "Altro"],
    "Parapubblico": ["Poste Italiane", "Gruppo FFSS", "Gruppo ANAS", "Altro"],
    "Privato": ["SPA", "SRL", "Cooperativa", "Ditta Individuale"]
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Ejemplo de validación en cada paso (debes replicarla en cada uno)
  const validateStep2Pensionato = () => {
    const errors = {}
    if (!pensionAmount.trim()) errors.pensionAmount = "Campo obbligatorio"
    if (!pensioneNetta.trim()) errors.pensioneNetta = "Campo obbligatorio"
    return errors
  }

  // Agregar la validación para il flusso "dipendente"
  const validateStep2Dipendente = () => {
    const errors = {}
    if (!amountRequested.trim()) errors.amountRequested = "Campo obbligatorio"
    if (!netSalary.trim()) errors.netSalary = "Campo obbligatorio"
    return errors
  }

  const validateStep5Contatto = () => {
    const errors = {}
    if (!nome.trim()) errors.nome = "Campo obbligatorio"
    if (!cognome.trim()) errors.cognome = "Campo obbligatorio"
    if (!mail.trim()) errors.mail = "Campo obbligatorio"
    if (!telefono.trim()) errors.telefono = "Campo obbligatorio"
    if (!privacyAccepted) errors.privacy = "Campo obbligatorio"
    return errors
  }

  const handleSubmit = () => {
    const formData = {
      nome,
      cognome,
      mail,
      telefono,
      selectedOption,
      depType,
      secondarySelection,
      amountRequested,
      netSalary,
      pensionAmount,
      pensioneNetta,
      birthDate,
      province
    };
    console.log("Formulario enviado:", formData);
    // Una vez enviados los datos, redirige a BookingPage.jsx
    onFormSubmit();
  };

  if (loading) {
    return (
      <motion.div
        key="loading"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="flex items-center justify-center h-screen bg-white rounded-2xl overflow-hidden"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-700 border-t-transparent"></div>
      </motion.div>
    )
  }

  return (
    <div className={`relative min-h-screen overflow-y-auto ${!isMobile ? "hide-scroll" : ""} overflow-x-hidden`}>
      <AnimatePresence exitBeforeEnter>
        {step === 1 && (
          <motion.div
            key="step1"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            <div className="flex items-center w-full max-w-xl mb-8">
              <div>
                <button onClick={onClose}>
                  <IoIosArrowBack size={32} className="text-black mr-4 mt-2" />
                </button>
              </div>
              <div className="flex justify-center">
                <h2 className="text-3xl font-semibold">
                  Qual è la tua situazione lavorativa?
                </h2>
              </div>
              <div>{/* Espacio vacío */}</div>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-lg">
              <div
                className="flex items-center bg-white border border-gray-300 hover:border-gray-600 cursor-pointer rounded-2xl p-4 transition"
                onClick={() => setSelectedOption("pensionato")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-4 transition 
                    ${selectedOption === "pensionato" ? "bg-blue-700 border-blue-700" : "bg-white border-gray-300"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedOption("pensionato")
                  }}
                ></div>
                <span className="text-xl font-semibold">Pensionato</span>
              </div>
              <div
                className="flex items-center bg-white border border-gray-300 hover:border-gray-600 cursor-pointer rounded-2xl p-4 transition"
                onClick={() => setSelectedOption("dipendente")}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center mr-4 transition 
                    ${selectedOption === "dipendente" ? "bg-blue-700 border-blue-700" : "bg-white border-gray-300"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedOption("dipendente")
                  }}
                ></div>
                <span className="text-xl font-semibold">Dipendente</span>
              </div>
            </div>
            {selectedOption && (
              <button
                className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 text-xl rounded-2xl"
                onClick={() => setStep(2)}
              >
                Avanti
              </button>
            )}
          </motion.div>
        )}
        {step === 2 && selectedOption === "pensionato" && (
          <motion.div
            key="step2-pensionato"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(1)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Inserisci i tuoi dati iniziali</h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              {/* L'importo richiesto */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  L'importo richiesto?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">€</span>
                  <input
                    type="text"
                    value={pensionAmount}
                    onChange={(e) => {
                      setPensionAmount(e.target.value)
                      setStepErrors({ ...stepErrors, pensionAmount: "" })
                    }}
                    className="border pl-10 pr-3 p-3 sm:p-4 w-full rounded-2xl text-base sm:text-lg"
                  />
                </div>
                {stepErrors.pensionAmount && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.pensionAmount}</p>
                )}
              </div>
              {/* Pensione netta mensile */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Pensione netta mensile?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">€</span>
                  <input
                    type="text"
                    value={pensioneNetta}
                    onChange={(e) => {
                      setPensioneNetta(e.target.value)
                      setStepErrors({ ...stepErrors, pensioneNetta: "" })
                    }}
                    className="border pl-10 pr-3 p-3 sm:p-4 w-full rounded-2xl text-base sm:text-lg"
                  />
                </div>
                {stepErrors.pensioneNetta && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.pensioneNetta}</p>
                )}
              </div>
            </div>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-2xl mt-8"
              onClick={() => {
                const errors = validateStep2Pensionato()
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors)
                  return
                }
                setStepErrors({})
                setStep(3)
              }}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 2 && selectedOption === "dipendente" && (
          <motion.div
            key="step2-dipendente"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            {/* Botón para volver */}
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(1)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">
                Inserisci i tuoi dati iniziali
              </h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  L'importo richiesto?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">€</span>
                  <input
                    type="text"
                    value={amountRequested}
                    onChange={(e) => {
                      setAmountRequested(e.target.value)
                      setStepErrors({ ...stepErrors, amountRequested: "" })
                    }}
                    className="border pl-10 pr-3 p-3 sm:p-4 w-full rounded-2xl text-base sm:text-lg"
                  />
                </div>
                {stepErrors.amountRequested && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.amountRequested}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Stipendio netto mensile?
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500">€</span>
                  <input
                    type="text"
                    value={netSalary}
                    onChange={(e) => {
                      setNetSalary(e.target.value)
                      setStepErrors({ ...stepErrors, netSalary: "" })
                    }}
                    className="border pl-10 pr-3 p-3 sm:p-4 w-full rounded-2xl text-base sm:text-lg"
                  />
                </div>
                {stepErrors.netSalary && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.netSalary}</p>
                )}
              </div>
            </div>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-2xl mt-8"
              onClick={() => {
                const errors = validateStep2Dipendente()
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors)
                  return
                }
                setStepErrors({})
                setStep(3)
              }}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 3 && selectedOption === "dipendente" && (
          <motion.div
            key="step3-dipendente"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(2)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Che tipo di dipendente sei</h2>
            </div>
            
            {/* Dropdown principal: Seleziona tipo di dipendente */}
            <div className="w-full max-w-md mb-4">
              <div
                onClick={() => {
                  setDropdownOpen(!dropdownOpen)
                  setSecondaryDropdownOpen(false)
                  setStepErrors({ ...stepErrors, depType: "" })
                }}
                className="border p-4 rounded-2xl cursor-pointer flex justify-between items-center"
              >
                <span className="text-xl font-semibold">
                  {depType ? depType : "Seleziona tipo di dipendente"}
                </span>
                <IoIosArrowDown className={`transition-transform duration-300 ${dropdownOpen ? "rotate-90" : ""}`} />
              </div>
              {dropdownOpen && (
                <div className="mt-2 border border-gray-300 rounded-lg shadow-lg">
                  {["Pubblico", "Statale", "Parapubblico", "Privato"].map(option => (
                    <button
                      key={option}
                      onClick={() => {
                        setDepType(option)
                        setDropdownOpen(false)
                        // Si cambia tipo, se non è Privato se limpia el subtipo
                        if (option !== "Privato") setSecondarySelection(null)
                        setStepErrors({ ...stepErrors, depType: "" })
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {stepErrors.depType && (
                <p className="text-red-500 text-sm mt-1">{stepErrors.depType}</p>
              )}
            </div>
        
            {/* Dropdown secundario: Seleziona il sottotipo, obligatorio si es Privato */}
            {depType === "Privato" && (
              <div className="w-full max-w-md mb-4">
                <div
                  onClick={() => {
                    setSecondaryDropdownOpen(!secondaryDropdownOpen)
                    setStepErrors({ ...stepErrors, secondarySelection: "" })
                  }}
                  className="border p-4 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {secondarySelection ? secondarySelection : "Seleziona il sottotipo"}
                  </span>
                  <IoIosArrowDown className={`transition-transform duration-300 ${secondaryDropdownOpen ? "rotate-90" : ""}`} />
                </div>
                {secondaryDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg max-h-32 overflow-y-auto">
                    {secondaryOptionsMapping[depType].map(subOption => (
                      <button
                        key={subOption}
                        onClick={() => {
                          setSecondarySelection(subOption)
                          setSecondaryDropdownOpen(false)
                          setStepErrors({ ...stepErrors, secondarySelection: "" })
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {subOption}
                      </button>
                    ))}
                  </div>
                )}
                {stepErrors.secondarySelection && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.secondarySelection}</p>
                )}
              </div>
            )}
        
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300"
              onClick={() => {
                const errors = {}
                if (!depType) errors.depType = "Campo obbligatorio"
                if (depType === "Privato" && !secondarySelection)
                  errors.secondarySelection = "Campo obbligatorio"
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors)
                  return
                }
                setStepErrors({})
                if (depType === "Privato") {
                  setStep(6)
                } else {
                  setStep(4)
                }
              }}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 3 && selectedOption === "pensionato" && (
          <motion.div
            key="step3-pensionato"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            {/* Cabecera */}
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(2)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Inserisci i tuoi dati iniziali</h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              {/* Ente pensionistico */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Ente pensionistico
                </label>
                <div 
                  onClick={() => {
                    setEntePensionisticoDropdownOpen(!entePensionisticoDropdownOpen)
                    setTipologiaDropdownOpen(false) // cierra el otro dropdown
                  }}
                  className="border p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {entePensionistico
                      ? entePensionistico === "italiana"
                        ? "Pensione italiana"
                        : "Pensione estera"
                      : "Seleziona"}
                  </span>
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${entePensionisticoDropdownOpen ? "rotate-90" : ""}`}
                  />
                </div>
                {entePensionisticoDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    <button
                      onClick={() => {
                        setEntePensionistico("italiana")
                        setEntePensionisticoDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Pensione italiana
                    </button>
                    <button
                      onClick={() => {
                        setEntePensionistico("estera")
                        setEntePensionisticoDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Pensione estera
                    </button>
                  </div>
                )}
                {stepErrors.entePensionistico && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.entePensionistico}</p>
                )}
              </div>

              {/* Tipologia di pensione */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Tipologia di pensione
                </label>
                <div 
                  onClick={() => {
                    setTipologiaDropdownOpen(!tipologiaDropdownOpen)
                    setEntePensionisticoDropdownOpen(false) // cierra el otro dropdown
                  }}
                  className="border p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {pensioneType ? pensioneType : "Seleziona"}
                  </span>
                  <IoIosArrowDown className={`transition-transform duration-300 ${tipologiaDropdownOpen ? "rotate-90" : ""}`} />
                </div>
                {tipologiaDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {[
                      "Vecchiaia",
                      "Anzianità contributiva",
                      "Reversibilità",
                      "Invalidità ordinaria",
                      "Pensione con residenza estera",
                      "Invalidità civile",
                      "Pensione sociale",
                      "APe social"
                    ].map(option => (
                      <button
                        key={option}
                        onClick={() => {
                          setPensioneType(option)
                          setTipologiaDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {stepErrors.pensioneType && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.pensioneType}</p>
                )}
              </div>
            </div>
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-2xl mt-8"
              onClick={() => {
                const errors = {};
                if (!entePensionistico) errors.entePensionistico = "Campo obbligatorio";
                if (!pensioneType) errors.pensioneType = "Campo obbligatorio";
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors);
                  return;
                }
                setStepErrors({});
                setStep(4);
              }}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 4 && selectedOption === "dipendente" && (
          <motion.div
            key="step4-dipendente"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(selectedOption === "dipendente" && depType === "Privato" ? 6 : 3)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Informazioni Aggiuntive
              </h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              {/* Tipologia di contratto */}
              <div className="w-full max-w-lg">
                <label className="text-base sm:text-xl font-semibold mb-2 block">
                  Tipologia di contratto?
                </label>
                <div
                  onClick={() => {
                    setContractDropdownOpen(!contractDropdownOpen)
                    setProvinceDropdownOpen(false)  // Cierra el de provincia
                  }}
                  className="border p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {contractType
                      ? contractType === "determinato"
                        ? "Tempo Determinato"
                        : contractType === "indeterminato"
                          ? "Tempo Indeterminato"
                          : "Altro"
                      : "Seleziona"}
                  </span>
                  <IoIosArrowDown className={`transition-transform duration-300 ${contractDropdownOpen ? "rotate-90" : ""}`} />
                </div>
                {contractDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg">
                    {[
                      { value: "", label: "Seleziona" },
                      { value: "determinato", label: "Tempo Determinato" },
                      { value: "indeterminato", label: "Tempo Indeterminato" },
                      { value: "altro", label: "Altro" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setContractType(option.value)
                          setContractDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Data di nascita */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Data di nascita
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="border p-3 rounded-2xl text-base sm:text-lg"
                />
              </div>
              {/* Provincia di Residenza */}
              <div className="w-full max-w-md">
                <label className="text-base sm:text-xl font-semibold mb-2 block">
                  Provincia di Residenza
                </label>
                <div
                  onClick={() => {
                    setProvinceDropdownOpen(!provinceDropdownOpen)
                    setContractDropdownOpen(false)  // Cierra el de contrato
                  }}
                  className="border p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {province ? province : "Seleziona"}
                  </span>
                  <IoIosArrowDown className={`transition-transform duration-300 ${provinceDropdownOpen ? "rotate-90" : ""}`} />
                </div>
                {provinceDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg max-h-44 overflow-auto">
                    {[
                      { value: "", label: "Seleziona" },
                      { value: "AG", label: "Agrigento" },
                      { value: "AL", label: "Alessandria" },
                      { value: "AN", label: "Ancona" },
                      { value: "AO", label: "Aosta" },
                      { value: "AR", label: "Arezzo" },
                      { value: "AP", label: "Ascoli Piceno" },
                      { value: "AT", label: "Asti" },
                      { value: "AV", label: "Avellino" },
                      { value: "BA", label: "Bari" },
                      { value: "BT", label: "Barletta-Andria-Trani" },
                      { value: "BL", label: "Belluno" },
                      { value: "BN", label: "Benevento" },
                      { value: "BG", label: "Bergamo" },
                      { value: "BI", label: "Biella" },
                      { value: "BO", label: "Bologna" },
                      { value: "BZ", label: "Bolzano" },
                      { value: "BS", label: "Brescia" },
                      { value: "BR", label: "Brindisi" },
                      { value: "CA", label: "Cagliari" },
                      { value: "CL", label: "Caltanissetta" },
                      { value: "CB", label: "Campobasso" },
                      { value: "CI", label: "Carbonia-Iglesias" },
                      { value: "CE", label: "Caserta" },
                      { value: "CT", label: "Catania" },
                      { value: "CZ", label: "Catanzaro" },
                      { value: "CH", label: "Chieti" },
                      { value: "CO", label: "Como" },
                      { value: "CS", label: "Cosenza" },
                      { value: "CR", label: "Cremona" },
                      { value: "KR", label: "Crotone" },
                      { value: "CN", label: "Cuneo" },
                      { value: "EN", label: "Enna" },
                      { value: "FM", label: "Fermo" },
                      { value: "FE", label: "Ferrara" },
                      { value: "FI", label: "Firenze" },
                      { value: "FG", label: "Foggia" },
                      { value: "FC", label: "Forlì-Cesena" },
                      { value: "FR", label: "Frosinone" },
                      { value: "GE", label: "Genova" },
                      { value: "GO", label: "Gorizia" },
                      { value: "GR", label: "Grosseto" },
                      { value: "IM", label: "Imperia" },
                      { value: "IS", label: "Isernia" },
                      { value: "SP", label: "La Spezia" },
                      { value: "LT", label: "Latina" },
                      { value: "LE", label: "Lecce" },
                      { value: "LC", label: "Lecco" },
                      { value: "LO", label: "Lodi" },
                      { value: "LU", label: "Lucca" },
                      { value: "MC", label: "Macerata" },
                      { value: "MN", label: "Mantova" },
                      { value: "MS", label: "Massa-Carrara" },
                      { value: "MT", label: "Matera" },
                      { value: "ME", label: "Messina" },
                      { value: "MI", label: "Milano" },
                      { value: "MO", label: "Modena" },
                      { value: "MB", label: "Monza-Brianza" },
                      { value: "NA", label: "Napoli" },
                      { value: "NO", label: "Novara" },
                      { value: "NU", label: "Nuoro" },
                      { value: "OR", label: "Olbia-Tempio" },
                      { value: "PD", label: "Padova" },
                      { value: "PA", label: "Palermo" },
                      { value: "PR", label: "Parma" },
                      { value: "PV", label: "Pavia" },
                      { value: "PG", label: "Perugia" },
                      { value: "PU", label: "Pesaro e Urbino" },
                      { value: "PE", label: "Pescara" },
                      { value: "PC", label: "Piacenza" },
                      { value: "PI", label: "Pisa" },
                      { value: "PT", label: "Pistoia" },
                      { value: "PN", label: "Pordenone" },
                      { value: "PZ", label: "Potenza" },
                      { value: "PO", label: "Prato" },
                      { value: "RG", label: "Ragusa" },
                      { value: "RA", label: "Ravenna" },
                      { value: "RC", label: "Reggio Calabria" },
                      { value: "RE", label: "Reggio Emilia" },
                      { value: "RI", label: "Rieti" },
                      { value: "RN", label: "Rimini" },
                      { value: "RM", label: "Roma" },
                      { value: "RO", label: "Rovigo" },
                      { value: "SA", label: "Salerno" },
                      { value: "SS", label: "Sassari" },
                      { value: "SV", label: "Savona" },
                      { value: "SI", label: "Siena" },
                      { value: "SR", label: "Siracusa" },
                      { value: "SO", label: "Sondrio" },
                      { value: "TA", label: "Taranto" },
                      { value: "TE", label: "Teramo" },
                      { value: "TR", label: "Terni" },
                      { value: "TO", label: "Torino" },
                      { value: "TP", label: "Trapani" },
                      { value: "TN", label: "Trento" },
                      { value: "TV", label: "Treviso" },
                      { value: "TS", label: "Trieste" },
                      { value: "UD", label: "Udine" },
                      { value: "VA", label: "Varese" },
                      { value: "VE", label: "Venezia" },
                      { value: "VB", label: "Verbano-Cusio-Ossola" },
                      { value: "VC", label: "Vercelli" },
                      { value: "VR", label: "Verona" },
                      { value: "VV", label: "Vibo Valentia" },
                      { value: "VI", label: "Vicenza" },
                      { value: "VT", label: "Viterbo" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setProvince(option.value)
                          setProvinceDropdownOpen(false)
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300"
              onClick={() => setStep(5)}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 4 && selectedOption === "pensionato" && (
          <motion.div
            key="step4-pensionato"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            {/* Cabecera */}
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(3)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Inserisci i tuoi dati iniziali</h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              {/* Data di nascita */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Data di nascita
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value)
                    setStepErrors({ ...stepErrors, birthDate: "" })
                  }}
                  className="border p-3 sm:p-4 w-full rounded-2xl text-base sm:text-lg"
                />
                {stepErrors.birthDate && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.birthDate}</p>
                )}
              </div>
              {/* Provincia di Residenza */}
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2 block">
                  Provincia di Residenza
                </label>
                <div
                  onClick={() => setProvinceDropdownOpen(!provinceDropdownOpen)}
                  className="border p-3 rounded-2xl cursor-pointer flex justify-between items-center"
                >
                  <span className="text-xl font-semibold">
                    {province ? province : "Seleziona"}
                  </span>
                  <IoIosArrowDown
                    className={`transition-transform duration-300 ${provinceDropdownOpen ? "rotate-90" : ""}`}
                  />
                </div>
                {provinceDropdownOpen && (
                  <div className="mt-2 border border-gray-300 rounded-lg shadow-lg max-h-44 overflow-auto">
                    {[
                      { value: "", label: "Seleziona" },
                      { value: "AG", label: "Agrigento" },
                      { value: "AL", label: "Alessandria" },
                      { value: "AN", label: "Ancona" },
                      { value: "AO", label: "Aosta" },
                      { value: "AR", label: "Arezzo" },
                      { value: "AP", label: "Ascoli Piceno" },
                      { value: "AT", label: "Asti" },
                      { value: "AV", label: "Avellino" },
                      { value: "BA", label: "Bari" },
                      { value: "BT", label: "Barletta-Andria-Trani" },
                      { value: "BL", label: "Belluno" },
                      { value: "BN", label: "Benevento" },
                      { value: "BG", label: "Bergamo" },
                      { value: "BI", label: "Biella" },
                      { value: "BO", label: "Bologna" },
                      { value: "BZ", label: "Bolzano" },
                      { value: "BS", label: "Brescia" },
                      { value: "BR", label: "Brindisi" },
                      { value: "CA", label: "Cagliari" },
                      { value: "CL", label: "Caltanissetta" },
                      { value: "CB", label: "Campobasso" },
                      { value: "CI", label: "Carbonia-Iglesias" },
                      { value: "CE", label: "Caserta" },
                      { value: "CT", label: "Catania" },
                      { value: "CZ", label: "Catanzaro" },
                      { value: "CH", label: "Chieti" },
                      { value: "CO", label: "Como" },
                      { value: "CS", label: "Cosenza" },
                      { value: "CR", label: "Cremona" },
                      { value: "KR", label: "Crotone" },
                      { value: "CN", label: "Cuneo" },
                      { value: "EN", label: "Enna" },
                      { value: "FM", label: "Fermo" },
                      { value: "FE", label: "Ferrara" },
                      { value: "FI", label: "Firenze" },
                      { value: "FG", label: "Foggia" },
                      { value: "FC", label: "Forlì-Cesena" },
                      { value: "FR", label: "Frosinone" },
                      { value: "GE", label: "Genova" },
                      { value: "GO", label: "Gorizia" },
                      { value: "GR", label: "Grosseto" },
                      { value: "IM", label: "Imperia" },
                      { value: "IS", label: "Isernia" },
                      { value: "SP", label: "La Spezia" },
                      { value: "LT", label: "Latina" },
                      { value: "LE", label: "Lecce" },
                      { value: "LC", label: "Lecco" },
                      { value: "LO", label: "Lodi" },
                      { value: "LU", label: "Lucca" },
                      { value: "MC", label: "Macerata" },
                      { value: "MN", label: "Mantova" },
                      { value: "MS", label: "Massa-Carrara" },
                      { value: "MT", label: "Matera" },
                      { value: "ME", label: "Messina" },
                      { value: "MI", label: "Milano" },
                      { value: "MO", label: "Modena" },
                      { value: "MB", label: "Monza-Brianza" },
                      { value: "NA", label: "Napoli" },
                      { value: "NO", label: "Novara" },
                      { value: "NU", label: "Nuoro" },
                      { value: "OR", label: "Olbia-Tempio" },
                      { value: "PD", label: "Padova" },
                      { value: "PA", label: "Palermo" },
                      { value: "PR", label: "Parma" },
                      { value: "PV", label: "Pavia" },
                      { value: "PG", label: "Perugia" },
                      { value: "PU", label: "Pesaro e Urbino" },
                      { value: "PE", label: "Pescara" },
                      { value: "PC", label: "Piacenza" },
                      { value: "PI", label: "Pisa" },
                      { value: "PT", label: "Pistoia" },
                      { value: "PN", label: "Pordenone" },
                      { value: "PZ", label: "Potenza" },
                      { value: "PO", label: "Prato" },
                      { value: "RG", label: "Ragusa" },
                      { value: "RA", label: "Ravenna" },
                      { value: "RC", label: "Reggio Calabria" },
                      { value: "RE", label: "Reggio Emilia" },
                      { value: "RI", label: "Rieti" },
                      { value: "RN", label: "Rimini" },
                      { value: "RM", label: "Roma" },
                      { value: "RO", label: "Rovigo" },
                      { value: "SA", label: "Salerno" },
                      { value: "SS", label: "Sassari" },
                      { value: "SV", label: "Savona" },
                      { value: "SI", label: "Siena" },
                      { value: "SR", label: "Siracusa" },
                      { value: "SO", label: "Sondrio" },
                      { value: "TA", label: "Taranto" },
                      { value: "TE", label: "Teramo" },
                      { value: "TR", label: "Terni" },
                      { value: "TO", label: "Torino" },
                      { value: "TP", label: "Trapani" },
                      { value: "TN", label: "Trento" },
                      { value: "TV", label: "Treviso" },
                      { value: "TS", label: "Trieste" },
                      { value: "UD", label: "Udine" },
                      { value: "VA", label: "Varese" },
                      { value: "VE", label: "Venezia" },
                      { value: "VB", label: "Verbano-Cusio-Ossola" },
                      { value: "VC", label: "Vercelli" },
                      { value: "VR", label: "Verona" },
                      { value: "VV", label: "Vibo Valentia" },
                      { value: "VI", label: "Vicenza" },
                      { value: "VT", label: "Viterbo" }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setProvince(option.value)
                          setProvinceDropdownOpen(false)
                          setStepErrors({ ...stepErrors, province: "" })
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
                {stepErrors.province && (
                  <p className="text-red-500 text-sm mt-1">{stepErrors.province}</p>
                )}
              </div>
            </div>
            <button
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300"
              onClick={() => {
                const errors = {}
                if (!birthDate.trim()) errors.birthDate = "Campo obbligatorio"
                if (!province) errors.province = "Campo obbligatorio"
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors)
                  return
                }
                setStepErrors({})
                setStep(5)
              }}
            >
              Avanti
            </button>
          </motion.div>
        )}
        {step === 5 && (
          <motion.div
            key="step5"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            {/* Cabecera con flecha */}
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-20">
              <button
                onClick={() => setStep(selectedOption === "dipendente" ? 4 : 4)}
                className="mr-4"
              >
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Informazioni Contatto</h2>
            </div>
            {/* Campos de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value)
                    setStepErrors({ ...stepErrors, nome: "" })
                  }}
                  className="border p-4 rounded-2xl text-xl focus:ring-2 focus:ring-blue-700 transition duration-200 ease-in-out"
                />
                {stepErrors.nome && <p className="text-red-500 text-sm mt-1">{stepErrors.nome}</p>}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Cognome"
                  value={cognome}
                  onChange={(e) => {
                    setCognome(e.target.value)
                    setStepErrors({ ...stepErrors, cognome: "" })
                  }}
                  className="border p-4 rounded-2xl text-xl focus:ring-2 focus:ring-blue-700 transition duration-200 ease-in-out"
                />
                {stepErrors.cognome && <p className="text-red-500 text-sm mt-1">{stepErrors.cognome}</p>}
              </div>
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="Mail"
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value)
                    setStepErrors({ ...stepErrors, mail: "" })
                  }}
                  className="border p-4 rounded-2xl text-xl focus:ring-2 focus:ring-blue-700 transition duration-200 ease-in-out"
                />
                {stepErrors.mail && <p className="text-red-500 text-sm mt-1">{stepErrors.mail}</p>}
              </div>
              <div className="flex flex-col">
                <input
                  type="tel"
                  placeholder="Telefono"
                  value={telefono}
                  onChange={(e) => {
                    setTelefono(e.target.value)
                    setStepErrors({ ...stepErrors, telefono: "" })
                  }}
                  className="border p-4 rounded-2xl text-xl focus:ring-2 focus:ring-blue-700 transition duration-200 ease-in-out"
                />
                {stepErrors.telefono && <p className="text-red-500 text-sm mt-1">{stepErrors.telefono}</p>}
              </div>
            </div>
            <div className="mt-4 text-center">
              {/* Si la privacy no es aceptada mostramos error */}
              {stepErrors.privacy && <p className="text-red-500 text-sm">{stepErrors.privacy}</p>}
            </div>
            <div className="mt-4 space-y-2 max-w-md mx-auto text-center animate-fadeIn">
              <div className="flex items-start mt-6">
                <input
                  type="checkbox"
                  id="privacy1"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked)
                    setStepErrors({ ...stepErrors, privacy: "" })
                  }}
                  className="mr-2 mt-1 transition-all duration-300"
                />
                <div>
                  <label htmlFor="privacy1" className="text-sm text-gray-800 leading-snug">
                    Dichiaro di aver preso visione dell'Informativa ai sensi del Decreto Legislativo 196/2003 e del Regolamento (UE) 2016/679 (GDPR).
                  </label>
                  {!privacyAccepted && stepErrors.privacy && (
                    <p className="text-red-500 text-sm mt-1">{stepErrors.privacy}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy2"
                  checked={privacyAccepted}
                  onChange={(e) => {
                    setPrivacyAccepted(e.target.checked)
                    setStepErrors({ ...stepErrors, privacy: "" })
                  }}
                  className="mr-2 mt-1 transition-all duration-300"
                />
                <div>
                  <label htmlFor="privacy2" className="text-sm text-gray-800 leading-snug">
                    Do il consenso a Creditplan al trattamento dei miei dati personali per contattarmi via email o telefono, valutare il mio profilo creditizio e creare un preventivo personalizzato. *Con l'invio della richiesta, dichiaro di aver preso visione dell'informativa sulla privacy.
                  </label>
                  {!privacyAccepted && stepErrors.privacy && (
                    <p className="text-red-500 text-sm mt-1">{stepErrors.privacy}</p>
                  )}
                </div>
              </div>
            </div>
            <button
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-lg rounded-2xl border border-gray-300 transition-all duration-500 hover:scale-105 hover:shadow-lg animate-fadeIn"
              onClick={() => {
                const errors = validateStep5Contatto()
                if (Object.keys(errors).length > 0) {
                  setStepErrors(errors)
                  return
                }
                setStepErrors({})
                handleSubmit();  // Enviar datos al Google Sheet
              }}
            >
              Invia Questa Richiesta
            </button>
          </motion.div>
        )}
        {step === 6 && selectedOption === "dipendente" && depType === "Privato" && (
          <motion.div
            key="step6-dipendente-privato"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-4 rounded-2xl"
          >
            <div className="flex items-center w-full max-w-xl mb-8 pl-4 md:pl-16">
              <button onClick={() => setStep(3)} className="mr-4">
                <IoIosArrowBack size={32} className="text-black" />
              </button>
              <h2 className="text-3xl font-semibold">Informazioni Privato</h2>
            </div>
            <div className="w-full max-w-md space-y-4">
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Sei dipendente da più di 12 mesi?
                </label>
                <select
                  value={over12Months}
                  onChange={(e) => setOver12Months(e.target.value)}
                  className="border p-3 sm:p-4 rounded-2xl text-base sm:text-lg"
                >
                  <option value="">Seleziona</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-base sm:text-xl font-semibold mb-2">
                  Numero dipendenti?
                </label>
                <input
                  type="text"
                  value={numEmployees}
                  onChange={(e) => setNumEmployees(e.target.value)}
                  placeholder="Inserisci il numero"
                  className="border p-3 sm:p-4 rounded-2xl text-base sm:text-lg"
                />
              </div>
            </div>
            <button
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 text-xl rounded-2xl"
              onClick={() => setStep(4)} // Reutilizamos la pantalla de Informazioni Aggiuntive.
            >
              Avanti
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {!isMobile && (
        <style>{`
          /* Oculta scrollbar en navegadores Webkit */
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          /* Para Firefox e IE */
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      )}
    </div>
  )
}

export default FormScreen