import MoviesPage from "./MoviesPage";


const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 relative min-h-screen">
      {/* Apenas esta div tem a imagem de fundo */}
      
      <div
        className=" fixed inset-0 w-full h-full z-[-1]"
        style={{
          backgroundImage: "url('/movie-background2.jpg')", // Caminho correto da imagem
          backgroundSize: "1600px 100%", /* cover */
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.4, // Ajuste para um fundo sutil
        }}
      ></div>

      {/* Conteúdo do Profile, sem ser afetado pela imagem de fundo */}
      <div className="relative z-10">
        <MoviesPage /> {/* MoviesPage permanece intacto */}
      </div>
    </div>
  );
};

export default Profile;