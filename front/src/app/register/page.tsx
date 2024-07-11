"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z
  .object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Паролі не співпадають",
    path: ["repeatPassword"],
  });

export default function Page() {
  const cookies = new Cookies();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const getUserData = async () => {
    const response = await fetch("http://localhost:3010/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("access_token")}`,
      },
    });
    const res = await response.json();
    if (response.ok) {
      setUser(res);
      router.push("/");
    } else {
      setUser(null);
      console.log(res);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const register = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch("http://localhost:3010/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        username: data.username,
      }),
    });
    const res = await response.json();

    console.log(res);

    if (response.ok) {
      toast({
        description: "Account created",
      });

      cookies.set("access_token", res.accessToken, { path: "" });
      cookies.set("refresh_token", res.refreshToken, { path: "/" });
      router.push("/");
    } else {
      toast({
        description: "Не вдалось створити акаунт.",
        variant: "destructive",
      });
    }
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    register(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Реєстрація</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ім&apos;я користувача</FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ел. пошта</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="пароль" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="повторіть пароль"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Зареєструватися
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
