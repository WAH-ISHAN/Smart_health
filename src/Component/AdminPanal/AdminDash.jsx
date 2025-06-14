import { AccountPanal } from "./unit/AccountPanal";

export function AdminDash() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
       <p className="mt-4 text-lg text-gray-700">Welcome to the Admin Dashboard. Here you can manage all aspects of the application.</p>
      <AccountPanal />
    </div>
  );
}
export default AdminDash;