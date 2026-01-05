import Sidebar from "@/components/sidebar";
import { Slider } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';

//firebase imports
import {auth, db} from "../../config";

//icons imports
import { Users } from "lucide-react";
import { Briefcase } from "lucide-react";
import { CheckCheck } from "lucide-react";
import { Flag } from "lucide-react";

const Dashboard = () => {

    const user = auth.currentUser;
    console.log(user?.displayName);

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
                
                {/* key components that shows data/insights */}
                <div >
                    <div className="flex flex-wrap gap-6">
                        <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                            <div>
                                <p className="text-s text-gray-500">Users</p>
                                <p className="text-2xl font-semibold text-gray-900">1,125</p>
                            </div>
                            <Users className="text-green-500 w-8 h-8 ml-4"/>
                        </div>    

                        <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                            <div>
                                <p className="text-s text-gray-500">Active jobs</p>
                                <p className="text-2xl font-semibold text-gray-900">592</p>
                            </div>
                            <Briefcase className="text-green-500 w-8 h-8 ml-4"/>
                        </div>     

                        <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                            <div>
                                <p className="text-s text-gray-500">Complete jobs</p>
                                <p className="text-2xl font-semibold text-gray-900">892</p>
                            </div>
                            <CheckCheck className="text-green-500 w-8 h-8 ml-4"/>
                        </div>     

                        <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                            <div>
                                <p className="text-s text-gray-500">Reports</p>
                                <p className="text-2xl font-semibold text-gray-900">150</p>
                            </div>
                            <Flag className="text-green-500 w-8 h-8 ml-4"/>
                        </div> 
                    </div>
                    <div className="flex flex-wrap gap-6 mt-15">
                        <div className="flex-1 min-w-[200px] max-w-[600px] bg-[#f2f2f2] p-4 h-100 rounded-lg shadow-md flex flex-col">
                            <p className="text-s text-gray-900 font-semibold mb-5">Recent Reports</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-medium">Fraud</span>
                                <span className="text-sm text-gray-900 font-semibold">30%</span>
                            </div>
                            <Slider
                                value={30}                             
                                aria-label="Fraud percentage"
                                sx={{
                                color: "#22c55e", // Tailwind green-500
                                height: 6,
                                "& .MuiSlider-thumb": {
                                    width: 14,
                                    height: 14,
                                },
                                }}
                            />
                        </div>

                        <div className="flex-1 min-w-[200px] max-w-[600px] bg-[#f2f2f2] p-4 h-100 rounded-lg shadow-md flex flex-col">
                            <p className="text-s text-gray-900 font-semibold mb-5">Jobs Activity</p>
                            <PieChart
                                series={[
                                    {data: [
                                        {id: 0, value: 10, label: 'Fraud on job'},
                                        {id: 1, value: 25, label: 'user misconduct'},
                                        {id: 2, value: 96, label: 'payment dispute'},
                                    ]}
                                ]}
                                width={250}
                                height={250}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard