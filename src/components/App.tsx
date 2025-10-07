import {MainPage, MainPageProps} from './MainPage';


export function App({placeCount}: MainPageProps): React.JSX.Element {
  return <MainPage placeCount={placeCount} />;
}
