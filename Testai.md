# AI Teacher Platform Test Credentials

This file contains the test credentials for accessing both the Admin CMS and the Student Web applications. 
*Note: As this is currently a mock-data environment, entering these credentials in the login forms will simulate a successful authentication and load the respective dashboards.*

## Admin Credentials

| Role | Username (Email) | Password |
| :--- | :--- | :--- |
| **Super Admin** | `aiteacher123@gmail.com` | `ai2062TeacherAK` |

*Use these to log into the `admin-cms` frontend to access course creation and analytics.*

---

## Student Test IDs (Credentials)

Here are three generated student accounts you can use to test the `student-web` frontend:

| Role | Student ID | Username (Email) | Password | Grade |
| :--- | :--- | :--- | :--- | :--- |
| **Student 1** | `STU-2026-001` | `student1@example.com` | `StudentPass!1` | Class 11 (Science) |
| **Student 2** | `STU-2026-002` | `student2@example.com` | `StudentPass!2` | Class 12 (Management) |
| **Student 3** | `STU-2026-003` | `student3@example.com` | `StudentPass!3` | Class 10 (SEE) |

*Use these to log into the `student-web` frontend to view enrolled courses, stats, and interact with the AI teacher sandbox.*

---

## Running the Platform

1. **Backend Engine**: Runs on `http://localhost:8000`
2. **Student Frontend**: Runs on `http://localhost:5173`
3. **Admin Frontend**: Runs on `http://localhost:5174`

All components have been configured and can be started concurrently to test the full loop.
