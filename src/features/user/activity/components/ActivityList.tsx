import {
  Box,
  BoxProps,
  Button,
  Center,
  HStack,
  Heading,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text
} from '@chakra-ui/react';
import { FC, ReactNode, useMemo } from 'react';
import { TActivitySection, TActivityType } from '../types/activity';
import { TStepperSection } from '../../../../shared/components/stepper/types/stepper';
import Stepper from '../../../../shared/components/stepper/Stepper';
import TbMessagesCircle2 from '../../../../shared/components/icons/tabler/TbMessagesCircle2';
import TbStar from '../../../../shared/components/icons/tabler/TbStar';
import Link from '../../../../shared/components/Link';
import usePagination from '../../../../shared/hooks/use-pagination';
import ActivityListSkeleton from './ActivityListSkeleton';
import TbConfetti from '../../../../shared/components/icons/tabler/TbConfetti';
import TbPencilPlus from '../../../../shared/components/icons/tabler/TbPencilPlus';
import TbPencilShare from '../../../../shared/components/icons/tabler/TbPencilShare';

export const activityListStyling = {
  title: {
    mb: 5
  }
};

//TODO: Adapt icons for the new activity types
const activityIcons: Record<TActivityType, ReactNode> = {
  follow_follow: <TbMessagesCircle2 />,
  blog_create: <TbPencilPlus />,
  blog_publish: <TbPencilShare />,
  profile_create: <TbConfetti />,
  star_star: <TbStar />,
  star_unstar: undefined
};

interface IActivityListProps extends BoxProps {
  activity?: TActivitySection[];
  fetchMoreActivities?: (offset: number, limit: number) => void;
}

/**
 * Component for displaying a list of activities.
 */
const ActivityList: FC<IActivityListProps> = ({ activity, ...props }) => {
  const nofActivities = useMemo(() => {
    return (
      activity?.reduce((acc, section) => {
        return acc + section.activities.length;
      }, 0) ?? 0
    );
  }, [activity]);

  const pagination = usePagination({
    itemsPerPage: 3,
    totalItems: nofActivities
  });
  const currentLimit = pagination.currentPage * pagination.itemsPerPage;

  const stepperData = useMemo(() => {
    let visibileActivities = 0;
    let stepperData: TStepperSection[] = [];
    for (const section of activity ?? []) {
      const sectionDate = new Date(section.timestamp);
      const sectionTitle = (
        <HStack spacing={1}>
          <Text>
            {sectionDate.toLocaleString('default', { month: 'long' })}
          </Text>
          <Text opacity={0.5}>{sectionDate.getFullYear()}</Text>
        </HStack>
      );
      let lastDay = -1; // Used to cache the latest activity's day of the month
      for (const activity of section.activities) {
        if (visibileActivities >= currentLimit) {
          break;
        }
        const itemDate = new Date(activity.timestamp);
        // Only show the date if it differs from the previous activity
        const showDate = lastDay !== itemDate.getDate();
        lastDay = itemDate.getDate();
        const activityTitle = (
          <LinkBox
            as={HStack}
            _hover={{
              'p, a': {
                color: 'components.userActivity.item.title._hover.color'
              }
            }}
          >
            <LinkOverlay as={Link} href={activity.title.href}>
              {activity.title.name}
            </LinkOverlay>
            {showDate && (
              <>
                <Spacer />
                <Text
                  display={{ base: 'none', md: 'initial' }}
                  fontSize="xs"
                  color="components.userActivity.item.title.date.color"
                >
                  {`${itemDate.toLocaleString('default', {
                    month: 'short'
                  })} ${itemDate.toLocaleDateString('default', {
                    day: '2-digit'
                  })}`}
                </Text>
              </>
            )}
          </LinkBox>
        );

        if (visibileActivities === 0) {
          stepperData.push({
            title: sectionTitle,
            titleProps: {
              fontSize: 'xs',
              fontWeight: 'bold'
            },
            items: []
          });
        }

        stepperData[stepperData.length - 1].items.push({
          title: activityTitle,
          icon: activityIcons[activity.type]
        });

        visibileActivities++;
      }
    }
    return stepperData;
  }, [activity, currentLimit]);

  if (!activity || !stepperData) {
    return (
      <Box w="full" {...props}>
        <ActivityListSkeleton />
      </Box>
    );
  }

  return (
    <Box textAlign="left" w="full" {...props}>
      <Heading size="md" {...activityListStyling.title}>
        Activity
      </Heading>
      <Stepper
        sections={stepperData.slice(
          0,
          pagination.currentPage * pagination.itemsPerPage
        )}
      />
      <Center mt={5}>
        <Button
          variant="ghost-hover-outline"
          size="sm"
          borderRadius="lg"
          display={
            pagination.currentPage === pagination.totalPages ? 'none' : ''
          }
          onClick={pagination.nextPage}
        >
          Show more
        </Button>
      </Center>
    </Box>
  );
};

export default ActivityList;
