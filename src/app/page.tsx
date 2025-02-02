"use client";

import {
  Activity,
  AlertTriangle,
  Box,
  Clock,
  Database,
  Network,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";

// Sample dimension data for membership analysis
const dimensionData = {
  department: [
    { name: "IT", count: 30 },
    { name: "Security", count: 12 },
    { name: "Operations", count: 6 },
  ],
  employeeType: [
    { name: "Full-time", count: 42 },
    { name: "Contractor", count: 6 },
  ],
  location: [
    { name: "HQ", count: 28 },
    { name: "Remote", count: 20 },
  ],
};

// Enhanced sample data with more detailed metrics
const membershipData = Array.from({ length: 12 }, (_, i) => {
  const baseMembers = 45;
  const trend = Math.sin(i / 2) * 5;
  const noise = Math.random() * 3;
  return {
    date: `2024-${String(i + 1).padStart(2, "0")}`,
    members: Math.round(baseMembers + trend + noise),
    additions: Math.round(Math.random() * 5),
    removals: Math.round(Math.random() * 4),
    riskScore: Math.round((Math.random() * 20 + 80) * 10) / 10,
  };
});

const accessPatterns = [
  { hour: "00:00", accesses: 12 },
  { hour: "04:00", accesses: 8 },
  { hour: "08:00", accesses: 45 },
  { hour: "12:00", accesses: 67 },
  { hour: "16:00", accesses: 89 },
  { hour: "20:00", accesses: 32 },
];

const networkData = {
  nodes: [
    {
      id: "group1",
      label: "IT Admin Access",
      type: "group",
      riskLevel: "high",
      memberCount: 48,
    },
    {
      id: "group2",
      label: "Developer Access",
      type: "group",
      riskLevel: "medium",
      memberCount: 32,
    },
    {
      id: "group3",
      label: "SQL Access",
      type: "group",
      riskLevel: "high",
      memberCount: 15,
    },
    {
      id: "user1",
      label: "John Smith",
      type: "user",
      riskLevel: "high",
      accessCount: 156,
    },
    {
      id: "user2",
      label: "Alice Johnson",
      type: "user",
      riskLevel: "medium",
      accessCount: 89,
    },
    {
      id: "user3",
      label: "Bob Wilson",
      type: "user",
      riskLevel: "low",
      accessCount: 45,
    },
  ],
  links: [
    { source: "user1", target: "group1", strength: 0.8 },
    { source: "user1", target: "group2", strength: 0.6 },
    { source: "user1", target: "group3", strength: 0.9 },
    { source: "user2", target: "group1", strength: 0.7 },
    { source: "user3", target: "group2", strength: 0.5 },
  ],
};

// Force graph custom hook for network visualization
const useForceGraph = (width, height) => {
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);

  // Initialize with network data
  useEffect(() => {
    setNodes(
      networkData.nodes.map((node) => ({
        ...node,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
      }))
    );
    setLinks(networkData.links);
  }, [width, height]);

  // Force simulation step
  const tick = useCallback(() => {
    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];

      // Apply forces
      links.forEach((link) => {
        const source = newNodes.find((n) => n.id === link.source);
        const target = newNodes.find((n) => n.id === link.target);
        if (!source || !target) return;

        // Calculate force direction
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance === 0) return;

        // Apply attractive force
        const force = (distance - 100) * 0.03;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        source.vx += fx;
        source.vy += fy;
        target.vx -= fx;
        target.vy -= fy;
      });

      // Apply repulsive forces between all nodes
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = i + 1; j < newNodes.length; j++) {
          const dx = newNodes[j].x - newNodes[i].x;
          const dy = newNodes[j].y - newNodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance === 0) continue;

          const force = 1000 / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;

          newNodes[i].vx -= fx;
          newNodes[i].vy -= fy;
          newNodes[j].vx += fx;
          newNodes[j].vy += fy;
        }
      }

      // Update positions and apply damping
      return newNodes.map((node) => ({
        ...node,
        x: Math.max(20, Math.min(width - 20, node.x + node.vx)),
        y: Math.max(20, Math.min(height - 20, node.y + node.vy)),
        vx: node.vx * 0.9,
        vy: node.vy * 0.9,
      }));
    });
  }, [links, setNodes]);

  return { nodes, links, tick };
};

// Risk score calculation function
const calculateRiskScore = (node) => {
  const baseScore = node.type === "group" ? node.memberCount : node.accessCount;
  const riskMultiplier = { high: 1.5, medium: 1.0, low: 0.5 }[node.riskLevel];
  return Math.round(baseScore * riskMultiplier);
};

// Enhanced Risk Network Component with more interactive features
const RiskNetwork = () => {
  const width = 500;
  const height = 300;
  const [selectedNode, setSelectedNode] = useState(null);
  const { nodes, links, tick } = useForceGraph(width, height);

  useEffect(() => {
    const interval = setInterval(tick, 16);
    return () => clearInterval(interval);
  }, [tick]);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="relative">
      <svg width={width} height={height} className="bg-white rounded-lg">
        {/* Enhanced link rendering with strength indicators */}
        {links.map((link, i) => {
          const source = nodes.find((n) => n.id === link.source);
          const target = nodes.find((n) => n.id === link.target);
          if (!source || !target) return null;

          return (
            <g key={i}>
              <line
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                stroke={
                  selectedNode
                    ? selectedNode.id === source.id ||
                      selectedNode.id === target.id
                      ? "#1d4ed8"
                      : "#94a3b8"
                    : "#94a3b8"
                }
                strokeWidth={link.strength * 3}
                strokeOpacity={
                  selectedNode
                    ? selectedNode.id === source.id ||
                      selectedNode.id === target.id
                      ? 0.8
                      : 0.2
                    : 0.6
                }
              />
            </g>
          );
        })}

        {/* Enhanced node rendering with risk indicators */}
        {nodes.map((node) => (
          <g
            key={node.id}
            transform={`translate(${node.x},${node.y})`}
            onClick={() => setSelectedNode(node)}
            className="cursor-pointer"
          >
            {node.type === "user" ? (
              <>
                <circle
                  r="8"
                  fill={getRiskColor(node.riskLevel)}
                  className="cursor-pointer hover:opacity-80"
                />
                <circle
                  r="10"
                  fill="none"
                  stroke={getRiskColor(node.riskLevel)}
                  strokeWidth="1"
                  opacity="0.3"
                />
              </>
            ) : (
              <>
                <path
                  d="M 0 -10 L 10 0 L 0 10 L -10 0 Z"
                  fill={getRiskColor(node.riskLevel)}
                  className="cursor-pointer hover:opacity-80"
                />
                <path
                  d="M 0 -12 L 12 0 L 0 12 L -12 0 Z"
                  fill="none"
                  stroke={getRiskColor(node.riskLevel)}
                  strokeWidth="1"
                  opacity="0.3"
                />
              </>
            )}
            <text
              dx="12"
              dy="4"
              className={`text-xs ${
                selectedNode?.id === node.id ? "font-bold" : ""
              }`}
              fill={selectedNode?.id === node.id ? "#1d4ed8" : "#374151"}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Node details panel */}
      {selectedNode && (
        <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-bold mb-2">{selectedNode.label}</h3>
          <div className="space-y-1">
            <p className="text-sm">Type: {selectedNode.type}</p>
            <p className="text-sm">Risk Level: {selectedNode.riskLevel}</p>
            <p className="text-sm">
              {selectedNode.type === "group"
                ? `Members: ${selectedNode.memberCount}`
                : `Access Count: ${selectedNode.accessCount}`}
            </p>
            <p className="text-sm">
              Risk Score: {calculateRiskScore(selectedNode)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const GroupAnalysisDashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState({
    name: "IT Admin Access",
    riskLevel: "High",
    memberCount: 48,
    consumers: [
      { name: "SQL Server", riskLevel: "high", lastAccess: "2 min ago" },
      { name: "Azure AD", riskLevel: "medium", lastAccess: "15 min ago" },
      { name: "AWS", riskLevel: "high", lastAccess: "1 hour ago" },
    ],
    riskScore: 89.5,
    complianceStatus: "At Risk",
    unusualActivity: true,
  });

  const [timeRange, setTimeRange] = useState("1M");
  const [selectedDimension, setSelectedDimension] = useState("department");

  // Advanced metrics calculation
  const metrics = {
    membershipChurn: {
      total: 12.5,
      trend: "up",
      lastMonth: 8.2,
    },
    avgMemberLifespan: {
      days: 145,
      trend: "stable",
    },
    riskTrend: {
      current: selectedGroup.riskScore,
      change: +2.3,
      forecast: "increasing",
    },
  };

  // Risk breakdown data
  const riskBreakdown = [
    { name: "Access Pattern", value: 35 },
    { name: "Member Composition", value: 25 },
    { name: "Group Permissions", value: 40 },
  ];

  const COLORS = ["#ef4444", "#f59e0b", "#10b981"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Enhanced Header with more metrics */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                selectedGroup.unusualActivity ? "destructive" : "secondary"
              }
            >
              {selectedGroup.unusualActivity
                ? "Unusual Activity Detected"
                : "Normal Activity"}
            </Badge>
            <Badge
              variant={
                selectedGroup.complianceStatus === "At Risk"
                  ? "destructive"
                  : "secondary"
              }
            >
              {selectedGroup.complianceStatus}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertTitle>Risk Level</AlertTitle>
            <AlertDescription className="font-bold">
              {selectedGroup.riskLevel}
            </AlertDescription>
          </Alert>

          <Alert>
            <Users className="w-4 h-4" />
            <AlertTitle>Members</AlertTitle>
            <AlertDescription className="font-bold">
              {selectedGroup.memberCount}
            </AlertDescription>
          </Alert>

          <Alert>
            <TrendingUp className="w-4 h-4" />
            <AlertTitle>Risk Score</AlertTitle>
            <AlertDescription className="font-bold">
              {selectedGroup.riskScore}
            </AlertDescription>
          </Alert>

          <Alert>
            <Clock className="w-4 h-4" />
            <AlertTitle>Avg Member Time</AlertTitle>
            <AlertDescription className="font-bold">
              {metrics.avgMemberLifespan.days} days
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Enhanced Membership Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Membership Growth
                </div>
                <div className="flex space-x-2">
                  {["1M", "3M", "6M", "1Y"].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-2 py-1 text-sm rounded ${
                        timeRange === range
                          ? "bg-blue-100 text-blue-800"
                          : "text-gray-600"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={membershipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="members"
                      stroke="#2563eb"
                      fill="#93c5fd"
                      fillOpacity={0.3}
                    />
                    <Area
                      type="monotone"
                      dataKey="riskScore"
                      stroke="#ef4444"
                      fill="#fecaca"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Risk Network */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Network className="w-4 h-4 mr-2" />
                  Risk Network
                </div>
                <Badge variant="outline" className="ml-2">
                  Interactive
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <RiskNetwork />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Risk Composition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Risk Composition
              </CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enhanced Membership Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Box className="w-4 h-4 mr-2" />
                Membership Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="department" className="w-full">
                <TabsList>
                  <TabsTrigger value="department">Department</TabsTrigger>
                  <TabsTrigger value="employeeType">Employee Type</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                {Object.entries(dimensionData).map(([dimension, data]) => (
                  <TabsContent key={dimension} value={dimension}>
                    <div className="space-y-2">
                      {data.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                          <span>{item.name}</span>
                          <span className="text-gray-500">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Consumers List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-4 h-4 mr-2" />
                Consumers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedGroup.consumers.map((consumer) => (
                  <div
                    key={consumer.name}
                    className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span>{consumer.name}</span>
                      <Badge
                        variant={
                          consumer.riskLevel === "high"
                            ? "destructive"
                            : "secondary"
                        }
                        className="ml-2"
                      >
                        {consumer.riskLevel}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {consumer.lastAccess}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GroupAnalysisDashboard;
