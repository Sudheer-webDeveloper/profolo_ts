import dummyData from "../config/dummyData.json";
import SortableTable from "./SortedTable";
import { WarningCircle, Plus } from "phosphor-react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

interface Column {
  key: string;
  label: string;
}

const columns: Column[] = [
  { key: "id", label: "ID" },
  { key: "job", label: "Job" },
  // { key: "status", label: "Status" },
  { key: "postedBy.name", label: "Posted By" },
  { key: "postedOn", label: "Posted On" },
  { key: "views", label: "Views" },
  { key: "clicks", label: "Clicks" },
];

interface DashboardTableProps {
  loading: boolean;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ loading }) => {
  return (
    <section className="flex w-full gap-3 flex-col">
      {loading ? (
        <div className="flex w-full justify-between">
          <Skeleton className="w-[100px] h-10" />
          <Skeleton className="w-[100px] h-10" />
        </div>
      ) : (
        <div className="flex_between w-full">
          <h6 className="flex_center gap-2">
            Job Postings
            <WarningCircle size={20} className="text-[#8A8A8A]" />
          </h6>

          <Button
            variant="default"
            className="text-white max-h-9 flex_center gap-1 font-medium"
          >
            <Plus size={20} className="mr-1" />
            Post Job
          </Button>
        </div>
      )}

      <div className="w-full">
        {loading ? (
          <Skeleton className="w-full h-[60vh]" /> // Skeleton for table
        ) : (
          <SortableTable data={dummyData || []} columns={columns} />
        )}
      </div>
    </section>
  );
};

export default DashboardTable;


