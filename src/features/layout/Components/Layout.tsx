import { FC, PropsWithChildren } from 'react';

import { FooterItem } from './FooterItem';
import { NavItem } from './NavItem';

import { Content, Footer, Header, Navbar, Container } from '../../../ui-library/Components';
import { useAuth } from '../../auth/Hooks';
import { getNavItems, getFooterItems } from '../Utils';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loggedIn } = useAuth();

  const navItems = getNavItems();
  const footerItems = getFooterItems();

  return (
    <>
      <Header>
        <Navbar>{loggedIn && navItems.map(({ text, href }) => <NavItem key={text} text={text} href={href} />)}</Navbar>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer>
        {loggedIn && footerItems.map(({ text, href }) => <FooterItem key={href} text={text} href={href} />)}
      </Footer>
    </>
  );
};

export default Layout;
