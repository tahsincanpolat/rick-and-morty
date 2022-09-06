import React from 'react'

function CharacterFilter(props) {
    const { 
      categories,
      onFilterChange,
    } = props
    
    return (
      <section 
        className="filters"
        aria-labelledby="filters-header">
        <header id="filters-header">
          {'Filters'}
        </header>
        
        <ul>
          {categories.map(category => (
            <li key={category}>
              <label>
                <input 
                  onChange={onFilterChange}
                  type="checkbox"
                  value={category} />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </section>
    )
  }

export default CharacterFilter;
