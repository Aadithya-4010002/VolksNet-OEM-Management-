// components
import ArgonTypography from "components/ArgonTypography";

const categoriesListData = [
  {
    color: "dark",
    icon: <i className="ni ni-bus-front-12" style={{ fontSize: "12px" }} />,
    name: "Bangalore to Trichy",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 345 km. Route: 77.5946,12.9716 → 78.7047,10.7905.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/77.5946,12.9716;78.7047,10.7905?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-delivery-fast" style={{ fontSize: "12px" }} />,
    name: "Coimbatore to Madurai",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 215 km. Route: 76.9847,11.0168 → 78.1198,9.9252.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/76.9847,11.0168;78.1198,9.9252?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-sound-wave" style={{ fontSize: "12px" }} />,
    name: "Hyderabad to Vijayawada",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 275 km. Route: 78.4867,17.3850 → 80.6480,16.5062.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/78.4867,17.3850;80.6480,16.5062?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-compass-04" style={{ fontSize: "12px" }} />,
    name: "Chennai to Trichy",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 320 km. Route: 80.2707,13.0827 → 78.7047,10.7905.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/80.2707,13.0827;78.7047,10.7905?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-globe-2" style={{ fontSize: "12px" }} />,
    name: "Delhi to Mumbai",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 1,420 km. Route: 77.2090,28.6139 → 72.8777,19.0760.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/77.2090,28.6139;72.8777,19.0760?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-tie-bow" style={{ fontSize: "12px" }} />,
    name: "Ahmedabad to Indore",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 400 km. Route: 72.5714,23.0225 → 75.8577,22.7196.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/72.5714,23.0225;75.8577,22.7196?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-world-2" style={{ fontSize: "12px" }} />,
    name: "Kolkata to Bhubaneswar",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 440 km. Route: 88.3639,22.5726 → 85.8245,20.2961.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/88.3639,22.5726;85.8245,20.2961?overview=full",
  },
  {
    color: "dark",
    icon: <i className="ni ni-bulb-61" style={{ fontSize: "12px" }} />,
    name: "Agra to Delhi",
    description: (
      <>
        <ArgonTypography variant="caption" color="text" fontWeight="medium">
          Distance: 210 km. Route: 78.0081,27.1767 → 77.1025,28.7041.
        </ArgonTypography>
      </>
    ),
    route: "http://localhost:5001/route/v1/driving/78.0081,27.1767;77.1025,28.7041?overview=full",
  },
];

export default categoriesListData;
