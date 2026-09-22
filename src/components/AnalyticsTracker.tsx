'use client';

import { useEffect } from 'react';

const SESSION_KEY = 'maracana-analytics-session';

function getSessionId() {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export function AnalyticsTracker() {
  useEffect(() => {
    const sessionId = getSessionId();
    const payload = JSON.stringify({
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      sessionId,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/track', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/analytics/track', { method: 'POST', body: payload, keepalive: true }).catch(() => {});
    }
  }, []);

  return null;
}
