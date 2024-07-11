"use client";

import { FeedbackDialog } from "@/components/feedback-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import Cookies from "universal-cookie";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import arxiv from "./arxiv-categories.json";

const FormSchema = z.object({
  text: z.string().min(5),
});

interface Classification {
  label: string;
  score: number;
}

export default function Home() {
  const cookies = new Cookies();
  const [text, setText] = useState("");
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [lastClassified, setLastClassified] = useState<string | null>(null);

  const [symbolsNum, setSymbolsNum] = useState(0);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    classify();
    // classify().then(() => {
    //   saveRecord();
    // });

    toast({
      description: "Текст класифіковано",
    });
  }

  const onSelectImageHandler = async (files: any) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:3010/ocr", {
      method: "POST",
      headers: {
        "Contetnt-Type": "multipart/form-data",
      },
      body: formData,
    });

    const res = await response.json();
    setText(res.text);
  };

  const saveRecord = async () => {
    const response = await fetch("http://localhost:3010/clhistory", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.get("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: classifications[0]?.label,
        result: arxiv.find((val) => val.tag === classifications[0]?.label)
          ?.name,
        text: lastClassified,
      }),
    });

    const res = await response.json();
    console.log(res);
  };

  useEffect(() => {
    saveRecord();
  }, [classifications]);

  const classify = async () => {
    const response = await fetch("http://localhost:3010/topic-classifier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("access_token")}`,
      },
      body: JSON.stringify({ text }),
    });

    const res: { data: Classification[] } = await response.json();
    setClassifications(res.data.sort((a, b) => b.score - a.score));
    console.log(classifications);
    // console.log(classifications);
    setLastClassified(text);

    console.log(res.data.sort((a, b) => b.score - a.score));
  };

  return (
    <>
      <main className="container flex flex-col gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-row w-full gap-2 justify-between">
              <input
                className="hidden"
                type="file"
                ref={imageInputRef}
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    console.log(event.target.files[0]);
                    onSelectImageHandler(event.target.files).then(() => {
                      form.setValue("text", text);
                    });
                  }
                }}
              />
              <div className="flex flex-row gap-2">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    imageInputRef.current?.click();
                  }}
                >
                  Текст з зображення
                </Button>
                <Button
                  variant="ghost"
                  type="reset"
                  onClick={() => {
                    // form.reset();
                    setText("");
                    form.resetField("text");
                    // setSymbolsNum(0);
                  }}
                >
                  Очистити
                </Button>
              </div>

              <div className="flex flex-row gap-4 items-center">
                {/* <span className="text-sm text-muted-foreground">
                  Symbols: {symbolsNum}
                </span> */}
                <Button variant="default" type="submit">
                  Класифікувати
                </Button>
              </div>
            </div>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="font-mono"
                      placeholder="Введіть текст..."
                      {...field}
                      value={text}
                      onChange={(e) => {
                        setText(e.target.value);
                        field.onChange(e);
                      }}
                      onInput={(e) => {
                        // setSymbolsNum(e.target.value?.trim().length);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              {lastClassified && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    document.getElementById("feedback-button")?.click();
                  }}
                >
                  Відгук
                </Button>
              )}
            </div>
          </form>
        </Form>

        {lastClassified && (
          <FeedbackDialog
            text={lastClassified}
            result={classifications[0]?.label}
          />
        )}

        {classifications.length !== 0 && (
          <ClassificationsTable classifications={classifications} />
        )}
      </main>
    </>
  );
}

function ClassificationsTable(props: { classifications: Classification[] }) {
  const { classifications } = props;

  return (
    <>
      <Table>
        <TableCaption>A list of your classifications.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-7">Код</TableHead>
            <TableHead>Тема</TableHead>
            <TableHead>Впевненість, %</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {classifications.slice(0, 5).map((classification, index) => {
            return (
              <>
                <TableRow key={classification.label}>
                  <TableCell className="font-medium">
                    {classification.label}
                  </TableCell>
                  <TableCell>
                    {
                      arxiv.find((val) => val.tag === classification.label)
                        ?.name
                    }
                  </TableCell>
                  <TableCell className="font-mono">
                    {(classification.score * 100).toFixed(1)}
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
