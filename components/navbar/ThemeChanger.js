import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny, MdNightlightRound } from "react-icons/md";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=" flex justify-center items-center align-middle pl-3 text-sm text-th-primary-dark">
      {theme === "dark" ? (
        <button
          className=" pl-2 mx-4 w-8 h-8 flex justify-center items-center hover:text-th-accent-dark"
          onClick={() => setTheme("light")}
        >
          <MdOutlineWbSunny size={20} />
        </button>
      ) : (
        <button
          className="pl-2 mx-4 w-8 h-8 flex justify-center items-center hover:text-th-accent-dark"
          onClick={() => setTheme("dark")}
        >
          <MdNightlightRound size={14} />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
