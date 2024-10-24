import { useState } from "react";
import "./ProductCard.css";
import { RxCrossCircled } from "react-icons/rx";
function ProductCard(props) {
  const {name, user, description, image} = props;
  const [product, setProduct] = useState(false);
  const handleProduct = () => {
    setProduct(!product);
  };
  return (
    <>
      {product && (
        <section className="fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-[#000000dd] z-50">
          <div className="flex flex-col gap-2 dark:text-white max-w-lg w-5/6 bg-white dark:bg-zinc-900 p-5 rounded-xl mt-8 shadow-md hover:duration-150 duration-150">
            <button className="w-full flex items-center justify-center text-4xl text-emerald-600">
              <span onClick={handleProduct}>
                <RxCrossCircled />
              </span>
            </button>
            <div className="flex flex-col gap-2 md:flex-col-reverse">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row justify-between w-full">
                  <h3 className="text-xl font-bold text-emerald-600">{name}</h3>
                  <p className="text-xs text-emerald-300">{user}</p>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full gap-2">
                <p className="text-xs">
                  {description}
                </p>

                <div className="text-xs">
                  <div className="flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                    </svg>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow-200"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="text-sm">
                <img
                  src={image}
                  className="w-full h-56 rounded-xl"
                />
              </div>
            </div>

            <button className="w-full bg-emerald-600 py-2 rounded-xl text-white hover:bg-emerald-400 outline-none">
              Ofertar
            </button>
          </div>
        </section>
      )}
      <div className="w-60 h-80 bg-white dark:bg-zinc-950 flex flex-col gap-1 rounded-br-3xl">
        <div
          className="duration-500 h-48"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl text-emerald-600 font-bold">
                {name}
              </span>
              <p className="text-xs text-gray-400">{user}</p>
            </div>
          </div>
          <button
            className="hover:bg-emerald-500 text-gray-50 bg-emerald-600 py-2 rounded-br-xl dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-500"
            onClick={handleProduct}
          >
            Ver mas
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
