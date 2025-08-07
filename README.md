# COPD PRED

This is a full-stack web application project consisting of a backend server and a frontend client. The project appears to be using technologies such as Python for the backend, JavaScript (React.js) for the frontend, and potentially a machine learning component for prediction tasks.

## Repository Structure

- `backend/`: Contains the server-side code and related files.
 - `Final server backend.py`: The main Python file for the backend server.
 - `copd-pred.ipynb`: A Jupyter Notebook file, for a machine learning and deep learning model related to COPD (Chronic Obstructive Pulmonary Disease) prediction.
 - `xgb_model_gold_class_hp.pkl`, `xgb_model_hp.pkl`: Pickle files containing trained machine learning models, XGBoost models.

- `frontend/`: Contains the client-side code and related files.
 - `models/`: Directory for frontend models and data.
 - `public/Assets/images/`: Directory for frontend image assets.
 - `src/`: Source code directory for the React.js frontend application.
   - `Pages/`: Directory containing different page components.
   - `components/`: Directory for reusable React components.
   - `App.css`, `App.jsx`, `index.css`, `main.jsx`: Core files for the React application.

- Other files like `package.json`, `package-lock.json`, `.eslintrc.js`, `.gitignore`, `README.md`, `index.html`, and `vite.config.js` for project configuration and setup.

## Features

- User authentication (Login, Sign Up)
- Home page
- Prediction page (COPD prediction using a machine learning model)
- Result page (to display prediction results)

## Setup Environment Variables

Before running the backend server, you need to configure the environment variables.

1. `cd backend`
2. Create a `.env` file in the root directory of the backend folder.
3. Add the following variables to the `.env` file:
   - `PORT=3000`
   - `CONNECTION_URL=your MongoDB connection URL`
   - `GOOGLE_CLIENT_ID=your Google login client ID`
   - `GOOGLE_CLIENT_SECRET=your Google login client secret`
4. Save the file and ensure it is not tracked by version control (typically `.env` is listed in `.gitignore`).

## Setup and Installation

1. Clone the repository: `git clone https://github.com/KumkumM19/COPD-PRED.git`
2. Install backend dependencies: `npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Configure the backend server and frontend development server as per the project requirements.
5. Start the machine learning backend server: `python Final server backend.py`
6. Start the backend server: `npm start`
7. Start the frontend development server: `npm run dev`

## Contributing

Contributions are welcome! Please follow the standard GitHub workflow:

1. Fork the repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make changes and commit them: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Demo

### Login Page

![Login Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/1.png)

### Home Page

![Home Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/2.png)

![Home Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/3.png)

### Predictions Page

![Predictions Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/4.png)

![Predictions Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/5.png)

### Results Page

![Results Page](https://github.com/KumkumM19/COPD-PRED/blob/main/Demo/6.png)
