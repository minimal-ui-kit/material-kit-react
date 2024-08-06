import React from 'react';
import { Button } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExcelDownload = ({ title, formattedData }) => {
   const handleDownloadExcel = () => {
       const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FilialDetails');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, title+'.xlsx');
  };
  if (formattedData.length === 0) {
    return null;
   }
  return (
    <Button
      variant="contained"
      startIcon={<InsertDriveFileIcon />}
      sx={{ mr: 1, backgroundColor: '#388e3c', fontSize: { xs: '8px', sm: '14px' } }}
      onClick={handleDownloadExcel}
    >
      Excel faylini yuklash
    </Button>
  );
};

export default ExcelDownload;
