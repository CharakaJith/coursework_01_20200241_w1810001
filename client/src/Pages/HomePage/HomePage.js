import './HomePage.css';
import Footer from '../../Components/footer/footer';
import Navbar from '../../Components/navbar/navbar';

function HomePage() {
  return (
    <div>
      <Navbar />
      <h1 className="slogan">
        Discover the world,
        <br />
        one country at a time!
      </h1>
      <p className="slogan-subtext">Register now to explore detailed info about every country!</p>
      <Footer />
    </div>
  );
}

export default HomePage;
