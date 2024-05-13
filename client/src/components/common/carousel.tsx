import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "lucide-react";

type T_feature = {
  feature: string;
  description: string;
};

const Carousel = ({ data }: { data: T_feature[] }) => {
  const [current, setCurrent] = useState(data.length / 2);
  const handleCarouselClick = (current: number, direction: string) => {
    console.log(current, direction);
    if (direction === "left") {
      setCurrent(
        (current - 1) % data.length < 0
          ? data.length + ((current - 1) % data.length)
          : (current - 1) % data.length,
      );
    } else {
      setCurrent((current + 1) % data.length);
    }
  };
  return (
    <div className="flex flex-row items-center">
      <button onClick={() => handleCarouselClick(current, "left")}>
        <ArrowLeftIcon size={24} />
      </button>
      <div className="flex flex-row justify-evenly items-center gap-4">
        {data.map((item, index) => {
          if (
            [
              (current - 1) % data.length < 0
                ? data.length + ((current - 1) % data.length)
                : (current - 1) % data.length,
              ,
              current,
              (current + 1) % data.length,
            ].includes(index)
          ) {
            return (
              <div
                key={index}
                className="w-2/3 h-96 p-4 flex flex-col gap-4 rounded-lg shadow-md"
              >
                <h1 className="text-2xl font-semibold">{item.feature}</h1>
                <p className="text-xl">{item.description}</p>
              </div>
            );
          }
        })}
      </div>
      <button onClick={() => handleCarouselClick(current, "right")}>
        <ArrowRightIcon size={24} />
      </button>
    </div>
  );
};

export default Carousel;
