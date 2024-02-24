import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useParams, useLocation } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { fetchFilm } from '../../api';
import Loading from '../../Components/Loading/Loading';

export default function MovieDetailsPage() {
    const location = useLocation();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState(null);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

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
            <NavLink to={location.state}>Go Back</NavLink>
            {movie && (
                <div>
                <div className={css.detailsContainer}>
                    <div className={css.imageContainer}><img src={imgUrl + movie.poster_path} /></div>
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
