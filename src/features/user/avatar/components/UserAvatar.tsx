import { FC } from 'react';
import {
  Avatar,
  AvatarProps,
  LinkBox,
  LinkOverlay,
  Tooltip
} from '@chakra-ui/react';
import UserPreview from './UserPreview';
import { SnekUser } from '@atsnek/jaen';

export interface IUserAvatarProps extends AvatarProps {
  user: SnekUser;
  showTooltip?: boolean;
  redirectToProfile?: boolean;
  scaleOnHover?: boolean;
}

const UserAvatar: FC<IUserAvatarProps> = ({
  user,
  showTooltip,
  redirectToProfile,
  scaleOnHover,
  ...props
}) => {
  const imgSrc =
    user.details?.avatarURL ?? 'https://api.dicebear.com/6.x/thumbs/svg';
  let avatarProps: AvatarProps = {};

  if (scaleOnHover) {
    avatarProps._hover = {
      ...avatarProps._hover,
      transform: 'scale(1.1)'
    };
    avatarProps.transition = 'transform 0.2s ease-in-out';
  }

  avatarProps = {
    ...avatarProps,
    ...props,
    _hover: { ...avatarProps._hover, ...props._hover } // merge hover props properly
  };

  let avatar: JSX.Element;
  if (redirectToProfile) {
    avatar = (
      <LinkBox as={Avatar} src={imgSrc} {...avatarProps}>
        <LinkOverlay href="/profile" />
      </LinkBox>
    );
  } else {
    avatar = <Avatar src={imgSrc} {...avatarProps} />;
  }

  if (showTooltip) {
    return (
      <Tooltip
        label={<UserPreview user={user} />}
        aria-label={user.username}
        bgColor="transparent"
        boxShadow="lg"
      >
        {avatar}
      </Tooltip>
    );
  }

  return avatar;
};

export default UserAvatar;
