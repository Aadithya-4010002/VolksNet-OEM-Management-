import React, { useState } from "react";
import Card from "@mui/material/Card";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Configurator from "examples/Configurator";
import { useArgonController } from "context";
import logoDark from "assets/images/logo-ct.png";
import logoLight from "assets/images/logo-ct-dark.png";
import typography from "assets/theme/base/typography";
import PopupChatBot from "components/PopupChatBot";
function HelpSec() {
  const { h2, fontWeightMedium } = typography;
  const [expanded, setExpanded] = useState(false);
  const [controller] = useArgonController();
  const { darkSidenav } = controller;

  // Determine which logo to use based on the darkSidenav state
  const logoToDisplay = darkSidenav ? logoDark : logoLight;
  const textColor = darkSidenav ? "white" : "black";

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Sample FAQ questions and answers
  const faqs = [
    {
      question: "What is VolksNet OEM Management?",
      answer: "VolksNet OEM Management is a comprehensive supply chain solution that empowers Original Equipment Manufacturers (OEMs) to optimize demand forecasting, supplier performance, and logistics using advanced AI and machine learning models."
    },
    {
      question: "How does the Demand Forecasting feature work?",
      answer: "The Demand Forecasting module uses time-series analysis, regression models, and XGBoost to predict future demand based on historical data and market trends, enabling efficient inventory management and production planning."
    },
    {
      question: "What is the Supplier Performance Monitoring feature?",
      answer: "This feature continuously tracks and evaluates supplier reliability using real-time metrics like delivery times, defect rates, and performance trends. Automated alerts are generated for any supplier underperformance or disruptions."
    },
    {
      question: "How does the Logistics Optimization feature enhance supply chain efficiency?",
      answer: "The Logistics Optimization module utilizes OSRM APIs for route optimization, reducing transportation costs and delivery times. Real-time traffic data is integrated to make dynamic adjustments, ensuring efficient fleet management."
    },
    {
      question: "What AI models are used in VolksNet OEM Management?",
      answer: "The platform employs advanced models such as ARIMA for time-series forecasting, Random Forest Regressors, Isolation Forest for anomaly detection, and XGBoost for demand prediction. It also integrates GPT-4o for supply chain recommendations."
    },
    {
      question: "How does the app handle real-time traffic and delivery data?",
      answer: "Real-time traffic data is gathered using OSRM APIs, enabling dynamic adjustments to routes and transportation schedules, optimizing delivery efficiency and reducing costs."
    },
    {
      question: "How secure is the data on the platform?",
      answer: "The platform ensures data privacy and security with OAuth 2.0 for secure authentication, and it complies with GDPR and CCPA regulations. The integration of secure APIs helps safeguard transaction and performance data."
    },
    {
      question: "What kind of insights does the app provide for decision-making?",
      answer: "VolksNet offers data-driven insights on demand patterns, supplier reliability, and logistics efficiency. It helps OEMs make informed decisions about supplier selection, inventory adjustments, and route optimizations."
    },
    {
      question: "How does the app assist with inventory and production planning?",
      answer: "Using AI models like ARIMA and regression, the app forecasts demand accurately, enabling proactive inventory management. This helps in adjusting production schedules based on predicted demand, reducing excess stock and shortages."
    },
    {
      question: "What role does GPT-4o play in the platform?",
      answer: "GPT-4o acts as an intelligent advisor for the supply chain, offering recommendations for fleet guidance, supplier interactions, and anomaly detection through advanced natural language processing."
    },
    {
      question: "How does the platform monitor supplier lead times and defect rates?",
      answer: "The platform uses real-time tracking and data analysis to monitor supplier lead times and defect rates, providing automated alerts for delays or quality issues, thus enabling proactive management."
    },
    {
      question: "What are the main benefits of using VolksNet OEM Management?",
      answer: "The main benefits include improved demand forecasting, efficient supplier performance monitoring, optimized logistics, and reduced supply chain disruptions, all of which lead to cost savings and increased operational efficiency."
    },
    {
      question: "How does the app help with route optimization?",
      answer: "The app uses advanced routing algorithms integrated with OSRM APIs, allowing dynamic adjustments based on real-time traffic and delivery data. This reduces transportation costs and ensures timely deliveries."
    },
    {
      question: "What kind of alerts can users expect from the app?",
      answer: "Users receive automated alerts for anomalies like irregular demand spikes, supplier delays, underperformance, and potential logistics disruptions, enabling proactive resolution of issues."
    },
    {
      question: "How does the platform use machine learning for decision-making?",
      answer: "Machine learning models analyze demand patterns, supplier reliability, and logistics data, providing actionable insights and recommendations that support data-driven decision-making across the supply chain."
    },
    {
      question: "What makes VolksNet different from traditional supply chain management solutions?",
      answer: "VolksNet integrates advanced AI models and real-time data analysis, offering a proactive and intelligent approach to supply chain management. This ensures better demand forecasting, supplier monitoring, and logistics optimization compared to traditional solutions."
    },
    {
      question: "How does the app support cost reduction in logistics?",
      answer: "The app optimizes routes and schedules using real-time traffic data and OSRM APIs, reducing fuel consumption and transportation costs while ensuring efficient deliveries."
    },
    {
      question: "Can the app handle external factors affecting demand forecasting?",
      answer: "Yes, the app integrates external market trends and real-time factors into its AI models, enhancing the accuracy of demand forecasting and enabling adaptive planning."
    },
    {
      question: "How does the app contribute to proactive inventory management?",
      answer: "By accurately predicting demand and monitoring supplier performance, the app helps OEMs manage inventory levels efficiently, preventing overstocking and reducing shortages."
    },
    {
      question: "What datasets are used for model training in VolksNet?",
      answer: "The models are trained on a custom heavy-duty dataset, featuring thousands of data points and 20 columns related to Volkswagen parts manufacturing, supplier metrics, and logistics parameters."
    },
    {
      question: "How does the app handle anomaly detection in the supply chain?",
      answer: "The platform uses Isolation Forest models to detect anomalies such as irregular demand spikes and supply chain bottlenecks, allowing users to address these issues proactively."
    },
    {
      question: "What kind of fleet guidance does GPT-4o provide?",
      answer: "GPT-4o offers intelligent recommendations for fleet management, including route adjustments, load balancing, and delivery scheduling, based on real-time traffic and demand data."
    }
];



  return (
    <DashboardLayout>
      
      
      <Card
    sx={{
      padding: 1,
      marginBottom: 2,
      backgroundColor: darkSidenav ? "#000" : "#fff",
      color: darkSidenav ? "#fff" : "#000",
    }}
  >
    
    <Typography variant="h6" color={darkSidenav ? "#fff" : "#000"} align="center" mt={1}>
Help Section and FAQs    </Typography> <Typography  color={darkSidenav ? "#fff" : "#000"}  mb={2}>
      
      </Typography>
    <Typography variant="body2" color={darkSidenav ? "#fff" : "#000"} align="center" mb={2}>
    Discover app features, tech stack, and usage tips in the Help Section, offering guidance, FAQs, and insights for seamless navigation and functionality understanding.    </Typography>

    
  </Card>
  <PopupChatBot />


      
      {/* FAQ Accordion */}
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color={textColor}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary" variant="body2">
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </DashboardLayout>
  );
}

export default HelpSec;
