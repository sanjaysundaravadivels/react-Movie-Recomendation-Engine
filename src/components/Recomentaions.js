import React from "react";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Recomentaions = ({ id }) => {
  const { recloading, setRecLoading, list, setList } = useGlobalContext();

  const key = parseInt(id);

  const url = `https://api.themoviedb.org/3/movie/${key}/recommendations?api_key=1d12dc17a04a259f9d9b6674ca12df1b`;

  useEffect(() => {
    fetchRecomendation();
  }, []);
  const fetchRecomendation = async () => {
    setRecLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setList(data.results);
      setRecLoading(false);
    } catch (error) {
      console.log(error);
      return <p>Sorry something went wrong... try again later</p>;
    }
  };
  if (recloading) {
    return <Loading></Loading>;
  }
  if (list.length === 0) {
    return <p className="recomendation-title">Sorry no movies found....</p>;
  }
  return (
    <section className="recomendation">
      {list.map((item) => {
        const { id, title, poster_path } = item;
        const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
        return (
          <Link to={`/cocktail/${id}`} key={id}>
            <div key={id} className="small-img">
              <img src={image} alt={title} />
              <h6 className="movie-title">{title}</h6>
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default Recomentaions;
