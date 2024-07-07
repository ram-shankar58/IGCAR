// // // src/pages/Analytics.js
// // import React, { useEffect, useState } from 'react';
// // import { jsPDF } from 'jspdf';
// // import { Worker, Viewer } from '@react-pdf-viewer/core';
// // import '@react-pdf-viewer/core/lib/styles/index.css';
// // import axios from 'axios';
// // import Layout from '../../layouts/Layout';
// // import './analytics.css';

// // const Analytics = () => {
// //     const [data, setData] = useState(null);
// //     const [pdfUrl, setPdfUrl] = useState(null);

// //     useEffect(() => {
// //         // Fetch data from the backend
// //         const fetchData = async () => {
// //             const response = await axios.get('http://localhost:3001/details');
// //             setData(response.data);
// //         };

// //         fetchData();
// //     }, []);

// //     const generatePdf = () => {
// //         const doc = new jsPDF();

// //         doc.text('Backend Details', 10, 10);
// //         if (data) {
// //             data.forEach((item, index) => {
// //                 doc.text(`${item.info}`, 10, 20 + index * 10);
// //             });
// //         }

// //         const pdfBlob = doc.output('blob');
// //         setPdfUrl(URL.createObjectURL(pdfBlob));
// //     };

// //     useEffect(() => {
// //         if (data) {
// //             generatePdf();
// //         }
// //     }, [data]);

// //     return (
// //         <Layout>
// //             <div>
// //                 <br />
// //                 <h1>Analytics Page</h1>
// //                 {pdfUrl && (
// //                     <Worker workerUrl="/pdf.worker.min.js">
// //                         <div style={{ height: '750px', userSelect: 'none', pointerEvents: 'none' }}>
// //                             <Viewer fileUrl={pdfUrl} />
// //                         </div>
// //                     </Worker>
// //                 )}
// //             </div>
// //         </Layout>
// //     );
// // };

// // export default Analytics;
// // src/pages/Analytics.js
// import React, { useEffect, useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import Layout from '../../layouts/Layout';

// const Analytics = () => {
//     const [pdfUrl, setPdfUrl] = useState(null);

//     useEffect(() => {
//         // Replace 'YOUR_BASE64_STRING' with your own base64 string
//         const base64Data='base64stringiskepthere';
//         setPdfUrl(`data:application/pdf;base64,${base64Data}`);
//     }, []);

//     return (
//         <Layout>
//             <div>
//                 <br />
//                 <h1>Analytics Page</h1>
//                 {pdfUrl && (
//                     <Worker workerUrl="/pdf.worker.min.js">
//                         <div style={{ height: '750px', userSelect: 'none', pointerEvents: 'none' }}>
//                             <Viewer fileUrl={pdfUrl} />
//                         </div>
//                     </Worker>
//                 )}
//             </div>
//         </Layout>
//     );
// };

// export default Analytics;

// import React, { useEffect, useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import Layout from '../../layouts/Layout';
// import axios from 'axios';
// import { jsPDF } from 'jspdf';

// const Analytics = ({ useBase64 = false, base64Data = '', pdfUrl = '' }) => {
//     const [pdfSource, setPdfSource] = useState(null);
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         if (useBase64) {
//             setPdfSource(`data:application/pdf;base64,${base64Data}`);
//         } else {
//             fetchData(pdfUrl);
//         }
//     }, [useBase64, base64Data, pdfUrl]);

//     const fetchData = async (url) => {
//         try {
//             const response = await axios.get(url);
//             setData(response.data);
//         } catch (error) {
//             console.error('Error  data:', error);
//         }
//     };

//     const generatePdf = (data) => {
//         const doc = new jsPDF();

//         doc.text('Backend Details', 10, 10);
//         if (data) {
//             data.forEach((item, index) => {
//                 doc.text(`${item.info}`, 10, 20 + index * 10);
//             });
//         }

//         const pdfBlob = doc.output('blob');
//         setPdfSource(URL.createObjectURL(pdfBlob));
//     };

//     useEffect(() => {
//         if (data) {
//             generatePdf(data);
//         }
//     }, [data]);

//     return (
//         <Layout>
//             <div>
//                 <br />
//                 <h1>Analytics Page</h1>
//                 {pdfSource && (
//                     <Worker workerUrl="/pdf.worker.min.js">
//                         <div style={{ height: '750px', userSelect: 'none', pointerEvents: 'none' }}>
//                             <Viewer fileUrl={pdfSource} />
//                         </div>
//                     </Worker>
//                 )}
//             </div>
//         </Layout>
//     );
// };

// export default Analytics;

import React from 'react';
import Layout from '../../layouts/Layout';
import PDFViewerComponent from '../../components/PDFViewerComponent';

const Analytics = () => {
    return (
        <Layout>
            <div>
                <br />
                <h1>Analytics Page</h1>
                <PDFViewerComponent pdfUrl="http://localhost:3001/details" />
            </div>
        </Layout>
    );
};

export default Analytics;
