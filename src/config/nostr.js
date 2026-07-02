// Nostr configuration for What A Rush.
//
// TODO(owner): set NOSTR_NPUB to the business's real Nostr public key
// ("npub1..." — 63 characters) once one exists. While it is unset (or
// malformed), every npub-dependent UI element — e.g. the "Follow us on
// Nostr" link in the footer — stays hidden automatically, so it is always
// safe to deploy this file as-is.
//
// NEVER put a private key (nsec) anywhere in this repository.
export const NOSTR_NPUB = '';

// Canonical site URL, used when composing share notes.
export const SITE_URL = 'https://whatarush.org';

// Well-known public relays that share notes are published to when the
// visitor has a NIP-07 signer extension (Alby, nos2x, ...).
export const NOSTR_RELAYS = [
  'wss://relay.damus.io',
  'wss://nos.lol',
  'wss://relay.primal.net',
];

// Strict npub shape check (bech32 charset, 63 chars total) so a typo'd
// config value can never produce a broken or unexpected link.
export function isValidNpub(npub) {
  return typeof npub === 'string' && /^npub1[02-9ac-hj-np-z]{58}$/.test(npub);
}

// Public profile viewer link — njump renders Nostr profiles in any browser
// without requiring the visitor to have a Nostr client installed.
export function njumpProfileUrl(npub) {
  return `https://njump.me/${npub}`;
}
