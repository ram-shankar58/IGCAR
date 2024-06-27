import React from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../../layouts/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Reports = () => {
  return (
    <Layout>
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
                    <TableCell>Research publication</TableCell>
                    <TableCell align="right">Completed</TableCell>
                    <TableCell align="right">July 1, 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Radiation Report</TableCell>
                    <TableCell align="right">In Progress</TableCell>
                    <TableCell align="right">July 15, 2024</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Website Maintainance Overview</TableCell>
                    <TableCell align="right">Scheduled</TableCell>
                    <TableCell align="right">July 30, 2024</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Reports;
