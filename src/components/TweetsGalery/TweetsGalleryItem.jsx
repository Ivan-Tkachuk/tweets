import {
  CardItem,
  CardThumb,
  CardLogo,
  CardBackground,
  CardLine,
  CardCircle,
  CardAvatar,
  CardContent,
  CardText,
  CardButton,
} from './TweetsGalleryItem.styled';
import backgroundPicture from '../../images/background_card.png';
import logoGoit from '../../images/logo_goit.svg';

const TweetsGalleryItem = ({ card, onClick, initialFollowers, isFollowed }) => {
  const { avatar, user, tweets } = card;

  const handleFollowClick = () => {
    onClick(user, isFollowed);
    console.log(isFollowed);
    console.log(initialFollowers);
  };

  return (
    <CardItem>
      <CardThumb>
        <CardLogo
          href="https://goit.global/ua/"
          rel="noopener noreferrer nofollow"
          target="blank"
        >
          <img src={logoGoit} alt="logo goit" width="76px" height="22px" />
        </CardLogo>
        <CardBackground>
          <img src={backgroundPicture} alt="background logo" />
        </CardBackground>
        <CardLine />
        <CardCircle>
          <CardAvatar src={avatar} alt={user} width="62" />
        </CardCircle>
        <CardContent>
          <CardText>
            {new Intl.NumberFormat('en-US').format(tweets)} tweets
          </CardText>
          <CardText>
            {isFollowed[user]
              ? new Intl.NumberFormat('en-US').format(
                  initialFollowers[user] + 1
                )
              : new Intl.NumberFormat('en-US').format(
                  initialFollowers[user]
                )}{' '}
            Followers
          </CardText>
        </CardContent>
        <CardButton
          type="button"
          onClick={handleFollowClick}
          isFollowed={isFollowed[user]}
        >
          {isFollowed[user] ? 'followed' : 'follow'}
        </CardButton>
      </CardThumb>
    </CardItem>
  );
};

export default TweetsGalleryItem;
