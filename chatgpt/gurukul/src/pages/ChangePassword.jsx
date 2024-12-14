'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import GoogleButton from 'react-google-button'
// require('dotenv').config(); // Load .env variables

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
// import BackendConfig from "@/config/BackendConfig"
import BackendConfig from '../config/BackendConfig'

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export default function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    // e.preventDefault();
    try {
        const target_url = BackendConfig.apiBaseUrl + '/user/profile/change_password';
        const authToken = localStorage.getItem("authToken");
        const headers = {
            Authorization: `Bearer ${authToken}`, // Add token to the Authorization header
            'Content-Type': 'application/json',
        };
        const response = await axios.post(target_url, values, {headers});
        alert("Password Updated.");
    } catch (error) {
      console.error('Error registering user:', error);
      alert(error.response?.data?.message || 'Error registering user');
    }
  };
  const handleGoogleSignIn = async() => {
    // Redirect the user to your Google Sign-In route
    const response = await axios.get("http://localhost:5001/api/auth/google");
    console.log(response);
    // window.location.assign = `$`;
  };

  return (
    <div className="mx-auto max-w-md space-y-6 mt-10">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Change your account password</h1>
        <p className="text-gray-500 dark:text-gray-400">Use a Secure Password</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full outline" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  )
}

