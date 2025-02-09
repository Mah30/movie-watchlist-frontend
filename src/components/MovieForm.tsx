import React, { useState } from "react";
import { addMovie } from "../services/movieService";



const MovieForm = ({ onMovieAdded }: { onMovieAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("To Watch");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie({ title, genre, status, userId: 1 }); // userId is temporarily fixed
    onMovieAdded();
    setTitle("");
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Watch">To Watch</option>
        <option value="Watched">Watched</option>
      </select>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
