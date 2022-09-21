const FilterButton = ({ setFilter, filter, todosFiltered }) => {
  return (
    <div>
      <button
        onClick={() => {
          setFilter('all')
          todosFiltered(filter)
        }}
        className={`button filter-button ${filter === 'all' ? 'filter-button-active' : ''}`}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter('active')
          todosFiltered(filter)
        }}
        className={`button filter-button ${filter === 'active' ? 'filter-button-active' : ''}`}
      >
        active
      </button>
      <button
        onClick={() => {
          setFilter('complete')
          todosFiltered(filter)
        }}
        className={`button filter-button ${filter === 'complete' ? 'filter-button-active' : ''}`}
      >
        Completed
      </button>
      <button
        onClick={() => {
          setFilter('trash')
          todosFiltered(filter)
        }}
        className={`button filter-button ${filter === 'trash' ? 'filter-button-active' : ''}`}
      >
        Trashed
      </button>
    </div>
  )
}

export default FilterButton
