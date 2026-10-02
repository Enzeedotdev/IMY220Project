import "../css/SearchInput.css"

function SearchInput({ placeholder }) {
    return (
        <form className="searchInput" role="search">
            <input
                type="search"
                className="searchInputField"
                placeholder={placeholder}
            />
        </form>
    )
}

export default SearchInput
