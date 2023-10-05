import { AdminLayout } from "../../hoc/AdminLayout";
function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="user_dashboard">
        <div>This is your dashboard</div>
      </div>
    </AdminLayout>
  );
}

export { Dashboard };
