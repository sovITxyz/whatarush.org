// Single source of truth for the business phone number and the WhatsApp links
// built from it. Previously the wa.me URL was copy-pasted across ~8 components;
// import from here instead.

export const PHONE_DISPLAY = '+503 6986 6030';
export const PHONE_TEL = 'tel:+50369866030';
export const WHATSAPP_NUMBER = '50369866030';

// Context-specific prefilled WhatsApp messages.
export const WA_MESSAGES = {
	general: "Hi, I saw your website and I'm interested",
	services: "Hi, I saw your website and I'm interested in your services",
	palapa: "Hi, I saw your website and I'm interested in the Palapa Rental",
};

export const whatsappUrl = (message = WA_MESSAGES.general) =>
	`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
