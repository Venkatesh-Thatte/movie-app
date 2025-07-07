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

  useEffect(() => {
    fetch(`https://proxy-tmdb-chi.vercel.app/api/trailer?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("Video Results:", res.results);

        const trailer = res.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        setApiData(trailer || {});
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back"
        onClick={() => {
          navigate(-1);
        }}
      />
      {apiData?.key ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="trailer"
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
