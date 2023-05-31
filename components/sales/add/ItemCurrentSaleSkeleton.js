import stylesGeneral from "@/styles/General.module.css";

const ItemCurrentSaleSkeleton = () => {
  return (
    <div className="border-b border-dashed flex flex-col border-th-primary-light pb-4">
      <div className="flex">
        <div className={`${stylesGeneral.item_code} grow`}>
          <div className="h-5 w-1/3 bg-th-skeleton rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex flex-col md:flex-row md:gap-2 items-start md:items-center grow">
          <div className={`${stylesGeneral.item_name} grow mt-4`}>
            <div className="h-5 w-1/2 bg-th-skeleton rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-4 md:gap-8">
          <div className="flex gap-4 w-full md:w-32 items-center justify-between">
            <div className="h-6 w-full bg-th-skeleton rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCurrentSaleSkeleton;
