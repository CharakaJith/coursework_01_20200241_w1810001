import './AboutPage.css';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

function AboutPage() {
  return (
    <div className="about-page-container">
      <Navbar />

      <div className="about-content-box">
        <p>
          This project was developed as part of the requirements for Coursework 01 for the Advanced Server-Side Web Development module. It involves
          creating a secure API middleware service that interfaces with RestCountries.com, a comprehensive RESTful service providing detailed
          information about countries worldwide. The service retrieves and filters essential country information, such as the country name, currency
          details, capital city, spoken languages, and national flag.
        </p>
        <br />
        <p>
          The application includes a complete authentication system with user registration, login capabilities, and API key management. Users can
          easily generate and manage their API keys through a dedicated web interface. All sensitive data is securely stored in an SQLite database,
          with password hashing and proper session management in place to ensure security.
        </p>
        <br />
        <p>
          In line with the project requirements, the service was built with a polyglot architecture. For efficient local deployment, the application
          has been containerized using Docker, ensuring portability and ease of use. This solution provides a secure and streamlined way to access
          country data, fulfilling all the requirements outlined in Coursework 01 specifications.
        </p>
        <br />
        <p>- Charaka Jith Gunasinghe (20200241/w1810001)</p>
        <p>
          <a href="mailto:charaka.info@gmail.com">- charaka.info@gmail.com</a>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
