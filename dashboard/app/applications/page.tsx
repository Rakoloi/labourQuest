import Sidebar from "@/components/sidebar";
import { TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Chip } from "@mui/material";
import { FileText, UserCheck, UserX, Eye } from 'lucide-react';

const Applications = () => {
    const applicationsMock = [
        {
            id: 1,
            jobTitle: 'House Cleaning',
            applicant: 'Thabo Mokoena',
            rating: 4.6,
            status: 'Pending',
            appliedAt: '2025-03-10',
        },
        {
            id: 2,
            jobTitle: 'Painting Job',
            applicant: 'Sarah Jacobs',
            rating: 4.9,
            status: 'Approved',
            appliedAt: '2025-03-09',
        },
        {
            id: 3,
            jobTitle: 'Nanny Services',
            applicant: 'John Dlamini',
            rating: 4.2,
            status: 'Rejected',
            appliedAt: '2025-03-08',
        },
        ];

        const statusColor = (status: string) => {
            switch (status) {
                case 'Approved':
                return 'success';
                case 'Rejected':
                return 'error';
                default:
                return 'warning';
            }
        };

    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">       
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
                    <p className="text-sm text-gray-500">
                        Review and manage all job applications
                    </p>
                </div>      

                {/* filters */}
                <div className="flex flex-wrap gap-3 mt-6">
                    <FormControl size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Cleaning">Cleaning</MenuItem>
                            <MenuItem value="Painting">Painting</MenuItem>
                            <MenuItem value="Childcare">Childcare</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Johannesburg">Free State</MenuItem>
                            <MenuItem value="Cape Town">KwaZulu-Natal</MenuItem>
                            <MenuItem value="Pretoria">Mpumalanga</MenuItem>
                            <MenuItem value="">Limpopo</MenuItem>
                            <MenuItem value="">North West</MenuItem>
                            <MenuItem value="">Gauteng</MenuItem>
                            <MenuItem value="">Western Cape</MenuItem>
                            <MenuItem value="">Nothern Cape</MenuItem>
                            <MenuItem value="">Eastern Cape</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Cleaning">2026</MenuItem>
                            
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Jan">Jan</MenuItem>
                            <MenuItem value="Feb">Feb</MenuItem>
                            <MenuItem value="Mar">Mar</MenuItem>
                            <MenuItem value="Apr">Apr</MenuItem>
                            <MenuItem value="May">May</MenuItem>
                            <MenuItem value="Jun">Jun</MenuItem>
                            <MenuItem value="Jul">Jul</MenuItem>
                            <MenuItem value="Aug">Aug</MenuItem>
                            <MenuItem value="Sep">Sep</MenuItem>
                            <MenuItem value="Oct">Oct</MenuItem>
                            <MenuItem value="Nov">Nov</MenuItem>
                            <MenuItem value="Dec">Dec</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Applications List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {applicationsMock.map((app) => (
                        <Card key={app.id} className="rounded-2xl hover:shadow-md transition">
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText className="text-[#00D26A]" />
                                        <h2 className="font-semibold">{app.jobTitle}</h2>
                                    </div>
                                    <Chip
                                        label={app.status}
                                        color={statusColor(app.status) as any}
                                        size="small"
                                    />
                                </div>

                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>
                                        <strong>Applicant:</strong> {app.applicant}
                                    </p>
                                    <p>
                                        <strong>Rating:</strong> ⭐ {app.rating}
                                    </p>
                                    <p>
                                        <strong>Applied:</strong> {app.appliedAt}
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<Eye size={16} />}
                                        sx={{
                                        borderColor: '#00D26A',
                                        color: '#00D26A',
                                        '&:hover': { borderColor: '#00B85D', color: '#00B85D' },
                                        }}
                                        >
                                        View
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<UserCheck size={16} />}
                                        sx={{
                                        borderColor: '#00D26A',
                                        color: '#00D26A',
                                        '&:hover': { borderColor: '#00B85D', color: '#00B85D' },
                                        }}
                                        >
                                        Approve
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<UserX size={16} />}
                                        sx={{
                                        borderColor: '#00D26A',
                                        color: '#00D26A',
                                        '&:hover': { borderColor: '#00B85D', color: '#00B85D' },
                                        }}
                                        >
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
            </main>
        </div>      
    )
}

export default Applications;