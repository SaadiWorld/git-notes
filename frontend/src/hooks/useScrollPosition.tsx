export default function useScrollPosition() {

  const setScrollPosition = (elementId: string, position: ScrollLogicalPosition) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ block: position });
    }
  }

  return [setScrollPosition];
}