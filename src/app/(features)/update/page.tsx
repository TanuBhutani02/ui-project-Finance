/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { uploadFile } from "@/services/uploadApis";

export default function UpdatePage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  // Required column order
  const requiredColumns = [
    "projectName",
    "employeeName",
    "employeeId",
    "costToCompany",
    "actualBillingCost",
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (!uploadedFile) return;

    // Check file size (10MB limit)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError("❌ File size should not exceed 10MB.");
      alert(error);
      return;
    }

    // Check file type
    if (
      uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      uploadedFile.type === "application/vnd.ms-excel"
    ) {
      setFile(uploadedFile);
      setError("");
      readExcel(uploadedFile);
    } else {
      setError("❌ Please upload a valid Excel file (.xlsx, .xls).");
      alert(error);
    }
  };

  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const binaryString = e.target?.result;
      if (!binaryString) return;

      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (jsonData.length > 0) {
        const headers = jsonData[0].map((header: any) =>
          String(header || "").trim()
        );

        // Validate column structure
        if (JSON.stringify(headers) !== JSON.stringify(requiredColumns)) {
          const errorMessage = `❌ Invalid Excel format. \n\nEnsure the file contains these columns in order:\n${requiredColumns.join(
            ", "
          )}`;
          setError(errorMessage);
          setFile(null);
          setData([]);
          alert(errorMessage);
          return;
        }

        setError("");

        // Add IDs to each row and enforce default values
        const rows = jsonData.slice(1).map((row, index) => ({
          id: index + 1, // Auto-incrementing ID
          projectName: row[0] ? String(row[0]) : "",
          employeeName: row[1] ? String(row[1]) : "",
          employeeId: row[2] ? String(row[2]) : "",
          costToCompany: row[3] ? Number(row[3]) : 0,
          actualBillingCost: row[4] ? Number(row[4]) : 0,
        }));

        setData(rows);

        // Console log the JSON data with IDs
        console.log(
          "Excel Data in JSON format:",
          JSON.stringify(rows, null, 2)
        );
      }
    };
  };

  const handleRemoveFile = () => {
    setFile(null);
    setData([]);
    setError("");
  };

  const handleSave = async () => {
    if (error || data.length === 0) {
      alert("❌ Cannot save invalid data!");
      return;
    }
    try {
      const response = await uploadFile(data);
      if (response?.data) alert("✅ Data saved successfully!");
      else throw new Error("Error in saving");
    } catch {
      alert("❌ Failed to save data!");
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-900 font-gabarito mb-6">
        Upload and Preview Excel File
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        {!file ? (
          <label className="block cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-gabarito hover:bg-blue-700 transition">
            Upload Excel File
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        ) : (
          <div>
            <p className="mb-2 text-gray-700 font-gabarito">
              File: {file.name}
            </p>

            {/* Table Preview */}
            <div className="overflow-x-auto max-h-96 border rounded-lg mt-4">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-900 font-gabarito">
                  <tr>
                    <th className="px-6 py-3 border">ID</th>{" "}
                    {data.length > 0 &&
                      Object.keys(data[0]).map(
                        (key, index) =>
                          key !== "id" && (
                            <th key={index} className="px-6 py-3 border">
                              {key}
                            </th>
                          )
                      )}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-t font-gabarito hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 border">{row.id}</td>{" "}
                      {Object.entries(row).map(
                        ([key, value], colIndex) =>
                          key !== "id" && (
                            <td key={colIndex} className="px-6 py-4 border">
                              {key === "costToCompany" ||
                              key === "actualBillingCost"
                                ? typeof value === "number"
                                  ? value
                                  : 0
                                : typeof value === "string"
                                ? value
                                : "-"}{" "}
                            </td>
                          )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg font-gabarito hover:bg-red-600 transition"
                onClick={handleRemoveFile}
              >
                Remove File
              </button>
              <button
                className={`py-2 px-4 rounded-lg font-gabarito transition ${
                  error || data.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
                onClick={handleSave}
                disabled={!!error || data.length === 0}
              >
                Save Data
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
