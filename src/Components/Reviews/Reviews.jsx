import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsApi } from "../../api";
import Loading from "../Loading/Loading";

export default function Reviews() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                setLoading(true);
                const response = await fetchReviewsApi(id);
                setReviews(response);
            } catch (err) {
                console.log(err);
            } finally {setLoading(false)}
        }
        fetchReviews();
    }, [id]);

    return (
        <div>
            { loading && <Loading />}
            {reviews.length === 0 ? (<p>No reviews yet</p>) : (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}