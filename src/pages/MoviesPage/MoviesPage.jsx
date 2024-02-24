import { Field, Form, Formik } from "formik";
import { useState, useEffect } from "react";
import { MoviesList } from '../../Components/MoviesList/MoviesList';
import { useLocation, useSearchParams } from "react-router-dom";
import { fetchSearch } from "../../api";
import Loading from "../../Components/Loading/Loading";

export default function MoviesPage() {
    const url = useLocation();
    const [moviesList, setMoviesList] = useState([]);
    const [movies, setMovies] = useState('');
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useSearchParams();
    const search = filter.get('filter') ?? '';

    const fetchMovies = async (searchQuery) => {
        try {
            setLoading(true)
            const response = await fetchSearch(searchQuery);
            setMoviesList(response);
        } catch (err) {
            console.log(err);
        } finally {setLoading(false)}
    };

    useEffect(() => {
        const initialSearch = search;
        if (initialSearch) {
            setMovies(initialSearch);
            fetchMovies(initialSearch);
        }
    }, [movies]);

    return (
        <div>
            {loading && <Loading />}
            <Formik
                initialValues={{ search: search }} 
                onSubmit={(values) => {
                    if (values.search.trim() === '') {
                        return;
                    }
                    setMovies(values.search);
                    setFilter({ filter: values.search });
                    fetchMovies(values.search);
                }}
            >
                <Form>
                    <Field
                        type="text"
                        autoComplete="off"
                        name="search"
                        autoFocus
                    />
                    <button type="submit">Search</button>
                </Form>
            </Formik>
            {moviesList.length > 0 ? <MoviesList movies={moviesList} location={url} /> : <p>There is nothing</p>}
        </div>
    );
}
