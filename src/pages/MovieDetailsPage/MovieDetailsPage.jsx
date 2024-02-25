import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { fetchFilm } from '../../api';
import Loading from '../../Components/Loading/Loading';
import { useRef } from 'react';

export default function MovieDetailsPage() {
    const location = useLocation();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const goBack = useRef(location?.state ?? '/')
    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg'



    useEffect(() => {
        async function fetchMovie() {
            try {
                setLoading(true);
                const response = await fetchFilm(id);
                setMovie(response);
            } catch (err) {
                console.log(err);
            } finally {setLoading(false)}
        }
        fetchMovie();
    }, [id]);

    return (
        <div>
            { loading && <Loading />}
            <NavLink to={goBack.current}>Go Back</NavLink>
            {movie && (
                <div>
                <div className={css.detailsContainer}>
                    <div className={css.imageContainer}><img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  : defaultImg} width={250} alt="poster" /></div>
                    <div className={css.infoContainer}>
                        <h1>{movie.title}</h1>
                        <p>User score: {movie.vote_average > 0 ? ((movie.vote_average / 10) * 100).toFixed(2) + '%' : 'N/A' }</p>
                        <b>Overview</b>
                            {movie.overview !== '' ? <p>{movie.overview}</p> : <p>No overviews yet</p>}
                        <b>Genres</b>
                        <ul>
                            {movie.genres.map((genre => (
                                <li key={genre.id}>{genre.name}</li>
                            )))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className={css.additionalContainer}>
                        <p>Additional information</p>
                        <ul>
                            <li>
                                <Link to={`cast`}>Cast</Link>
                            </li>
                            <li>
                                <Link to={`reviews`}>Reviews</Link>
                            </li>
                        </ul>
                    </div>
                    <Outlet />
                </div>
            )}
        </div>
    );
}
