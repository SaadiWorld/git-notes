import { useEffect } from 'react';

export default function useScrollToTop(changingValue: any, elementId: string) {
  useEffect(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ block: 'start' });
    }
  }, [changingValue, elementId]);

  return null;
}