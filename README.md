# 🏥 SmartHealthSystem - Healthcare Appointment Platform

**SmartHealthSystem** is a full-stack web application designed to streamline the appointment booking process across hospitals and doctors in Sri Lanka. Built using **Spring Boot** and **ReactJS** following the MVC architecture, it provides a seamless interface for patients to find healthcare providers and for administrators to manage system data.

## 🚀 Features

* **📅 Appointment Booking:** Patients can easily search for and book appointments with doctors at various hospitals.
* **🏥 Hospital Management:** Full CRUD capabilities to add, update, view, and remove hospital details.
* **👨‍⚕️ Doctor Management:** Manage doctor profiles, specializations, and availability.
* **🔗 RESTful Architecture:** robust backend APIs ensuring smooth data flow between the client and server.
* **🔍 Search & Filter:** Easy-to-use search functionality to find specific doctors or hospitals.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | ReactJS, Axios, CSS/Bootstrap |
| **Backend** | Java, Spring Boot (Web, JPA) |
| **Database** | MySQL (Managed via MySQL Workbench) |
| **Architecture** | MVC (Model-View-Controller) |
| **Build Tools** | Maven (Backend), npm (Frontend) |

## 📂 Project Structure

```text
SmartHealthSystem/
├── backend/           # Spring Boot Application
│   ├── src/main/java  # Controllers, Models, Repositories, Services
│   └── src/main/resources # Application properties & config
├── frontend/          # ReactJS Application
│   ├── src/components # Reusable UI components
│   ├── src/services   # API service calls
│   └── public/
└── README.md

**
⚙️ Installation & Setup
Follow these steps to get the project running on your local machine.

Prerequisites
Java Development Kit (JDK 17 or higher)

Node.js & npm

MySQL Server & Workbench

1. Database Setup
Open MySQL Workbench.

Create a new database named smart_health_db (or whatever name you used).

Update the database credentials in the backend application.properties file.

2. Backend Setup (Spring Boot)
Navigate to the backend directory:
Bash

cd backend
Configure your database in src/main/resources/application.properties:

Properties

spring.datasource.url=jdbc:mysql://localhost:3306/smart_health_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Run the application:

Bash

./mvnw spring-boot:run
The backend server will start on http://localhost:8080.

3. Frontend Setup (React)
Open a new terminal and navigate to the frontend directory:

Bash

cd frontend
Install dependencies:

Bash

npm install
Start the React application:

Bash

npm start
The frontend will launch on http://localhost:3000.

🔗 API Endpoints (Examples)
GET /api/doctors - Get all doctors

POST /api/doctors - Add a new doctor

GET /api/hospitals - Get all hospitals

POST /api/appointments - Book an appointment



