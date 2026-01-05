import Sidebar from "@/components/sidebar";
import { Users, TrendingUp, BarChart3, Map } from "lucide-react";
import { Card, CardContent, Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";

const Analytics = () => {
    return(
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <main className="ml-64 p-8">
                {/* header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
                            <p className="text-sm text-gray-500">Insights for product owners & leadership</p>
                        </div>
                    </div>
                </div>

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
                            <p className="text-s text-gray-500">User Growth</p>
                            <p className="text-2xl font-semibold text-gray-900">+12.4%</p>
                        </div>
                        <TrendingUp className="text-green-500 w-8 h-8 ml-4"/>
                    </div>

                    <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                        <div>
                            <p className="text-s text-gray-500">Completion Rate</p>
                            <p className="text-2xl font-semibold text-gray-900">78%</p>
                        </div>
                        <BarChart3 className="text-green-500 w-8 h-8 ml-4"/>
                    </div>

                    <div className="flex-1 min-w-[200px] max-w-[300px] flex bg-[#f2f2f2] p-3 rounded-lg flex-row items-center justify-between border border-green-500 shadow-md transition-all duration-200 ease-in-out hover:shadow-xl hover:scale-101">
                        <div>
                            <p className="text-s text-gray-500">BarChart3</p>
                            <p className="text-2xl font-semibold text-gray-900">23</p>
                        </div>
                        <Map className="text-green-500 w-8 h-8 ml-4"/>
                    </div>
                </div>

                {/* charts / graphs */}
                <div className="flex flex-wrap gap-6 mt-15">
                    <div className="flex-1 min-w-[200px] max-w-[600px] bg-[#f2f2f2] p-4 h-100 rounded-lg shadow-md flex flex-col">
                            <p className="text-s text-gray-900 font-semibold mb-5">Recent Reports</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 font-medium">Fraud</span>
                                <span className="text-sm text-gray-900 font-semibold">30%</span>
                            </div>
                            
                        </div>
                </div>

            </main>
        </div>
    )
}

export default Analytics;