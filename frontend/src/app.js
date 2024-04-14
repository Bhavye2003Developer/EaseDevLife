import reactDOM from "react-dom/client";
import Body from "./components/Body";

const App = () => {
  return (
    <div className="app">
      <Body />
    </div>
  );
};

const root = reactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
