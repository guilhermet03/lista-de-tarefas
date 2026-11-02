import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  List,
  ListCheck,
  Plus,
  SquarePen,
  Trash,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex">
          <Input placeholder="Adicionar tarefa" />
          <Button className="cursor-pointer">
            <Plus /> Cadrastrar{" "}
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2 ">
            <Badge className="cursor-pointer" variant="default">
              <List />
              Lista
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <X />
              Não Concluidas
            </Badge>
            <Badge className="cursor-pointer" variant="outline">
              <Check />
              Concluidas
            </Badge>
          </div>

          <div className="mt-4 border-b-1">
            <div className="h-14 flex justify-between items-center  border-t-1">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">Estudar React</p>
              <div className="flex items-center gap-2">
                <Dialog>
              <DialogTrigger render={<SquarePen size={16} className="cursor-pointer" />}>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar tarefa</DialogTitle>
                </DialogHeader>

                <div className="flex gap-2">
                  <input placeholder="Editar tarefa"/>
                  <Button className="cursor-pointer">Editar</Button>
                </div>
              </DialogContent>
            </Dialog>
                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>

            


          <div className="flex justify-between mt-4">
            <div className="flex gap-2 items-center">
              <ListCheck size={18} />
              <p className="text-xs">Tarefas concluidas (3/3)</p>
            </div>

            <AlertDialog>
            <AlertDialogTrigger render={
              <Button className="text-xs h-7 cursor-pointer" variant="outline">
              <Trash />
              Limpar tarefas concluidas
            </Button>}>
              
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza que deseja excluir x itens?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Sim</AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ width: "56%" }}
            ></div>
          </div>
          <div className="flex justify-end mt-2">
            <p className="text-xs">3 Tarefas no total</p>
          </div>

          

        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
