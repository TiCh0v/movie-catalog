import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from '../components/MovieCard';
import Bottom from '../components/Bottom';
import { IonIcon } from '@ionic/react';
import { playOutline, searchOutline, closeOutline } from 'ionicons/icons';
import YouTube from 'react-youtube';

function App() {
  const [movies, setMovies] = useState(null);
  const [searchRequest, setSearchRequest] = useState(null);
  const [heroFilm, setSelectedHeroFilm] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);

  const url = 'https://api.themoviedb.org/3';
  const imgPath = "https://image.tmdb.org/t/p/w1280";

  const fetchMovies = async (searchRequest) => {
    const type = searchRequest ? 'search' : 'discover'
    const { data: { results } } = await axios.get(`${url}/${type}/movie`, {
      params: {
        api_key: "27c23516219315bc27d4b93cd35f7b7b",
        query: searchRequest
      }
    });
    
    setMovies(results);
    setSelectedHeroFilm(results[0]);
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
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const firstMovieId = movies[0].id;
      fetchMovie(firstMovieId);
    }
  }, [movies]);

  const renderTrailer = (trailer) => {
    if (!trailer || !trailer.videos || !trailer.videos.results) {
      return null;
    }

    const officialTrailer = trailer.videos.results.find(vid => vid.official && vid.type === "Trailer");
    
    if (!officialTrailer) {
      return null;
    }

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

  const displayMovies = () => {
    if (!movies) {
      return <div>Loading...</div>;
    }
  
    return movies.map(movie => (
      movie.poster_path === null ? null : (
        <MovieCard 
          key={movie.id}
          movie={movie}
        />
      )
    ));
  };

  return (
    <>
      <div className='main'>
        <div className='search-block'>
          <div className='name'>Movie app</div>
          <div className='form'>
            <input placeholder="type film name..." 
                    type="text" 
                    name="" 
                    id="" 
                    onChange={(e) => { setSearchRequest(e.target.value) }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' ) {
                        fetchMovies(searchRequest);
                        setPlayTrailer(false);
                      }
                    }} />
            <button type={'submit'} onClick={() => {
              fetchMovies(searchRequest)
              setPlayTrailer(false)
              }}><IonIcon icon={searchOutline} style={{ color: 'white', fontSize: '20px' }} />
            </button>
          </div>
        </div>
        {Object.keys(heroFilm).length > 0 && (
          <div className='hero-film' style={{ backgroundImage: `url(${imgPath}${heroFilm.backdrop_path})` }}>
            <div className='hero-content'>
              {playTrailer ? renderTrailer(trailer) : 
              <div>
                <button className='play-trailer' onClick={ () => setPlayTrailer(true) }>
                  <IonIcon icon={playOutline} />
                  Play
                </button>
                <h1 className='hero-film-title'>{heroFilm.title}</h1>
                <p className='hero-film-description'>{heroFilm.overview}</p>
              </div>
              }
            </div>
          </div>
        )}

        <div className='gridbox'>
          {displayMovies()}
        </div>
        <Bottom />
      </div>
    </>
  );
}

export default App;
