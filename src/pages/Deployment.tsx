import { useState, useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Database, ArrowLeft, Rocket, Expand } from 'lucide-react';
import { toast } from 'sonner';

const terminalLines = [
  { text: '[root@rapt-ai ~]$ cd /ai_workstation_rapt_latest_python3/', delay: 0 },
  { text: '[root@rapt-ai ~]$ python train.py --model llama --batch-size 6', delay: 500 },
  { text: 'Loading model configuration...', delay: 1000, color: 'text-muted-foreground' },
  { text: 'Initializing GPU devices...', delay: 1500, color: 'text-muted-foreground' },
  { text: '✓ GPU 0: NVIDIA RTX 4000 (Available)', delay: 2000, color: 'text-info' },
  { text: '✓ GPU 1-4: NVIDIA A100 (Available)', delay: 2500, color: 'text-info' },
  { text: 'Ready for deployment', delay: 3000, color: 'text-muted-foreground' },
];

export default function Deployment() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });
  }, []);

  const handleDeploy = () => {
    setIsDeploying(true);
    toast.info('Deploying workload...');
    setTimeout(() => {
      toast.success('Deployment successful!\nEndpoint: https://api.rapt.ai/workload/h100-prod');
      setIsDeploying(false);
    }, 3000);
  };

  return (
    <DashboardLayout title="Deployment Terminal" subtitle="Execute commands and deploy workloads">
      <div className="space-y-6 animate-fade-in">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Deployment Terminal</h2>
            <p className="text-sm text-muted-foreground">Execute commands and deploy workloads</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              View Input Data
            </button>
            <button className="btn-primary px-5 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Models
            </button>
          </div>
        </div>

        {/* Terminal */}
        <div className="card rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-sm font-semibold">jupyter</span>
            </div>
            <button className="p-2 hover:bg-muted/50 rounded-lg transition">
              <Expand className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div
            ref={terminalRef}
            className="terminal p-6 text-sm bg-[#0a0e14] font-mono h-72 overflow-y-auto"
          >
            <div className="text-success">
              {terminalLines.slice(0, visibleLines).map((line, index) => (
                <p key={index} className={`mb-1 ${line.color || 'text-success'}`}>
                  {line.text}
                </p>
              ))}
              {visibleLines >= terminalLines.length && (
                <p>[root@rapt-ai ~]$ <span className="animate-pulse">_</span></p>
              )}
            </div>
          </div>
        </div>

        {/* Recommended Resources */}
        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Recommended Deployment Configuration</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="p-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">GPU Type</p>
              <p className="text-2xl font-bold gradient-text">H100</p>
            </div>
            <div className="p-6 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Cloud Provider</p>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold bg-warning/15 text-warning border border-warning/30">
                AWS
              </span>
            </div>
            <div className="p-6 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Streaming Multiprocessors</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="p-6 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">GPU Memory</p>
              <p className="text-2xl font-bold">16.10 GB</p>
            </div>
          </div>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="btn-primary w-full py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2"
          >
            <Rocket className="w-5 h-5" />
            {isDeploying ? 'Deploying...' : 'Deploy Workload'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
