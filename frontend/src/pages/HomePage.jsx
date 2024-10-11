import AdvantagesHome from "../components/AdvantagesHome";
import ProductCard from "../components/ProductCard";
import Button1 from "../components/Button1";
function HomePage() {
  return (
    <>
      <section className="flex justify-center items-center min-h-full p-20 w-full max-w-full">
        <div className="flex flex-col gap-2 max-w-full items-center justify-center md:justify-start md:items-start">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-wrap animate-fade-left dark:text-slate-100 text-center md:text-start">
            Productos que no utilizas?
          </h1>
          <span className="text-emerald-600 animate-pulse animate-ease-in text-5xl md:text-6xl lg:text-8xl font-bold">
            Exchange<span className="text-emerald-300">Hub</span>
          </span>
          <p className="text-xl md:text-2xl dark:text-slate-100 text-center md:text-start">
            Encuentra productos que te interesen y cambialos por los tuyos aquí
          </p>
          <Button1 />
        </div>
      </section>
      <section className="bg-neutral-100 dark:bg-zinc-900 m-10 rounded-lg p-10 h-auto flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-300">Mas populares</h1>
        <div className="flex flex-wrap gap-8 w-full justify-center">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
      <AdvantagesHome />
    </>
  );
}

export default HomePage;
