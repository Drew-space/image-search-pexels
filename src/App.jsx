import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [images, setImages] = useState([]);
  const [laoding, setLaoding] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);

  const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const PEXELS_API_URL = "https://api.pexels.com/v1/search";

  const fetchImages = async (searchQuery = "nature", pageNum = 1) => {
    if (!PEXELS_API_KEY) {
      setError("API key is missing. Please set your Pexels API key. ");
      return;
    }
    setLaoding(true);
    setError(null);

    try {
      const response = await fetch(
        `${PEXELS_API_URL}?query=${encodeURIComponent(
          searchQuery
        )}&per_page=20&page=${pageNum}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);

      if (pageNum === 1) {
        setImages(data.photos || []);
        setPage(1);
      } else {
        setImages((prev) => [...prev, ...(data.photos || [])]);
        setPage(pageNum);
      }
    } catch (error) {
      console.log("Fetch error:", error);
      setError(error.message || "An error occurred while fetching images.");
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    fetchImages(query);
  }, []);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    fetchImages(searchTerm, 1);
  };

  return (
    <div className=" min-h-screen bg-gray-50 ">
      <div className="container mx-auto p-4 ">
        <h1 className="text-4xl font-black text-center text-gray-800 mb-2 ">
          Image Search App
        </h1>
        <p className=" text-center text-gray-600 mb-8 ">
          Powered by Pexels API
        </p>

        <SearchBar onSearch={handleSearch} />
        {error && (
          <div>
            <p className="text-red-500 text-center mb-4"> {error} </p>
          </div>
        )}
        <ImageGrid images={images} laoding={laoding} />
        {images.length > 0 && !laoding && (
          <div className="text-center">
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => fetchImages(query, page + 1)}
            >
              Load More Images
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
