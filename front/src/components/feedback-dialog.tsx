"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import arxiv from "../app/arxiv-categories.json";

export function FeedbackDialog({
  text,
  result,
}: {
  text: string;
  result: string;
}) {
  const [open, setOpen] = useState(false);

  const saveFeedback = async (data: z.infer<typeof FeedbackFormSchema>) => {
    const response = await fetch("http://localhost:3010/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast({
        description: "Дякуємо за Ваш відгук",
      });
    } else {
      toast({
        description: "Не вдалося відправити відгук",
        variant: "destructive",
      });
    }
  };

  function onSubmit(data: z.infer<typeof FeedbackFormSchema>) {
    console.log(data);
    saveFeedback(data);
    toast({
      description: "Дякуємо за Ваш відгук",
      // variant: "destructive",
    });
    setOpen(false);
  }

  const FeedbackFormSchema = z.object({
    text: z.string().default(text),
    result: z.string().default(result),
    satisfied: z.boolean().optional(),
    bestTopic: z.string().optional(),
  });

  const feedbackForm = useForm<z.infer<typeof FeedbackFormSchema>>({
    resolver: zodResolver(FeedbackFormSchema),
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button id="feedback-button" variant="secondary" className="hidden">
            Відгук
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="self-center">Feedback</DialogTitle>
          </DialogHeader>
          <DialogDescription>Ваш відгук повністю анонімний</DialogDescription>

          <Form {...feedbackForm}>
            <form
              onSubmit={feedbackForm.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={feedbackForm.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Класифікований текст</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={text} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={feedbackForm.control}
                name="satisfied"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ToggleGroup
                        type="single"
                        className="w-full flex flex-row"
                        onValueChange={(value) => {
                          let v;

                          if (value === "like") {
                            v = true;
                          } else {
                            v = false;
                          }

                          feedbackForm.setValue("satisfied", v);
                        }}
                      >
                        <ToggleGroupItem
                          value={"like"}
                          aria-label="Toggle bold"
                          className="grow"
                        >
                          <ThumbsUp className="mr-2" />

                          <span className="font-bold">Подобається</span>
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value={"dislike"}
                          aria-label="Toggle italic"
                          className="grow"
                        >
                          <ThumbsDown className="mr-2" />{" "}
                          <span className="font-bold">Не подобається</span>
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={feedbackForm.control}
                name="bestTopic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Найкраща тема</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={"Оберіть тему"} />
                        </SelectTrigger>

                        <SelectContent>
                          {arxiv.map((topic, index) => {
                            return (
                              <SelectItem key={topic.tag} value={topic.tag}>
                                {topic.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="default" type="submit" className="w-full mt-4">
                  Відправити
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
