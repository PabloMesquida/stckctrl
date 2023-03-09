import navStyles from "@/styles/Navbar.module.css";
import { MdFace } from "react-icons/md";

const NavUser = ({ session }) => {
  return (
    <div className={navStyles.nav_aside_user_container}>
      <div>
        <MdFace size={48} className="text-th-accent-dark" />
      </div>
      <div className="flex flex-col justify-start items-start px-2">
        <span className=" text-base font-medium text-th-primary-dark">
          {session.user.name}
        </span>
        <span className=" text-sm font-light text-th-primary-medium">
          {session.user.email}
        </span>
      </div>
    </div>
  );
};

export default NavUser;
