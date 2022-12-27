import { FaSearch } from 'react-icons/fa';

import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { useState } from 'react';
const SearchBar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');
  const onInputChange = e => {
    setQuery(e.target.value);
  };
  const onSubmitForm = e => {
    e.preventDefault();
    handleSubmit(query);
    setQuery('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmitForm}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">
            <IconContext.Provider
              value={{
                size: '30px',

                className: 'global-class-name',
              }}
            >
              <FaSearch />
            </IconContext.Provider>
          </span>
        </button>

        <input
          onChange={onInputChange}
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
};
export default SearchBar;
