import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import Home from "./pages/Home";
import Events, { eventLoader } from "./pages/Events";
import EventDetail, { eventDetailLoader } from "./pages/EventDetail";
import NewEvent, { actionNewEvent } from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          // loader richiede una funzione, che verrà eseguita da react router ogni volta che si tenterà di accedere a quel componente
          {
            index: true,
            element: <Events />,
            loader: eventLoader,
          },
          {
            path: ":id",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetail />,
              },
              { path: "edit", element: <EditEvent /> },
            ],
          },
          { path: "new", element: <NewEvent />, action: actionNewEvent },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
