import ProductCard from "./ProductCard"

function MyProducts() {
  return (
    <>
      <section className="w-full lg:w-3/4 flex flex-col bg-neutral-200 dark:bg-zinc-900 rounded-lg p-10 gap-10 flex-grow">
        <h1 className="text-center text-4xl text-emerald-600 dark:text-emerald-300 font-semibold">Mis productos</h1>
        <div className="flex flex-wrap gap-4 items-center justify-center overflow-y-scroll">
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
            <ProductCard />
        </div>
      </section>
    </>
  )
}

export default MyProducts
