"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Project } from "@/types/project";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProjectPieChart({ project }: { project: any }) {
  const totalRevenue = project?.total_revenue  || project[0]?.actual_billing_cost;
  const totalCost = project?.total_cost_to_account;
  const margin = +project?.gross_Margin?.toFixed(2) ||totalRevenue - totalCost;
  const grossMarginPercentage : number = +project?.gross_Margin_Percent?.toFixed(2) || totalRevenue > 0 ? +(((margin / totalRevenue) * 100).toFixed(2)) : 0.00;
  console.log("test data", totalRevenue,totalCost, margin);
  // revenue , total cost to account, gross margin
  const data = {
    labels: ["Cost to Company", "Actual Billing Cost", "Gross Margin"],
    datasets: [
      {
        //data: [48.11,63.58,30],
        //data: [totalCost, totalRevenue, margin],
        data:[totalCost,totalRevenue, margin],
        backgroundColor: ["#FFADAD", "#BDB2FF", margin >= 0 ? "#A3B18A" : "#28B463"], // Dark Gray, Muted Blue, Emerald Green / Red
        hoverOffset: 4,
      },
    ],
  };
  const costPercentage = 100 - grossMarginPercentage;
  const grossMarginPercentageData = {
    labels: ["Gross Margin Pecentage", "Cost Percentage"],
    datasets: [
      {
        //data: [48.11,63.58,30],
        //data: [totalCost, totalRevenue, margin],
        data:[grossMarginPercentage, costPercentage],
        backgroundColor: ["#FFC6FF",  margin >= 0 ? "#FFBE0B" : "#28B463"], // Dark Gray, Muted Blue, Emerald Green / Red
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-xl flex flex-col lg:flex-row lg:items-center gap-6">
      {/* Table on Left */}
   

      {/* Pie Chart*/}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-80 h-80">
          <Pie data={data} />
        </div>
        <div>
          <Pie data={grossMarginPercentageData}/>
        </div>
      </div>
    </div>
  );
}
