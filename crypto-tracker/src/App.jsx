import { Provider } from 'react-redux';
import store from './redux/store';
import CryptoTable from './components/cryptoList';
import Navbar from './components/navbar';
import Footer from './components/footer';


function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto py-8">
        <Navbar />
        <h1 className="text-2xl font-bold mb-6 text-center">Crypto Price Tracker</h1>
        <CryptoTable />
        <Footer />
      </div>
    </Provider>
  );
}
export default App;
