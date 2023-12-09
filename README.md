# Blood Donation Management System - Frontend

The Blood Donation Management System is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to streamline and enhance blood donation activities. The system features distinct dashboards for users, donors, volunteers, and administrators. Users can search for donors based on location and blood type, view donor information, make donation requests, and explore a blog section. The application leverages Firebase for secure user authentication and Stripe for seamless payment transactions.

## Important Links:
- Website Live Link: [Website Live Link](https://blood-donate-e576a.web.app)
- Frontend GitHub Repository: [Blood Donation - Frontend](https://github.com/ashiqee/blood-donation-full-stack-client)
- Backend GitHub Repository: [Blood Donation - Backend Server](https://github.com/ashiqee/blood-donation-full-stack-server-side)


## Key Features:

- **User Authentication:** Secure Firebase email authentication for user registration.

- **Donor Search:** Effortlessly search for donors by district, thana, and blood group.

- **Dashboards:**
  - **User/Donor/Volunteer Dashboard:** Displays the last 3 donation requests, allows adding and updating donation requests.
  - **Admin Dashboard:** Manages users, donation requests, fund history, and site content.
- **Payment Gateway:** Integrates Stripe for secure and smooth payment transactions.

- **Blog Section:** Features a rich text editor using Jodit React for content creation.

## Technologies Used:

- **React:** A JavaScript library for building responsive user interfaces.

- **Material Tailwind:** A utility-first UI framework for quick and effective styling.

- **Material UI:** React components implementing Google's Material Design for a polished UI.

- **TANStack:** A tech stack combining Tailwind CSS, Axios, and Node.js for efficient development.

- **Firebase:** Ensures secure user authentication.

- **Stripe:** Trusted payment gateway for seamless transactions.

- **Jodit React:** Text editor for creating rich text content.

<br>

# Blood Donation Management System - Backend Server

Backend GitHub Repository: [Blood Donation Management System - Backend Server](https://github.com/ashiqee/blood-donation-full-stack-server-side)

The backend server for the Blood Donation Management System is built using Node.js, Express.js, and Mongoose. It employs JWT (JSON Web Tokens) for secure user authentication, CORS for cross-origin resource sharing, and dotenv for managing environment variables. The server interacts with MongoDB using Mongoose for efficient data storage and retrieval. Additionally, the integration of Stripe provides a secure platform for handling payment transactions.

## Key Features:

- **User Authentication:** Utilizes JWT for secure and token-based user authentication.

- **Cross-Origin Resource Sharing (CORS):** Enables secure sharing of resources across different domains.

- **Environment Variables:** Utilizes dotenv for managing sensitive information through environment variables.

- **Database Interaction:** Utilizes Mongoose to interact with MongoDB, ensuring efficient data management.

- **Payment Transactions:** Integrates Stripe for secure and reliable payment processing.

## Dependencies:

- **express:** A fast, unopinionated web framework for Node.js.
- **mongoose:** Elegant MongoDB object modeling for Node.js.
- **jsonwebtoken (JWT):** Generates and verifies JSON web tokens.

- **cors:** Middleware for enabling CORS in Express applications.

- **dotenv:** Loads environment variables from a .env file.

- **stripe:** Official JavaScript library for the Stripe API.

## Technologies Used:

- **Node.js:** A JavaScript runtime for server-side development.
- **Express.js:** A minimal and flexible Node.js web application framework.
- **Mongoose:** An elegant MongoDB object modeling tool.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims between two parties.
- **CORS:** Cross-Origin Resource Sharing for securing resource sharing.
- **dotenv:** A zero-dependency module for loading environment variables.

- **Stripe:** A secure and powerful platform for handling online payment transactions.
