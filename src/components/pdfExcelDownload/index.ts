import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = (nodeId: string) => {
    const doc = new jsPDF('l', 'pt', 'a4', true);

    // doc.html(document.getElementById(nodeId), {
    //     callback: function (pdf) {
    //         pdf.save('file.pdf');
    //     },
    // });
    const input: any = document.querySelector(`#${nodeId}`);

    html2canvas(input).then(canvas => {
        const pdf = new jsPDF('l', 'pt', 'a4', true);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, 800, 0);
        pdf.save("file.pdf");
    });
};