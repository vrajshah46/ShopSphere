
import { useCallback, useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    const loadUsers = useCallback(() => {
        try {
            const savedUsers = JSON.parse(
                localStorage.getItem("users") || "[]"
            );

            setUsers(Array.isArray(savedUsers) ? savedUsers : []);
        } catch {
            setUsers([]);
        }
    }, []);

    useEffect(() => {
        loadUsers();

        // Updates when localStorage changes in another tab.
        window.addEventListener("storage", loadUsers);

        // Custom event for updates in the same tab.
        window.addEventListener("usersUpdated", loadUsers);

        return () => {
            window.removeEventListener("storage", loadUsers);
            window.removeEventListener("usersUpdated", loadUsers);
        };
    }, [loadUsers]);

    return (
        <section className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage registered ShopSphere users.
                </p>

                <div className="mt-6 rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Registered Users
                    </p>
                    <p className="mt-1 text-3xl font-bold">
                        {users.length}
                    </p>
                </div>

                <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Registered At</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-6 text-center text-gray-500"
                                    >
                                        No registered users yet.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr
                                        key={user.id ?? user.email ?? index}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="p-4 font-medium">
                                            {user.name || "—"}
                                        </td>
                                        <td className="p-4">
                                            {user.email || "—"}
                                        </td>
                                        <td className="p-4 capitalize">
                                            {user.role || "user"}
                                        </td>
                                        <td className="p-4">
                                            {user.registeredAt
                                                ? new Date(
                                                    user.registeredAt
                                                ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
