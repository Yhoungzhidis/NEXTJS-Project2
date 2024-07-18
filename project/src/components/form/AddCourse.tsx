"use client";
import React, { useEffect } from "react";
import * as z from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";



const FormSchema = z
.object({
    email: z.string(),
    courseCode: z.string().min(7, 'Course code is required').max(8),
    courseName: z.string().min(7, 'Course Name is required').max(25),
    courseDescription: z.string(),
    })



const AddCourse = () => {
    const {data:session} = useSession();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            courseCode: "",
            courseName: "",
            courseDescription: "",
        }
      });
      const router = useRouter();
      useEffect(() => {
        if (session) {
            form.setValue("email", session.user?.email || "");
        }
    }, [session, form]);

      const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        try {
          const data = {
            ...values, // Spread form data from values
          };
      
          // Send the POST request using axios
          const response = await axios.post("http://localhost:5050/student/add/course", data, {
            headers: {
              "Content-Type": "application/json", // Set appropriate content type
            },
          });
      
          // Handle successful response (e.g., redirect to success page)
          if (response.status === 200 || response.status === 201) {
            console.log("Course added successfully:", response.data);
            router.push("/dashboard");
          } else {
            console.error("Course addition failed:", response);
          }
        } catch (error) {
          console.error("Error submitting login form:", error);
          // Handle errors gracefully (e.g., display an error message to the user)
          // if (error.response && error.response.status === 500) {
          //   setErrorMessage("Email is taken (potentially)");
          // } else {
          //   // Handle other errors
          // }
        }
      };
      

return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
      <>
    {session ? (
      <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            
            <FormControl>
            <span>{session.user?.email}</span>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </>
    ):(
      <>
      </>
    )}
    </>
      <FormField
        control={form.control}
        name="courseCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course code</FormLabel>
            <FormControl>
              <Input placeholder="Course code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="courseName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <FormControl>
              <Input placeholder="courseName" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
         <FormField
        control={form.control}
        name="courseDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Description</FormLabel>
            <FormControl>
              <Input placeholder="Course Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <Button className="w-full mt-6" type="submit">Register</Button>
    </form>
  </Form>

)
};

export default AddCourse;
