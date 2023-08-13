import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR, { Fetcher } from "swr";

import { Separator } from "./shadcn/ui/separator";
import { Input } from "./shadcn/ui/input";
import { Button } from "./shadcn/ui/button";
import { Label } from "./shadcn/ui/label";

import "./globals.css";

function App({ fetcher }: { fetcher: Fetcher }) {
  const formSchema = z.object({
    name: z.string(),
    phone: z.number(),
    age: z.number(),
    attendence: z.number(),
    cgpa: z.number(),
  });

  type formSchema = z.infer<typeof formSchema>;

  const { data: entries, error, isLoading } = useSWR("/api/entries", fetcher);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
  });

  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="text-lg mt-8 flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-[1.65rem] font-medium">
        Add a new entry <Separator className="h-[2px] bg-black mt-1" />
      </h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center gap-y-8"
      >
        <div className="flex items-center justify-center flex-col text-center md:grid grid-flow-col grid-rows-3 place-items-center place-content-center gap-x-6 gap-y-4">
          <div>
            <Label className="text-base">Enter student name</Label>
            <Input placeholder="name" className="mt-2" {...register("name")} />
          </div>
          <div>
            <Label className="text-base">Enter student age</Label>
            <Input placeholder="age" className="mt-2" {...register("age")} />
          </div>
          <div>
            <Label className="text-base">Enter student cgpa</Label>
            <Input placeholder="cgpa" className="mt-2" {...register("phone")} />
          </div>
          <div>
            <Label className="text-base">Enter student phone</Label>
            <Input
              placeholder="phone"
              className="mt-2"
              {...register("attendence")}
            />
          </div>
          <div>
            <Label className="text-base">Enter student attendence</Label>
            <Input
              placeholder="attendence"
              className="mt-2"
              {...register("cgpa")}
            />
          </div>
        </div>
        <Button type="submit" className="w-full text-base">
          Submit
        </Button>
      </form>
      <Separator orientation="horizontal" className="h-[1.15px] mt-3" />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-[500]">
          All student entries <Separator className="h-[1.5px] bg-black" />
        </h1>
        {!isLoading ? <div></div> : <p>loading...</p>}
      </div>
    </div>
  );
}

export default App;
