import {
  Stack,
  Heading,
  IconButton,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import TbStar from '../../../shared/components/icons/tabler/TbStar';
import RightNavPostReader from '../reader/components/RightNavPostReader';
import { TPost } from '../types/post';
import { formatPostDate } from '../../../shared/utils/features/post';

interface IPostReaderProps {
  post?: TPost;
  isAuthor?: boolean;
  handleRatePost?: () => void;
  isRating?: boolean;
}

const PostReader: FC<IPostReaderProps> = ({
  post,
  isAuthor,
  handleRatePost,
  isRating
}) => {
  const isAuthenticated = true;

  const postDate = useMemo(
    () => formatPostDate(post?.createdAt),
    [post?.createdAt]
  );

  return (
    <Stack spacing={{ base: 0, xl: 12 }} direction="row" mb={10}>
      <Box maxW="900px" w="full">
        <Text fontSize="sm" color="gray.500">
          {postDate}
        </Text>
        <Heading variant="h1" mt={0} mb={10}>
          {post?.title}
          {isAuthenticated && !isAuthor && (
            <IconButton
              icon={
                <TbStar
                  fill={
                    post?.hasRated
                      ? 'features.rating.rated.color'
                      : 'transparent'
                  }
                  stroke={
                    post?.hasRated
                      ? 'features.rating.rated.color'
                      : 'currentColor'
                  }
                />
              }
              aria-label="Rate post"
              variant="ghost-hover-opacity"
              _hover={{
                opacity: 1,
                transform: 'scale(1.3)',
                color: 'features.rating._hover.color'
              }}
              onClick={handleRatePost}
              isDisabled={isRating}
            />
          )}
        </Heading>
        <VStack spacing={3} alignItems="start">
          {post?.content ??
            'This is a temporary client-only dev placeholder while the post has no content'}
        </VStack>
      </Box>
      <RightNavPostReader />
    </Stack>
  );
};

export default PostReader;
