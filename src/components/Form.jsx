import React from 'react';
import { useState } from "react";
function Form() {
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        user_phno: "",
        residencecity: "",
        employmentType: "Salaried", 
        aadhaarCard: null,
        panCard: null,
        payslip: [],
        bankTransactions: [],
        cibilScore_option: "", 
        loanamount: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
          ...formData,
          [name]: files[0],
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
       /*  // Validation for CIBIL score input or file
        if (!formData.cibilScore_option && !formData.cibilScore_file) {
          alert("Please provide either a CIBIL score or upload a CIBIL PDF.");
          return;
        } */
       
       // Validation for CIBIL score input
        if (!formData.cibilScore_option) {
          alert("Please provide your CIBIL score.");
          return;
        }
    
        const form = new FormData();
        for (const key in formData) {
          if (formData[key]) {
            form.append(key, formData[key]);
          }
        }
    
        try {
          const response = await fetch("https://myproject-wxb1.onrender.com/api/users/create/", {
            method: "POST",
            body: form,
          });
    
          if (response.ok) {
            const data = await response.json();
            alert("Your data has been submitted successfully!");
            console.log(data);
            setFormData({
              user_name: "",
              user_email: "",
              user_phno: "",
              residencecity: "",
              employmentType: "Salaried",
              aadhaarCard: null,
              panCard: null,
              payslip: null,
              bankTransactions: null,
              cibilScore_option: "",
              loanamount: "",
            }); // Reset form
          } else {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            alert("Failed to submit user data. Check the console for details.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while submitting the form.");
        }
      };
    
  return (
    <div className="App">
      <h2>Enter Your Details For Loan Data Processing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="user_phno"
            value={formData.user_phno}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Residence City:</label>
          <input
            type="text"
            name="residencecity"
            value={formData.residencecity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Employment Type:</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            required
          >
            <option value="Salaried">Salaried</option>
            <option value="Self-Employed">Self-Employed</option>
          </select>
        </div>

        <div>
          <label>Aadhaar Card (PDF):</label>
          <input
            type="file"
            name="aadhaarCard"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>PAN Card (PDF):</label>
          <input
            type="file"
            name="panCard"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>Payslip (PDF):</label>
          <input
            type="file"
            name="payslip"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label>Bank Transactions (PDF):</label>
          <input
            type="file"
            name="bankTransactions"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>

        <div>
          <label>CIBIL Score:</label>
          <input
            type="number"
            name="cibilScore_option"
            placeholder="Enter your CIBIL score"
            value={formData.cibilScore_option}
            onChange={handleChange}
          />
          {/* <span> or </span>
          <input
            type="file"
            name="cibilScore_file"
            accept="application/pdf"
            onChange={handleFileChange}
          /> */}
        </div>

        <div>
          <label>Loan Amount:</label>
          <input
            type="number"
            name="loanamount"
            value={formData.loanamount}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;