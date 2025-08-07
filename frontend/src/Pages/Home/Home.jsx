import "./Home.css";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const Home = ({ logout }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const userId = searchParams.get("userId");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  var url = "";
  url = `/pred?username=${username}&userId=${userId}`;
  // const username = sessionStorage.getItem("username");
  // const id = sessionStorage.getItem("userId");
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      {/* <p>Welcome, {username}</p>
      <p>User ID: {userId}</p> */}
      <div className="HomePage">
        <Navbar
          isLoggedIn={isLoggedIn}
          logout={logout}
          username={username}
          id={userId}
        />
        <div className="main-page-top-box">
          <div className="main-page-left">
            <div className="main-page-left-sub-box">
              <h1 className="main-page-heading">
                AI Powered COPD Severity Prediction For Doctors
              </h1>
              <p className="main-page-head-subtext">
                Our platform guarantees a private and secure space for virtual
                sessions, cultivating a feeling of comfort and trust. climbing
                on your journey to emotional well-being instantly.
              </p>
              <a href={url} className="main-page-get-prediction-btn">
                Get Predictions &rarr;
              </a>
              <div className="main-page-head-stats-box">
                <div className="main-page-stats-box">
                  <p className="main-page-stats-subtext">Model Accuracy Achieved</p>
                  <h2 className="main-page-stats">80+</h2>
                </div>
                <div className="main-page-stats-box">
                  <p className="main-page-stats-subtext">Model Trained on</p>
                  <h2 className="main-page-stats">14K+</h2>
                </div>
                <div className="main-page-stats-box">
                  <p className="main-page-stats-subtext">
                    Model Tested on
                  </p>
                  <h2 className="main-page-stats">3K+</h2>
                </div>
                <div className="main-page-stats-box">
                  <p className="main-page-stats-subtext">
                    Models Available
                  </p>
                  <h2 className="main-page-stats">5+</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="main-page-right">
            <div className="main-page-right-sub-box">
              <img
                src="../Assets/images/Main-page-photo.jpg"
                alt=""
                className="main-page-photo"
              />
              <div className="main-page-image-above-box"></div>
              <div className="main-page-image-below-box"></div>
            </div>
          </div>
        </div>

        <div className="main-page-bottom-box">
          <div className="main-page-bottom-bg-box">
            <h1 className="main-page-heading mg-l-3">
              AI Powered COPD Severity Prediction For Doctors
            </h1>
            <p className="main-page-head-subtext mg-l-3">
              Our platform guarantees a private and secure space for virtual
              sessions, cultivating a feeling of comfort and trust. climbing on
              your journey to emotional well-being instantly.
            </p>

            <div className="main-page-bottom-card-box">
              <div className="main-page-bottom-card">
                <div className="main-page-people-icon">
                  <img src="../Assets/images/People-icon.png" alt="" />
                </div>
                <p className="main-page-bottom-card-heading">
                  Accurate COPD Prediction
                </p>
                <p className="main-page-bottom-card-sub-text">
                  Utilizing cutting-edge AI technology to provide doctors with
                  accurate predictions of COPD severity.
                </p>
              </div>
              <div className="main-page-bottom-card">
                <div className="main-page-people-icon">
                  <img src="../Assets/images/People-icon.png" alt="" />
                </div>
                <p className="main-page-bottom-card-heading">
                  Data-Driven Insights
                </p>
                <p className="main-page-bottom-card-sub-text">
                  Utilizing data analysis to accurately predict COPD severity,
                  enabling management and treatment planning.
                </p>
              </div>
              <div className="main-page-bottom-card">
                <div className="main-page-people-icon">
                  <img src="../Assets/images/People-icon.png" alt="" />
                </div>
                <p className="main-page-bottom-card-heading">
                  Interdisciplinary Collaboration
                </p>
                <p className="main-page-bottom-card-sub-text">
                  Fostering collaboration between healthcare teams by
                  integrating COPD prediction tools into existing workflows
                </p>
              </div>
              <div className="main-page-bottom-card">
                <div className="main-page-people-icon">
                  <img src="../Assets/images/People-icon.png" alt="" />
                </div>
                <p className="main-page-bottom-card-heading">
                  Effortless Navigation
                </p>
                <p className="main-page-bottom-card-sub-text">
                  Streamlining the journey by offering an intuitive interface
                  that facilitates easy navigation amongst the website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <form onSubmit={logout}>
        <button>Logout</button>
      </form> */}
      </div>

      <Footer />
    </>
  );
};

export default Home;

// prop validation

Home.propTypes = {
  logout: PropTypes.func,
};
