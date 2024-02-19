"use client";

import { FC, useEffect } from "react";
import { toast } from "react-toastify";

type DashboardErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const DashboardError: FC<DashboardErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    toast.error(error.message);
  }, [error]);

  return (
    <div>
      <h2 className="text-2xl">Something went wrong</h2>
      <button
        className="btn bg-primary-color text-white"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
};

export default DashboardError;
