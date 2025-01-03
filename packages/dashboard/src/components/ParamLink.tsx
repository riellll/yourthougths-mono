import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Params = {
  [key: string]: string;
};

export const useParamLink = (params: Params, replace?: boolean) => {
  const location = useLocation();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const url = new URL(location.pathname, window.location.origin);

    if (!replace) {
      location.search
        .slice(1)
        .split('&')
        .forEach((param) => {
          const [key, value] = param.split('=');
          if (key) {
            url.searchParams.set(key, value);
          }
        });
    }

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    setUrl(url.toString());
  }, [params, replace, location]);

  return url;
};

interface ParamLinkProps {
  params: Params;
  children: React.ReactNode;
  replace?: boolean;
  className?: string;
}

const ParamLink: React.FC<ParamLinkProps> = ({
  params,
  children,
  replace = false,
  className,
  ...props
}) => {
  const url = useParamLink(params, replace);

  return (
    <Link to={url} className={className} {...props}>
      {children}
    </Link>
  );
};

export default ParamLink;