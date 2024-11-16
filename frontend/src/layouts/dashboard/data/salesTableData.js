// Using Nucleo icons with className

const salesTableData = [
  {
    metric: [
      <i key="Turbocharger-icon" className="ni ni-settings-gear-65" style={{ fontSize: "20px", color: "#007BFF" }} />,
      "Turbocharger",
    ],
    RouteDuration: "111 hours",
    Manufacturer: "Bosch",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="AirbagModule-icon" className="ni ni-sound-wave" style={{ fontSize: "20px", color: "#FF5733" }} />,
      "Airbag Module",
    ],
    RouteDuration: "150 hours",
    Manufacturer: "Garrett Motion",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="BrakePads-icon" className="ni ni-support-16" style={{ fontSize: "20px", color: "#28A745" }} />,
      "Brake Pads",
    ],
    RouteDuration: "176 hours",
    Manufacturer: "Exide",
    DeliveryStatus: "Delayed",
  },
  {
    metric: [
      <i key="Alternator-icon" className="ni ni-battery-charging" style={{ fontSize: "20px", color: "#FFC107" }} />,
      "Alternator",
    ],
    RouteDuration: "56 hours",
    Manufacturer: "Behr Hella",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="Battery-icon" className="ni ni-battery-charging" style={{ fontSize: "20px", color: "#6C757D" }} />,
      "Battery",
    ],
    RouteDuration: "161 hours",
    Manufacturer: "Continental AG",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="FuelInjector-icon" className="ni ni-delivery-fast" style={{ fontSize: "20px", color: "#DC3545" }} />,
      "Fuel Injector",
    ],
    RouteDuration: "132 hours",
    Manufacturer: "Bosch",
    DeliveryStatus: "Delivered",
  },
  {
    metric: [
      <i key="EngineOilFilter-icon" className="ni ni-oil" style={{ fontSize: "20px", color: "#17A2B8" }} />,
      "Engine Oil Filter",
    ],
    RouteDuration: "98 hours",
    Manufacturer: "MANN+HUMMEL",
    DeliveryStatus: "In Transit",
  },
  {
    metric: [
      <i key="SuspensionStrut-icon" className="ni ni-compass-04" style={{ fontSize: "20px", color: "#6610F2" }} />,
      "Suspension Strut",
    ],
    RouteDuration: "143 hours",
    Manufacturer: "Monroe",
    DeliveryStatus: "Pending",
  },
  {
    metric: [
      <i key="Radiator-icon" className="ni ni-thermometer" style={{ fontSize: "20px", color: "#20C997" }} />,
      "Radiator",
    ],
    RouteDuration: "115 hours",
    Manufacturer: "Denso",
    DeliveryStatus: "On Time",
  },
  {
    metric: [
      <i key="TransmissionFluid-icon" className="ni ni-water" style={{ fontSize: "20px", color: "#007BFF" }} />,
      "Transmission Fluid",
    ],
    RouteDuration: "189 hours",
    Manufacturer: "Valvoline",
    DeliveryStatus: "In Transit",
  },
];

export default salesTableData;
