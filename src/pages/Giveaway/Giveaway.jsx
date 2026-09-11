import App from '../../App';
import GiveawayDetail from './GiveawayDetail';
import LoginPage from './LoginPage';

export default function GiveawayPage() {
  const match = window.location.pathname.match(/^\/giveaway\/([^/]+)\/?$/);
  if (window.location.pathname === '/login') return <LoginPage />;
  return match ? <GiveawayDetail slug={match[1]} /> : <App />;
}
