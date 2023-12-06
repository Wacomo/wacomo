**RWarehouse Safety and Efficiency Monitor (WSEM)**

---

### **Objective**:

To monitor and ensure optimal conditions within various warehouse sections, especially for sensitive goods. Also, track the movement of goods to detect unauthorized movements.

---

### **Features**:

1. **User Authentication**:
   - Secure account creation and login using JSON Web Tokens (JWT).
   - Profile management, including updating email preferences and password.

2. **Device Management**:
   - Add Thingy:91 devices to the user's account.
   - Assign meaningful names to each device representing specific warehouse sections or goods categories.
   - Optional parameter threshold settings for temperature, humidity, CO2, etc. based on the type of goods.

3. **Dashboard**:
   - Real-time visualization of data provided by the Thingy:91 device for each warehouse section.
   - Color-coded indicators for parameters within, nearing, or outside set thresholds.
   - Historical data trends for analysis.

4. **Alert System**:
   - Immediate notifications, via email, when device data exceeds user-set thresholds.
   - Detailed alert information, including the device ID, device name, and specifics about the exceeded parameter.

---

### **High-Level Design of WSEM System**:

---

**1. Thingy API Design**:

*Endpoints*:

- `POST /users/signup`: Register a new user.
- `POST /users/login`: Authenticate a user.
- `POST /devices`: Add a new Thingy:91 device.
- `GET /devices`: List all devices added by a user.
- `PUT /devices/{device_uuid}/parameters`: Set thresholds for device parameters.
- `GET /devices/{device_uuid}/data`: Fetch real-time or historical data from a device.
- `POST /alerts/`: Trigger alerts when data exceeds thresholds.

*MQTT Integration*:

- Subscribe to the `things/{device_uuid}/shadow/update` topic for each added device to receive real-time sensor data.
- Process the received data, store it for visualization, and check against user-set thresholds to trigger alerts.

---

**2. Thingy Client Design (Web Dashboard)**:

- **User Authentication Page**: Fields for username and password, buttons for login, and sign-up.
  
- **Dashboard Home**:
  - List of devices with names and quick status icons.
  - Option to add a new device.
  - Navigation to settings, profile, and alerts history.
  
- **Device Details Page**:
  - Real-time data visualizations (graphs, dials, or gauges) for each parameter.
  - Option to set/edit parameter thresholds.
  - History section showing data trends over time.
  
- **Alerts Page**:
  - List of triggered alerts, including details on when the alert was triggered, which parameter, and by how much it exceeded.
  - Option to mute/unmute specific alerts.

- **Settings/Profile Page**:
  - Update email, password, and other user information.
  - Set global preferences for alerts.
