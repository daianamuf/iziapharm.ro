import { useRef, useEffect, useState } from "react";

const useMultipleElementIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState({});
  const elementsRef = useRef([]);
  const observedElementsRef = useRef(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observedElementsRef.current.add(entry.target);
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.dataset.index]: true,
          }));
        }
      });
    }, options);

    elementsRef.current.forEach((el) => {
      if (el && !observedElementsRef.current.has(el)) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [options]);

  const setElementRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return { setElementRef, isVisible };
};

export default useMultipleElementIntersectionObserver;
