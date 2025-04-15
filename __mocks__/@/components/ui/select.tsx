import React from "react";

export const Select = ({
  children,
  onValueChange,
}: {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
}) => (
  <div>
    <button onClick={() => onValueChange("dev")}>{children}</button>
  </div>
);

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => (
  <button>{children}</button>
);

export const SelectValue = ({ children }: { children: React.ReactNode }) => (
  <span>{children}</span>
);

export const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <div role="listbox">{children}</div>
);

export const SelectItem = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) => (
  <div role="option" data-value={value}>
    {children}
  </div>
);
