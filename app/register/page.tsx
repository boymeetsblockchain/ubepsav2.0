"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Mail, Phone, User, Key } from "lucide-react";
import Link from "next/link";
import { registerSchema } from "@/utils/register-validator";
import { registerUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
function RegisterPage() {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("email", data.email);

    formdata.append("password", data.password);
    const response = await registerUser(formdata);

    if (response.success === false) {
      setMessage(response.error || "Registration failed. Please try again.");
    } else {
      setMessage(
        response.message || "Registration successful! Redirecting to login..."
      );

      router.push("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Register to Get Started
        </h2>
        {message && (
          <p className="text-center mb-4 text-red-500 font-medium">{message}</p>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2 border rounded-md px-3 py-2">
                      <User className="text-gray-400" />
                      <Input
                        className="border-none focus:outline-none w-full"
                        placeholder="Username"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Enter a preferred Username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Choose a strong password.</FormDescription>
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
              href={"/login"}
            >
              Already have an account? Click here to login
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
export default RegisterPage;
