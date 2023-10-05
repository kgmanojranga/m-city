import { ReactNode } from "react";

import { AdminNav } from "../components/admin/nav/AdminNav";

function AdminLayout({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav />
      </div>
      <div className="admin_right">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export { AdminLayout };
