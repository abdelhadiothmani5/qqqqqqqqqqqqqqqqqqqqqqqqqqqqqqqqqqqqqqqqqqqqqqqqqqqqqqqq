/**
 * Tactile Haptic feedback utility for iOS and mobile browsers
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'selection' = 'light') {
  if (typeof window === 'undefined') return;

  try {
    if ('vibrate' in navigator) {
      if (type === 'light') {
        navigator.vibrate(8);
      } else if (type === 'medium') {
        navigator.vibrate(15);
      } else if (type === 'success') {
        navigator.vibrate([10, 30, 15]);
      } else if (type === 'selection') {
        navigator.vibrate(5);
      }
    }
  } catch {
    // Vibration API not permitted or unsupported, fail silently
  }
}
