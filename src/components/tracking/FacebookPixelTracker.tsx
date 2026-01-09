import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useFacebookPixel } from '@/hooks/useFacebookPixel';
import { useServerTracking } from '@/hooks/useServerTracking';

export function FacebookPixelTracker() {
  const location = useLocation();
  const { trackPageView: trackBrowserPageView, isEnabled, isReady, generateEventId } = useFacebookPixel();
  const { trackPageView: trackServerPageView } = useServerTracking();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    // Only track if enabled, ready, and path has changed
    if (isEnabled && isReady && location.pathname !== lastTrackedPath.current) {
      console.log('FacebookPixelTracker: Tracking page view for', location.pathname);
      
      // Generate a shared event ID for deduplication between browser pixel and CAPI
      const eventId = generateEventId('PageView');
      
      // Track via browser pixel with event ID
      trackBrowserPageView(eventId);
      
      // Track via server-side Conversions API with the same event ID
      // This ensures events are properly deduplicated by Meta
      trackServerPageView(undefined, eventId || undefined).then((result) => {
        console.log('FacebookPixelTracker: Server-side CAPI result:', result.facebook);
      }).catch((err) => {
        console.error('FacebookPixelTracker: Server-side CAPI error:', err);
      });
      
      lastTrackedPath.current = location.pathname;
    }
  }, [location.pathname, isEnabled, isReady, trackBrowserPageView, trackServerPageView, generateEventId]);

  return null;
}
