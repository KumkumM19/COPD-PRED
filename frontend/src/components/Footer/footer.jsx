import "./footer.css";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-info">
          <div className="footer-heading">COPD PRED</div>
          <div className="footer-content-para">
            Step into a realm where your health and well-being take center
            stage. Here, amidst the digital corridors of our secure space,
            embark on a journey towards understanding and safeguarding your
            respiratory health.
          </div>
          <div className="copyright">Copyright © 2024 COPD PRED</div>
        </div>
        <div className="footer-links">
          <div className="footer-heading">PLATFORM</div>
          <a href="/">Home</a>
          <a href="/pred">Get Predictions</a>
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-social">
          <div className="footer-heading">GET IN TOUCH</div>
          <div className="footer-content-para">
            Questions or feedback? We'd love to hear from you
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/">
              <Facebook />
            </a>
            <a href="https://www.twitter.com/">
              <Twitter />
            </a>
            <a href="https://www.instagram.com/">
              <Instagram />
            </a>
            <a href="https://www.linkedin.com/">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
