import { useEffect, useState } from 'react';

import { getTweetsCards } from 'services/getTweetsCards';
import TweetsGallery from './TweetsGalery/TweetsGallery';

import Button from './Button/Button';

export const App = () => {
  const [tweetsCards, setTweetsCards] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  // const [followState, setFollowState] = useState(false);
  const [initialFollowers, setInitialFollowers] = useState({});
  // const [followers, setFollowers] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    // setFollowers(initialFollowers);
    try {
      getTweetsCards(page).then(data => {
        setTweetsCards(prevTweetsCards => [...prevTweetsCards, ...data]);
        // setTotalPages(Math.floor(data.length / 9));
        if (data.length === 0) {
          setHasMorePages(false);
        }

        const initialFollowers = {};
        const initialIsFollowed = {};
        data.forEach(card => {
          initialFollowers[card.user] = card.followers;
          initialIsFollowed[card.user] = false;
        });
        setInitialFollowers(initialFollowers);
        setIsFollowed(initialIsFollowed);
        // console.log(initialFollowers);

        // setIsFollowed(true);
        
        
        

      });
    } catch (error) {
      console.log('error: ', error);
    }
    

  }, [page]);

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };


  // const handleImageClick = (user) => {
  //   setIsFollowed(!isFollowed);
  //     setInitialFollowers(prevFollowers => {
  //       const newFollowers = { ...prevFollowers };
  //       // newFollowers[user] = newFollowers[user] ? initialFollowers[user] + 1 : initialFollowers[user];

  //       isFollowed ? newFollowers[user] = initialFollowers[user] + 1 : newFollowers[user] = initialFollowers[user] - 1;
  //       // newFollowers[user] = initialFollowers[user] + 1;

  //               // console.log(newFollowers);
  //               console.log(newFollowers[user]);
  //               console.log(isFollowed);
  //               console.log(initialFollowers[user]);
  //       return newFollowers;
  //     });
  // };

  // const handleImageClick = (user, isFollowed) => {
  //   setInitialFollowers(prevFollowers => {
  //     const newFollowers = { ...prevFollowers };
  //     newFollowers[user] = isFollowed ? initialFollowers[user] + 1 : initialFollowers[user] - 1;
      
  //               //      console.log(newFollowers[user]);
  //               // console.log(isFollowed);
  //               // console.log(initialFollowers[user]);
  //     return newFollowers;
  //   });
  // };

  const handleImageClick = (user) => {
    setIsFollowed(prevIsFollowed => ({
      ...prevIsFollowed,
      [user]: !prevIsFollowed[user]
    }));
    //     setInitialFollowers(prevFollowers => {
    //   const newFollowers = { ...prevFollowers };
    //   newFollowers[user] = isFollowed ? initialFollowers[user] + 1 : initialFollowers[user] - 1;
      
    //             //      console.log(newFollowers[user]);
    //             // console.log(isFollowed);
    //             // console.log(initialFollowers[user]);
    //   return newFollowers;
    // });
  };


  return (
    <div>

      <TweetsGallery tweetsCards={tweetsCards} onClick={handleImageClick} initialFollowers={initialFollowers} isFollowed={isFollowed}  />

      {tweetsCards.length > 0 && hasMorePages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )}

      {/* {tweetsCards.length > 0 && page <= totalPages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )} */}

      {/* {searchItem.length > 0 && !isLoading && page <= totalPages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )} */}
    </div>
  );
};



// <ul
// style={{
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexWrap: 'wrap',
//   gap: 40,
//   fontSize: 18,
//   color: '#010101',
// }}
// >
// {tweetsCards.map(card => {
//   return (
//     <li key={nanoid()}>
//       {/* <p>{card.user}</p> */}
//       <img src={card.avatar} alt="avatar"></img>
//       <p>{new Intl.NumberFormat('en-US').format(card.tweets)} tweets</p>
//       <p>
//         {new Intl.NumberFormat('en-US').format(card.followers)}{' '}
//         followers
//       </p>
//       <button type="button">follow</button>
//     </li>
//   );
// })}
// </ul>