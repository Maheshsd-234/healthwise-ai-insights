
// Direct import from the shadcn toast UI component
import { toast } from "@/components/ui/toast";
import { useToast as useToastUI } from "@/components/ui/toast";

// Re-export as useToast and toast
export const useToast = useToastUI;
export { toast };
