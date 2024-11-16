
//   layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import Profile from "layouts/profile";
import SignUp from "layouts/authentication/sign-up";
import SignIn from "layouts/authentication/sign-in";
import AlertSystem from "layouts/alerts";
import HelpSec from "layouts/helpsection";
import LinkComponent from "./LinkComponent";



//  
import ArgonBox from "components/ArgonBox";
import ChatBot from "components/Chat";
import SupplyChainAi from "layouts/supplychaiai";

const routes = [
  {
    type: "route",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-collection" />,
    component: <Dashboard />,
  },
  {
    type: "route",
    name: "Demand Forecasting",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-chart-bar-32" />,
    component: <VirtualReality />,
  },
  {
    type: "route",
    name: "Logistics Optimization",
    key: "alert-system",
    route: "/alert-system",
    icon: (
      <ArgonBox component="i" color="red" fontSize="14px" className="ni ni-delivery-fast" />
    ),
    component: <AlertSystem />,
  },
  {
    type: "route",
    name: "Performance Monitoring",
    key: "billing",
    route: "/billing",
    icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-sound-wave" />,
    component: <Billing />,
  },
  {
    type: "route",
    name: "Supply Chain AI",
    key: "supplychainai",
    route: "/supplychainai",
    icon: <ArgonBox component="i" color="red" fontSize="14px" className="ni ni-user-run" />,
    component: <SupplyChainAi />,
  },
  
  {
    type: "route",
    name: "Inventory & Production",
    key: "tables",
    route: "/tables",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-app" />
    ),
    component: <Tables />,
  },
  {
    type: "route",
    name: "Guidance & Help",
    key: "helpsection",
    route: "/helpsection",
    icon: (
<ArgonBox component="i" color="secondary" fontSize="14px" className="ni ni-send" />    ),
    component: <HelpSec />,
  },
  


];

export default routes;
