import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import EventsRootLayout from "./pages/EventsRootLayout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import NewEvent from "./pages/NewEvent";
import EditEvent from "./pages/EditEvent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          // loader richiede una funzione, che verrà eseguita da react router ogni volta che si tenterà di accedere a quel componente
          { index: true, element: <Events />, loader
            : async () => {
    const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {

      } else {
        const resData = await response.json();
        // in caso di risposta valida react router prenderà i dati della response e li renderà disponibili nella pagina e in tutti i componenti dove sono necessari
        return resData.events;
      }

            }
           },
          { path: ":id", element: <EventDetail /> },
          { path: "new", element: <NewEvent /> },
          { path: ":id/edit", element: <EditEvent /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
