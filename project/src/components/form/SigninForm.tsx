'use client';
import * as z from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(1, 'Password is required').min(8, 'Password must be at least 8'),
  })
const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          email: "",
          password: "",
         }
      });

      const onSubmit = async (values:z.infer<typeof FormSchema>) => {
        // console.log(values);
        const signInData = await signIn('credentials',{
          email: values.email,
          password: values.password,
          redirect: false,
      });
      
      if (signInData?.error){
        console.log("Wrong credentials");
        
      } else {
        router.push('/dashboard');
        router.refresh();
      }
      
      };

      // const handleSignIn = async (e: FieldValues) => {
      //   e.preventDefault();
      //   // Implement your sign-in logic here
      //   // const formData = new FormData(e.currentTarget);
      //   const res = await signIn("credentials", {
      //     email: email,
      //     password: password,
      //     redirect: false,
      //   });
      //   console.log({ res });
      //   if (!res?.error) {
      //     router.push("/dashboard/home");
      //     router.refresh();
      //   }
      // };

return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="mail@example.com" {...field} />
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
      </div>
      <Button className="w-full mt-6" type="submit">Sign in</Button>
    </form>
   
      
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-blue-500 hover:underline' href='/sign-up'>
          Sign up
        </Link>
      </p>
  </Form>

)
};

export default SigninForm;
