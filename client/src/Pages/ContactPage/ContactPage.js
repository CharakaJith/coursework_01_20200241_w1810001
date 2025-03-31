import './ContactPage.css';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

import location from '../../assets/icons/location.png';
import phone from '../../assets/icons/telephone.png';
import mail from '../../assets/icons/mail.png';
import contact from '../../assets/images/contact.jpg';

function ContactPage() {
  return (
    <div className="contact-page-container">
      <Navbar />

      <div className="contact-page-box">
        <div className="text-content">
          <h4>How can we help you?</h4>
          <h1>Contact Us</h1>

          <p>We are here to help and answer any questions you might have.</p>
          <p>We look forward to hearing from you!</p>
          <br />
          <p className="contact-detail">
            <img src={location} alt="Location" />
            18/2, 1st Lane, Gammana Rd, Maharagama
          </p>
          <p className="contact-detail">
            <img src={phone} alt="Telephone" />
            +94 70 1454256
          </p>
          <p className="contact-detail">
            <img src={mail} alt="Email" />
            <a href="mailto:charaka.info@gmail.com">charaka.info@gmail.com</a>
          </p>
        </div>
        <div className="right-image">
          <img src={contact} alt="Contact Illustration" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactPage;
