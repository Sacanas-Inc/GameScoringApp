import styles from "../styles/grid-styles.module.scss";

export const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (search: string) => void;
}) => (
    <input
      className={styles.searchBar}
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search for game"
    />
  );
