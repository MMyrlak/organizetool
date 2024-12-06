import {  Link } from "react-router-dom";
import '../css/ErrorPage.css';
import { Button } from 'primereact/button';
import gif from '../css/photo/ErrorGif.gif';
export default function ErrorPage() {

  return (
    <div id="error-page">
      <h1>404</h1>
      <img src={gif} alt=""/>
      <h1>Wygląda jakbyś się zgubił</h1>
      <p>Strona której szukasz jest niedostępna!</p>
      <Button>
        <Link to={`/task`}>Wróc do storny głównej</Link>
      </Button>
    </div>
  );
}