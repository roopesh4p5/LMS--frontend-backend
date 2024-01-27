const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 3000;
app.use(bodyParser.json());
const secretKey = "123123123";

app.use(cors());

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
}

// Read data from data.json
function readDataFromFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { employees: [] };
  }
}
// Add User (Admin Functionality)
app.post("/api/add-user", (req, res) => {
  
    const newUser = req.body;
    const data = readDataFromFile();
  
    // Check if the username is already in use
    const usernameExists = data.employees.some(
      (employee) => employee.username === newUser.username
    );
  
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
  
    // Generate a unique ID for the new user and add them to the employees array
    newUser.id = Date.now();
    data.employees.push(newUser);
  
    // Update data.json file
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
  
    res.json({ message: "User added successfully", user: newUser });
  });

// Write data to data.json
function writeDataToFile(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
}


app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const data = readDataFromFile(); // Read data from data.json
  
    // Find the user (employee or admin) in the data
    const user = data.employees.find(
      (employee) =>
        employee.username === username && employee.password === password
    );
  
    if (!user) {
      // If the user is not an employee, check if it's the admin
      if (
        data.admin &&
        data.admin.username === username &&
        data.admin.password === password
      ) {
        const adminToken = jwt.sign(data.admin, secretKey);
        return res.json({
          token: adminToken,
          role: "admin", // Include the "role" property here
          user: data.admin,
        });
      }
  
      return res.status(401).json({ message: "Authentication failed" });
    }
  
    const userToken = jwt.sign(user, secretKey);
    res.json({ token: userToken, role: "user", user }); // Include the "role" property here
  });
  
  
// Create Leave Request
// Create Leave Request
app.post("/api/employees/leave", (req, res) => {
  const token = req.header("Authorization"); // Get the JWT token from the request header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const userId = decoded.id; // Assuming the user ID is stored in the 'id' property of the payload

    const data = readDataFromFile();
    const employee = data.employees.find((emp) => emp.id === userId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const newLeaveRequest = req.body;
    newLeaveRequest.id = Date.now(); // Generate a unique ID for the leave request

    if (!employee.leave) {
      employee.leave = [];
    }
    employee.leave.push(newLeaveRequest);

    // Update data.json file with the modified data
    writeDataToFile(data);

    res.json({
      message: "Leave request created successfully",
      leaveRequest: newLeaveRequest,
    });
  });
});


// Add a new route to get all user details
app.get("/api/admin/users", (req, res) => {
  const data = readDataFromFile();
  res.json({ users: data.employees });
});

app.put('/api/leave/:leaveId/status', (req, res) => {
  const leaveId = parseInt(req.params.leaveId);
  const newStatus = req.body.status;

  // Read data from data.json
  const data = readDataFromFile();

  // Find the leave and update its status
  let leaveUpdated = false; // Flag to track if leave was updated

  for (const employee of data.employees) {
    const leaveIndex = employee.leave.findIndex((leave) => leave.id === leaveId);

    if (leaveIndex !== -1) {
      // Leave found, update its status
      employee.leave[leaveIndex].status = newStatus;
      console.log(newStatus)
      leaveUpdated = true;
      break; // Exit the loop since we found the leave
    }
  }

  if (leaveUpdated) {
    // Update data.json file with the modified data
    writeDataToFile(data);

    // Respond with a success message
    res.status(200).json({ message: 'Leave status updated successfully' });
  } else {
    // Respond with an error message if leave was not found
    res.status(404).json({ message: 'Leave not found' });
  }
});
function validateHolidayData(req, res, next) {
  const { name, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ error: 'Name and date are required.' });
  }

  next(); // Continue to the route handler if validation passes
}

// Create a route for adding holidays using the middleware
app.post('/api/holidays', validateHolidayData, (req, res) => {
  const newHoliday = req.body;
  const data = readDataFromFile(); // Read data from data.json

  // Add the new holiday to the data
  data.holidays.push(newHoliday);

  // Update data.json file with the modified data
  writeDataToFile(data);

  res.status(201).json(newHoliday); // Respond with the added holiday
});

// Add a new route to get all user details
app.get("/api/holidays", (req, res) => {
  const data = readDataFromFile();
  res.json({ holidays: data.holidays });
});

// ... Other routes and server setup ...
// Add a route to delete an employee
app.delete("/api/employees/:employeeId", (req, res) => {
  const employeeIdToDelete = parseInt(req.params.employeeId);

  // Read data from data.json
  const data = readDataFromFile();

  // Find the index of the employee to delete
  const employeeIndex = data.employees.findIndex(
    (employee) => employee.id === employeeIdToDelete
  );

  if (employeeIndex === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  // Remove the employee from the employees array
  const deletedEmployee = data.employees.splice(employeeIndex, 1)[0];

  // Update data.json file with the modified data
  writeDataToFile(data);

  res.json({
    message: "Employee deleted successfully",
    employee: deletedEmployee,
  });
});
// Add a route to get details of all employees m=model v=views c=contrller
app.get("/api/employees", (req, res) => {
  // Read data from data.json
  const data = readDataFromFile();

  // Return the details of all employees
  res.json(data.employees);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Read data from data.json
function readDataFromFile() {
  try {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { employees: [], holidays: [] };
  }
}

// Write data to data.json
function writeDataToFile(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2), "utf8");
}