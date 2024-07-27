import { ArrowDownRight, CalendarBlank, Users, Wallet } from "phosphor-react";
import dashboardCards from "../config/DashboardCards.json";
import { FakeSkeleton } from "@/app/page";
import { Card } from "./ui/card";

interface DashboardCard {
  label: string;
  icon: keyof typeof iconMapping;
  bg: string;
  color: string;
  count: number;
  percentage: string;
  inDays: number;
}

export const iconMapping = {
  CalendarBlank,
  Users,
  Wallet,
};

interface DashboardCardsProps {
  loading: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading }) => {
  return (
    <section className="flex gap-6 w-full lg:flex-nowrap flex-wrap ">
      {dashboardCards.map((card: DashboardCard) => {
        const IconComponent = iconMapping[card.icon];
        return (
          <Card
            key={card.label}
            className="flex flex-col gap-1 p-2 w-[35%] max-lg:w-[100%]"
          >
            {loading ? (
              <FakeSkeleton />
            ) : (
              <>
                <div className="p-2 py-3 flex gap-3 items-center">
                  <span
                    style={{
                      backgroundColor: card.bg,
                      color: card.color,
                    }}
                    className={`w-10 h-10 rounded-lg flex justify-center items-center`}
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </span>

                  <span className="text-semibold text-lg">{card?.label}</span>
                </div>

                <div className="p-2 py-3 flex justify-between">
                  <h1 className="text-2xl font-medium ml-2">{card?.count}</h1>

                  <div className="flex flex-col">
                    <h2
                      className={`flex text-[12px] gap-1`}
                      style={{
                        color: card.color,
                      }}
                    >
                      <span>
                        <ArrowDownRight size={20} />
                      </span>{" "}
                      <span> {card?.percentage}</span>
                    </h2>
                    <span className="text-[#8A8A8A] text-[12px]">
                      Since last {card?.inDays} Days
                    </span>
                  </div>
                </div>
              </>
            )}
          </Card>
        );
      })}
    </section>
  );
};

export default DashboardCards;


