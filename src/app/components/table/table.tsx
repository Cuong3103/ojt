import { FC, ReactNode } from "react";

import { Chip } from "../chip/chip";

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
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  key={column.id}
                >
                  {column.id === "moreButton" ? (
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
                  ) : column.id === "gender" ? (
                    <span>
                      {row[column.id] === "Male" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_46_5487)">
                            <path
                              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                              fill="#2D3748"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_46_5487">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_46_5504)">
                            <path
                              d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                              fill="#E74A3B"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_46_5504">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </span>
                  ) : column.id === "type" ? (
                    <span>
                      {row[column.id] === "Admin" ? (
                        <Chip
                          active="Admin"
                          style={{ backgroundColor: "#4db848" }}
                        />
                      ) : (
                        <Chip active="Trainer" />
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