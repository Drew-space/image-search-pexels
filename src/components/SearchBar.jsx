import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center ">
        <div className="flex items-center  gap-x-4 max-w-md w-full">
          <input
            type="text"
            placeholder="Search for images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500  focus:ring-2  "
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg  hover:bg-blue-600 "
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
