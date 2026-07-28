import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, search, key } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }

    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    }, 40);

    return () => clearTimeout(timeout);
  }, [pathname, search, key]);

  return null;
}
