"use client";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function SignupPage() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const {registerMutation} = useAuth()

  const onSubmit = async (data: RegisterSchema) => {
    await registerMutation.mutateAsync(data)
  };

  return (
    <div className="w-full min-w-screen min-h-screen h-screen bg-background flex items-center justify-center">
      <Card className="px-3 w-[600px]">
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input {...field} disabled={registerMutation.isPending} />
                  <FormMessage> {form.formState.errors.name?.message} </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} disabled={registerMutation.isPending} />
                  <FormMessage> {form.formState.errors.email?.message} </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} type="password" disabled={registerMutation.isPending} />
                  <FormMessage> {form.formState.errors.password?.message} </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Button disabled={registerMutation.isPending} type="submit">Signup</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
