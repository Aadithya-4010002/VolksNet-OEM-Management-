import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Chip,
  TableContainer,
} from "@mui/material";

const salesTableData = [
  {
    metric: [
      <i key="Turbocharger-icon" className="ni ni-settings-gear-65" style={{ fontSize: "16px", color: "#007BFF" }} />,
      "Turbocharger",
    ],
    RouteDuration: "111 hrs",
    Manufacturer: "Bosch",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="AirbagModule-icon" className="ni ni-sound-wave" style={{ fontSize: "16px", color: "#FF5733" }} />,
      "Airbag Module",
    ],
    RouteDuration: "150 hrs",
    Manufacturer: "Garrett Motion",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="BrakePads-icon" className="ni ni-support-16" style={{ fontSize: "16px", color: "#28A745" }} />,
      "Brake Pads",
    ],
    RouteDuration: "176 hrs",
    Manufacturer: "Exide",
    DeliveryStatus: "Delayed",
  },
  {
    metric: [
      <i key="Alternator-icon" className="ni ni-battery-charging" style={{ fontSize: "16px", color: "#FFC107" }} />,
      "Alternator",
    ],
    RouteDuration: "56 hrs",
    Manufacturer: "Behr Hella",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="Battery-icon" className="ni ni-battery-charging" style={{ fontSize: "16px", color: "#6C757D" }} />,
      "Battery",
    ],
    RouteDuration: "161 hrs",
    Manufacturer: "Continental AG",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="FuelInjector-icon" className="ni ni-delivery-fast" style={{ fontSize: "16px", color: "#DC3545" }} />,
      "Fuel Injector",
    ],
    RouteDuration: "132 hrs",
    Manufacturer: "Bosch",
    DeliveryStatus: "Delivered",
  },
  {
    metric: [
      <i key="EngineOilFilter-icon" className="ni ni-oil" style={{ fontSize: "16px", color: "#17A2B8" }} />,
      "Engine Oil Filter",
    ],
    RouteDuration: "98 hrs",
    Manufacturer: "MANN+HUMMEL",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="SuspensionStrut-icon" className="ni ni-compass-04" style={{ fontSize: "16px", color: "#6610F2" }} />,
      "Suspension Strut",
    ],
    RouteDuration: "143 hrs",
    Manufacturer: "Monroe",
    DeliveryStatus: "Pending",
  },
  {
    metric: [
      <i key="Radiator-icon" className="ni ni-thermometer" style={{ fontSize: "16px", color: "#20C997" }} />,
      "Radiator",
    ],
    RouteDuration: "115 hrs",
    Manufacturer: "Denso",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="TransmissionFluid-icon" className="ni ni-water" style={{ fontSize: "16px", color: "#007BFF" }} />,
      "Transmission Fluid",
    ],
    RouteDuration: "189 hrs",
    Manufacturer: "Valvoline",
    DeliveryStatus: "In Transit",
  },
];

const getStatusChip = (status) => {
  const chipStyles = {
    fontSize: "12px",
    padding: "4px 8px",
  };

  switch (status) {
    case "On Time":
      return <Chip label="On Time" style={{ ...chipStyles, backgroundColor: "#28A745", color: "#fff" }} />;
    case "In Transit":
      return <Chip label="In Transit" style={{ ...chipStyles, backgroundColor: "#007BFF", color: "#fff" }} />;
    case "Delayed":
      return <Chip label="Delayed" style={{ ...chipStyles, backgroundColor: "#DC3545", color: "#fff" }} />;
    case "Pending":
      return <Chip label="Pending" style={{ ...chipStyles, backgroundColor: "#FFC107", color: "#333" }} />;
    case "Delivered":
      return <Chip label="Delivered" style={{ ...chipStyles, backgroundColor: "#17A2B8", color: "#fff" }} />;
    default:
      return <Chip label="Unknown" style={chipStyles} />;
  }
};

const SalesTable = () => (
  <Paper elevation={3} style={{ padding: "16px", borderRadius: "10px", maxWidth: "100%", overflowX: "auto" }}>
    <Typography variant="h6" style={{ marginBottom: "16px", fontWeight: "60", color: "#333", fontSize: "16px" }}>
      Sales and Logistics Table
    </Typography>
    <TableContainer>
      <Table stickyHeader size="small" style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Metric</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Route Duration</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Manufacturer</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold", width: "25%" }}>Delivery Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {salesTableData.map((item, index) => (
            <TableRow key={index} hover>
              <TableCell align="center">
                <span style={{ alignItems: "left", gap: "1px" }}>
                  {item.metric[0]}
                  <span style={{ fontSize: "14px" }}>{item.metric[1]}</span>
                </span>
              </TableCell>
              <TableCell align="center" style={{ fontSize: "14px" }}>{item.RouteDuration}</TableCell>
              <TableCell align="center" style={{ fontSize: "14px" }}>{item.Manufacturer}</TableCell>
              <TableCell align="center">{getStatusChip(item.DeliveryStatus)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default SalesTable;
