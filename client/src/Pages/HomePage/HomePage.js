import './HomePage.css';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';

function HomePage() {
  return (
    <div>
      {<Navbar />}
      {<Footer />}
    </div>
  );
}

export default HomePage;
