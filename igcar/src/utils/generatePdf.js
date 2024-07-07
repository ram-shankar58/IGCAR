// src/utils/generatePdf.js
import { PDFDocument, rgb } from 'pdf-lib';

export const generatePdf = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();

    page.drawText('User Data:', {
        x: 50,
        y: height - 50,
        size: 20,
        color: rgb(0, 0, 0),
    });

    let yOffset = height - 80;

    data.users.forEach((user, index) => {
        page.drawText(`${index + 1}. ${user.name} (${user.email})`, {
            x: 50,
            y: yOffset,
            size: 14,
            color: rgb(0, 0, 0),
        });
        yOffset -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
};
