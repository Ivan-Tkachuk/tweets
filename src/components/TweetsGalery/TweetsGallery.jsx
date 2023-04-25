// import PropTypes from 'prop-types';
import TweetsGalleryItem from './TweetsGalleryItem';
import { Gallery } from './TweetsGalery.styled';
import { nanoid } from 'nanoid';

const TweetsGallery = ({ tweetsCards, onClick, initialFollowers, isFollowed }) => {
  return (
    <Gallery>
      {tweetsCards.map(card => {
        return (
          <TweetsGalleryItem
          key={nanoid()}
            card={card}
            onClick={onClick}
            initialFollowers={initialFollowers}
            isFollowed={isFollowed}
          ></TweetsGalleryItem>
        );
      })}
    </Gallery>
  );
};

// TweetsGallery.propTypes = {
//   searchItem: PropTypes.arrayOf(PropTypes.shape).isRequired,
//   onClick: PropTypes.func.isRequired,
// };

export default TweetsGallery;