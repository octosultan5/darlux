'use client';

import { useEffect } from 'react';

type PixelEventsProps = {
  eventName: string;
  data?: Record<string, any>;
};

export function trackPixelEvent(eventName: string, data: Record<string, any> = {}) {
  if (typeof window !== 'undefined') {
    // Fire Meta Pixel
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', eventName, data);
    }
    
    // Fire TikTok Pixel if available
    if (typeof (window as any).ttq === 'object' && typeof (window as any).ttq.track === 'function') {
      (window as any).ttq.track(eventName, data);
    }
  }
}

export default function PixelEvents({ eventName, data = {} }: PixelEventsProps) {
  useEffect(() => {
    trackPixelEvent(eventName, data);
  }, [eventName, data]);

  return null;
}
