import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface DataGridComponentProps {
  columns: GridColDef[];
  rows: any[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  columns,
  rows,
}) => {

  return (
    <div
      style={{
        height: "500px", 
        width: "100%",
        overflowY: "auto", 
        overflowX: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "auto", // Enables internal scrolling
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #d1d5db",
          },
          "& .soft-green": {
            backgroundColor: "#e6f7e6",
          },
        }}
        rowHeight={40}
        disableColumnMenu
        pageSizeOptions={[100]} 
        hideFooter
        scrollbarSize={30}
      />
    </div>
  );
};

export default DataGridComponent;
