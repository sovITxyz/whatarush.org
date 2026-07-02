import React, { useState } from 'react';
import { Share2, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { hasNip07, publishNote } from '@/lib/nostr';
import { NOSTR_RELAYS } from '@/config/nostr';

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  // Legacy fallback for non-secure contexts.
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'fixed';
  el.style.opacity = '0';
  document.body.appendChild(el);
  el.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(el);
  }
}

/**
 * Share a text note on Nostr.
 *
 * With a NIP-07 signer extension installed (Alby, nos2x, ...) the note is
 * signed by the extension and published straight to public relays. Without
 * one, the composed note is copied to the clipboard so the visitor can paste
 * it into any Nostr client. The site never handles keys in either case.
 */
const NostrShareButton = ({ text, tags = [], label = 'Share', ariaLabel = 'Share on Nostr', className = '' }) => {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (hasNip07()) {
        const accepted = await publishNote(text, { relays: NOSTR_RELAYS, tags });
        toast({
          title: 'Shared on Nostr',
          description: `Your note was accepted by ${accepted} relay${accepted === 1 ? '' : 's'}.`,
        });
      } else {
        await copyToClipboard(text);
        toast({
          title: 'Note copied to clipboard',
          description:
            'No Nostr signer extension detected, so the note was copied instead. Paste it into your favorite Nostr client (Damus, Primal, Amethyst, ...) to share it.',
        });
      }
    } catch {
      toast({
        title: 'Could not share on Nostr',
        description: 'Signing was cancelled or no relay accepted the note. Please try again.',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={`flex items-center gap-1.5 bg-black/50 hover:bg-black/70 text-white/80 hover:text-white text-xs px-2.5 py-1 rounded-full transition-colors disabled:opacity-60 ${className}`}
    >
      {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
      <span>{label}</span>
    </button>
  );
};

export default NostrShareButton;
