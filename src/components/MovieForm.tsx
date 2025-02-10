import React, { useContext, useState } from "react";
import { movieService } from "../services/movieService";
/* import { movieStatusService } from "../services/movieStatusService"; */
import { SessionContext } from "../SessionContext/SessionContext";




const MovieForm = ({ onMovieAdded }: { onMovieAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<"Watched" | "To Watch">("To Watch");

  const session = useContext(SessionContext);
  const token = session?.token;

  if (!token) {
    return <h2>Loading...</h2>; 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await movieService.addMovie({ title, genre, status, userId: 1 }, token);
    onMovieAdded();
    setTitle("");
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value as "To Watch" | "Watched")}>
        <option value="To Watch">To Watch</option>
        <option value="Watched">Watched</option>
      </select>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
 



/* import { useState } from "react";
import { movieService } from "../services/movieService";

const MovieForm = ({ onMovieAdded }: { onMovieAdded: () => void }) => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<"To Watch" | "Watched">("To Watch"); // ✅ Correção no estado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a movie.");
      return;
    }

    try {
      await movieService.addMovie({ title, genre, status, userId: 1 }, token);
      onMovieAdded();
      setTitle("");
      setGenre("");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      
     
      <select value={status} onChange={(e) => setStatus(e.target.value as "To Watch" | "Watched")}>
        <option value="To Watch">To Watch</option>
        <option value="Watched">Watched</option>
      </select>

      <button type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
 */