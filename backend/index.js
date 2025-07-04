import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3/';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());

app.get('/api/movies/trending', async (req, res) => {
  try {
    const endpoint = `${TMDB_API_BASE_URL}trending/movie/week?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/movies/trending:', error);
    res.status(500).json({ error: 'Error fetching trending movies' });
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const endpoint = `${TMDB_API_BASE_URL}genre/movie/list`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/genres:', error);
    res.status(500).json({ error: 'Error fetching genres' });
  }
});

app.get('/api/movies/:id/similar', async (req, res) => {
  const movieId = req.params.id;
  try {
    const endpoint = `${TMDB_API_BASE_URL}movie/${movieId}/similar`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error in /api/movies/${movieId}/similar:`, error);
    res.status(500).json({ error: 'Error fetching similar movies' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    const endpoint = `${TMDB_API_BASE_URL}movie/${movieId}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(`Error in /api/movies/${movieId}:`, error);
    res.status(500).json({ error: 'Error fetching movie details' });
  }
});

app.get('/api/movies', async (req, res) => {
  const { query, sort_by } = req.query;
  try {
    let endpoint;
    if (query) {
      endpoint = `${TMDB_API_BASE_URL}search/movie?query=${encodeURIComponent(query)}`;
    } else {
      endpoint = `${TMDB_API_BASE_URL}discover/movie?sort_by=${sort_by || 'popularity.desc'}`;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error in /api/movies:', error);
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
