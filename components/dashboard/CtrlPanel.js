import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";

const CtrlPanel = () => {
  const widthNavigator = useWidthNavigator();
  return (
    <div className="sm:pl-68 pt-21 sm:pt-26 pb-4 px-4 w-full h-full">
      <div className="grid grid-cols-10 grid-rows-6 gap-4 h-full">
        <div
          className="bg-red-500 min-h-fit"
          style={{
            gridArea:
              widthNavigator > 1100 ? "1 / 1 / 5 / 7" : "1 / 1 / 2 / 11",
          }}
        >
          VENTAS
        </div>

        <div
          className="bg-green-500"
          style={{
            gridArea:
              widthNavigator > 1100 ? "1 / 7 / 4 / 11" : "2 / 1 / 3 / 11",
          }}
        >
          STOCK
        </div>
        <div
          className="bg-blue-500"
          style={{
            gridArea:
              widthNavigator > 1100 ? "5 / 1 / 7 / 4" : "3 / 1 / 4 / 11",
          }}
        >
          CAMBIOS
        </div>
        <div
          className="bg-purple-500"
          style={{
            gridArea:
              widthNavigator > 1100 ? "5 / 4 / 7 / 7" : "4 / 1 / 5 / 11",
          }}
        >
          VALES
        </div>
        <div
          className="bg-yellow-500"
          style={{
            gridArea:
              widthNavigator > 1100 ? "4 / 7 / 7 / 9" : "5 / 1 / 6 / 11",
          }}
        >
          SEÑA
        </div>
        <div
          className="bg-pink-500"
          style={{
            gridArea:
              widthNavigator > 1100 ? "4 / 9 / 7 / 11" : "6 / 1 / 7 / 11",
          }}
        >
          PROVEEDORES
        </div>
      </div>
    </div>
  );
};

export default CtrlPanel;
