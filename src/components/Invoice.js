import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const generateInvoice = (formData) => {
  if (!formData) {
    console.log("Form data is undefined");
    return;
  }

  console.log("Generating invoice with data:", formData);
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text("Tax Invoice/Bill of Supply/Cash Memo", 14, 20);
  doc.setFontSize(10);

  // Seller Details
  doc.text(`Sold By:`, 14, 30);
  doc.text(`${formData.sellerDetails.name}`, 14, 34);
  doc.text(`${formData.sellerDetails.address}`, 14, 38);
  doc.text(
    `${formData.sellerDetails.city}, ${formData.sellerDetails.state}, ${formData.sellerDetails.pincode}`,
    14,
    42
  );
  doc.text(`PAN No: ${formData.sellerDetails.pan}`, 14, 46);
  doc.text(`GST Registration No: ${formData.sellerDetails.gst}`, 14, 50);

  // Billing Details
  doc.text(`Billing Address:`, 100, 30);
  doc.text(`${formData.billingDetails.name}`, 100, 34);
  doc.text(`${formData.billingDetails.address}`, 100, 38);
  doc.text(
    `${formData.billingDetails.city}, ${formData.billingDetails.state}, ${formData.billingDetails.pincode}`,
    100,
    42
  );
  doc.text(`State/UT Code: ${formData.billingDetails.stateCode}`, 100, 46);

  // Shipping Details
  doc.text(`Shipping Address:`, 100, 54);
  doc.text(`${formData.shippingDetails.name}`, 100, 58);
  doc.text(`${formData.shippingDetails.address}`, 100, 62);
  doc.text(
    `${formData.shippingDetails.city}, ${formData.shippingDetails.state}, ${formData.shippingDetails.pincode}`,
    100,
    66
  );
  doc.text(`State/UT Code: ${formData.shippingDetails.stateCode}`, 100, 70);

  // Order Details
  doc.text(`Order No: ${formData.orderDetails.orderNo}`, 14, 78);
  doc.text(`Order Date: ${formData.orderDetails.orderDate}`, 100, 78);

  // Invoice Details
  doc.text(`Invoice No: ${formData.invoiceDetails.invoiceNo}`, 14, 84);
  doc.text(`Invoice Date: ${formData.invoiceDetails.invoiceDate}`, 100, 84);

  // Place of Supply and Delivery
  doc.text(`Place of Supply: ${formData.placeOfSupply}`, 14, 90);
  doc.text(`Place of Delivery: ${formData.placeOfDelivery}`, 100, 90);

  // Reverse Charge
  doc.text(`Reverse Charge: ${formData.reverseCharge}`, 14, 96);

  // Calculate netAmount and totalAmount
  const items = formData.items.map((item, index) => {
    const netAmount = item.unitPrice * item.quantity - item.discount;
    const taxAmount = (netAmount * item.taxRate) / 100;
    const totalAmount = netAmount + taxAmount;
    return {
      ...item,
      netAmount,
      taxAmount,
      totalAmount,
      serialNo: index + 1,
    };
  });

  // Table for Items
  doc.autoTable({
    head: [
      [
        "Serial No",
        "Description",
        "Unit Price",
        "Quantity",
        "Discount",
        "Tax Rate",
        "Net Amount",
        "Tax Type",
        "Tax Amount",
        "Total Amount",
      ],
    ],
    body: items.map((item) => [
      item.serialNo,
      item.description,
      item.unitPrice,
      item.quantity,
      item.discount,
      item.taxRate,
      item.netAmount,
      item.taxType,
      item.taxAmount,
      item.totalAmount,
    ]),
    startY: 102,
  });

  // Calculate total amount for all items
  const totalAmount = items.reduce((sum, item) => sum + item.totalAmount, 0);

  // Total Amount
  doc.text(
    `Total Amount: ${totalAmount.toFixed(2)}`,
    150,
    doc.autoTable.previous.finalY + 10
  );

  // Signature
  if (formData.signature) {
    doc.addImage(
      formData.signature,
      "PNG",
      160,
      doc.autoTable.previous.finalY + 14,
      40,
      20
    );
  }
  doc.text("Signature", 140, doc.autoTable.previous.finalY + 40);
  doc.save("invoice.pdf");
};

const Invoice = ({ formData }) => {
  React.useEffect(() => {
    if (formData) {
      generateInvoice(formData);
    }
  }, [formData]);

  return null;
};

export default Invoice;
