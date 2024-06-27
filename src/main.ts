import {addPageNumbers} from './utils/pdf.util';

document.getElementById('submitButton')!.addEventListener('click', async () => {
    const fileInput = document.getElementById('pdfInput') as HTMLInputElement;
    const startNumberInput = document.getElementById('startNumber') as HTMLInputElement;
    const downloadLink = document.getElementById('downloadLink') as HTMLAnchorElement;

    if (fileInput.files && fileInput.files[0]) {
        const pdfFile = fileInput.files[0];
        const startNumber = parseInt(startNumberInput.value, 10);

        const reader = new FileReader();
        reader.onload = async (event) => {
            const inputBytes = new Uint8Array(event.target!.result as ArrayBuffer);
            const pdfBytes = await addPageNumbers(inputBytes, startNumber);

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'output.pdf';
            downloadLink.style.display = 'block';
            downloadLink.textContent = 'Descargar PDF con Numeración';
        };
        reader.readAsArrayBuffer(pdfFile);
    }
});
document.getElementById('resetButton')!.addEventListener('click', () => {
    const fileInput = document.getElementById('pdfInput') as HTMLInputElement;
    const startNumberInput = document.getElementById('startNumber') as HTMLInputElement;
    const downloadLink = document.getElementById('downloadLink') as HTMLAnchorElement;

    fileInput.value = '';
    startNumberInput.value = '1';
    downloadLink.style.display = 'none';
});
