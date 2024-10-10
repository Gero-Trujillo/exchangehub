function Button2() {
  return (
    <>
      <button className="cursor-pointer relative group overflow-hidden border-2 px-8 py-1 border-emerald-600 rounded-lg">
        <span className="text-slate-100 dark:text-slate-100 text-lg relative z-10 group-hover:text-emerald-600 duration-500">
          Ofertar
        </span>
        <span className="absolute top-0 left-0 w-full bg-emerald-600 duration-500 group-hover:-translate-x-full h-full"></span>
        <span className="absolute top-0 left-0 w-full bg-emerald-600 duration-500 group-hover:translate-x-full h-full"></span>
        <span className="absolute top-0 left-0 w-full bg-emerald-600 duration-500 delay-300 group-hover:-translate-y-full h-full"></span>
        <span className="absolute delay-300 top-0 left-0 w-full bg-emerald-600 duration-500 group-hover:translate-y-full h-full"></span>
      </button>
    </>
  );
}

export default Button2;
