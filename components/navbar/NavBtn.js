import navStyles from "@/styles/Navbar.module.css";

const NavBtn = ({ link, children }) => {
  return (
    <a href={link} className={navStyles.nav_btn}>
      {children}
    </a>
  );
};

export default NavBtn;
