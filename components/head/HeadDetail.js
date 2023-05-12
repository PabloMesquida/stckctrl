import Link from "next/link";
import { useRouter } from "next/router";
import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import { MdBarChart, MdModeEdit, MdNavigateBefore } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";

const HeadDetail = ({ name, id }) => {
  const router = useRouter();
  const widthNavigator = useWidthNavigator();
  const isEditing = router.pathname.includes("/edit");
  const isSupplier = router.pathname.includes("/suppliers");
  const isEditingStock = router.pathname.includes("/inventory");

  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>{name}</div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
      <div className="flex items-center gap-4">
        <Link
          href={
            !isSupplier
              ? isEditing
                ? isEditingStock
                  ? `../../${id}`
                  : `../${id}`
                : `./`
              : `./../`
          }
        >
          <button className={stylesGeneral.button_sm_nofill}>
            <MdNavigateBefore
              size={24}
              className={widthNavigator > 640 ? "mr-4" : "mr-0"}
            />
            {widthNavigator > 640 && "Volver"}
          </button>
        </Link>
        {!isEditing && (
          <Link href={`./edit/${id}`}>
            <button className={stylesGeneral.button_sm}>
              <MdModeEdit
                size={24}
                className={widthNavigator > 640 ? "mr-4" : "mr-0"}
              />
              {widthNavigator > 640 && "Editar"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeadDetail;
