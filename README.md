# Citizen Hospital - Web Application

This is the web application for **Citizen Hospital**, showcasing the frontend React application with mocked data for visual demonstration.

## Demo Preview
You can view the live demo here: [Add Your Deployed Link Here]

## Features
- **Home:** Hero section, specialties, emergency contact.
- **Doctors:** Complete list of doctors with search and filter.
- **Departments:** Detailed view of medical departments.
- **About Us:** Hospital history and mission.
- **Contact:** Location map and contact form.
- **Press Releases:** Latest news and updates.

## Tech Stack
- React + Vite
- Tailwind CSS + DaisyUI
- Java Spring Boot (Backend - separate deployment required for full functionality like booking)

## Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` for frontend
4. Run `mvn spring-boot:run` in `backend/` directory for backend API

## Prerequisites

- Node.js (v18+)
- npm (v9+)

## Setup Instructions

1.  Navigate to the project directory:
    ```bash
    cd webJSP
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## Project Structure

- `src/pages/Home.jsx`: Main landing page with hero, specialties, and emergency sections.
- `src/components/`: Reusable components like Navbar and Footer.
- `src/assets/`: Static assets (images, icons).
- `public/assets/images/`: Image files served directly.

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- DaisyUI (for UI components)
- React Router DOM
- React Icons
