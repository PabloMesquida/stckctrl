const NavBtn = ({ link, children }) => {
  return (
    <a
      href={link}
      className="block py-2 p-2 h-10 md:h-auto rounded hover:bg-th-accent-medium md:hover:bg-transparent md:hover:text-th-accent-dark hover:text-white md:p-0 "
    >
      {children}
    </a>
  );
};

export default NavBtn;
