import { PageConfig } from '@atsnek/jaen';
import { PageProps, graphql } from 'gatsby';
import * as React from 'react';
import { DocContent } from '../contents/DocContent';

const DocPage: React.FC<PageProps> = props => {
  return <DocContent />;
};

export default DocPage;

export { Head } from '@atsnek/jaen';

export const pageConfig: PageConfig = {
  label: 'DocPage',
  childTemplates: ['DocPage']
};

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`;
