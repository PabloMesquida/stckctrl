import { useSession } from "next-auth/react";
import Panels from "./panels/Panels.js";
import Sidebar from "./sidebar/Sidebar";

const CtrlPanel = () => {
  // const { data: session } = useSession();
  return (
    <div className="pt-20 w-full h-full flex">
      {/* <Sidebar /> */}
      <Panels />
      {/* <div className="details">
        <h5>Nombre: {session.user.name}</h5>
      </div> */}
    </div>
  );
};

export default CtrlPanel;
