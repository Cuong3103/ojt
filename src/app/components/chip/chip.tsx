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
              <svg viewBox="0 0 14 14" width="14px" height="14px" className="css-149xqrd">
                <path d="M9.85 4.15c.2.2.2.5 0 .7L7.71 7l2.14 2.15a.5.5 0 0 1-.7.7L7 7.71 4.85 9.85a.5.5 0 0 1-.7-.7L6.29 7 4.15 4.85a.5.5 0 1 1 .7-.7L7 6.29l2.15-2.14c.2-.2.5-.2.7 0Z">
                </path>
                <path fill-rule="evenodd" d="M7 14A7 7 0 1 0 7 0a7 7 0 0 0 0 14Zm0-1A6 6 0 1 0 7 1a6 6 0 0 0 0 12Z"
                >
                </path></svg>
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
