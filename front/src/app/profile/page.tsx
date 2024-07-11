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

export default function Page() {
  const cookies = new Cookies();
  const router = useRouter();

  const FormSchema = z.object({
    username: z.string().min(5),
    email: z.string().email(),
  });

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
    } else {
      router.push("/");
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
    toast({
      description: "Ваші дані оновлено.",
    });
  }

  return (
    <>
      {user ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Профіль</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ім&apos;я користувача</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={user.username}
                          {...field}
                          value={user?.username}
                          disabled
                        />
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
                        <Input
                          placeholder="Email"
                          {...field}
                          value={user?.email}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                {/* <Button type="submit" className="w-full">
                  Register
                </Button> */}
                <Button
                  type="button"
                  variant={"destructive"}
                  className="w-full"
                  onClick={() => {
                    cookies.remove("access_token");
                    cookies.remove("refresh_token");
                    setUser(null);
                    router.push("/login");
                  }}
                >
                  Вийти з акаунту
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <div>Ви не увійшли в систему</div>
      )}
    </>
  );
}
