import React from 'react';
import '../styles/CardStyle.css';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigation = useNavigate();

  const handleClick = () => {
    navigation(`/film/${movie.id}`);
  };

  const imgPath = "http://image.tmdb.org/t/p/w500/";
  return (
    <div className='card' onClick={handleClick}>
      {movie.poster_path ? <img src={`${imgPath}${movie.poster_path}`} alt="" /> : null}
      <div className='title'>{movie.title}</div>
    </div>
  );
}

export default MovieCard;

