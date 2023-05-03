import stylesGeneral from "@/styles/General.module.css";

const StockSkeleton = () => {
  return (
    <>
      <div className={`${stylesGeneral.head_container} animate-pulse`}>
        <div className="h-8 w-1/3 bg-th-skeleton rounded-full"></div>
      </div>

      <div className={`${stylesGeneral.panel_card} animate-pulse `}></div>
    </>
  );
};

export default StockSkeleton;
