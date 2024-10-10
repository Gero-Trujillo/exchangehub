import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <>
      <section className="flex flex-col h-screen w-full items-center gap-1 p-10">
        <p className="text-purple-700 text-9xl font-semibold">Page not found</p>
        <h1 className="text-[200px] text-yellow-500 font-bold">404</h1>
        <Link to="/">
          <button
            type="button"
            className="bg-zinc-900 dark:bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-white dark:text-black text-xl font-semibold group"
          >
            <div className="bg-yellow-500 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                ></path>
                <path
                  fill="#000000"
                  d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                ></path>
              </svg>
            </div>
            <p className="translate-x-2">Go Back</p>
          </button>
        </Link>
      </section>
    </>
  );
}

export default NotFoundPage;
