// src/pages/Notifications.js
import React from 'react';
import Layout from '../../layouts/Layout';
import DataTable from '../../components/DataTable';

const columns = [
  { field: 'serialNo', headerName: 'Serial No.', width: 100, type: 'sno' },
  { field: 'rollNo', headerName: 'Roll No.', width: 130, type: 'number' },
  { field: 'studentName', headerName: 'Student Name', width: 200, type: 'string' },
  { field: 'division', headerName: 'Division', width: 150, type: 'string', filterOptions: ['A', 'B', 'C'] },
  { field: 'maths', headerName: 'Maths Marks', width: 150, type: 'number' },
  { field: 'science', headerName: 'Science Marks', width: 150, type: 'number' },
  { field: 'english', headerName: 'English Marks', width: 150, type: 'number' },
];

const rows = [
  { id: 1, rollNo: '1001', studentName: 'Ram', division: 'A', maths: 85, science: 90, english: 78 },
  { id: 2, rollNo: '1002', studentName: 'Shyam', division: 'B', maths: 92, science: 87, english: 82 },
  { id: 3, rollNo: '1003', studentName: 'Varun', division: 'A', maths: 75, science: 80, english: 88 },
  { id: 4, rollNo: '1004', studentName: 'Sundar', division: 'C', maths: 88, science: 85, english: 79 },
  { id: 5, rollNo: '1005', studentName: 'Krishna', division: 'B', maths: 90, science: 91, english: 85 },
];

const Notifications = () => {
  return (
    <Layout>
      <div>
        <h1>Notifications Table for marks</h1>
        <br />
        <DataTable columns={columns} rows={rows} />
      </div>
    </Layout>
  );
};

export default Notifications;
