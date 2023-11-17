import { PageConfig, PageProps } from '@atsnek/jaen';

import { graphql } from 'gatsby';
import * as React from 'react';
import { DocContent } from '../../components/contents/DocContent';

const DocsPage: React.FC<PageProps> = () => {
  return <DocContent />;
};

export default DocsPage;

export const pageConfig: PageConfig = {
  label: 'Blog',
  icon: 'FaBook',
  childTemplates: ['BlogPage'],
  menu: {
    type: 'app',
    order: 100,
    group: 'photonq'
  }
};

export const query = graphql`
  query ($jaenPageId: String!) {
    jaenPage(id: { eq: $jaenPageId }) {
      ...JaenPageData
    }
    allJaenPage(filter: { id: { eq: "JaenPage /docs/" } }) {
      nodes {
        id
        childPages {
          ...JaenPageChildrenData
        }
      }
    }
  }
`;

export { Head } from '@atsnek/jaen';