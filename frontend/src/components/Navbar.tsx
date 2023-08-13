import { Separator } from "@/shadcn/ui/separator";
import { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <>
      <nav className="w-full bg-transparent py-4 text-2xl">
        <div className="px-4 md:container mx-auto text-gray-950">
          <Link to="/">
            <span className="text-gray-800">Student</span>
            <span className="text-teal-800">DB</span>
          </Link>
        </div>
      </nav>
      <Separator className="bg-slate-500 h-[0.5px]" />
    </>
  );
};

export default Navbar;
