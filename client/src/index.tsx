import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Link,
  } from "react-router-dom";
import About from './pages/About';
import Info from './pages/Info';

const root = document.getElementById("root");

if (!root)
{
    throw new Error("#root is undefined");
}

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
          <Link to="info">Info</Link>
        </div>
      ),
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "info",
      element: <Info />,
    },
  ]);

const container = createRoot(root);

container.render(<RouterProvider router={router} />);