import React from 'react';
import { Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { PHONE_TEL, PHONE_DISPLAY, whatsappUrl, WA_MESSAGES } from '@/lib/contact';

// Controlled modal: pass open/onOpenChange and (optionally) a context-specific
// WhatsApp message. Lets a visitor choose between a phone call and WhatsApp
// instead of jumping straight to WhatsApp.
const ContactChoiceModal = ({ open, onOpenChange, whatsappMessage = WA_MESSAGES.general }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogTitle className="text-center text-xl font-bold text-gray-800">
        How would you like to contact us?
      </DialogTitle>
      <DialogDescription className="mt-1 text-center text-gray-600">
        Reach Shawn Burke by phone call or WhatsApp message.
      </DialogDescription>

      <div className="mt-5 flex flex-col gap-3">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          {/* tel: link must not open a new tab */}
          <a href={PHONE_TEL} onClick={() => onOpenChange(false)} className="flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call {PHONE_DISPLAY}
          </a>
        </Button>

        <Button
          asChild
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          <a
            href={whatsappUrl(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenChange(false)}
            className="flex items-center justify-center gap-2"
          >
            <WhatsAppIcon className="w-5 h-5" />
            WhatsApp
          </a>
        </Button>

        <Button
          variant="outline"
          className="w-full py-3 rounded-lg font-semibold text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          Back
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ContactChoiceModal;
