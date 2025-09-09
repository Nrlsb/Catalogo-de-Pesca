import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import InstagramIcon from './icons/InstagramIcon';

const ContactModal = ({ show, onClose, product }) => {
  if (!show) return null;

  // Determina si la consulta es sobre un producto específico o una consulta general
  const isProductSpecific = product && typeof product === 'object';
  const message = isProductSpecific
    ? `Hola, estoy interesado en el producto: ${product.name}`
    : 'Hola, quisiera hacer una consulta general.';

  const whatsappLink = `https://api.whatsapp.com/send/?phone=5493496419473&text=${encodeURIComponent(message)}`;
  const instagramLink = "https://www.instagram.com/maxi_pesca2025/";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-brand-card rounded-lg shadow-2xl w-full max-w-sm relative animate-fade-in-up p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-4 -right-4 h-10 w-10 bg-brand-primary text-white rounded-full shadow-lg hover:bg-indigo-500 transition-transform duration-200 hover:scale-110 z-10"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">CONTACTANOS</h2>

        <div className="flex flex-col gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300"
          >
            <WhatsAppIcon />
            WHATSAPP
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors duration-300"
          >
            <InstagramIcon />
            INSTAGRAM
          </a>
        </div>
      </div>
       <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
