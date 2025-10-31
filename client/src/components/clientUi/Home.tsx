import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search-food/${query}`);
    } else {
      alert("Please enter something to search!");
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: "url('./banner.png')" }}
    >
      <div className="absolute inset-0 h-full bg-black/50 mt-16"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-14 w-full text-left">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Craving something delicious?
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Discover your favorite meals from top restaurants — delivered fast &
            fresh right to your doorstep.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-md max-w-md">
            <input
              type="text"
              placeholder="Search for food or restaurants..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 outline-none text-sm md:text-base"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-4 cursor-pointer flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
