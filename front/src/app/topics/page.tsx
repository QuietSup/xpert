import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import arxiv from "../arxiv-categories.json";

export default function Page() {
  const categories = arxiv;
  return (
    <>
      <Table>
        <TableCaption>Список категорій.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-7">Код</TableHead>
            <TableHead>Тема</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category, index) => {
            return (
              <>
                <TableRow>
                  <TableCell className="font-medium">{category.tag}</TableCell>
                  <TableCell>{category.name}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
