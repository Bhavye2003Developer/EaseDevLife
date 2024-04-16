import reactDOM from "react-dom/client";
import Body from "./components/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Record from "./components/Record";
import PDFViewer from "./components/PDFViewer";

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/record",
    element: <Record />,
  },
  {
    path: "/pdf",
    element: <PDFViewer />,
  },
]);

const root = reactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
