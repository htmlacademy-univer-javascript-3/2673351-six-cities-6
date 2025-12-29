import React, { useCallback, useState } from 'react';

export type SortType = 'popular' | 'price-low-high' | 'price-high-low' | 'top-rated-first';

const SORT_OPTIONS: { label: string; value: SortType }[] = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: low to high', value: 'price-low-high' },
  { label: 'Price: high to low', value: 'price-high-low' },
  { label: 'Top rated first', value: 'top-rated-first' },
];

type SortingOptionsProps = {
  currentSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

export const SortingOptions = React.memo(({
  currentSort,
  onSortChange,
}: SortingOptionsProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = SORT_OPTIONS.find((option) => option.value === currentSort);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (sortType: SortType) => {
      onSortChange(sortType);
      setIsOpen(false);
    },
    [onSortChange]
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleToggle();
          }
        }}
      >
        {activeOption?.label ?? 'Popular'}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option.value}
            className={`places__option ${option.value === currentSort ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelect(option.value);
              }
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
});

SortingOptions.displayName = 'SortingOptions';
