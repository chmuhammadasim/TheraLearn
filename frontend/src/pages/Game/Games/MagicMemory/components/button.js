const Button = ({ width, onClick, children }) => {
  // Define width classes based on the `width` prop
  const widthClass = width === "wide" ? "max-w-[350px] w-full" : width === "full" ? "w-full" : "";

  return (
    <button
      className={`font-bold px-4 py-3 rounded-xl bg-acc-color text-pri-color border border-acc-color transition-all duration-150 ease-in-out hover:bg-acc-color-dark hover:border-acc-color-dark focus:bg-acc-color-dark focus:border-acc-color-dark ${widthClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;