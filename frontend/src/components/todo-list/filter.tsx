import { TodoFilter, type TodoFilterValue } from "./libs/constants/constants";

type FilterSelectProps = {
  onChange: (value: TodoFilterValue) => void;
};

export function FilterSelect({ onChange }: FilterSelectProps) {
  return (
    <select
      onChange={(e) => onChange(e.target.value as TodoFilterValue)}
      className="mb-4 border p-1"
    >
      <option value={TodoFilter.ALL}>All</option>
      <option value={TodoFilter.COMPLETED}>Completed</option>
      <option value={TodoFilter.NOT_COMPLETED}>Not Completed</option>
    </select>
  );
}
