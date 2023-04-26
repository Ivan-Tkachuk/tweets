// import { useEffect, useState } from 'react';

// import { getTweetsCards } from 'services/getTweetsCards';
// import TweetsGallery from './TweetsGalery/TweetsGallery';

// import Button from './Button/Button';


// // const getInitialStatus = () => {
// //   const savedStatus = localStorage.getItem('isFollowed');

// //   if (savedStatus !== null) {
// //     const parsedStatus = JSON.parse(savedStatus);
// //     return parsedStatus;
// //   }
// //   return;
// // }

// const getInitialFollowers = () => {
//   const savedFollowers = localStorage.getItem('isFollowed');
//   return savedFollowers ? JSON.parse(savedFollowers) : {};
// };


// export const App = () => {
//   const [tweetsCards, setTweetsCards] = useState([]);
//   // const [totalPages, setTotalPages] = useState(0);
//   const [page, setPage] = useState(1);
//   const [hasMorePages, setHasMorePages] = useState(true);

//   const [initialFollowers, setInitialFollowers] = useState({});
//   // const [followers, setFollowers] = useState({});
//   // const [initialIsFollowed, setInitialIsFollowed] = useState({});
//   const [isFollowed, setIsFollowed] = useState(getInitialFollowers);

//   useEffect(() => {
//     // setFollowers(initialFollowers);
//     localStorage.setItem('isFollowed', JSON.stringify(isFollowed));

//     try {
//       getTweetsCards(page).then(data => {
//         setTweetsCards(prevTweetsCards => [...prevTweetsCards, ...data]);
//         // setTotalPages(Math.floor(data.length / 9));
//         if (data.length === 0) {
//           setHasMorePages(false);
//         }

//         const initialFollowers = {};
//         const initialIsFollowed = {};
//         data.forEach(card => {
//           initialFollowers[card.user] = card.followers;
//           initialIsFollowed[card.user] = false;
//         });
//         setInitialFollowers(prevInitialFollowers => ({...prevInitialFollowers, ...initialFollowers}));
//         setIsFollowed(prevIsFollowed => ({...prevIsFollowed, ...initialIsFollowed}));

//         // setIsFollowed(true);
//         console.log(isFollowed);

//       });
//     } catch (error) {
//       console.log('error: ', error);
//     }
    

//   }, [page]);

//   const handleLoad = () => {
//     setPage(prevPage => prevPage + 1);
//   };


//   // const handleImageClick = (user, isFollowed) => {
//   //   setInitialFollowers(prevFollowers => {
//   //     const newFollowers = { ...prevFollowers };
//   //     newFollowers[user] = isFollowed ? initialFollowers[user] + 1 : initialFollowers[user] - 1;
      
//   //               //      console.log(newFollowers[user]);
//   //               // console.log(isFollowed);
//   //               // console.log(initialFollowers[user]);
//   //     return newFollowers;
//   //   });
//   // };

//   const handleImageClick = (user) => {
//     setIsFollowed(prevIsFollowed => ({
//       ...prevIsFollowed,
//       [user]: !prevIsFollowed[user]
//     }));

//     // localStorage.setItem('isFollowed', JSON.stringify({
//     //   ...isFollowed,
//     //   [user]: !isFollowed[user]
//     // }));
//   };


//   return (
//     <div>

//       <TweetsGallery tweetsCards={tweetsCards} onClick={handleImageClick} initialFollowers={initialFollowers} isFollowed={isFollowed}  />

//       {tweetsCards.length > 0 && hasMorePages && (
//         <Button text="Load more" onClick={handleLoad}></Button>
//       )}

//       {/* {tweetsCards.length > 0 && page <= totalPages && (
//         <Button text="Load more" onClick={handleLoad}></Button>
//       )} */}

//       {/* {searchItem.length > 0 && !isLoading && page <= totalPages && (
//         <Button text="Load more" onClick={handleLoad}></Button>
//       )} */}
//     </div>
//   );
// };


import { useEffect, useState, useRef } from 'react';
import { getTweetsCards } from 'services/getTweetsCards';
import TweetsGallery from './TweetsGalery/TweetsGallery';
import Button from './Button/Button';

const getInitialStatus = () => {
  const savedStatus = localStorage.getItem('isFollowed');
  if (savedStatus !== null) {
    const parsedStatus = JSON.parse(savedStatus);
    return parsedStatus;
  }
  return {};
}

export const App = () => {
  const [tweetsCards, setTweetsCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [initialFollowers, setInitialFollowers] = useState({});
  const isFollowedRef = useRef(getInitialStatus());

  useEffect(() => {
    localStorage.setItem('isFollowed', JSON.stringify(isFollowedRef.current));
  }, [isFollowedRef]);

  useEffect(() => {
    try {
      getTweetsCards(page).then(data => {
        setTweetsCards(prevTweetsCards => [...prevTweetsCards, ...data]);
        if (data.length === 0) {
          setHasMorePages(false);
        }
        const initialFollowers = {};
        data.forEach(card => {
          initialFollowers[card.user] = card.followers;
          if (!(card.user in isFollowedRef.current)) {
            isFollowedRef.current[card.user] = false;
          }
        });
        setInitialFollowers(prevInitialFollowers => ({...prevInitialFollowers, ...initialFollowers}));
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }, [page]);

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (user) => {
    const newIsFollowed = { ...isFollowedRef.current };
    newIsFollowed[user] = !newIsFollowed[user];
    localStorage.setItem("isFollowed", JSON.stringify(newIsFollowed)); // сохраняем в localStorage
    isFollowedRef.current = newIsFollowed;
    const newFollowers = newIsFollowed[user] ? initialFollowers[user] + 1 : initialFollowers[user] - 1;
  setInitialFollowers((prevInitialFollowers) => ({ ...prevInitialFollowers, [user]: newFollowers }));
    // return { current: newIsFollowed };
  };

  // const handleImageClick = (user) => {
  //   isFollowedRef.current[user] = !isFollowedRef.current[user];
  //   console.log(isFollowedRef.current);
  // };

  return (
    <div>
      <TweetsGallery tweetsCards={tweetsCards} onClick={handleImageClick} initialFollowers={initialFollowers} isFollowed={isFollowedRef.current} />
      {tweetsCards.length > 0 && hasMorePages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )}
    </div>
  );
};

