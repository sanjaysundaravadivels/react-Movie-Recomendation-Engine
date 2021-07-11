import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url1 = `https://api.themoviedb.org/3/search/movie?query=`;
const url2 = `&api_key=1d12dc17a04a259f9d9b6674ca12df1b`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("batman");
  const [cocktails, setCocktails] = useState([]);
  const [watch, setWatch] = useState([]);
  const [list, setList] = useState([]);
  const [recloading, setRecLoading] = useState(false);
  const setting = (id, title, poster_path) => {
    const newItem = { id, title, poster_path };
    setWatch([...watch, newItem]);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url1}${searchTerm}${url2}`);
      const data = await response.json();
      const { results } = data;
      if (results) {
        const newCocktails1 = results.map((item) => {
          let { id, title, overview, poster_path, vote_average } = item;
          const img = `https://image.tmdb.org/t/p/w500/${poster_path}`;
          if (overview === "") {
            overview = "Coming soon....";
          }
          return {
            id: id,
            name: title,
            image: img,
            info: overview,
            glass: vote_average,
            poster: poster_path,
          };
        });
        const newCocktails = newCocktails1.filter(
          (item) => item.poster !== null
        );
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    fetchData();
  }, [searchTerm, fetchData]);
  return (
    <AppContext.Provider
      value={{
        loading,
        cocktails,
        setSearchTerm,
        setWatch,
        watch,
        setting,
        list,
        setList,
        recloading,
        setRecLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
