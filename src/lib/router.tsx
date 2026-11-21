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

  const ROUTE_METADATA: Record<string, { title: string; description: string; canonical: string }> = {
    '/': {
      title: 'Dhyandev P. — Creative Developer & Systems Engineer',
      description: 'Portfolio of Dhyandev P: Machine Learning, Computer Vision, Linux Systems & Creative Engineering.',
      canonical: 'https://dhyandev.sbs/'
    },
    '/about': {
      title: 'About & Background — Dhyandev P. | Kerala, India',
      description: 'Background, systems philosophy, and technical trajectory of Dhyandev P., Co-Founder at Wayve Enterprises based in Kerala, India.',
      canonical: 'https://dhyandev.sbs/about'
    },
    '/projects': {
      title: 'Verified Projects & Engineering Builds — Dhyandev P.',
      description: '13 production builds across e-commerce flagships, GNOME extensions, civic PDS portals, IoT telemetry, and edge computer vision.',
      canonical: 'https://dhyandev.sbs/projects'
    },
    '/specializations': {
      title: 'Capabilities & Tooling Matrix — Dhyandev P.',
      description: 'Comprehensive capabilities spanning edge machine perception, bare-metal server infrastructure, embedded IoT telemetry, and client-side engineering.',
      canonical: 'https://dhyandev.sbs/specializations'
    },
    '/notes': {
      title: 'Laboratory Logs & Technical Thinking — Dhyandev P.',
      description: 'Documented technical logs on sub-50ms OpenCV perception loops, offline data reconciliation, local biometric verification, and resilient network topologies.',
      canonical: 'https://dhyandev.sbs/notes'
    },
    '/contact': {
      title: 'Contact & Collaboration — Dhyandev P. | Wayve Enterprises',
      description: 'Transmit an inquiry to Dhyandev P. for technical contracting, computer vision architecture, full-stack systems engineering, and strategic advisory.',
      canonical: 'https://dhyandev.sbs/contact'
    },
    '/resume': {
      title: 'Resume & Hardware Terminal — Dhyandev P.',
      description: 'Hardware console and verified curriculum vitae of Dhyandev P.: systems, machine learning, and embedded IoT experience.',
      canonical: 'https://dhyandev.sbs/resume'
    }
  };

  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return normalizePath(window.location.pathname);
  });

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const meta = ROUTE_METADATA[path] || ROUTE_METADATA['/'];
      document.title = meta.title;

      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', meta.description);
      }

      const canonicalTag = document.querySelector('link[rel="canonical"]');
      if (canonicalTag) {
        canonicalTag.setAttribute('href', meta.canonical);
      }
    }
  }, [path]);

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

    if (targetPath === '/links' || targetPath === '/linktree') {
      window.location.href = '/links/';
      return;
    }

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
