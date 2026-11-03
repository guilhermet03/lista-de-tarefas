import { SquarePen } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

const EditTask = () => {
    return(
        <Dialog>
            <DialogTrigger render={
                <button type="button" aria-label="Editar tarefa" className="cursor-pointer" />}>
                <SquarePen size={16} />
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
    )
}

export default EditTask