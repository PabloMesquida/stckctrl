import Login from "./Login.js";
import stylesHero from "@/styles/Hero.module.css";

const Hero = () => {
  return (
    <div className={stylesHero.hero_container}>
      <div className={stylesHero.hero_col1}></div>
      <div className={stylesHero.hero_col2}>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Hero;
