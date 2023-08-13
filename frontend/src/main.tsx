import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/globals.css";
import Navbar from "@/components/Navbar.tsx";
import { BrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

export type entries = {
  name: string;
  phone: number;
  age: number;
  attendence: number;
  cgpa: number;
};

const fetcher = async (URLS: string) => {
  const res = await fetch(URLS);

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
        <App />
      </main>
    </SWRConfig>
  </BrowserRouter>
);
