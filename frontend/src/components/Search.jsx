const Search = ({ onsubmit }) => {
    return (
        <div id="search">
        <form >
        <div id="search_form">
          <div>
            <input type="text" id="query_text" placeholder="Enter a keyword"/>
          </div>
          <div>
            <button onClick={onsubmit} className="query_submit">Search</button>
          </div>
        </div>  
        </form>
      </div>
    )
}

export default Search