"use client";

import SideMenu from "@/components/common/SideMenu";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col">
      <main className="flex flex-1">
        <SideMenu />
        <section className="flex-1 p-4 overflow-auto bg-low">{children}</section>
      </main>
    </section>
  );
}

export default layout;
