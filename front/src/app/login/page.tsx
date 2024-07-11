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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Page() {
  const router = useRouter();
  const cookies = new Cookies();

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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    login(data);
  }

  const login = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("http://localhost:3010/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      console.log("login", res);
      if (response.ok) {
        toast({
          description: "Ви успіштно увійшли в систему",
        });

        cookies.set("access_token", res.accessToken);
        cookies.set("refresh_token", res.refreshToken);

        router.push("/");
      } else {
        toast({
          description: "Перевірте ваші дані для входу.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Перевірте ваші дані для входу.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Вхід</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
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
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                Увійти
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
