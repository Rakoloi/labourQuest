import Sidebar from "@/components/sidebar";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { DollarSign, AlertTriangle, XCircle } from "lucide-react";

const Payments = () => {

    const paymentsMock = [
        {
            id: "TX-001",
            user: "Thabo Mokoena",
            amount: 1200,
            status: "Completed",
            date: "2025-01-12",
        },
        {
            id: "TX-002",
            user: "Sarah Jacobs",
            amount: 800,
            status: "Disputed",
            date: "2025-01-14",
        },
        {
            id: "TX-003",
            user: "John Dlamini",
            amount: 500,
            status: "Failed",
            date: "2025-01-15",
        },
    ];

    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                {/* header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500">welcome back! here is an overview of the insights</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4">
                            <DollarSign className="text-[#00D26A]" size={32} />
                            <div>
                                <Typography variant="h6">Total Escrow</Typography>
                                <Typography className="text-gray-600">R 500</Typography>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4">
                            <AlertTriangle className="text-[#00D26A]" size={32} />
                            <div>
                                <Typography variant="h6">Pending Payouts</Typography>
                                <Typography className="text-gray-600">R 900</Typography>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="flex items-center gap-4">
                            <XCircle className="text-[#00D26A]" size={32} />
                            <div>
                                <Typography variant="h6">Failed Transactions</Typography>
                                <Typography className="text-gray-600">10</Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transactions Table */}
                <Card className="rounded-2xl mt-8">
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-4 text-left">Transaction ID</th>
                                    <th className="p-4 text-left">User</th>
                                    <th className="p-4 text-left">Amount</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paymentsMock.map((tx) => (
                                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{tx.id}</td>
                                        <td className="p-4">{tx.user}</td>
                                        <td className="p-4">R {tx.amount}</td>
                                        <td className="p-4">
                                            <Chip
                                                label={tx.status}
                                                size="small"
                                                color={
                                                    tx.status === "Completed"
                                                    ? "success"
                                                    : tx.status === "Disputed"
                                                    ? "warning"
                                                    : "error"
                                                }
                                            />
                                        </td>
                                        <td className="p-4">{tx.date}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <div className="flex justify-end gap-2">
                                                    <Button size="small" variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A' }}>
                                                    View
                                                    </Button>
                                                    <Button size="small" variant="outlined" sx={{ borderColor: '#00D26A', color: '#00D26A' }}>
                                                    Resolve
                                                    </Button>
                                            </div>
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

export default Payments;