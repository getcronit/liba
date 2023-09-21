import { Link as ChLink, LinkProps, Text } from '@chakra-ui/react';
import { Link as GaLink } from 'gatsby';
import { FC, ReactNode, forwardRef } from 'react';
import { isInternalLink } from '../utils/utils';
import { useLocation } from '@reach/router';

interface GatsbyLinkProps extends LinkProps {
  href?: string;
  children?: ReactNode;
}

/**
 * Custom link component combining Chakra UI's and Gatsby's Link.
 */

const Link = forwardRef<typeof ChLink, GatsbyLinkProps>(
  ({ href = '#', ...props }, ref) => {
    // Props that both link variants share.
    const baseProps: LinkProps = {
      position: 'relative'
    };

    if (isInternalLink(href)) {
      return (
        <ChLink
          ref={ref}
          {...baseProps}
          to={href}
          as={GaLink}
          {...props}
        ></ChLink>
      );
    }
    return <ChLink ref={ref} {...baseProps} href={href} {...props}></ChLink>;
  }
);

export default Link;
