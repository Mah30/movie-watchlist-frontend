import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../../src/SessionContext/SessionContext";
import { userMovieService } from "../../src/services/userMovieService";
import { Button } from "flowbite-react";
import MoviesPage from "./MoviesPage";


const Profile = () => {
  const { token, tokenPayload } = useContext(SessionContext) ?? {};

  return (
    <div className="max-w-6xl mx-auto p-6">
      <MoviesPage />
    
    </div>
  );
};

export default Profile;