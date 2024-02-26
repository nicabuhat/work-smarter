export const handleClickOutside = (ref, setChecked) => {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setChecked(false);
    }
  }
  // Bind the event listener
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    // Unbind the event listener on clean up
    document.removeEventListener("mousedown", handleClickOutside);
  };
};
