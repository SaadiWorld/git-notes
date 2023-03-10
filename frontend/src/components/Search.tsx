import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const changeHandler = (event:  ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      navigate(`/gist/${query}`)
      setQuery('');
      inputRef && inputRef.current && inputRef.current.blur()
    }
  }

  return (
    <div className="form-control">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="input input-bordered"
        value={query}
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