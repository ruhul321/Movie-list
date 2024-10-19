import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import useLazyLoad from "../useLazyLoad";
import MovieCard from "./MovieCard";

const MovieGrid = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const TOTAL_PAGES = 3;

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://test.create.diagnal.com/data/page${page}.json`
      );
      setMovies((prevMovies) => [
        ...prevMovies,
        ...response.data.page["content-items"].content,
      ]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page <= TOTAL_PAGES) {
      fetchMovies(page);
    }
  }, [page]);

  useLazyLoad(() => {
    if (!loading && page < TOTAL_PAGES) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "10px" }}>
      <Grid container spacing={1} justifyContent="center">
        {filteredMovies.map((movie, index) => (
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
            key={index}
            style={{ maxWidth: "100%" }}
          >
            <MovieCard movie={movie} />{" "}
          </Grid>
        ))}
      </Grid>

      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
