import { PDFDocument } from 'pdf-lib';
import writtenNumber from 'written-number';

// Configurar written-number para español
writtenNumber.defaults.lang = 'es';

// Función para capitalizar la primera letra de una cadena
function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function addPageNumbers(inputBytes: Uint8Array, startNumber: number): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(inputBytes);

    const pages = pdfDoc.getPages();
    const startNum = parseInt(startNumber.toString(), 10);

    if (isNaN(startNum)) {
        throw new Error('El número de inicio no es válido');
    }

    pages.forEach((page, index) => {
        const pageNumber = startNum + index;
        const pageNumberInWords = capitalizeFirstLetter(writtenNumber(pageNumber));
        const formattedNumber = `${pageNumber}-(${pageNumberInWords}).`;

        const { width } = page.getSize();
        const textWidth = formattedNumber.length * 5; // Ajusta el multiplicador según el tamaño del texto
        const xPosition = (width - textWidth) / 2;

        page.drawText(formattedNumber, {
            x: xPosition,
            y: 10,
            size: 12
        });
    });

    return await pdfDoc.save();
}
