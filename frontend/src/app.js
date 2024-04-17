import { createRoot } from "react-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Record from "./components/Record";
import PDFViewer from "./components/PDFViewer";
import Header from "./components/Header";
import Home from "./components/Home";
import Error from "./components/Error";

const App = () => {
  return (
    <div className="bg-gray-800">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/record",
        element: <Record />,
      },
      {
        path: "/pdf",
        element: <PDFViewer />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
