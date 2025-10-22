import {Link} from 'react-router-dom';

export function NotFoundPage(): React.JSX.Element {
  return (
    <div>
            404. Page not found
      <Link to="/">
                Back to main page
      </Link>
    </div>
  );
}
