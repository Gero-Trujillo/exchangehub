import Button2 from "./Button2";
import "./ProductCard.css";
function ProductCard() {
  return (
    <>
      <div className="w-60 h-80 bg-white dark:bg-zinc-950 flex flex-col gap-1 rounded-br-3xl">
        <div
          className="duration-500 h-48 hover:scale-125"
          style={{
            backgroundImage: `url("https://www.comprarlotes.com/uploads/users/user2460/gallery/4124_2.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <span className="text-xl text-emerald-600 font-bold">
                 PlayStation 5
              </span>
              <p className="text-xs text-gray-400">@Gerot511</p>
            </div>
          </div>
          <button className="hover:bg-emerald-500 text-gray-50 bg-emerald-600 py-2 rounded-br-xl dark:bg-emerald-300 dark:text-black dark:hover:bg-emerald-500">
            Ofertar
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
