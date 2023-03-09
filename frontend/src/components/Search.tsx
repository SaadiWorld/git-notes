import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const changeHandler = (event:  ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      navigate(`/gist/${query}`)
    }
  }

  return (
    <div className="form-control">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered"
        onChange={changeHandler} 
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default Search


// Debounce If Needed In The Future

// const debouncedChangeHandler = useMemo(() => {
//   return debounce(changeHandler, 300);
// }, []);

// useEffect(() => {
//   return () => {
//     debouncedChangeHandler.cancel();
//   }
// }, []);