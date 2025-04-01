import { EmployeeService } from "@/services/employeeService";
import { IconButton } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react"

const useEmployee =()=>{

    const employeeColumns: any[] = [
        { field: "empid", headerName: "Employee ID", width: 150 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "salary_history", headerName: "Salary History", width: 400 },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
        
            renderCell: (params: any) => (
              <IconButton onClick={() => handleEditClick(params.row.id)}>
                {params.row.isEditing ? "💾" : "✏️"}
              </IconButton>
            ),
          },
      ];
   const [employeeList, setEmployeeList] =  useState([]);

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const fetchEmployeeList = async () => {
           setLoading(true);
           try {
               const response = await EmployeeService.get();
               console.log("test employee response", response);
               const formattedRows = response.map((employee: any) => ({
                id: employee._id,  // Explicitly define ID
                empid: employee?.empid ||"",
                name: employee.name || "",
                salary_history: employee.salary_history.map(
                  (salary: any) => `₹${salary.ctc.toLocaleString()} (${moment(salary.effective_from).format("DD-MMM-YYYY")})`
                ).join(", ")
              }));
              console.log("test formatted Rows", formattedRows);
               setEmployeeList(formattedRows);
           } catch (err) {
               setError('Failed to fetch projects');
           } finally {
               setLoading(false);
           }
       };
   
    useEffect(() => {
           fetchEmployeeList();
       }, []);

       const handleEditClick = (id: string) => {
        setEmployeeList((prevRows: any) =>
          prevRows.map((row: any) =>
            row.id === id ? { ...row, isEditing: !row.isEditing } : row
          )
        );
      };

       return ({
        employeeList, 
        employeeColumns
       })
}

export default useEmployee;