import stylesGeneral from "@/styles/General.module.css";
import { MdImage } from "react-icons/md";

const SupplierDetailSkeleton = () => {
  return (
    <>
      <div className={`${stylesGeneral.head_container} animate-pulse`}>
        <div className="h-8 w-1/3 bg-th-skeleton rounded-full"></div>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="flex flex-col sm:flex-row h-full gap-4 items-stretch">
          <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1 ">
            <div
              className={`${stylesGeneral.panel_card} flex flex-col h-full justify-items-stretch items-strech animate-pulse`}
            >
              <div className="flex gap-4 my-2">
                <div className="h-4 w-1/4 bg-th-skeleton rounded-full"></div>
                <div className="h-4 w-1/3 bg-th-skeleton rounded-full"></div>
              </div>
              <div
                className={`${stylesGeneral.item_sub} h-2  my-2 w-1/3 bg-th-skeleton rounded-full`}
              ></div>
              <div
                className={`${stylesGeneral.item_code} my-4  h-4 w-1/5 bg-th-skeleton-secondary rounded-full`}
              ></div>
              <div>
                <div className={`${stylesGeneral.item_sub}  w-full`}>
                  <div role="status" className="space-y-2.5 animate-pulse ">
                    <div className="flex items-center  space-x-2 w-5/6">
                      <div className="h-2 bg-th-skeleton rounded-full  w-32"></div>
                      <div className="h-2 bg-th-skeleton-secondary rounded-full  w-24"></div>
                      <div className="h-2 bg-th-skeleton-secondary rounded-full w-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 w-full">
                      <div className="h-2 bg-th-skeleton-secondary rounded-full w-full"></div>
                      <div className="h-2 bg-th-skeleton rounded-full w-full"></div>
                      <div className="h-2 bg-th-skeleton rounded-full w-24"></div>
                    </div>
                    <div className="flex items-center  space-x-2 w-3/4">
                      <div className="h-2 bg-th-skeleton rounded-full w-full"></div>
                      <div className="h-2 bg-th-skeleton-secondary rounded-full w-80"></div>
                      <div className="h-2 bg-th-skeleton rounded-full w-full"></div>
                    </div>
                    <div className="flex items-center space-x-2 w-4/5">
                      <div className="h-2 bg-th-skeleton-secondary rounded-full w-full"></div>
                      <div className="h-2 bg-th-skeleton rounded-full w-full"></div>
                      <div className="h-2 bg-th-skeleton rounded-full w-24"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${stylesGeneral.panel_card} animate-pulse`}>
              <div className="h-4 w-24 bg-th-skeleton rounded-full"></div>
              <div className="flex mt-4 gap-4 justify-between">
                <div className="h-4 w-32 bg-th-skeleton-secondary rounded-full"></div>
                <div className="h-4 w-32 bg-th-skeleton-secondary rounded-full"></div>
                <div className="h-4 w-32 bg-th-skeleton-secondary rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-1/2 gap-4 flex-1">
            <div className={`${stylesGeneral.panel_card} animate-pulse`}>
              <div className={stylesGeneral.form_image_container}>
                <MdImage
                  className={stylesGeneral.form_icon_image_placeholder_detail}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${stylesGeneral.panel_card} animate-pulse `}></div>
      </div>
    </>
  );
};

export default SupplierDetailSkeleton;
