import { useWidthNavigator } from "@/helpers/useWidthNavigator.js";
import CardProducts from "./panels/stock/CardProducts";
import stylesGeneral from "@/styles/General.module.css";

const CtrlPanel = () => {
  const widthNavigator = useWidthNavigator();
  return (
    <section className={stylesGeneral.section_container}>
      <div className={stylesGeneral.panel_grid}>
        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "1 / 1 / 5 / 7" : "1 / 1 / 2 / 11",
          }}
        >
          VENTAS
        </div>

        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "1 / 7 / 4 / 11" : "2 / 1 / 3 / 11",
          }}
        >
          <CardProducts />
        </div>
        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "5 / 1 / 7 / 4" : "3 / 1 / 4 / 11",
          }}
        >
          CAMBIOS
        </div>
        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "5 / 4 / 7 / 7" : "4 / 1 / 5 / 11",
          }}
        >
          VALES
        </div>
        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "4 / 7 / 7 / 9" : "5 / 1 / 6 / 11",
          }}
        >
          SEÑA
        </div>
        <div
          className={stylesGeneral.panel_card}
          style={{
            gridArea:
              widthNavigator > 1100 ? "4 / 9 / 7 / 11" : "6 / 1 / 7 / 11",
          }}
        >
          PROVEEDORES
        </div>
      </div>
    </section>
  );
};

export default CtrlPanel;
