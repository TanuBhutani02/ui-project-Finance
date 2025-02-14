"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Project } from "@/types/project";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectPieChart({ project }: { project: Project }) {
  const totalRevenue = project.actual_billing_cost;
  const totalCost = project.cost_to_company;
  const margin = totalRevenue - totalCost;
  const grossMarginPercentage = totalRevenue > 0 ? ((margin / totalRevenue) * 100).toFixed(2) : "0.00";

  const data = {
    labels: ["Cost to Company", "Actual Billing Cost", "Gross Margin"],
    datasets: [
      {
        data: [totalCost, totalRevenue, margin],
        backgroundColor: ["#4b5563", "#60a5fa", margin >= 0 ? "#10b981" : "#ef4444"], // Dark Gray, Muted Blue, Emerald Green / Red
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-xl flex flex-col lg:flex-row lg:items-center gap-6">
      {/* Table on Left */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-gray-900 font-gabarito mb-4 text-center lg:text-left">
          {project.project_name} - Financial Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Cost to Company</td>
                <td className="px-6 py-3 text-gray-900">₹{totalCost.toLocaleString("en-IN")}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Actual Billing Cost</td>
                <td className="px-6 py-3 text-gray-900">₹{totalRevenue.toLocaleString("en-IN")}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Gross Margin</td>
                <td className={`px-6 py-3 font-semibold ${margin >= 0 ? "text-green-700" : "text-red-700"}`}>
                  ₹{margin.toLocaleString("en-IN")}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Gross Margin %</td>
                <td className={`px-6 py-3 font-semibold ${grossMarginPercentage >= "0.00" ? "text-green-700" : "text-red-700"}`}>
                  {grossMarginPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pie Chart*/}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-80 h-80">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
