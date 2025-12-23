const express = require('express');
const app = express();
const port = 3001;

// Allow frontend to connect
app.use(require('cors')());

// Sample hospital data
let departments = [
  {
    id: 1,
    name: "Cardiology",
    head: "Dr. Robert Wilson",
    icon: "fas fa-heartbeat",
    rooms: [
      { type: "Consultation", number: "101-105" },
      { type: "ICU", number: "ICU-1 to ICU-5" }
    ],
    labFacilities: [
      { name: "Echo Lab", status: "Available", timing: "8AM-8PM" }
    ]
  }
];

// Get all departments
app.get('/api/departments', (req, res) => {
  res.json(departments);
});

// Get single department
app.get('/api/departments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dept = departments.find(d => d.id === id);
  res.json(dept || { error: "Department not found" });
});

// Add new department
app.post('/api/departments', express.json(), (req, res) => {
  const newDept = {
    id: departments.length + 1,
    ...req.body
  };
  departments.push(newDept);
  res.json({ message: "Department added", id: newDept.id });
});

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});