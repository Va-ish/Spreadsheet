import React, { useRef, useEffect } from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { Box, Typography, Paper } from "@mui/material";
import HyperFormula from "hyperformula";

const Spreadsheet = () => {
  const hotRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      hotRef.current = new Handsontable(containerRef.current, {
        data: [
          ["Application ID", "Applicant Name", "Age", "Country", "Account Type", "Loan Amount Requested", "Approval Status", "Credit Score", "Annual Income", "Application Date", "Test Formula"],
          [1001, "John Doe", 29, "USA", "Savings", "$10,000", "Approved", 750, "$60,000", "2024-02-15", "=H3*0.1"],
          [1002, "Alice Johnson", 35, "UK", "Checking", "$15,000", "Pending", 680, "$75,000", "2024-02-18"],
          [1003, "Michael Smith", 40, "Canada", "Business", "$50,000", "Rejected", 620, "$120,000", "2024-01-25"],
          [1004, "Samantha Lee", 27, "India", "Savings", "$5,000", "Approved", 810, "$45,000", "2024-02-10"],
          [1005, "David Kim", 31, "Germany", "Checking", "$8,000", "Approved", 700, "$55,000", "2024-02-20"],
          [1006, "Emily Brown", 45, "Australia", "Business", "$100,000", "Pending", 650, "$200,000", "2024-01-30"],
          [1007, "Raj Patel", 33, "India", "Savings", "$12,000", "Rejected", 600, "$40,000", "2024-02-05"],
          [1008, "Sophia Garcia", 28, "Mexico", "Checking", "$9,500", "Approved", 730, "$50,000", "2024-02-12"],
          [1009, "Liam O'Connor", 39, "Ireland", "Business", "$75,000", "Approved", 770, "$150,000", "2024-01-22"],
          [1010, "Isabella Rossi", 36, "Italy", "Savings", "$6,000", "Pending", 690, "$48,000", "2024-02-08"],
        ],
        colHeaders: true,
        rowHeaders: true,
        filters: true,
        dropdownMenu: true,
        manualColumnResize: true,
        className: "htCustom",
        width: "100%",
        height: 400,
        stretchH: "all",
        licenseKey: "non-commercial-and-evaluation",
        formulas: {
          engine: HyperFormula,
        },

        contextMenu: {
          callback: (key, options) => {
            console.log("Selected option:", key);
          },
          items: {
            viewDocument: {
              name: "View Document",
              callback: () => alert("Viewing document..."),
            },
            checkStatus: {
              name: "Check Status",
              callback: () => alert("Checking status..."),
            },
            formula: {
              name: "Formula",
              callback: () => alert("Opening formula..."),
            },
          },
        },

        

        cells: (row, col) => {
          const cellProperties = {};
          const descriptions = {
            0: "Unique ID assigned to each application.",
            1: "Full name of the applicant.",
            2: "Age of the applicant.",
            3: "Country of residence.",
            4: "Type of bank account (Savings, Checking, Business).",
            5: "Amount requested for the loan.",
            6: "Current status of the application.",
            7: "Credit score of the applicant.",
            8: "Annual income of the applicant.",
            9: "Date when the application was submitted.",
            9: "fvvbgb",
          };

          if (row === 0) {
            cellProperties.renderer = (instance, td, row, col, prop, value) => {
              td.innerHTML = value;
              td.title = descriptions[col] || "No description available"; 
            };
          }


          return cellProperties;
        },
      });
    }

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box sx={{ p: 2, bgcolor: "#77B254", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" color="textPrimary" gutterBottom>
        Nano Banc Spreadsheet
      </Typography>
      <Paper elevation={3} sx={{ p: 1, overflow: "hidden" }}>
        <Box
          ref={containerRef}
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            height: 400,
            width: "100%",
            minWidth: 600,
          }}
        />
      </Paper>
    </Box>
  );
};

export default Spreadsheet;

//custom formula
//populate data : cell+ col + row + both
//custom theme
//
