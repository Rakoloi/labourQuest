import Sidebar from "@/components/sidebar";
import { TextField, Button, Card, CardContent } from "@mui/material";
// import { motion } from "framer-motion";

const Users = () => {

    const usersMock = [
        { name: "Thabo Mokoena", email: "thabo@email.com", roles: ["Creator", "Performer"], jobsCreated: 5, jobsPerformed: 24, rating: 4.6, status: "Active" },
        { name: "Sarah Jacobs", email: "sarah@email.com", roles: ["Creator"], jobsCreated: 12, jobsPerformed: 0, rating: 4.8, status: "Active" },
        { name: "John Dlamini", email: "john@email.com", roles: ["Performer"], jobsCreated: 0, jobsPerformed: 3, rating: 3.2, status: "Suspended" },
    ];

    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
                        <p className="text-sm text-gray-500">Manage all users registered on the platform</p>
                    </div>
                    <div className="flex gap-3">
                        <TextField placeholder="Search users..." variant="outlined" size="small" className="w-64" />
                        <Button variant="contained" sx={{ bgcolor: '#00D26A', color: 'black', '&:hover': { bgcolor: '#00B85D' } }}>Add User</Button>
                    </div>   
                </div>

                {/* filters */}
                <div className="flex gap-3 flex-wrap mt-5 mb-10">
                    <Button variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A', '&:hover': { borderColor: '#00B85D', color: '#00B85D' } }}>All</Button>
                    <Button variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A', '&:hover': { borderColor: '#00B85D', color: '#00B85D' } }}>Creators</Button>
                    <Button variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A', '&:hover': { borderColor: '#00B85D', color: '#00B85D' } }}>Performers</Button>
                    <Button variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A', '&:hover': { borderColor: '#00B85D', color: '#00B85D' } }}>Suspended</Button>
                </div>

                {/* Users Table */}
                <Card className="rounded-2xl">
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left p-4">User</th>
                                    <th className="text-left p-4">Roles</th>
                                    <th className="text-left p-4">Jobs Created</th>
                                    <th className="text-left p-4">Jobs Performed</th>
                                    <th className="text-left p-4">Rating</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-right p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersMock.map((user, i) => (
                                    <tr key={i} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#00D26A]/20 flex items-center justify-center font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">{user.roles.join(', ')}</td>
                                        <td className="p-4">{user.jobsCreated}</td>
                                        <td className="p-4">{user.jobsPerformed}</td>
                                        <td className="p-4">⭐ {user.rating}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Button variant="outlined" size="small" sx={{ borderColor: '#00D26A', color: '#00D26A', '&:hover': { borderColor: '#00B85D', color: '#00B85D' } }}>View</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default Users;