// Dashboard types
export interface User {
  id: string;
  name: string;
  email: string;
  gpuQuota: number;
  jobsCompleted: number;
  gpuHours: number;
  successRate: number;
  status: 'active' | 'inactive';
  activeGpus: number;
  color: string;
}

export interface Node {
  id: string;
  name: string;
  ipAddress: string;
  provider: 'AWS' | 'Google Cloud' | 'Azure' | 'On-Premise';
  gpuType: string;
  gpuCount: number;
  status: 'online' | 'offline' | 'maintenance';
  username: string;
  uptime: number;
  load: number;
  jobs: number;
}

export interface ModelConfig {
  repoUrl: string;
  accessToken: string;
  name: string;
  description: string;
  precision: 'fp32' | 'fp16' | 'int8';
  framework: 'pytorch' | 'tensorflow' | 'onnx';
  batchSize: number;
  maxSequenceLength: number;
  parameters: string;
}

export interface GPUMetrics {
  id: string;
  name: string;
  node: string;
  load: number;
  memory: string;
  temperature: number;
  power: number;
  status: 'active' | 'idle';
}
