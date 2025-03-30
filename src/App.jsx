import React, {useEffect, useState} from 'react';
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    }
}


const App = () => {

    const [SearchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const fetchMovies = async () => {
        setIsloading(true);
        setError('');
        //always use try and catch in async
        try {
            const endpoint = `${API_BASE_URL}discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            alert(response);

            if (!response.ok) {
                throw new Error(response.statusText);

            }
            const data = await response.json();

            if (data.Response === 'false') {
                setErrorMessage(data.Error);
                setMovieList([]);
                return;
            }
            setMovieList(data.results || [])


            console.log(data);
        } catch (error) {
            console.log(`Error fetching movies ${error}`)
            console.log(API_KEY)
            setError("Error fetching movies");
        } finally {
            setIsloading(false);
        }
    }


    useEffect(() => {
        fetchMovies()
    }, []); //for searchtmdb

    return (
        <main>
        <div className="pattern">
            <div className="wrapper">
            <header>
                <img src="hero.png" alt="hero banner" />
                <h1> Find <span className="text-gradient">Movies</span> which you will enjoy without Hassle</h1>

            </header>

            <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
            <h1 className="text-white">{SearchTerm}</h1>
            </div>

            <section className="all-movies">


                <h2 className="mt-20"> All Movies</h2>
                {isloading ? (
                    <Spinner/>
                ) : error ? (<p className="text-red-500">{error}</p>) : (
                    <ul>
                        {movieList.map((movie) => (
                            <li key={movie.id} className="text-white">{movie.title}</li>

                        ))}
                    </ul>
                )}

            </section>

        </div>


            </main>
    );/*//props are like inputs which are passed into components as arguments*/
};

export default App;