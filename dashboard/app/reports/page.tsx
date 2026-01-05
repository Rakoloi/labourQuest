import Sidebar from "@/components/sidebar"
import { Download, Eye, UserMinus, UserX, AlertTriangle } from "lucide-react";
import { Card, CardContent, Button, Chip, TextField,  } from '@mui/material';

const Reports = () => {
    const reportsMock = [
        {
            id: 1,
            type: 'Harassment',
            reporter: 'Sarah Jacobs',
            reportedUser: 'Thabo Mokoena',
            status: 'Open',
            evidence: 'Chat screenshots attached',
            date: '2025-03-11',
        },
        {
            id: 2,
            type: 'Fraud',
            reporter: 'John Dlamini',
            reportedUser: 'User X',
            status: 'Resolved',
            evidence: 'Payment logs attached',
            date: '2025-03-08',
        },
    ];

        const statusColor = (status: string) => {
        if (status === 'Resolved') return 'success';
        if (status === 'Under Review') return 'warning';
        return 'error';
        };
    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                <div className="min-h-screen bg-[#F8F9FA] space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Reports & Incidents</h1>
                            <p className="text-sm text-gray-500">
                            Review misconduct, manage incidents, and take enforcement actions
                            </p>
                        </div>
                        <Button
                        variant="outlined"
                        startIcon={<Download size={16} />}
                        sx={{
                        borderColor: '#00D26A',
                        color: '#00D26A',
                        '&:hover': { borderColor: '#00B85D', color: '#00B85D' },
                        }}
                        >
                        Export Reports
                        </Button>
                    </div>
                    {/* filters */}
                    <div className="flex flex-wrap gap-3">
                        <TextField
                            size="small"
                            label="Search user"
                            sx={{
                             minWidth: 200,
                            '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' },
                            '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' },
                            }}
                        />                  
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {reportsMock.map((report) => (
                            <Card key={report.id} className="rounded-2xl border-l-4 border-[#00D26A]">
                                <CardContent className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="text-[#00D26A]" />
                                                <div>
                                                    <h2 className="font-semibold">{report.type}</h2>
                                                    <p className="text-xs text-gray-500">Reported on {report.date}</p>
                                                </div>
                                        </div>
                                                <Chip
                                                    label={report.status}
                                                    color={statusColor(report.status) as any}
                                                    size="small"
                                                />
                                    </div>

                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p><strong>Reporter:</strong> {report.reporter}</p>
                                        <p><strong>Reported User:</strong> {report.reportedUser}</p>
                                        <p><strong>Evidence:</strong> {report.evidence}</p>
                                    </div>


                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<Eye size={16} />}
                                            sx={{ borderColor: '#00D26A', color: '#00D26A' }}
                                        >
                                        View Evidence
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<UserMinus size={16} />}
                                            sx={{ borderColor: '#00D26A', color: '#00D26A' }}
                                        >
                                        Warn
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<UserX size={16} />}
                                            sx={{ borderColor: '#00D26A', color: '#00D26A' }}
                                        >
                                        Suspend / Ban
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Reports;