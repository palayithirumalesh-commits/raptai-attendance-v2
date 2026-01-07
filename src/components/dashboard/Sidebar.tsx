import { useLocation, Link } from "react-router-dom";
import { Home, Brain, Server, Rocket, BarChart3, ChartBar, Users, Settings, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Brain, label: "Model Management", path: "/models" },
  { icon: Server, label: "Node Configuration", path: "/nodes" },
  { icon: Rocket, label: "Deployment", path: "/deployment" },
  { icon: BarChart3, label: "Live Monitoring", path: "/monitoring" },
  { icon: ChartBar, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "User Management", path: "/users" },
];

const systemItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Bell, label: "Notifications", path: "/notifications", badge: 3 },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 sidebar flex flex-col max-lg:w-20 shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center glow">
            <span className="text-xl font-bold text-white">R</span>
          </div>
          <div className="max-lg:hidden">
            <h1 className="text-xl font-bold tracking-tight">rapt.ai</h1>
            <p className="text-xs text-muted-foreground">GPU Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive
                  ? "active bg-gradient-to-r from-primary/15 to-secondary/15 text-foreground border-l-[3px] border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="max-lg:hidden">{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-border/50">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 max-lg:hidden">System</p>
          {systemItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-item flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="max-lg:hidden">{item.label}</span>
              {item.badge && (
                <span className="ml-auto badge badge-warning max-lg:hidden">{item.badge}</span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-border/50">
        <div className="card p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-foreground/80 max-lg:hidden">System Status</span>
            </div>
            <span className="text-xs text-success max-lg:hidden">Operational</span>
          </div>
          <div className="space-y-2 text-xs text-muted-foreground max-lg:hidden">
            <div className="flex justify-between">
              <span>Uptime</span>
              <span className="text-foreground">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Nodes</span>
              <span className="text-foreground">2/2</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center space-x-3 p-3 card rounded-xl cursor-pointer hover:border-primary/30 transition">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white">
            A
          </div>
          <div className="flex-1 min-w-0 max-lg:hidden">
            <p className="text-sm font-semibold truncate">Administrator</p>
            <p className="text-xs text-muted-foreground truncate">admin@rapt.ai</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground max-lg:hidden" />
        </div>
      </div>
    </aside>
  );
}
