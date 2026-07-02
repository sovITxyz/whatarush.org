// Minimal zero-dependency Nostr helpers.
//
// Publishing works through a NIP-07 browser extension (window.nostr), so the
// site never sees or handles any keys — the extension prompts the user and
// returns a fully signed event (id, pubkey and sig included). Relays are
// spoken to over raw WebSockets: the relay protocol is plain JSON frames
// (["EVENT", event] out, ["OK", id, accepted, message] back), so no library
// is needed.

const RELAY_TIMEOUT_MS = 7000;

export function hasNip07() {
  return typeof window !== 'undefined' && typeof window.nostr?.signEvent === 'function';
}

function publishToRelay(url, event) {
  return new Promise((resolve, reject) => {
    let settled = false;
    let ws;
    let timer;

    const settle = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        ws?.close();
      } catch {
        /* already closed */
      }
      fn(value);
    };

    timer = setTimeout(() => settle(reject, new Error(`${url}: timed out`)), RELAY_TIMEOUT_MS);

    try {
      ws = new WebSocket(url);
    } catch (err) {
      settle(reject, err);
      return;
    }

    ws.onopen = () => ws.send(JSON.stringify(['EVENT', event]));
    ws.onmessage = (msg) => {
      let data;
      try {
        data = JSON.parse(msg.data);
      } catch {
        return; // ignore malformed frames
      }
      if (Array.isArray(data) && data[0] === 'OK' && data[1] === event.id) {
        if (data[2]) settle(resolve, url);
        else settle(reject, new Error(`${url}: ${String(data[3] || 'rejected')}`));
      }
    };
    ws.onerror = () => settle(reject, new Error(`${url}: connection failed`));
    ws.onclose = () => settle(reject, new Error(`${url}: closed before acknowledging`));
  });
}

/**
 * Sign a kind-1 text note with the user's NIP-07 extension and publish it to
 * the given relays. Resolves with the number of relays that accepted the
 * note; rejects if signing fails or no relay accepts it.
 */
export async function publishNote(content, { relays, tags = [] }) {
  if (!hasNip07()) {
    throw new Error('No NIP-07 Nostr extension available');
  }
  const signed = await window.nostr.signEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags,
    content,
  });
  const results = await Promise.allSettled(relays.map((relay) => publishToRelay(relay, signed)));
  const accepted = results.filter((r) => r.status === 'fulfilled').length;
  if (accepted === 0) {
    throw new Error('No relay accepted the note');
  }
  return accepted;
}
