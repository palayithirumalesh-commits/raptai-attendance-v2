import { useState, useCallback } from 'react';
import type { User, Node, ModelConfig } from '@/types/dashboard';

const initialUsers: User[] = [
  { id: '1', name: 'anil', email: 'anil@rapt.ai', gpuQuota: 2, jobsCompleted: 45, gpuHours: 342, successRate: 96, status: 'active', activeGpus: 0, color: 'from-indigo-500 to-purple-500' },
  { id: '2', name: 'john', email: 'john@rapt.ai', gpuQuota: 2, jobsCompleted: 38, gpuHours: 289, successRate: 94, status: 'active', activeGpus: 0, color: 'from-blue-500 to-cyan-500' },
  { id: '3', name: 'rob', email: 'rob@rapt.ai', gpuQuota: 2, jobsCompleted: 32, gpuHours: 256, successRate: 98, status: 'active', activeGpus: 0, color: 'from-pink-500 to-red-500' },
];

const initialNodes: Node[] = [
  { id: '1', name: 'nvidia-pod', ipAddress: '10.24.14.82', provider: 'AWS', gpuType: 'RTX 4000', gpuCount: 1, status: 'online', username: 'ubuntu', uptime: 99.8, load: 72, jobs: 142 },
  { id: '2', name: 'nvidia-pod2', ipAddress: '10.10.75.248', provider: 'AWS', gpuType: 'A100', gpuCount: 4, status: 'online', username: 'ubuntu', uptime: 99.5, load: 85, jobs: 156 },
];

export function useDashboardData() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    repoUrl: '',
    accessToken: '',
    name: 'Llama',
    description: 'Large Language Model',
    precision: 'fp32',
    framework: 'pytorch',
    batchSize: 6,
    maxSequenceLength: 800,
    parameters: '7B',
  });

  const addUser = useCallback((user: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { ...user, id: Date.now().toString() }]);
  }, []);

  const updateUser = useCallback((id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  }, []);

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  const addNode = useCallback((node: Omit<Node, 'id'>) => {
    setNodes(prev => [...prev, { ...node, id: Date.now().toString() }]);
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<Node>) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  }, []);

  const updateModelConfig = useCallback((updates: Partial<ModelConfig>) => {
    setModelConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const totalGpus = nodes.reduce((sum, n) => sum + n.gpuCount, 0);
  const activeJobs = 23;
  const completedJobs = users.reduce((sum, u) => sum + u.jobsCompleted, 0);

  return {
    users,
    nodes,
    modelConfig,
    addUser,
    updateUser,
    deleteUser,
    addNode,
    updateNode,
    deleteNode,
    updateModelConfig,
    stats: {
      totalGpus,
      totalNodes: nodes.length,
      activeJobs,
      completedJobs,
      registeredUsers: users.length,
    },
  };
}
