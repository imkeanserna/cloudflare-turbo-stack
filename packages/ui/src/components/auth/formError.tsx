import { TriangleAlert } from "lucide-react";
import React, { FC } from "react";

interface FormErrorProps {
  errorMessage?: string;
}

const FormError: FC<FormErrorProps> = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-md text-destructive">
      <TriangleAlert className="h-5 w-5" />
      <p>{errorMessage}</p>
    </div>
  );
};

export default FormError;
