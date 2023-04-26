import Link from "next/link";
import { useRouter } from "next/router";
import { MdBarChart, MdModeEdit } from "react-icons/md";
import stylesGeneral from "@/styles/General.module.css";

const HeadDetailProduct = ({ name, id }) => {
  const router = useRouter();
  const isEditing = router.pathname.includes("/editar");

  return (
    <div className={stylesGeneral.head_container}>
      <div className={stylesGeneral.section_title}>{name}</div>
      <div className={stylesGeneral.icon_stats_container}>
        <MdBarChart size={30} className="text-th-accent-dark" />
      </div>
      <div>
        {!isEditing && (
          <Link href={`./editar/${id}`}>
            <button className={stylesGeneral.button_sm}>
              <MdModeEdit size={24} className="mr-4" /> Editar
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeadDetailProduct;
