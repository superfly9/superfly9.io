import React, { ReactNode } from "react";

interface EmptyMessageProps {
  children: ReactNode;
  className?: string;
}

function EmptyMessage({ children, className }: EmptyMessageProps) {
  return (
    <p className={`text-muted-foreground text-center py-8 ${className}`}>
      {children}
    </p>
  );
}

export default EmptyMessage;
