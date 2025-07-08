import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZmI4NzRlMTdlZWE5ZTNhYjE0ZmMzMTMxYTM0NTBlNCIsIm5iZiI6MTc0ODU4ODk0Mi4zOSwic3ViIjoiNjgzOTU5OGU1MGJjZjdkOTRmOGZlNmM0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.UTanMqS5AM11om8YJBegdWDtGMh434yh-Ys6mqe07cE",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("Video Results:", res.results);

        const trailer = res.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );

        setApiData(trailer || {});
      })
      .catch((err) => console.error("Error fetching trailer:", err));
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => navigate(-1)}
        className="back-button"
      />
      {apiData?.key ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p>{apiData.published_at?.slice(0, 10)}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>Loading trailer...</p>
      )}
    </div>
  );
};

export default Player;

