import { CSSProperties, FC } from "react";
import "../status/status.css";

type ChipProps = {
  active?: string;
  inactive?: string;
  draft?: string;
  removeBadge?: string;
  style?: CSSProperties;
};

export const Chip: FC<ChipProps> = ({
  active,
  inactive,
  draft,
  removeBadge,
  style,
}) => {
  return (
    <>
      {active && (
        <div className="badge badge-neutrall" style={style}>
          {active}
        </div>
      )}
      {removeBadge && (
        <div
          className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300 rounded-xl"
          data-dismiss-target="#badge-dismiss-dark"
          aria-label="Remove"
        >
          <span
            id="badge-dismiss-dark"
            className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
            style={style}
          >
            <div className="p-1">{removeBadge}</div>
            <button>
              <svg
                className="w-2 h-2 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <span className="sr-only">{removeBadge}</span>
          </span>
        </div>
      )}
      {inactive && <div className="badge badge-ghost">{inactive}</div>}
      {draft && <div className="badge badge-info">{draft}</div>}
    </>
  );
};
