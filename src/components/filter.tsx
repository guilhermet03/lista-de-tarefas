import { Check, List, X } from "lucide-react"
import { Badge } from "./ui/badge"

export type FilterType = "all" | "pending" | "completed"

type FilterProps ={
    currentFilter: FilterType
    setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

const Filter = ({currentFilter, setCurrentFilter}: FilterProps ) => {

    return (
        <div className="flex gap-2 ">
            <Badge 
            className="cursor-pointer" 
            variant={`${currentFilter === "all" ? "default" : "outline"}`}
            onClick={() => setCurrentFilter("all")}>
              <List />
              Lista
            </Badge>
            <Badge 
            className="cursor-pointer" 
            variant={`${currentFilter === "pending" ? "default" : "outline"}`}
            onClick={() => setCurrentFilter("pending")}>
              <X />
              Não Concluidas
            </Badge>
            <Badge 
            className="cursor-pointer" 
            variant={`${currentFilter === "completed" ? "default" : "outline"}`}
            onClick={() => setCurrentFilter("completed")}>
              <Check />
              Concluidas
            </Badge>
          </div>
    )
}

export default Filter