import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { getTweetsCards } from 'services/getTweetsCards';

import Button from './Button/Button';





export const App = () => {

  const [tweetsCards, setTweetsCards] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      getTweetsCards(page).then(data => {
        setTweetsCards(prevTweetsCards => [...prevTweetsCards, ...data]);
        // setTweetsCards(data);
        setTotalPages(Math.floor(data.length / 9));
        console.log(data);
        console.log(page);
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }, [page]);

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  // number
  // let newNumber = new Intl.NumberFormat('en-US').format(number);



  return (
      
      <div>
  <ul       style={{
        
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 40,
        fontSize: 18,
        color: '#010101'
      }}>
    {tweetsCards.map(card => {
     
      return (
        <li key={nanoid()}>
{/* <p>{card.user}</p> */}
<img src={card.avatar} alt='avatar'></img>
<p>{new Intl.NumberFormat('en-US').format(card.tweets)} tweets</p>
<p>{new Intl.NumberFormat('en-US').format(card.followers)} followers</p>
<button type='button'>follow</button>
        </li>
      )
    })}
  </ul>
  {/* <button type='button' onClick={handleLoad}>Load more</button> */}

  {tweetsCards.length > 0 && page <= totalPages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )}

  {/* {searchItem.length > 0 && !isLoading && page <= totalPages && (
        <Button text="Load more" onClick={handleLoad}></Button>
      )} */}

</div>

  );
};
