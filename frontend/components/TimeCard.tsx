import { AppContext } from "@/context/AppContext";
import { MouseEvent, useContext } from "react";

const TimeCard = ({ time }: { time: [string, any] }) => {
  const { setSelectedTimeFn } = useContext(AppContext);

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedTimeFn(e.currentTarget.childNodes[0].textContent || "");
  };

  return (
    <button
      className="bg-black text-white font-semibold px-6 py-2 rounded-md text-center disabled:bg-[#2f2e2ea1] focus:bg-white focus:text-black border-2 transition-all duration-200"
      disabled={5 - time[1] > 0 ? false : true}
      onClick={clickHandler}
    >
      <p className="uppercase">{time[0]}</p>
      <p className="text-lg">{5 - time[1]} Tables</p>
    </button>
  );
};

export default TimeCard;
