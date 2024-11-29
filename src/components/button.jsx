export default function Button({ children, type = 'button', ariaLabel }) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className="
          bg-primary-900 
          border 
          border-primary-500 
          text-primary-100 
          p-2 md:p-3 
          rounded-md 
          text-sm md:text-base 
          hover:bg-primary-800 
          hover:border-primary-400 
          transition-all 
          duration-200 
          ease-in-out 
          w-full md:w-auto
          focus:outline-none 
          focus:ring-2 
          focus:ring-primary-400 
          focus:ring-offset-2 
        "
    >
      {children}
    </button>
  );
}
