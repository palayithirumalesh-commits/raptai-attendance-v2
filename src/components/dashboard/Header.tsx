import { Search, Bell, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const handleNotificationClick = () => {
    toast.info('Notifications:\n• Node nvidia-pod2 t reached 90% capacity\n• Job completed for user anil\n• System update available');
  };

  return (
    <header className="h-16 border-b border-border/50 flex items-center justify-between px-8 bg-card/60 backdrop-blur-xl">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="text-xs text-muted-foreground">|</span>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="input-field rounded-lg px-4 py-2 pl-10 w-64 text-sm"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <Command className="w-3 h-3" />K
          </div>
        </div>
        
        {/* Notifications */}
        <button 
          onClick={handleNotificationClick}
          className="relative p-2 hover:bg-muted/50 rounded-lg transition"
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </div>
    </header>
  );
}
