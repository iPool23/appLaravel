import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

export const WhatsAppChannelButton = () => {
    return (
        <a
            href="https://whatsapp.com/channel/0029VbBDRzGJ3juyUeEEik1c"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl z-40 flex items-center justify-center group"
            aria-label="Únete a nuestro canal de WhatsApp"
            title="Únete a nuestro canal de WhatsApp"
        >
            <BsWhatsapp size={28} className="transition-transform group-hover:scale-110" />
        </a>
    );
};

export default WhatsAppChannelButton;
