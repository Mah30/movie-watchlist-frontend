import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";


const HomePage = () => {

  const navigate = useNavigate();


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center px-6">
    <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-4">
      🍿 How many amazing movies have you forgotten?
    </h1>
    <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-xl">
      Start your list now and never miss a great movie again!
    </p>
    <Button
      className="px-6 py-3 text-lg font-semibold rounded-md shadow-md bg-red-600 hover:bg-red-700 transition-all duration-300"
      onClick={() => navigate("/login")}
    >
      Get Started - it's free!
    </Button>
  </div>
  );
};

export default HomePage;

