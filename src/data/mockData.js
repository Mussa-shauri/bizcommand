export const initProperties = [
  { id: 1, name: "Riverside Tower A", type: "Commercial", location: "Downtown, NYC", value: 4200000, status: "Active", units: 12, occupied: 10, income: 52000 },
  { id: 2, name: "Sunset Residences", type: "Residential", location: "Brooklyn, NYC", value: 2800000, status: "Active", units: 24, occupied: 22, income: 38400 },
  { id: 3, name: "Harbor Warehouse", type: "Industrial", location: "Queens, NYC", value: 1500000, status: "Maintenance", units: 1, occupied: 1, income: 15000 },
  { id: 4, name: "Park View Plaza", type: "Retail", location: "Manhattan, NYC", value: 3600000, status: "Active", units: 8, occupied: 7, income: 44800 },
  { id: 5, name: "Oakwood Apartments", type: "Residential", location: "Bronx, NYC", value: 1900000, status: "Active", units: 18, occupied: 16, income: 28800 },
];

export const initSales = [
  { id: 1, client: "Metro Corp", item: "Office Suite 4B", amount: 320000, date: "2025-05-15", status: "Completed", progress: 100, category: "Commercial" },
  { id: 2, client: "Sarah & Tom Lin", item: "Unit 12, Sunset Res.", amount: 185000, date: "2025-05-28", status: "Completed", progress: 100, category: "Residential" },
  { id: 3, client: "BlueSky Logistics", item: "Warehouse Unit A", amount: 450000, date: "2025-06-02", status: "In Progress", progress: 60, category: "Industrial" },
  { id: 4, client: "Nexus Retail Group", item: "Plaza Unit 3", amount: 290000, date: "2025-06-08", status: "In Progress", progress: 35, category: "Retail" },
  { id: 5, client: "First Home LLC", item: "Unit 5, Oakwood", amount: 145000, date: "2025-06-15", status: "Pending", progress: 10, category: "Residential" },
  { id: 6, client: "Urban Ventures", item: "Office Suite 2A", amount: 275000, date: "2025-06-20", status: "Pending", progress: 5, category: "Commercial" },
];

export const initPurchases = [
  { id: 1, vendor: "BuildRight Contractors", item: "HVAC Replacement", amount: 28500, date: "2025-05-10", status: "Paid", category: "Maintenance" },
  { id: 2, vendor: "ProProperty Mgmt", item: "Management Services Q2", amount: 12000, date: "2025-05-31", status: "Paid", category: "Services" },
  { id: 3, vendor: "City Insurance Co.", item: "Annual Portfolio Coverage", amount: 54000, date: "2025-06-01", status: "Paid", category: "Insurance" },
  { id: 4, vendor: "TechSecure Systems", item: "Security Upgrades", amount: 18700, date: "2025-06-05", status: "Pending", category: "Capital" },
  { id: 5, vendor: "GreenLawn Services", item: "Landscaping Contract", amount: 4800, date: "2025-06-10", status: "Pending", category: "Maintenance" },
  { id: 6, vendor: "Metro Legal Partners", item: "Contract Review Services", amount: 7500, date: "2025-06-18", status: "Pending", category: "Services" },
];

export const movements = [
  { id: 1, date: "2025-06-02", type: "Sale", item: "Harbor Warehouse Unit A", from: "Active Listing", to: "Under Contract", amount: 450000, status: "Moving" },
  { id: 2, date: "2025-06-01", type: "Tenant Move-In", item: "Oakwood Unit 8", from: "Vacant", to: "Occupied", amount: 1800, status: "Completed" },
  { id: 3, date: "2025-05-28", type: "Sale Closed", item: "Sunset Unit 12", from: "Under Contract", to: "Sold", amount: 185000, status: "Completed" },
  { id: 4, date: "2025-05-20", type: "Maintenance", item: "Harbor Warehouse", from: "Active", to: "Maintenance", amount: 28500, status: "Active" },
  { id: 5, date: "2025-05-15", type: "Sale Closed", item: "Riverside Office 4B", from: "Under Contract", to: "Sold", amount: 320000, status: "Completed" },
  { id: 6, date: "2025-06-08", type: "New Listing", item: "Park View Plaza Unit 5", from: "Off Market", to: "Listed", amount: 310000, status: "Moving" },
];

export const risks = [
  { id: 1, category: "Market", title: "Declining Commercial Demand", severity: "High", impact: "High", likelihood: "Medium", mitigation: "Diversify into residential and mixed-use", status: "Active", score: 8 },
  { id: 2, category: "Financial", title: "Interest Rate Increase", severity: "High", impact: "High", likelihood: "High", mitigation: "Lock in fixed-rate financing within 60 days", status: "Active", score: 9 },
  { id: 3, category: "Operational", title: "Maintenance Backlog", severity: "Medium", impact: "Medium", likelihood: "Low", mitigation: "Schedule quarterly inspections", status: "Monitored", score: 4 },
  { id: 4, category: "Legal", title: "Zoning Regulation Changes", severity: "Medium", impact: "High", likelihood: "Low", mitigation: "Engage legal counsel, monitor city council", status: "Monitored", score: 5 },
  { id: 5, category: "Tenant", title: "High Vacancy Risk — Industrial", severity: "Low", impact: "Medium", likelihood: "Low", mitigation: "Offer flexible lease terms to prospects", status: "Resolved", score: 3 },
];

export const plans = [
  { id: 1, title: "Q3 Acquisition: Mixed-Use Asset", timeline: "Jul–Sep 2025", budget: 2500000, progress: 20, priority: "High", owner: "Owner" },
  { id: 2, title: "Riverside Tower Renovation", timeline: "Aug–Dec 2025", budget: 380000, progress: 5, priority: "Medium", owner: "Ops Team" },
  { id: 3, title: "Digital Tenant Portal Launch", timeline: "Jul 2025", budget: 45000, progress: 65, priority: "High", owner: "Tech" },
  { id: 4, title: "Portfolio Insurance Renewal", timeline: "Jun 2025", budget: 54000, progress: 90, priority: "Medium", owner: "Finance" },
];

export const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
  { id: "properties", label: "Properties", icon: "ti-building-estate" },
  { id: "sales", label: "Sales", icon: "ti-trending-up" },
  { id: "purchases", label: "Purchases", icon: "ti-shopping-cart" },
  { id: "movement", label: "Movement Tracker", icon: "ti-route" },
  { id: "risk", label: "Risk & Planning", icon: "ti-shield-check" },
];