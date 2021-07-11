import React from "react";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
const Watchlist = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const { watch, setWatch } = useGlobalContext();
  const array = watch.filter((item) => typeof item !== "string");
  const list = [...new Set(array.map((item) => item))];

  const dict = {};
  list.map((item) => {
    dict[item.id] = 0;
  });
  list.map((item) => {
    dict[item.id]++;
  });
  if (loading) {
    return <Loading />;
  }
  const handler = (id) => {
    const newList = watch.filter((item) => item.id !== id);

    setWatch(newList);
  };

  return (
    <>
      <h1 className="heading">Your watchlist</h1>
      <section className="movies ">
        {list.map((item) => {
          const { id, title, poster_path } = item;
          const image = `https://image.tmdb.org/t/p/w500/${poster_path}`;
          if (dict[id] !== 0) {
            dict[id] = 0;
            return (
              <article key={id} className="movie cocktail">
                <img src={image} alt={title} />
                <div className="movie-info">
                  <h4>{title}</h4>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(title);
                    }}
                  >
                    Copy to the clipboard
                  </button>
                  <button onClick={() => handler(id)}>Remove</button>
                </div>
              </article>
            );
          }
        })}
      </section>
    </>
  );
};

export default Watchlist;
