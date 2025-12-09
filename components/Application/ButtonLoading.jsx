import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const ButtonLoading = ({type, text, loading,className, onClick, ...props }) => {
  return (
    <Button type={type} 
    disabled={loading}
     onClick={onClick} 
     {...props}
     className={cn ("", className)}>
        {loading&&
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        }
      {text}
    </Button>
  )
}

export default ButtonLoading