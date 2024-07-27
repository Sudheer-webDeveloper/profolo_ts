"use client";

import React, { useState, useMemo } from "react";
import _ from "lodash";
import { CaretDown, CaretUp, DotsThreeVertical } from "phosphor-react";
import { Card } from "./ui/card";

interface Column {
  key: string;
  label: string;
}

interface DataItem {
  id: string;
  [key: string]: any;
}

interface SortableTableProps {
  columns: Column[];
  data: DataItem[];
}

const SortableTable: React.FC<SortableTableProps> = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "",
    direction: "ascending",
  });
  const [actionRow, setActionRow] = useState<number | null>(null);

  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        const aValue = _.get(a, sortConfig.key);
        const bValue = _.get(b, sortConfig.key);

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleActionRow = (index: number) => {
    if (actionRow === index) {
      setActionRow(null);
    } else {
      setActionRow(index);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Card className="max-h-90 overflow-y-auto">
        <table className="min-w-full bg-white shadow rounded-lg custom-scrollbar">
          <thead className="bg-gray-100 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => requestSort(column.key)}
                  className="text-left py-3 px-3 text-[14px] uppercase font-normal cursor-pointer"
                >
                  <span className="flex items-center text-nowrap gap-2">
                    {column.label}
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === "ascending" ? (
                        <CaretUp />
                      ) : (
                        <CaretDown />
                      )
                    ) : (
                      <CaretUp />
                    )}
                  </span>
                </th>
              ))}
              <th>
                <span className="font-normal px-3 text-[14px]">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 1 ? "bg-[#F1F1F1]" : "bg-white"}
              >
                {columns.map((column) => (
                  <td key={column.key} className="py-3 px-4 text-[12px] text-left">
                    {column.key === "job" ? (
                      <div>
                        {_.get(item, column.key)}
                        <span className="border ml-1 text-[12px] rounded-md px-2 py-1">
                          {item.status}
                        </span>
                      </div>
                    ) : column.key === "postedBy.name" ? (
                      <div className="flex items-center">
                        <span className="bg-gray-300 w-8 h-8 flex_center text-[12px] rounded-lg px-2 py-1 mr-2">
                          {item.postedBy.initials}
                        </span>
                        {_.get(item, column.key)}
                      </div>
                    ) : (
                      _.get(item, column.key)
                    )}
                  </td>
                ))}
                <td className="py-3 px-4 relative">
                  <button
                    onClick={() => toggleActionRow(index)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <DotsThreeVertical size={20} />
                  </button>
                  {actionRow === index && (
                    <div className="absolute text-sm right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
                      <ul className="text-left">
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                          Apply
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                          View
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SortableTable;


