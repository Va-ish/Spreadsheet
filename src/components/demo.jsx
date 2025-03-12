import React, { useRef, useEffect , useState} from "react";
import Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.min.css";
import { Box, Typography, Paper, Button } from "@mui/material";
import HyperFormula from "hyperformula";
import '../index.css'
const Spreadsheet = () => {
  const hotRef = useRef(null);
  const containerRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [theme, setTheme] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dynamicData = [
        ["Application ID", "Applicant Name", "Age", "Country", "Account Type", "Loan Amount Requested(in $)", "Approval Status", "Credit Score", "Annual Income(in $)", "Application Date", "Test Formula", "Avg"],
        [1001, "John Doe", 29, "US", "Savings", 10000, "Approved", 750, 60000, "2024-02-15", "=H3*0.1", "=AVERAGE(I2:I10)"],
        [1002, "Alice Johnson", 35, "UK", "Checking", 15000, "Pending", 680, 75000, "2024-02-18"],
        [1003, "Michael Smith", 40, "Canada", "Business", 50000, "Rejected", 620, 567, "2024-01-25"],
        [1004, "Samantha Lee", 27, "India", "Savings", 5000, "Approved", 810, 45000, "2024-02-10"],
        [1005, "David Kim", 31, "Germany", "Checking", 8000, "Approved", 700, 55000, "2024-02-20"],
        [1006, "Emily Brown", 45, "Australia", "Business", 100000, "Pending", 650, 200000, "2024-01-30"],
        [1007, "Raj Patel", 33, "India", "Savings", 12000, "Rejected", 600, 40000, "2024-02-05"],
        [1008, "Sophia Garcia", 28, "Mexico", "Checking", 9500, "Approved", 730, 50000, "2024-02-12"],
        [1009, "Liam O'Connor", 39, "Ireland", "Business", 75000, "Approved", 770, 150000, "2024-01-22"],
        [1010, "Isabella Rossi", 36, "Italy", "Savings", 6000, "Pending", 690, 48000, "2024-02-08"],
      ];

      setTableData(dynamicData);
    };

    fetchData();
  }, []);

  const getCustomBorders = (data) => {
    const statusColumnIndex = 6; 

    return data
      .map((row, rowIndex) => {
        if (row[statusColumnIndex] === "Rejected") {
          return {
            row: rowIndex,
            col: statusColumnIndex, 
            start: { width: 2, color: "red" }, 
            end: { width: 2, color: "red" }, 
            top: { width: 2, color: "red" },
            bottom: { width: 2, color: "red" },
          };
        } else if (row[statusColumnIndex] === "Pending") {
          return {
            row: rowIndex,
            col: statusColumnIndex, 
            start: { width: 2, color: "orange" }, 
            end: { width: 2, color: "orange" }, 
            top: { width: 2, color: "orange" }, 
            bottom: { width: 2, color: "orange" }, 
          };

        }
        return null;
      })
      .filter(Boolean); 
  };


  useEffect(() => {
    if (containerRef.current) {
      hotRef.current = new Handsontable(containerRef.current, {
        // data: [
        //   ["Application ID", "Applicant Name", "Age", "Country", "Account Type", "Loan Amount Requested(in $)", "Approval Status", "Credit Score", "Annual Income(in $)", "Application Date", "Test Formula", "Avg"],
        //   [1001, "John Doe", 29, "USA", "Savings", "$10,000", "Approved", 750, "60000", "2024-02-15", "=H3*0.1", "=AVERAGE(I2:I10)"],
        //   [1002, "Alice Johnson", 35, "UK", "Checking", "$15,000", "Pending", 680, "75000", "2024-02-18"],
        //   [1003, "Michael Smith", 40, "Canada", "Business", "$50,000", "Rejected", 620, "120000", "2024-01-25"],
        //   [1004, "Samantha Lee", 27, "India", "Savings", "$5,000", "Approved", 810, "45000", "2024-02-10"],
        //   [1005, "David Kim", 31, "Germany", "Checking", "$8,000", "Approved", 700, "55000", "2024-02-20"],
        //   [1006, "Emily Brown", 45, "Australia", "Business", "$100,000", "Pending", 650, "200000", "2024-01-30"],
        //   [1007, "Raj Patel", 33, "India", "Savings", "$12,000", "Rejected", 600, "40000", "2024-02-05"],
        //   [1008, "Sophia Garcia", 28, "Mexico", "Checking", "$9,500", "Approved", 730, "50000", "2024-02-12"],
        //   [1009, "Liam O'Connor", 39, "Ireland", "Business", "$75,000", "Approved", 770, "150000", "2024-01-22"],
        //   [1010, "Isabella Rossi", 36, "Italy", "Savings", "$6,000", "Pending", 690, "48000", "2024-02-08"],
        // ],
        //$ and , removed from annual income as the avg functions considers amount as text if $ and , is included
        data: tableData,
        colHeaders: true,
        rowHeaders: true,
        filters: true,
        dropdownMenu: true,
        manualColumnResize: true,
        //className: "htCustom",
        mergeCells: {
          virtualized: true,
          cells: [{ row: 1, col: 1, rowspan: 2, colspan: 2 }]
        },
        width: "100%",
        height: 400,
        stretchH: "all",
        licenseKey: "non-commercial-and-evaluation",
        formulas: {
          engine: HyperFormula,
        },
        customBorders: getCustomBorders(tableData),
        contextMenu:
         {
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
        className: theme === "light" ? "htLight" : "htDark",
      afterGetColHeader: (col, TH) => {
        TH.className = theme === "light" ? "lightTH" : "darkTH";
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
          };

          if (row === 0) {
            cellProperties.renderer = (instance, td, row, col, prop, value) => {
              td.innerHTML = value;
              td.title = descriptions[col] || "No description available"; 

              // if (col === 6) {
              //   cellProperties.renderer = (instance, td, row, col, prop, value) => {
              //     td.innerHTML = value;
              //     if (value === "Rejected") {
              //       td.style.backgroundColor = "#FF0000";
              //       td.style.color = "white";
              //     }
              //   };
              // }
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
  }, [tableData, theme]);

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", mb: 2 }}>
        
        <Typography variant="h3" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
          Demo Spreadsheet
        </Typography>
        <Box>
          <Button sx={{ border: 2, marginLeft: 2 , color: "green"}} onClick={() => setTheme("light")}>Green</Button>
          <Button sx={{ border: 2, marginLeft: 2 , color: "#406475"}} variant="text" color="primary" onClick={() => setTheme("dark")}>
            Blue 
          </Button>
        </Box>
      </Box>

    
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
    </Box>
  );
};

export default Spreadsheet;

//theme : done
//populate: cell, row, etc
//formula: real time + populate : done


//🔹 How This Works
// Users input custom colors in the text fields.
// Clicking "Apply Theme" updates Handsontable styling dynamically.
// The cells function applies user-defined colors to each cell.
// No need for a separate CSS file—fully dynamic theming via React state.
// 🚀 Benefits of This Approach
// ✅ No hardcoded CSS—user can change colors dynamically.
// ✅ Uses Handsontable's cells renderer for inline styling.
// ✅ Flexible—expand to support more customization options (e.g., fonts, row heights, column widths).