// import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './TweetsGalleryItem.styled';

// import { useState } from 'react';

// const [isFollowed, setIsFollowed] = useState(false);

const TweetsGalleryItem = ({ card, onClick, initialFollowers, isFollowed }) => {

  const { avatar, user, tweets } = card;

  // const [isFollowed, setIsFollowed] = useState(false); // добавляем состояние isFollowed в локальное состояние компонента

  const handleFollowClick = () => {
    onClick(user, isFollowed);
    console.log(isFollowed);
    console.log(initialFollowers);
    
     // передаем user и текущее состояние isFollowed в родительский компонент
  };


  return (
    <GalleryItem>
      <GalleryItemImage
        src={avatar}
        alt={user}
      />
      <p>{new Intl.NumberFormat('en-US').format(tweets)} tweets</p>
      <p>{isFollowed[user] ? new Intl.NumberFormat('en-US').format(initialFollowers[user] + 1) 
      : new Intl.NumberFormat('en-US').format(initialFollowers[user])} followers old</p>
 <p>{new Intl.NumberFormat('en-US').format(initialFollowers[user])} followers new</p>
      <button
        type='button'
        onClick={handleFollowClick}>
        {isFollowed[user] ? 'followed' : 'follow'}
          
      {/* //   className={isFollowed ? 'followed' : ''}
      // 
      //   {isFollowed ? 'followed' : 'follow'} */}


      </button>
    </GalleryItem>
  );
};



export default TweetsGalleryItem;

// ImageGalleryItem.propTypes = {
//   image: PropTypes.shape({
//     webformatURL: PropTypes.string.isRequired,
//     tags: PropTypes.string.isRequired,
//   }).isRequired,
//   onClick: PropTypes.func.isRequired,
// };