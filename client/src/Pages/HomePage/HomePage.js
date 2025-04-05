import './HomePage.css';
import Footer from '../../Components/footer/footer';
import Navbar from '../../Components/navbar/navbar';

function HomePage() {
  return (
    <div>
      {<Navbar />}
      {<Footer />}
    </div>
  );
}

export default HomePage;
