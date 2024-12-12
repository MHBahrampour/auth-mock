import Image from "next/image";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export default async function UsersList() {
  // Fetching data on the server side
  const res = await fetch("https://reqres.in/api/users?page=1");
  const data = await res.json();
  const users: User[] = data.data;

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center space-x-4 p-4 border rounded-lg"
        >
          <Image
            src={user.avatar}
            alt={user.first_name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
