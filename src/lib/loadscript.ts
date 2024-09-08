export const loadScript = /*{ async }*/ (src: string) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    // script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
