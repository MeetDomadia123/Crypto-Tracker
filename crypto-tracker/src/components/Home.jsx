import CryptoTable from '../components/cryptoList';
import useCryptoWebSocket from '../hook/useCryptoWebSocket';

export default function Home() {
  useCryptoWebSocket();

  return (
    <div>
      <CryptoTable />
    </div>
  );
}
