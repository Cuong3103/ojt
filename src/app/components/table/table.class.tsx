import { FC, ReactNode } from "react";

import { Chip } from "../chip/chip";
import Link from "next/link";

export type Column = {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "left" | "right" | "center";
};

type TableProps = {
  data: any[];
  columns: Column[];
  icon?: ReactNode;
};

export const Table: FC<TableProps> = ({ data, columns, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-auto m-4">
      <table className="w-full table-fixed">
        <thead className="bg-primary-color text-white">
          <tr>
            {columns.map((column) => (
              <th
                className={`px-6 py-3 text-left text-xs  uppercase tracking-wider ${
                  column.align ? `text-${column.align}` : "text-left"
                }`}
                key={column.id}
              >
                <span className="flex items-center">
                  <span>{column.label}</span>
                  {column.id !== "moreButton" && icon && (
                    <div className="ml-2">{icon}</div>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
              {columns.map((column) => (
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 overflow-clip"
                  key={column.id}
                >
                  {column.id === "class" ? (
                    <Link href={`/classes/${row?.classCode}`}>
                      {row[column.id]}
                    </Link>
                  ) : // <Link href='/viewClassDetail'>{row[column.id]}</Link>
                  column.id === "moreButton" ? (
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13 15C14.1046 15 15 14.1046 15 13C15 11.8954 14.1046 11 13 11C11.8954 11 11 11.8954 11 13C11 14.1046 11.8954 15 13 15Z"
                          fill="#2D3748"
                        />
                        <path
                          d="M20 15C21.1046 15 22 14.1046 22 13C22 11.8954 21.1046 11 20 11C18.8954 11 18 11.8954 18 13C18 14.1046 18.8954 15 20 15Z"
                          fill="#2D3748"
                        />
                        <path
                          d="M6 15C7.10457 15 8 14.1046 8 13C8 11.8954 7.10457 11 6 11C4.89543 11 4 11.8954 4 13C4 14.1046 4.89543 15 6 15Z"
                          fill="#2D3748"
                        />
                      </svg>
                    </button>
                  ) : column.id === "status" ? (
                    <span>
                      {row[column.id] === "Planning" ? (
                        <Chip
                          active="Planning"
                          style={{ backgroundColor: "#0000FF" }}
                        />
                      ) : row[column.id] === "Opening" ? (
                        <Chip
                          active="Opening"
                          style={{ backgroundColor: "#228B22" }}
                        />
                      ) : row[column.id] === "Scheduled" ? (
                        <Chip
                          active="Scheduled"
                          style={{ backgroundColor: "#FF9900" }}
                        />
                      ) : (
                        <Chip
                          active="Completed"
                          style={{ backgroundColor: "#000000" }}
                        />
                      )}
                    </span>
                  ) : (
                    row[column.id]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
