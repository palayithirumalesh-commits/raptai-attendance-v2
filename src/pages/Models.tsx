import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useDashboard } from '@/context/DashboardContext';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Download, BookOpen, FolderOpen, Play, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Models() {
  const { modelConfig, updateModelConfig } = useDashboard();
  const [showToken, setShowToken] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleStartTraining = () => {
    setIsTraining(true);
    toast.info('Initializing training...');
    setTimeout(() => {
      toast.success('Training started successfully!');
      setIsTraining(false);
    }, 2000);
  };

  const handleSaveConfig = () => {
    toast.success('Configuration saved!');
  };

  return (
    <DashboardLayout title="Model Management" subtitle="Configure and deploy AI models">
      <div className="space-y-6 animate-fade-in">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Model Configuration</h2>
            <p className="text-sm text-muted-foreground">Configure and deploy AI models</p>
          </div>
          <div className="flex space-x-3">
            <button className="btn-secondary px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Open Notebook
            </button>
            <button className="btn-primary px-5 py-2.5 rounded-xl text-white font-medium text-sm flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Browse Files
            </button>
          </div>
        </div>

        <div className="card rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-6">Model Configuration</h3>

          {/* HuggingFace URL & Token */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Hugging Face Repository URL</label>
              <Input
                type="text"
                placeholder="https://huggingface.co/username/model"
                value={modelConfig.repoUrl}
                onChange={(e) => updateModelConfig({ repoUrl: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
              <button className="mt-2 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                <Download className="w-3 h-3" />
                Download Model Data
              </button>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Access Token (Optional)</label>
              <div className="relative">
                <Input
                  type={showToken ? 'text' : 'password'}
                  placeholder="Enter token if required"
                  value={modelConfig.accessToken}
                  onChange={(e) => updateModelConfig({ accessToken: e.target.value })}
                  className="input-field w-full rounded-xl px-4 py-3 text-sm pr-10"
                />
                <button
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Model Name & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Model Name</label>
              <Input
                type="text"
                value={modelConfig.name}
                onChange={(e) => updateModelConfig({ name: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Model Description</label>
              <Input
                type="text"
                value={modelConfig.description}
                onChange={(e) => updateModelConfig({ description: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
          </div>

          {/* Precision */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-foreground/80">Precision</label>
            <div className="flex space-x-4">
              {[
                { value: 'fp32', label: 'FP32', desc: 'Full precision' },
                { value: 'fp16', label: 'FP16', desc: 'Half precision' },
                { value: 'int8', label: 'INT8', desc: 'Quantized' },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-2 cursor-pointer p-4 rounded-xl border transition flex-1 ${
                    modelConfig.precision === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="precision"
                    value={option.value}
                    checked={modelConfig.precision === option.value}
                    onChange={(e) => updateModelConfig({ precision: e.target.value as any })}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <span className="font-medium">{option.label}</span>
                    <p className="text-xs text-muted-foreground">{option.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Framework */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-foreground/80">Framework</label>
            <div className="flex space-x-3">
              {[
                { value: 'pytorch', label: 'PyTorch' },
                { value: 'tensorflow', label: 'TensorFlow' },
                { value: 'onnx', label: 'ONNX' },
              ].map((fw) => (
                <button
                  key={fw.value}
                  onClick={() => updateModelConfig({ framework: fw.value as any })}
                  className={`px-6 py-3 rounded-xl font-medium flex-1 ${
                    modelConfig.framework === fw.value
                      ? 'btn-primary text-white'
                      : 'btn-secondary'
                  }`}
                >
                  {fw.label}
                </button>
              ))}
            </div>
          </div>

          {/* Training Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Batch Size</label>
              <Input
                type="number"
                value={modelConfig.batchSize}
                onChange={(e) => updateModelConfig({ batchSize: parseInt(e.target.value) || 0 })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Max Sequence Length</label>
              <Input
                type="number"
                value={modelConfig.maxSequenceLength}
                onChange={(e) => updateModelConfig({ maxSequenceLength: parseInt(e.target.value) || 0 })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground/80">Model Parameters</label>
              <Input
                type="text"
                value={modelConfig.parameters}
                onChange={(e) => updateModelConfig({ parameters: e.target.value })}
                className="input-field w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleStartTraining}
              disabled={isTraining}
              className="btn-primary flex-1 py-4 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              {isTraining ? 'Initializing...' : 'Start Training'}
            </button>
            <button
              onClick={handleSaveConfig}
              className="btn-secondary px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
