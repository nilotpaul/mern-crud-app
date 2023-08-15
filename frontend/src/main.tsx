import * as ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/globals.css";
import Navbar from "@/components/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";
import { Fetcher, SWRConfig } from "swr";
import { Entries } from "../types/types.ts";
import { ToastContainer } from "react-toastify";

import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";

const fetcher: Fetcher<Entries[], string> = async (URL) => {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("failed to fetch data from DB");
  }

  return res.json();
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SWRConfig value={{ fetcher }}>
      <Navbar />
      <main className="px-4 md:container mx-auto">
        <ToastContainer />
        <App />
      </main>
    </SWRConfig>
  </BrowserRouter>
);
