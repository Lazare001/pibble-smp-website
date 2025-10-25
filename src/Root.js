import { BrowserRouter } from "react-router-dom";
import App from "./App";

const Root = () => (
  <BrowserRouter basename="/pibble-smp-website">
    <App />
  </BrowserRouter>
);

export default Root;
