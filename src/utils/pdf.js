import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = () => {
  const input = document.getElementById("invoice");

  html2canvas(input, { scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};
