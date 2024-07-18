"use client";
import React, { useState } from "react";
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
    studentid: z.string().min(1, 'Studentid is required').max(8),
    name: z.string().min(1, 'Name is required').max(20),
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

  type FormData = z.infer<typeof FormSchema>;

const AddCourse = () => {
    const {data:session} = useSession();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            studentid: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
      });
      const router = useRouter();

      const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        try {
          // Prepare data for the API request
         
        //   const email = session.user?.email; // Get email from session
     
     
        //   {/* if (!email) {
        //     console.error("User email is not available in session");
        //     return;
        //    }  */}
      
        
          
          const data = {
            ...values, // Spread form data from values
            // Add any additional data needed by the API (e.g., hashed password)
            
            // email: email,
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
        name="studentid"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID</FormLabel>
            <FormControl>
              <Input placeholder="studentid" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
       
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Re-Enter your password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Re-Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      <Button className="w-full mt-6" type="submit">Sign up</Button>
    </form>
   
      
      <p className='text-center text-sm text-gray-600 mt-2'>
        Already have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-in'>
          Sign in
        </Link>
      </p>
  </Form>

)
};

export default AddCourse;
