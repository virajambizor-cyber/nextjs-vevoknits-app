"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/Images/design.svg";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useRouter } from "next/navigation";

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleAdminLogin = async (values) => {
    try {
      setLoading(true);

      const res = await fetch("/api/Auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        console.log("Failed to parse JSON from /api/Auth/admin-login:", err);
      }

      if (!res.ok || !data?.success) {
        console.log(
          data?.message || `Admin login failed with status ${res.status}`
        );
        return;
      }

      router.push("/Admin");
    } catch (error) {
      console.log("Error during admin login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center pt-16 pb-[260px]">
      <Card className="w-[400px]">
        <CardContent>
          <div className="flex justify-center mt-4">
            <Image
              src={Logo}
              width={Logo.width}
              height={Logo.height}
              alt="Logo"
              className="max-w-[60] max-h-[140]"
            />
          </div>

          <div className="text-center mt-2">
            <h1 className="text-2xl font-semibold">Admin Login</h1>
            <p className="mb-2 text-sm">
              Enter your admin credentials to access the panel.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAdminLogin)}
              className="text-center mt-4"
            >
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="admin@yourdomain.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ButtonLoading
                loading={loading}
                type="submit"
                text="Login as Admin"
                className="w-full cursor-pointer"
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
