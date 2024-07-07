// // src/components/PdfViewer.js
// import React from 'react';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/zoom/lib/styles/index.css';
// import '@react-pdf-viewer/full-screen/lib/styles/index.css';
// import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
// import '@react-pdf-viewer/toolbar/lib/styles/index.css';
// import {
//     Worker,
//     Viewer,
// } from '@react-pdf-viewer/core';
// import { zoomPlugin } from '@react-pdf-viewer/zoom';
// import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';
// import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
// import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
// import { pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// const PdfViewer = ({ pdfUrl }) => {
//     const zoomPluginInstance = zoomPlugin();
//     const fullScreenPluginInstance = fullScreenPlugin();
//     const pageNavigationPluginInstance = pageNavigationPlugin();
//     const toolbarPluginInstance = toolbarPlugin();

//     const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
//     const { EnterFullScreenButton } = fullScreenPluginInstance;
//     const { CurrentPageLabel, GoToNextPage, GoToPreviousPage } = pageNavigationPluginInstance;
//     const { Toolbar } = toolbarPluginInstance;

//     return (
//         <div>
//             <Worker workerUrl={`${process.env.PUBLIC_URL}/pdf.worker.min.js`}>
//                 <Toolbar>
//                     {(props) => (
//                         <div
//                             style={{
//                                 alignItems: 'center',
//                                 display: 'flex',
//                             }}
//                         >
//                             <div style={{ padding: '0px 2px' }}>
//                                 <ZoomOutButton />
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <ZoomPopover />
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <ZoomInButton />
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <GoToPreviousPage />
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <CurrentPageLabel /> / {props.pageCount}
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <GoToNextPage />
//                             </div>
//                             <div style={{ padding: '0px 2px' }}>
//                                 <EnterFullScreenButton />
//                             </div>
//                         </div>
//                     )}
//                 </Toolbar>
//                 <Viewer
//                     fileUrl={pdfUrl}
//                     plugins={[
//                         zoomPluginInstance,
//                         fullScreenPluginInstance,
//                         pageNavigationPluginInstance,
//                         toolbarPluginInstance,
//                     ]}
//                 />
//             </Worker>
//         </div>
//     );
// };

// export default PdfViewer;

import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import axios from 'axios';
import { jsPDF } from 'jspdf';

const PDFViewerComponent = ({ useBase64 = false, base64Data = '', pdfUrl = '' }) => {
    const [pdfSource, setPdfSource] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (useBase64) {
            setPdfSource(`data:application/pdf;base64,${base64Data}`);
        } else {
            fetchData(pdfUrl);
        }
    }, [useBase64, base64Data, pdfUrl]);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const generatePdf = (data) => {
        const doc = new jsPDF();

        doc.text('Backend Details', 10, 10);
        if (data) {
            data.forEach((item, index) => {
                doc.text(`${item.info}`, 10, 20 + index * 10);
            });
        }

        const pdfBlob = doc.output('blob');
        setPdfSource(URL.createObjectURL(pdfBlob));
    };

    useEffect(() => {
        if (data) {
            generatePdf(data);
        }
    }, [data]);

    return (
        <div>
            {pdfSource && (
                <Worker workerUrl="/pdf.worker.min.js">
                    <div style={{ height: '750px', userSelect: 'none', pointerEvents: 'none' }}>
                        <Viewer fileUrl={pdfSource} />
                    </div>
                </Worker>
            )}
        </div>
    );
};

export default PDFViewerComponent;
