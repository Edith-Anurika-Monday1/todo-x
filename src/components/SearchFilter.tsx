import React from "react";

interface Props {
  search: string;
  filter: string;
  onSearch: (value: string) => void;
  onFilter: (value: string) => void;
  onClear: () => void;
}

const SearchFilter: React.FC<Props> = ({
  search,
  filter,
  onSearch,
  onFilter,
  onClear,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 px-4 py-3 rounded-lg bg-gray-900 text-white 
                   placeholder-gray-400 border border-gray-700 
                   focus:outline-none focus:border-primary 
                   focus:ring-2 focus:ring-primary transition-all duration-200"
      />

      <div className="flex gap-2 items-center">
        <select
          value={filter}
          onChange={(e) => onFilter(e.target.value)}
          className="px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 
                     focus:outline-none focus:border-primary 
                     focus:ring-2 focus:ring-primary transition-all duration-200"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-red-600 text-white 
                     font-medium hover:bg-red-700 transition-colors duration-200 shadow-md"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
