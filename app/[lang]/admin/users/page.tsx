import { getUsers } from "@/backend/queries/admin/get-users";
import ClientsTable from "./_components/clients-table";
import { getDictionary } from "../../dictionaries";

async function UsersPage({
  searchParams,
  params,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  params: any;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const type = searchParams.type;
  const users = await getUsers(type === "client");

  return (
    <div className="p-5 space-y-7">
      <ClientsTable users={users} dict={dict} />
    </div>
  );
}

export default UsersPage;
