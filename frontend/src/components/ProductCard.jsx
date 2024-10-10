import Button2 from './Button2';
import './ProductCard.css';
function ProductCard() {
  return (
    <>
      <div className="product-card w-60 max-w-60 flex flex-col p-4 gap-2 bg-white dark:bg-zinc-800 rounded-lg">
        <div>
          <img
            src="https://www.ktronix.com/medias/195949036637-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wxMTk2OHxpbWFnZS93ZWJwfGFEZG1MMmcyWmk4eE5ETTFOakEyTmpJd05UY3lOaTh4T1RVNU5Ea3dNelkyTXpkZk1EQXhYemMxTUZkNE56VXdTQXxkNTBkZDZhYzhhYzU3YmM2YTU1NDA4NmM1OTE4MzA1ODU4NTNmN2U2NDgxYTcxYTI1Y2JmZDNkYmE2YWZhMDdi"
            alt=""
            className="w-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 z-10">
          <h2 className="text-lg font-bold text-emerald-600">Producto</h2>
          <p className="text-sm dark:text-slate-100">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab aliquam dolores repellat!</p>
          <p className="text-sm text-emerald-300">De: @Gerotb511 (4.4)</p>
          <Button2 />
        </div>
      </div>
    </>
  );
}

export default ProductCard;
