import React from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Reports = () => {
  return (
    <Layout>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" gutterBottom>
          View Reports
        </Typography>
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Report Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Date Generated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Monthly Sales Report</TableCell>
                    <TableCell align="right">Completed</TableCell>
                    <TableCell align="right">July 1, 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Customer Feedback Analysis</TableCell>
                    <TableCell align="right">In Progress</TableCell>
                    <TableCell align="right">July 15, 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Website Traffic Overview</TableCell>
                    <TableCell align="right">Scheduled</TableCell>
                    <TableCell align="right">July 30, 2024</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Layout>
  );
};

export default Reports;
