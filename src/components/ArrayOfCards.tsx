import { FC } from "react";
import { Card, CardTitle } from "./ui/card";
import Image from "next/image";

interface CardData {
  img?: string;
  company_name: string;
  [key: string]: any;
}

interface ArrayOfCardsProps {
  heading: string;
  data: CardData[];
}

const ArrayOfCards: FC<ArrayOfCardsProps> = ({ heading, data }) => {
  return (
    <Card className="p-4 rounded-2xl w-full font-medium ">
      <CardTitle className="text-sm flex_between ">
        <span className="tracking-normal">{heading}</span>
        <span className="text-sidebar">View All</span>
      </CardTitle>

      <div className="flex flex-col w-full capitalize mt-5">
        {data.map((item, index) => (
          <section className="w-full flex flex-col" key={index}>
            <div className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                {item.img && (
                  <Card>
                    <Image
                      src={`/assets/${item.img}`}
                      alt={item.company_name}
                      width={40}
                      height={40}
                      className="h-[40px] w-[40px] object-contain"
                    />
                  </Card>
                )}
                <div className="flex text-sm flex-col gap-1">
                  {Object.keys(item).map((key, idx) => {
                    // Skipping img // the image has index 1
                    if (key === "img") return null;
                    return (
                      <span
                        key={key}
                        className={`font-light ${
                          idx > 1 ? "text-[#515151]" : ""
                        }`}
                      >
                        {item[key]}
                      </span>
                    );
                  })}
                </div>
              </div>

              <span className="text-sm text-sidebar">Follow</span>
            </div>

            {index !== data.length - 1 && (
              <div className="h-[1px] w-full bg-[#F1F1F1] my-4" />
            )}
          </section>
        ))}
      </div>
    </Card>
  );
};

export default ArrayOfCards;


