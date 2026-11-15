import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import { scrollToTop, resizeLenis } from './scroll';

export type RoutePath = '/' | '/about' | '/projects' | '/specializations' | '/notes' | '/contact' | '/resume';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  path: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const normalizePath = (rawPath: string): string => {
    let p = rawPath;
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace(/^#\/?/, '/');
      if (hash === '/resume' || hash === '/printer' || hash === '/cv') {
        return '/resume';
      }
    }
    const cleaned = p.replace(/\/+$/, '') || '/';
    // Map alternate aliases to canonical routes
    if (cleaned === '/laboratory') return '/notes';
    if (cleaned === '/reachout') return '/contact';
    if (cleaned === '/printer' || cleaned === '/cv') return '/resume';
    return cleaned;
  };

  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizePath(window.location.pathname);
  });

  const [, startTransition] = useTransition();

  useEffect(() => {
    const handleUrlChange = () => {
      const newPath = normalizePath(window.location.pathname);
      setPath(newPath);
      scrollToTop(true);
      requestAnimationFrame(() => resizeLenis());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigate = (to: string) => {
    // External link or anchor jump on same page
    if (to.startsWith('http') || to.startsWith('mailto:')) {
      window.open(to, '_blank', 'noreferrer');
      return;
    }

    const targetPath = normalizePath(to);

    if (targetPath === path) {
      scrollToTop();
      return;
    }

    window.history.pushState({}, '', targetPath);
    startTransition(() => {
      setPath(targetPath);
    });
    scrollToTop(true);
    requestAnimationFrame(() => resizeLenis());
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link: React.FC<{
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}> = ({ to, children, className, onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (props.target === '_blank' || to.startsWith('http') || to.startsWith('mailto:')) {
      return;
    }
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
