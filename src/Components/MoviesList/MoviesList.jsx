import { NavLink } from 'react-router-dom'

export const MoviesList = ({movies, location}) => {
    return (
        <ul>
            {movies.map((movie => (
                <li key={movie.id}>
                    <NavLink to={`/movies/${movie.id}`} state={location}>{movie.title}</NavLink>
                </li>
            )))}
        </ul>
    )
}
