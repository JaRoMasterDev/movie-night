import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return <main className="max-w-5xl p-8 mx-auto text-text">{children}</main>;
}
