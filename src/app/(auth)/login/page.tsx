"use client";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {loginMutation} = useAuth()

  const onSubmit = async (data: LoginSchema) => {
    await loginMutation.mutateAsync(data)
  };

  return (
    <div className="w-full min-w-screen flex-grow bg-background flex items-center justify-center">
      <Card className="px-3 w-[600px]">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} disabled={loginMutation.isPending} />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" disabled={loginMutation.isPending} />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button disabled={loginMutation.isPending} type="submit">Login</Button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-black/80">Don't have an account? <Link className="text-primary hover:underline" href="/signup">Signup</Link></p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
