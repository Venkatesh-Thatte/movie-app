import { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI4NzRlMTdlZWE5ZTNhYjE0ZmMzMTMxYTM0NTBlNCIsIm5iZiI6MTc0ODU4ODk0Mi4zOSwic3ViIjoiNjgzOTU5OGU1MGJjZjdkOTRmOGZlNmM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.UTanMqS5AM11om8YJBegdWDtGMh434yh-Ys6mqe07cE",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error("Error fetching movies:", err));

    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
              alt=""
            />
            <p>{card.original_title || card.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;

