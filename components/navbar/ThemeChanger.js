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
    <div className=" flex justify-between items-center align-middle px-3 text-sm text-th-primary-dark">
      {theme === "dark" ? (
        <button
          className=" rounded-md hover:bg-th-primary-light p-2 mx-4 w-8 h-8 flex justify-center items-center"
          onClick={() => setTheme("light")}
        >
          <MdOutlineWbSunny size={20} />
        </button>
      ) : (
        <button
          className="rounded-md hover:bg-th-primary-medium p-2 mx-4 w-8 h-8 flex justify-center items-center"
          onClick={() => setTheme("dark")}
        >
          <MdNightlightRound size={14} />
        </button>
      )}
    </div>
  );
};

export default ThemeChanger;
