import { FC, PropsWithChildren, useMemo } from 'react';
import { NavigateFunction, NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

import './MainLayout.css';

type MainLayoutLinkProps = NavLinkProps & React.RefAttributes<HTMLAnchorElement> & { linkText: string; }

type MainLayoutProps = {
    linkProps?: MainLayoutLinkProps[];
}

const MainLayout:FC<PropsWithChildren<MainLayoutProps>> = (props) => {
    const {children, linkProps} = props;
    const navigate: NavigateFunction = useNavigate();

    const returnLink = useMemo((): JSX.Element[] => {
       return [<li key={'go_back'}><button className="link" onClick={() => navigate(-1)}>Go back</button></li>];
    }, [navigate]);

    const navLinks = useMemo((): JSX.Element[] | null => {
        if (Array.isArray(linkProps) && linkProps.length) {
            return [...returnLink, ...linkProps.map((linkProp) => {
                const {linkText, ...navLinkProps} = linkProp;
                return (<li key={String(navLinkProps.to)}><NavLink {...navLinkProps}>{linkText}</NavLink></li>);
            })];
        }
        return returnLink;
    }, [linkProps, returnLink]);

    return (
      <div className="Main">
        <header className="Main-header">
            <ul>{navLinks}</ul>
        </header>
        <article className='Main-article'>
          {children}
        </article>
      </div>
    );
  };
  
  export default MainLayout;

  export type {
    MainLayoutLinkProps,
    MainLayoutProps,
  }