import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import Day1 from "./Pages/Day_wise/Day1/Day1";
import Day2 from "./Pages/Day_wise/Day2/Day2";
import Day3 from "./Pages/Day_wise/Day3/Day3";
import Day4 from "./Pages/Day_wise/Day4/Day4";
import Day5 from "./Pages/Day_wise/Day5/Day5";
import Day6 from "./Pages/Day_wise/Day6/Day6";
import Day7 from "./Pages/Day_wise/Day7/Day7";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "day1", element: <Day1 /> },
        { path: "day2", element: <Day2 /> },
        { path: "day3", element: <Day3 /> },
        { path: "day4", element: <Day4 /> },
        { path: "day5", element: <Day5 /> },
        { path: "day6", element: <Day6 /> },
        { path: "day7", element: <Day7 /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
