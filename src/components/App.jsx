import { useEffect, useState, useRef } from 'react';
import { getTweetsCards } from 'services/getTweetsCards';
import TweetsGallery from './TweetsGalery/TweetsGallery';
import Button from './Button/Button';
import { Section, Container } from './App.styled';
import Notiflix from 'notiflix';

const getInitialStatus = () => {
  const savedStatus = localStorage.getItem('isFollowed');
  if (savedStatus !== null) {
    const parsedStatus = JSON.parse(savedStatus);
    return parsedStatus;
  }
  return {};
};

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
          Notiflix.Notify.warning('There are no more cards');
        }
        const initialFollowers = {};
        data.forEach(card => {
          initialFollowers[card.user] = card.followers;
          if (!(card.user in isFollowedRef.current)) {
            isFollowedRef.current[card.user] = false;
          }
        });
        setInitialFollowers(prevInitialFollowers => ({
          ...prevInitialFollowers,
          ...initialFollowers,
        }));
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }, [page]);

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = user => {
    const newIsFollowed = { ...isFollowedRef.current };
    newIsFollowed[user] = !newIsFollowed[user];
    localStorage.setItem('isFollowed', JSON.stringify(newIsFollowed)); // сохраняем в localStorage
    isFollowedRef.current = newIsFollowed;
    const newFollowers = initialFollowers[user];
    setInitialFollowers(prevInitialFollowers => ({
      ...prevInitialFollowers,
      [user]: newFollowers,
    }));
  };

  return (
    <main>
      <Section>
        <Container>
          <TweetsGallery
            tweetsCards={tweetsCards}
            onClick={handleImageClick}
            initialFollowers={initialFollowers}
            isFollowed={isFollowedRef.current}
          />
          {tweetsCards.length > 0 && hasMorePages && (
            <Button text="Load more" onClick={handleLoad}></Button>
          )}
        </Container>
      </Section>
    </main>
  );
};
