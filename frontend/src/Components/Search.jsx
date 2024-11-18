import { BasicContext } from "@/ContextAPIs/BasicProvider";
import { useContext } from "react";

const Search = ({openSearch}) => {
    const {setValue} = useContext(BasicContext)

  return (
    <div>
      <input
        type="search"
        name=""
        className={`bg-white border border-color_1 py-1 rounded-sm focus:outline-0 w-0 duration-300 
        ${openSearch ? 'w-full px-3' : ''}`}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
