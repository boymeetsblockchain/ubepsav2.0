"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Key } from "lucide-react";
import Link from "next/link";
import { login } from "@/actions/user";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/login-validator";

function SignUpPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await login(formData);

      if (response.success === false) {
        setMessage(response.error || "Login failed. Please try again.");
      } else {
        setMessage("Login successful! Redirecting...");
        router.push("/");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Continue
        </h2>
        {message && <p className="text-center text-black mb-4">{message}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
                      <Mail className="text-gray-400" />
                      <Input
                        className="border-none focus:ring-0 focus:outline-none w-full"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Your active email address.</FormDescription>
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
                    <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
                      <Key className="text-gray-400" />
                      <Input
                        className="border-none focus:ring-0 focus:outline-none w-full"
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="border border-gray-500 bg-blue-500 text-white hover:bg-gray-700 hover:text-white transition-colors"
            >
              Submit
            </Button>
            <Link
              className="text-sm block hover:underline hover:text-blue-300"
              href={"/register"}
            >
              Don't have an account? Click here to sign up.
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
