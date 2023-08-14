import * as z from "zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR, { SWRResponse } from "swr";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Entries } from "../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";

import { Separator } from "./shadcn/ui/separator";
import { Input } from "./shadcn/ui/input";
import { Button } from "./shadcn/ui/button";
import { Label } from "./shadcn/ui/label";

import "./globals.css";

function App() {
  const formSchema = z.object({
    name: z
      .string()
      .min(5, { message: "name too short" })
      .max(50, { message: "name too long" }),
    phone: z.coerce
      .number()
      .refine(
        (value) =>
          value.toString().length <= 10 && value.toString().length >= 10,
        {
          message: "invalid number",
        }
      ),
    age: z.coerce
      .number()
      .int()
      .nonnegative({ message: "cannot be negetive" })
      .gte(18, { message: "underage" })
      .lte(24, { message: "max age 24" }),
    attendence: z.coerce
      .number()
      .nonnegative()
      .positive({ message: "min 1 digit" })
      .lte(100, { message: "exceeded limit of 100" })
      .multipleOf(0.01),
    cgpa: z.coerce
      .number()
      .lte(10, { message: "exceeded limit of 10" })
      .positive({ message: "min 1 digit" })
      .multipleOf(0.01),
  });

  const formSchema2 = z.object({
    name: z
      .string()
      .min(5, { message: "name too short" })
      .max(50, { message: "name too long" }),
    phone: z.coerce
      .number()
      .refine(
        (value) =>
          value.toString().length <= 10 && value.toString().length >= 10,
        {
          message: "invalid number",
        }
      ),
    age: z.coerce
      .number()
      .int()
      .nonnegative({ message: "cannot be negetive" })
      .gte(18, { message: "underage" })
      .lte(24, { message: "max age 24" }),
    attendence: z.coerce
      .number()
      .nonnegative()
      .positive({ message: "min 1 digit" })
      .lte(100, { message: "exceeded limit of 100" })
      .multipleOf(0.01),
    cgpa: z.coerce
      .number()
      .lte(10, { message: "exceeded limit of 10" })
      .positive({ message: "min 1 digit" })
      .multipleOf(0.01),
  });

  type formSchema = z.infer<typeof formSchema>;

  const { data: entries } = useSWR("/api/entries", {
    suspense: true,
    refreshInterval: 1,
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  }) as SWRResponse<Entries[]>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formSchema>({
    resolver: zodResolver(formSchema),
  });

  const { register: register2, handleSubmit: handleSubmit2 } =
    useForm<formSchema>({
      resolver: zodResolver(formSchema2),
    });

  // post req
  const submit: SubmitHandler<FieldValues> = (formData) => {
    axios.post("/api/entries", formData);

    reset();
  };

  // del req
  const deleteEntry = (id: string) => {
    axios.delete(`/api/entries/${id}`);
  };

  // edit req
  const editEntry: SubmitHandler<FieldValues> = (formData) => {
    console.log(formData);
  };

  useEffect(() => {
    const item = entries?.find((item) => {
      return item.editing === true;
    });

    if (item?.editing === true) {
      axios.put(`/api/entries/${item?._id}`, { editing: false });
    }
  }, []);

  return (
    <div className="text-lg mt-8 flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-[1.65rem] font-medium">
        Add a new entry <Separator className="h-[2px] bg-black mt-1" />
      </h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center gap-y-8"
      >
        <div className="flex items-center justify-center flex-col text-center md:grid grid-flow-col grid-rows-3 place-items-center place-content-center gap-x-6 gap-y-6">
          <div className="relative">
            <Label className="text-base">Enter student name</Label>
            <Input
              placeholder="name"
              type="text"
              className="mt-2"
              {...register("name")}
            />
            <p className="text-destructive text-xs absolute translate-x-[-50%] left-[50%] w-max mt-1 mb-4">
              {errors.name?.message}
            </p>
          </div>
          <div className="relative">
            <Label className="text-base">Enter student age</Label>
            <Input
              placeholder="age"
              type="number"
              className="mt-2"
              {...register("age")}
            />
            <p className="text-destructive text-xs absolute translate-x-[-50%] left-[50%] w-max mt-1 mb-4">
              {errors.age?.message}
            </p>
          </div>
          <div className="relative">
            <Label className="text-base">Enter student phone</Label>
            <Input
              placeholder="phone"
              className="mt-2"
              type="number"
              {...register("phone")}
            />
            <p className="text-destructive text-xs absolute translate-x-[-50%] left-[50%] w-max mt-1 mb-4">
              {errors.phone?.message}
            </p>
          </div>
          <div className="relative">
            <Label className="text-base">Enter student attendence</Label>
            <Input
              placeholder="attendence"
              className="mt-2"
              type="number"
              step={0.01}
              {...register("attendence")}
            />
            <p className="text-destructive text-xs absolute translate-x-[-50%] left-[50%] w-max mt-1 mb-4">
              {errors.attendence?.message}
            </p>
          </div>
          <div className="relative">
            <Label className="text-base">Enter student cgpa</Label>
            <Input
              placeholder="cgpa"
              type="number"
              step={0.01}
              className="mt-2"
              {...register("cgpa")}
            />
            <p className="text-destructive text-xs absolute translate-x-[-50%] left-[50%] w-max mt-1 mb-4">
              {errors.cgpa?.message}
            </p>
          </div>
        </div>
        <Button
          type="submit"
          className="relative w-full text-base inline-flex items-center justify-center"
        >
          Submit
          {isSubmitting ? (
            <span className="absolute flex items-center justify-center after:content-[''] after:h-4 after:w-4 after:border-[2.5px] after:border-transparent after:border-t-destructive after:rounded-full after:animate-spin md:right-[195px] right-[65px]" />
          ) : (
            <></>
          )}
        </Button>
      </form>
      <Separator orientation="horizontal" className="h-[1.15px] mt-3" />
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-[500]">
          All student entries <Separator className="h-[1.5px] bg-black" />
        </h1>
        <ErrorBoundary fallback={<p>Some error happend</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            {entries?.length !== 0 ? (
              <Table className="bg-gray-200 w-full lg:w-[35vw] mx-auto mb-6">
                <TableCaption>A list of all student entries.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Attendence (%)</TableHead>
                    <TableHead className="text-right">CGPA</TableHead>
                  </TableRow>
                </TableHeader>
                {entries?.map((items) => {
                  return (
                    <TableBody key={items._id}>
                      <TableRow>
                        <TableCell className="font-medium">
                          {!items.editing ? (
                            <>{items.name}</>
                          ) : (
                            <Input
                              onClick={() => {
                                handleSubmit2(editEntry);
                              }}
                              placeholder="name"
                              type="text"
                              step={0.01}
                              {...register2("name")}
                            />
                          )}
                        </TableCell>
                        <TableCell>{items.age}</TableCell>
                        <TableCell>{items.phone}</TableCell>
                        <TableCell>{items.attendence}</TableCell>
                        <TableCell className="text-right">
                          {items.cgpa}
                        </TableCell>
                        <TableCell>
                          <i
                            onClick={() => deleteEntry(items._id)}
                            className="ri-delete-bin-6-line ml-2 hover:text-red-600 cursor-pointer text-base"
                          />
                          {!items.editing ? (
                            <i
                              onClick={() => {
                                axios.put(`/api/entries/${items._id}`, {
                                  editing: true,
                                });
                              }}
                              className="ri-edit-circle-line ml-2 hover:text-teal-500 text-base cursor-pointer"
                            />
                          ) : (
                            <button
                              onClick={() => {
                                axios.put(`/api/entries/${items._id}`, {
                                  editing: false,
                                });
                              }}
                              className="ri-check-line ml-2 hover:text-teal-500 cursor-pointer text-lg"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  );
                })}
              </Table>
            ) : (
              <p>No entries available</p>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
