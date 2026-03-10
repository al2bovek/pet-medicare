export default function SortBar({ sort, setSort, order, setOrder }) {
  return (
    <div className="flex gap-3 items-center justify-center bg-indigo-800 text-white p-2">
      <select
        className="px-0.5 py-2"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="sort">Sort by</option>
        <option value="pet_name">Pet</option>
        <option value="appointment_date">Date</option>
        <option value="owner_name">Owner</option>
      </select>

      <select
        className="px-0.5 py-2"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="order">Order by</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  )
}