import React, { useState, useRef, useLayoutEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import logo from '../assets/logo_negro_eugenio.png';
import { FiSend } from "react-icons/fi";

export function ChatWidget({ open, setOpen }) {
  // Se elimina el estado interno de "open"
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Ciao, sono Eugenio, la nuova IA di Creditplan. Sono qui per assisterti con tutte le tue esigenze finanziarie. Come posso aiutarti oggi?"
    }
  ]);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const toggleChat = () => setOpen(!open);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: messageText, animate: 'fadeIn' }
    ]);
    setIsTyping(true);

    try {
      const response = await fetch('https://7506-151-48-64-113.ngrok-free.app/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Body: messageText, From: 'web-user' }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: data.response, animate: 'fadeIn' }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Errore nel contattare il server.', animate: 'fadeIn' }
      ]);
    }
    setIsTyping(false);
  };

  const handleAutoMessage = () => {
    sendMessage("Ho domande sulla cessione del quinto");
    setShowInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-5 right-5 max-sm:left-1/2 max-sm:-translate-x-1/2 w-96 h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-1000 ease-in-out animate-fadeInUp">          {/* Header: se cambió el bg a celeste y el texto a negro */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-300 text-black px-6 py-4 flex justify-between items-center transition-all duration-500 ease-out">
            <img src={logo} alt="€ugenio logo" className="h-10" />
            <button onClick={toggleChat} className="text-3xl focus:outline-none">&times;</button>
          </div>
          {/* Mensajes */}
          <div ref={messagesContainerRef} className="flex-1 p-6 bg-gray-50 overflow-y-auto space-y-4 transition-all duration-500 ease-out">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex transition-all duration-500 ease-out ${
                  msg.sender === 'bot' ? 'justify-start' : 'justify-end'
                }`}
              >
                <div
                  className={
                    msg.sender === 'bot'
                      ? 'p-4 text-base transition-all duration-500 ease-out'
                      : 'inline-block max-w-[80%] p-4 rounded-2xl text-base bg-gray-200 transition-all duration-500 ease-out'
                  }
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Área inferior con el botón modificado a celeste */}
          <div className="px-6 py-4 flex flex-col space-y-3 transition-all duration-500 ease-out bg-white">
            {!showInput ? (
              <button
                onClick={handleAutoMessage}
                className="w-full bg-gradient-to-r from-blue-100 to-blue-300 text-black py-3 rounded-full hover:bg-sky-500 transition-colors duration-500"
              >
                Ho domande sulla cessione del quinto
              </button>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center">
                <TextareaAutosize
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:outline-none resize-none"
                  placeholder="Scrivi il tuo messaggio..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxRows={5}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="ml-2 p-3 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <FiSend className="h-6 w-6" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {!open && (
        <button
          onClick={toggleChat}
          className="fixed bottom-5 max-sm:bottom-16 right-5 bg-white text-black border border-gray-400 px-6 py-4 rounded-3xl shadow-lg transition-transform duration-500 ease-out hover:scale-110 hover:border-gray-700 animate-fadeIn"
        >
          <img src={logo} alt="€ugenio logo" className="h-8" />
        </button>
      )}
    </>
  );
}

export default ChatWidget;
