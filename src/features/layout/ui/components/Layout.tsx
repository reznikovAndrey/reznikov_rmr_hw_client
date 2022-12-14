import axios, { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { FooterItem } from './FooterItem';
import { NavItem } from './NavItem';
import { getNavItems, getFooterItems } from './utils';

import { ServerError } from '../../../../infrastructure/requestService';
import { routingService } from '../../../../infrastructure/routingService';
import { Content, Footer, Header, Navbar, Container, Button, Loader } from '../../../../ui-library/components';
import { authRequestService, useAuth } from '../../../auth';

const Layout: React.FC = () => {
  const { loggedIn, setLoggedIn } = useAuth();

  const [disabled, setDisabled] = useState(false);

  const navItems = useMemo(getNavItems, []);
  const footerItems = useMemo(getFooterItems, []);

  const handleLogout = useCallback(() => {
    setDisabled(true);
    authRequestService
      .logout()
      .then(() => setLoggedIn(false))
      .catch((err: AxiosError<ServerError> | Error) => {
        if (axios.isAxiosError(err)) {
          console.error(err);
        } else {
          throw new Error('Unhandled error', err);
        }
      })
      .finally(() => setDisabled(false));
  }, []);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === routingService.ROOT) {
      navigate(loggedIn ? routingService.KITTY : routingService.LOGIN, { replace: true });
    }
  }, [pathname]);

  const { t } = useTranslation();

  const memoizedNav = useMemo(
    () => (
      <Header>
        <Navbar>
          {loggedIn && navItems.map(({ text, href }) => <NavItem key={text} text={t(text)} href={href} />)}
          {loggedIn && <Button type="button" text={t('nav.logout')} action={handleLogout} disabled={disabled} />}
        </Navbar>
      </Header>
    ),
    [loggedIn],
  );

  const memoizedFooter = useMemo(
    () => (
      <Footer>
        {loggedIn && footerItems.map(({ text, href }) => <FooterItem key={href} text={t(text)} href={href} />)}
      </Footer>
    ),
    [loggedIn],
  );

  return (
    <>
      {memoizedNav}
      <Content>
        <Container>{loggedIn === null || disabled ? <Loader /> : <Outlet />}</Container>
      </Content>
      {memoizedFooter}
    </>
  );
};

export default Layout;
