import {Field, PageConfig, PageProps, snekResourceId} from '@atsnek/jaen'

import {Box, Button} from '@chakra-ui/react'
import {graphql} from 'gatsby'
import * as React from 'react'
import {sq} from '../client/src'
import HeroSection from '../components/Hero'
import ContentSection from '../components/Content'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Box as="main">
      <HeroSection />
      <ContentSection/>
      {/* <Button
        onClick={() => {
          sq.query(q => q.resource({id: snekResourceId}).name).then(
            ([resource, errors]) => {
              console.log(resource, errors)
            }
          )
        }}>
        Resource
      </Button> */}
    </Box>
  )
}

export default IndexPage

export const pageConfig: PageConfig = {
  label: 'Home Page',
  icon: 'FaHome',
  childTemplates: ['BlogPage'],
  menu: {
    type: 'app'
  }
}

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
`

export {Head} from '@atsnek/jaen'
