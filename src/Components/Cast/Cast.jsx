import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchCastApi } from "../../api";
import Loading from "../Loading/Loading";

export default function Cast() {
    const { id } = useParams();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const imgUrl = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        async function fetchCast() {
            try {
                setLoading(true);
                const response = await fetchCastApi(id);
                setCast(response);
            } catch (err) {
                console.log(err);
            } finally {setLoading(false)}
        }
        fetchCast();
    }, [id])

    return (
        <div>
            {loading && <Loading />}
            <ul>
                {cast.map((actor => (
                    <li key={actor.id}>
                        <p>{actor.name}</p>
                        <p>Character: {actor.character}</p>
                        <img src={imgUrl + actor.profile_path} alt={`${actor.name}'s photo`} />
                    </li>
                )))}
            </ul>
        </div>
    )
}