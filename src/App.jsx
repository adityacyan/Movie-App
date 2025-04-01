import React, {useEffect, useState} from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import Footer from "./components/Footer.jsx";
import MovieList from "./components/MovieList.jsx";

const API_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
};

const App = () => {
    const [SearchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const [GenreList, setGenreList] = useState([]);
    const [SimilarMovieList, setSimilarMovieList] = useState([]);
    const [TrendingMovieList, setTrendingMovieList] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [DebouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [selectedMovieForSimilar, setSelectedMovieForSimilar] = useState(null);

    useDebounce(() => setDebouncedSearchTerm(SearchTerm), 500, [SearchTerm]);

    const fetchMovies = async (query = "") => {
        setIsloading(true);
        setError("");
        try {
            const endpoint = query
                ? `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            if (data.Response === "false") {
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
            console.log(data);
        } catch (error) {
            console.log(`Error fetching movies ${error}`);
            setError("Error fetching movies");
        } finally {
            setIsloading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const endpoint = `${API_BASE_URL}genre/movie/list`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setGenreList(data.genres || []);
        } catch (error) {
            setError("Error fetching genres");
        }
    };

    const fetchSimilarMovies = async (movie_id = null) => {
        try {
            const endpoint = `${API_BASE_URL}movie/${movie_id}/similar`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setSimilarMovieList(data.results || []);
            console.log("Similar movie list", data);

        } catch (error) {
            setError("Error fetching similar movies");
        }
    };

    const fetchTrendingMovies = async () => {
        try {
            const endpoint = `${API_BASE_URL}trending/movie/week?language=en-US`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            setTrendingMovieList(data.results || []);
        } catch (error) {
            setError("Error fetching Trending Movies");
        }
    };

    const handleShowSimilar = async (movie) => {
        // Set basic movie information first
        setSelectedMovieForSimilar({
            id: movie.id,
            title: movie.title,
            img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });

        // Fetch additional movie details asynchronously
        try {
            const response = await fetch(`${API_BASE_URL}movie/${movie.id}`, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const movieDetails = await response.json();

            // Update selected movie with detailed info
            setSelectedMovieForSimilar((prevDetails) => ({
                ...prevDetails,
                overview: movieDetails.overview, // Adding full overview
                score: movieDetails.vote_average, // Adding vote average score
                lang: movieDetails.original_language, // Adding language
                year: movieDetails.release_date,  // Adding release date
                runtime: movieDetails.runtime,  // Adding runtime
                genres: movieDetails.genres,  // Adding genres
            }));

        } catch (error) {
            console.error('Error fetching movie details:', error);
            setError('Error fetching movie details');
        }

        // Fetch similar movies after setting the basic movie info
        await fetchSimilarMovies(movie.id);
    };


    const handleSelectSimilarMovie = async (movie) => {
        // Fetch additional movie details using the /movie/{movie_id} endpoint
        try {
            const response = await fetch(`${API_BASE_URL}movie/${movie.id}`, API_OPTIONS);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const movieDetails = await response.json();

            // Set the selected movie along with the fetched details
            setSelectedMovieForSimilar({
                id: movie.id,
                title: movie.title,
                img: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                overview: movieDetails.overview,  // Adding full overview
                score: movieDetails.vote_average, // Adding vote average score
                lang: movieDetails.original_language, // Adding language
                year: movieDetails.release_date,  // Adding release date
                runtime: movieDetails.runtime,  // Adding runtime
                genres: movieDetails.genres,  // Adding genres
            });

            // Fetch similar movies as well
            await fetchSimilarMovies(movie.id);
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setError('Error fetching movie details');
        }
    };


    const handleCloseSimilar = () => {
        setSelectedMovieForSimilar(null);
        setSimilarMovieList([]);
    };

    useEffect(() => {
        fetchMovies(DebouncedSearchTerm);
        fetchGenres();
    }, [DebouncedSearchTerm]);

    useEffect(() => {
        fetchTrendingMovies();
    }, []);

    return (
        <div>
            <main>
                <div className="pattern">
                    <div className="wrapper">
                        <header>
                            <img src="hero.png" alt="hero banner"/>
                            <h1>
                                Find <span className="text-gradient">Movies</span> which you will
                                enjoy without Hassle
                            </h1>
                        </header>
                        {TrendingMovieList.length > 0 && (
                            <section className="trending">
                                <h2>Trending Movies</h2>
                                <div className="marquee">
                                    <ul className="marquee-content">
                                        {TrendingMovieList.slice(0, 10).map((movie, index) => (
                                            <li key={index}>
                                                <p aria-label={`Movie ranking: ${(index % 10) + 1}`}>
                                                    {(index % 10) + 1}
                                                </p>
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>
                        )}
                        <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
                    </div>
                    <section className="all-movies">
                        <h2>All Movies</h2>
                        {isloading ? (
                            <Spinner/>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <ul>
                                {movieList.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        GenreList={GenreList}
                                        onShowSimilar={handleShowSimilar}
                                    />
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
            {selectedMovieForSimilar && (
                <MovieList
                    selectedMovie={selectedMovieForSimilar}
                    similarMovieList={SimilarMovieList}
                    onSelectMovie={handleSelectSimilarMovie}
                    onClose={handleCloseSimilar}
                />
            )}
        </div>
    );
};

export default App;
