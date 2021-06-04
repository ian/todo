export default function CardsList(props) {
  const { items, onChange } = props
  return (
    <ul className="space-y-3 divide-y divide-gray-200">
      {items.map((item) => (
        <li
          key={item.id}
          className={`bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md hover:bg-gray-100 cursor-pointer ${
            item.checked ? "bg-indigo-100 opacity-50" : ""
          }`}
          onClick={() => onChange(item, !item.checked)}
        >
          <div className="relative flex">
            <input
              id="candidates"
              name="candidates"
              type="checkbox"
              checked={item.checked}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded self-center"
            />
            <label
              htmlFor="candidates"
              className="font-bold text-gray-700 text-xl ml-4"
            >
              {item.text}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}
