"use client";

import { useState, useEffect } from "react";
import ProjectPieChart from "@/components/PieChart";
import ProjectBarChart from "@/components/ProjectChart";
import { getAllUploadData } from "@/services/uploadApis";
import { Project } from "@/types/project";

export default function Dashboard() {
  const [data, setData] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uploadData = await getAllUploadData();
        if (!uploadData) {
          console.error("No upload data received.");
          return;
        }
        setData(uploadData.data);
        
        if (uploadData.data.length > 0) {
          setSelectedProject(uploadData.data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900 font-gabarito mb-6">
        Project Dashboard
      </h1>

      {/* Project Selection Dropdown */}
      <div className="mb-6 w-full lg:w-1/2">
        <label htmlFor="project-select" className="block text-lg font-medium text-gray-700 font-gabarito">
          Select a Project:
        </label>
        <select
          id="project-select"
          className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-gabarito"
          value={selectedProject?._id || ""}
          onChange={(e) => {
            const selected = data.find((proj) => proj._id === e.target.value);
            setSelectedProject(selected || null);
          }}
        >
          {data.map((project) => (
            <option key={project._id} value={project._id}>
              {project.project_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-6">
        {/* Pie Chart */}
        <div className="w-full">{selectedProject && <ProjectPieChart project={selectedProject} />}</div>

        {/* Bar Chart */}
        <div className="w-full">
          <ProjectBarChart data={data} />
        </div>
      </div>
    </main>
  );
}
