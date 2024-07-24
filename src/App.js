import React, { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import Invoice from "./components/Invoice";

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    console.log("Form submitted with data:", data);
    setFormData(data);
  };

  return (
    <div>
      <InvoiceForm onSubmit={handleFormSubmit} />
      {formData && <Invoice formData={formData} />}
    </div>
  );
};

export default App;
