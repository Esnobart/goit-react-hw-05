import { useState, useEffect } from 'react';
import { MoviesList } from '../../Components/MoviesList/MoviesList';
import { useLocation } from 'react-router-dom';
import { fetchTrendsApi } from '../../api';
import Loading from '../../Components/Loading/Loading';

export default function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const location = useLocation();

    useEffect(() => {
        async function fetchTrends() {
            try {
                setLoading(true)
                const response = await fetchTrendsApi();
                setMovies(response);
            } catch (err) {
                console.log(err);
            } finally { setLoading(false) }
        }
        fetchTrends();
    }, []);

    return (<div>{ loading && <Loading />}<MoviesList movies={movies} location={location} /></div>)
}
