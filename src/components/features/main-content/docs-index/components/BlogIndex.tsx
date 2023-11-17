import { useJaenPageIndex } from '@atsnek/jaen';
import { SimpleGrid } from '@chakra-ui/react';
import ImageCard from '../../image-card/components/ImageCard';

const BlogIndex: React.FC = () => {
  const index = useJaenPageIndex({
    jaenPageId: 'JaenPage /blog/'
  });

  return (
    <SimpleGrid columns={[1, null, 2]} spacing="4" gap="4">
      {index.childPages.map((child, index) => {
        return (
          <ImageCard
            key={index}
            id={child.id}
            link={{
              name: `${child.jaenPageMetadata?.title || 'Read Page'}`,
              href: `/blog/${child.slug || 'none'}`
            }}
            image={{
              src: child.jaenPageMetadata?.image || '',
              alt: child.jaenPageMetadata?.description || ''
            }}
            baseProps={{ mt: 0 }}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default BlogIndex;
