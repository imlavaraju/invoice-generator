import React, { useState } from "react";
import "../App.css";

const InvoiceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      pan: "",
      gst: "",
    },
    placeOfSupply: "",
    billingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      stateCode: "",
    },
    placeOfDelivery: "",
    orderDetails: {
      orderNo: "",
      orderDate: "",
    },
    invoiceDetails: {
      invoiceNo: "",
      invoiceDate: "",
    },
    reverseCharge: "No",
    items: [
      {
        description: "",
        unitPrice: 0,
        quantity: 0,
        discount: 0,
        taxRate: 18,
        taxType: "",
      },
    ],
    signature: null,
  });

  const handleChange = (e, section, key) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [key]: value,
      },
    });
  };

  const handleItemChange = (index, key, value) => {
    const items = [...formData.items];
    items[index][key] = value;
    setFormData({ ...formData, items });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          description: "",
          unitPrice: 0,
          quantity: 0,
          discount: 0,
          taxRate: 18,
          taxType: "",
        },
      ],
    });
  };

  const handleSignatureChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, signature: reader.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h1 className="text-center">INVOICE FORM</h1>
      <h2>Seller Details</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => handleChange(e, "sellerDetails", "name")}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => handleChange(e, "sellerDetails", "address")}
        />
        <input
          type="text"
          placeholder="City"
          onChange={(e) => handleChange(e, "sellerDetails", "city")}
        />
        <input
          type="text"
          placeholder="State"
          onChange={(e) => handleChange(e, "sellerDetails", "state")}
        />
        <input
          type="text"
          placeholder="Pincode"
          onChange={(e) => handleChange(e, "sellerDetails", "pincode")}
        />
        <input
          type="text"
          placeholder="PAN"
          onChange={(e) => handleChange(e, "sellerDetails", "pan")}
        />
        <input
          type="text"
          placeholder="GST"
          onChange={(e) => handleChange(e, "sellerDetails", "gst")}
        />
      </div>

      <h2>Place of Supply</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Place of Supply"
          onChange={(e) => handleChange(e, null, "placeOfSupply")}
        />
      </div>

      <h2>Billing Details</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => handleChange(e, "billingDetails", "name")}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => handleChange(e, "billingDetails", "address")}
        />
        <input
          type="text"
          placeholder="City"
          onChange={(e) => handleChange(e, "billingDetails", "city")}
        />
        <input
          type="text"
          placeholder="State"
          onChange={(e) => handleChange(e, "billingDetails", "state")}
        />
        <input
          type="text"
          placeholder="Pincode"
          onChange={(e) => handleChange(e, "billingDetails", "pincode")}
        />
        <input
          type="text"
          placeholder="State Code"
          onChange={(e) => handleChange(e, "billingDetails", "stateCode")}
        />
      </div>

      <h2>Shipping Details</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => handleChange(e, "shippingDetails", "name")}
        />
        <input
          type="text"
          placeholder="Address"
          onChange={(e) => handleChange(e, "shippingDetails", "address")}
        />
        <input
          type="text"
          placeholder="City"
          onChange={(e) => handleChange(e, "shippingDetails", "city")}
        />
        <input
          type="text"
          placeholder="State"
          onChange={(e) => handleChange(e, "shippingDetails", "state")}
        />
        <input
          type="text"
          placeholder="Pincode"
          onChange={(e) => handleChange(e, "shippingDetails", "pincode")}
        />
        <input
          type="text"
          placeholder="State Code"
          onChange={(e) => handleChange(e, "shippingDetails", "stateCode")}
        />
      </div>

      <h2>Order Details</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Order No"
          onChange={(e) => handleChange(e, "orderDetails", "orderNo")}
        />
        <input
          type="text"
          placeholder="Order Date"
          onChange={(e) => handleChange(e, "orderDetails", "orderDate")}
        />
      </div>

      <h2>Invoice Details</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Invoice No"
          onChange={(e) => handleChange(e, "invoiceDetails", "invoiceNo")}
        />
        <input
          type="text"
          placeholder="Invoice Date"
          onChange={(e) => handleChange(e, "invoiceDetails", "invoiceDate")}
        />
      </div>

      <h2>Reverse Charge</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Reverse Charge"
          onChange={(e) => handleChange(e, null, "reverseCharge")}
        />
      </div>

      <h2>Items</h2>
      {formData.items.map((item, index) => (
        <div key={index} className="form-section">
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Unit Price"
            onChange={(e) =>
              handleItemChange(index, "unitPrice", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Discount"
            onChange={(e) =>
              handleItemChange(index, "discount", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Tax Rate"
            onChange={(e) => handleItemChange(index, "taxRate", e.target.value)}
          />
          <input
            type="text"
            placeholder="Tax Type"
            onChange={(e) => handleItemChange(index, "taxType", e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddItem} className="add-item-button">
        Add Item
      </button>

      <h2>Signature</h2>
      <div className="form-section">
        <input type="file" onChange={handleSignatureChange} />
      </div>

      <button type="submit" className="submit-button">
        Generate Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
