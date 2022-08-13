import { Routes, Route } from 'react-router-dom';

import { ContentScreen } from './ContentScreen';
import { LoginScreen } from './LoginScreen';
import { NotFoundScreen } from './NotFoundScreen';
import { PrivateScreen } from './PrivateScreen';
import { ProfileScreen } from './ProfileScreen';

import App from '../App';
import { routingService } from '../infrastructure/RoutingService';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={routingService.root()} element={<App />}>
      <Route path={routingService.login()} element={<LoginScreen />} />
      <Route path={routingService.root()} element={<PrivateScreen />}>
        <Route path={routingService.profile()} element={<ProfileScreen />} />
        <Route path={routingService.content()} element={<ContentScreen />} />
        <Route path={routingService.notFound()} element={<NotFoundScreen />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
