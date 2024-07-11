"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { User, History } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const cookies = new Cookies();
  cookies.addChangeListener(() => getUserData());

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
      setUser(null);
      console.log(res);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="sticky top-0 container pl-2 pr-2 flex flex-row justify-between mb-4 bg-background backdrop-blur/95 supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-row gap-4  items-center">
        <Button
          variant={"ghost"}
          onClick={() => router.push("/")}
          className="text-xl font-bold font-mono"
        >
          xpert...
        </Button>
        <div className="flex flex-row gap-4">
          <Link
            href="/topics"
            className={cn(
              "text-sm transition-colors hover:text-foreground/80 text-foreground/60",
              pathname == "/topics" ? "text-foreground" : "text-foreground/60"
            )}
          >
            Категорії
          </Link>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <ModeToggle />

        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="text-sm">
                  @{user.username ?? user.email}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="text-sm">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User size={16} className="mr-1" /> <span>профіль</span>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/history")}>
                  <History size={16} className="mr-1" /> <span>історія</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              variant={"outline"}
              onClick={() => router.push("/login")}
              className="text-sm"
            >
              Вхід
            </Button>
            <Button
              variant={"default"}
              onClick={() => router.push("/register")}
              className="text-sm"
            >
              Реєстрація
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
