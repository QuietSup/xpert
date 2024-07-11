"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Page() {
  const cookies = new Cookies();
  const router = useRouter();

  const [records, setRecords] = useState<any[]>([]);
  const [authorized, setAuthorized] = useState<boolean>(false);

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

  const getRecords = async () => {
    const accessToken = cookies.get("access_token");

    const response = await fetch("http://localhost:3010/clhistory", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      setAuthorized(true);
      const res = await response.json();
      console.log("res", res);
      setRecords(res);
    }
    if (response.status === 401) {
      setAuthorized(false);
      console.log("Unauthorized");
    }
  };

  useEffect(() => {
    getRecords();
  }, []);

  return (
    <>
      {authorized ? (
        <>
          {records.length === 0 ? (
            <div className="w-full flex justify-center items-center">
              <h1>У вас ще немає класифікацій</h1>
            </div>
          ) : (
            <>
              <Table>
                <TableCaption>Список ваших класифікацій.</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead className="w-7">Код</TableHead>
                    <TableHead>Тема</TableHead>
                    <TableHead>Текст</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {records.map((record, index) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>{record.code}</TableCell>
                          <TableCell>{record.result}</TableCell>
                          <TableCell>{record.text}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1>Ви не авторизовані</h1>
        </div>
      )}
    </>
  );
}
