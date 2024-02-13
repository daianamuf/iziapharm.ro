import { useEffect, useRef, useState } from "react";

function useElementIntersectionObserver() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const currentRef = elementRef.current;

    if (currentRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { root: null, threshold: 1 }
      );

      observer.observe(currentRef);

      return () => {
        observer.unobserve(currentRef);
        observer.disconnect();
      };
    }
  }, []);

  return { elementRef, isVisible };
}
export default useElementIntersectionObserver;
