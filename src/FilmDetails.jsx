import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/FilmDetails.css';
import Bottom from '../components/Bottom';
import { IonIcon } from '@ionic/react';
import { playOutline, closeOutline } from 'ionicons/icons';
import YouTube from 'react-youtube'; // Добавлен импорт

function FilmDetails() {
  const { id } = useParams();
  const [filmInfo, setFilmInfo] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const imgPath = "https://image.tmdb.org/t/p/w1280";
  const url = 'https://api.themoviedb.org/3';

  const loadFilmInfo = async () => {
    try {
      const response = await axios.get(`${url}/movie/${id}`, {
        params: {
          api_key: "27c23516219315bc27d4b93cd35f7b7b"
        }
      });
      setFilmInfo(response.data);
      
    } catch (error) {
      console.error('Error fetching film details:', error);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const { data } = await axios.get(`${url}/movie/${id}`, {
        params: {
          api_key: "27c23516219315bc27d4b93cd35f7b7b",
          append_to_response: 'videos'
        }
      });
      setTrailer(data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    }
  };

  useEffect(() => {
    loadFilmInfo();
    fetchMovie(id)
  }, []);

  if (!filmInfo) {
    return <div>Loading...</div>;
  }

  const renderTrailer = () => {
    if (!trailer || !trailer.videos || !trailer.videos.results) {
      return null;
    }

    const officialTrailer = trailer.videos.results.find(vid => vid.official && vid.type === "Trailer");
    
    if (!officialTrailer) {
      return null;
    }

    // return (
    //   <YouTube 
    //     videoId={officialTrailer.key}
    //     containerClassName={"youtube-container"}
    //     opts={{
    //       width: '100%',
    //       height: '500px'
    //     }}
    //   />
    // );
    return (
      <div style={{ position: 'relative' }}>
        <YouTube 
          videoId={officialTrailer.key}
          containerClassName={"youtube-container"}
          opts={{
            width: '100%',
            height: '500px'
          }}
        />

        <button style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', width: '30px', height: '30px', display:'flex' }} 
                onClick={()=> setPlayTrailer(false)}>
          <IonIcon icon={closeOutline} style={{ color: 'white', fontSize: '20px' }} />
        </button>
      </div>
    );
  };

  // Округляем оценку до одного знака после запятой
  const voteAverage = filmInfo.vote_average.toFixed(1);

  return (
    <div className='main-element'>
      {/* <div className='trailler' style={{backgroundImage: `url(${imgPath}${filmInfo.backdrop_path})`}}>
        {playTrailer ? renderTrailer() : null} 
        <button className='play-trailer' onClick={() => setPlayTrailer(true)}>
          <IonIcon icon={playOutline} />
          Play
        </button>
      </div> */}
      <div className='trailler' style={{ backgroundImage: `url(${imgPath}${filmInfo.backdrop_path})` }}>
        <div className='hero-content'>
          {playTrailer ? renderTrailer(trailer) : 
          <button className='play-trailer' onClick={ () => setPlayTrailer(true) }>
            <IonIcon icon={playOutline} />
            Play
          </button>
          }
        </div>
          
      </div>
          
      <div className='infoblock'>
        <div className='upperinfoblock'>
          <img src={`${imgPath}${filmInfo.poster_path}`} alt="poster" className='poster'/>
          <div className='incl'>
            <div className='main_info'>
              <h1 className='film_name'>{filmInfo.original_title}</h1>
              <p className='rate'>{voteAverage}</p>
            </div>
            <div className='additional_info'>
              <p style={{ fontSize: '15pt', fontWeight: '600', marginTop: '2rem', paddingLeft: '1rem', paddingBottom: '0.6rem' }}>About movie:</p>
              <p className='des_item'>
                Language: <span>{filmInfo.original_language}</span>
              </p>
              <p className='des_item'>
                Budget: <span>${filmInfo.budget}</span>
              </p>
              <p className='des_item'>
                Runtime: <span>{filmInfo.runtime} minutes</span>
              </p>
              <p className='des_item'>
                Country: <span>{filmInfo.production_countries[0].name}</span>
              </p>
              <p className='des_item'>
                Production: <span>{filmInfo.production_companies[0].name}</span>
              </p>
            </div>
          </div>
        </div>
        <div className='description'>
          <span className='title'>Description:</span>
          <p className='overview'>{filmInfo.overview}</p>
        </div>
      </div>
      <Bottom />
    </div>
  );
}

export default FilmDetails;
