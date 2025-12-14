import './spinner.css';

export function Spinner() {
  return (
    <div className="spinner">
      <div className="spinner__circle" />
      <span className="spinner__text">Loading...</span>
    </div>
  );
}
