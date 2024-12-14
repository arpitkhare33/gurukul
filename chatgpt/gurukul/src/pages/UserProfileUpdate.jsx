'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import BackendConfig from '../config/BackendConfig'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid mobile number.",
  }),
  college: z.string().min(2, {
    message: "College name must be at least 2 characters.",
  }),
  course: z.string().min(2, {
    message: "Course name must be at least 2 characters.",
  }),
  gender: z.enum(["male", "female", "other"]),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().max(500, {
    message: "Bio must not exceed 500 characters.",
  }),
})


export function UserProfileUpdate() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  })

  const onSubmit = async (values) => {
    // e.preventDefault();
    try {
        const id = 1;
        console.log("Profile Update Button Pressed", values)
        const target_url = BackendConfig.apiBaseUrl + '/user/profile?id='+id;
        const authToken = localStorage.getItem("authToken");
        const headers = {
            Authorization: `Bearer ${authToken}`, // Add token to the Authorization header
            'Content-Type': 'application/json',
        };
        // const response = await axios.post(target_url, values, {headers});
        alert("Profile Updated.");
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
            // control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      
          
          <Button type="submit" className="w-full outline" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  )
}
