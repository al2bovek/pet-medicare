export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mx-auto w-[60%] ">
      <input
        type="text"
        placeholder="Search by pet name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}