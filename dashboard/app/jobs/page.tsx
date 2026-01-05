import Sidebar from "@/components/sidebar"
import { Card, CardContent, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Briefcase } from 'lucide-react';
//import { motion } from 'framer-motion';

const Jobs = () => {

    const jobsMock = [
        { id: 1, title: 'House Cleaning', category: 'Cleaning', location: 'Johannesburg', status: 'Active', creator: 'Sarah Jacobs', performer: 'Thabo Mokoena' },
        { id: 2, title: 'Painting', category: 'Painting', location: 'Cape Town', status: 'Completed', creator: 'John Dlamini', performer: 'Sarah Jacobs' },
        { id: 3, title: 'Nanny Services', category: 'Childcare', location: 'Pretoria', status: 'Disputed', creator: 'Sarah Jacobs', performer: 'Thabo Mokoena' },
    ];

    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-2xl font-semibold text-gray-900">Jobs</p>
                        <p className="text-sm text-gray-500">Monitor and manage all jobs on the platform</p>
                    </div>
                    <TextField 
                    placeholder="Search jobs..." 
                    variant="outlined" 
                    size="small" 
                    className="w-64" 
                    sx={{ '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mt-6">
                    <FormControl  size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
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

                    <FormControl  size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="All"
                            // onChange={handleChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="Disputed">Disputed</MenuItem>
                            <MenuItem value="Force-Closed">Force-Closed</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl  size="small" sx={{ minWidth: 150, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#00D26A' }, '& .MuiInputLabel-root.Mui-focused': { color: '#00D26A' } }}>
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
                </div>

                {/* Jobs Table */}
                <Card className="rounded-2xl mt-6">
                    <CardContent className="p-0 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="text-left p-4">Title</th>
                                    <th className="text-left p-4">Category</th>
                                    <th className="text-left p-4">Location</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-left p-4">Creator</th>
                                    <th className="text-left p-4">Performer</th>
                                </tr>
                            </thead>

                            <tbody>
                                {jobsMock.map((user, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div>
                                                {user.title}
                                            </div>
                                        </td>
                                        <td className="p-4">{user.category}</td>
                                        <td className="p-4">{user.location}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{user.status}</span>
                                        </td>
                                        <td className="p-4">{user.creator}</td>
                                        <td className="p-4">{user.performer}</td>
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

export default Jobs;