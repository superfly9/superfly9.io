import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-12 text-center md:text-left">
      {children}
    </h1>
  );
}
