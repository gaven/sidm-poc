"use client";

import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BarChart2,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  History,
  MessageSquare,
  Search,
  Settings,
  Share2,
  Shield,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Bar, BarChart, Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

interface AccessRequest {
  id: number;
  requester: string;
  department: string;
  systemName: string;
  accessLevel: string;
  justification: string;
  duration: string;
  requestDate: string;
  status: "pending" | "approved" | "denied" | "escalated";
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number;
  riskFactors: string[];
  approvalChain: string[];
  currentApprover: string;
  comments: Comment[];
  history: HistoryEvent[];
  relatedPolicies: string[];
  entitlements: string[];
  expirationDate: string;
  priority: "low" | "medium" | "high";
  complianceRequirements?: string[];
  previousRequests?: number;
  accessPattern?: string;
  anomalyScore?: number;
}

const AdvancedAccessApproval = () => {
  const [requests, setRequests] = useState<AccessRequest[]>([
    {
      id: 1,
      requester: "Alice Johnson",
      department: "Finance",
      systemName: "Financial Reporting System",
      accessLevel: "Read-Write",
      justification: "Need to prepare quarterly reports",
      duration: "6 months",
      requestDate: "2025-02-01",
      status: "pending",
      riskLevel: "high",
      riskScore: 78,
      riskFactors: [
        "Sensitive Data Access",
        "External System",
        "Unusual Access Pattern",
        "Multiple Failed Previous Requests",
      ],
      approvalChain: ["Manager", "Security Team", "Compliance", "System Owner"],
      currentApprover: "Security Team",
      comments: [
        {
          user: "John Manager",
          text: "Role appropriate for position",
          date: "2025-02-01",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-01", user: "Alice Johnson" },
        {
          action: "Manager Approved",
          date: "2025-02-01",
          user: "John Manager",
        },
      ],
      relatedPolicies: ["FIN-201", "SEC-101", "GDPR-7.2", "SOX-404"],
      entitlements: ["VIEW_REPORTS", "EDIT_ENTRIES", "EXPORT_DATA"],
      expirationDate: "2025-08-01",
      priority: "high",
      complianceRequirements: ["SOX", "GDPR", "ISO27001"],
      previousRequests: 3,
      accessPattern: "Outside Normal Hours",
      anomalyScore: 0.75,
    },
    {
      id: 2,
      requester: "Bob Smith",
      department: "IT Operations",
      systemName: "Cloud Infrastructure Platform",
      accessLevel: "Admin",
      justification: "Need to manage cloud resources and deployments",
      duration: "12 months",
      requestDate: "2025-02-03",
      status: "pending",
      riskLevel: "critical",
      riskScore: 92,
      riskFactors: [
        "Privileged Access",
        "Critical Infrastructure",
        "24/7 Access Required",
        "Multiple Systems Access",
      ],
      approvalChain: ["Manager", "Security Team", "CTO", "Cloud Governance"],
      currentApprover: "Security Team",
      comments: [
        {
          user: "Sarah Manager",
          text: "Please review access scope carefully",
          date: "2025-02-03",
        },
      ],
      history: [{ action: "Submitted", date: "2025-02-03", user: "Bob Smith" }],
      relatedPolicies: ["CLOUD-001", "SEC-303", "PRIV-ACC-1"],
      entitlements: ["ADMIN_ACCESS", "DEPLOY_PROD", "MANAGE_SECURITY"],
      expirationDate: "2026-02-03",
      priority: "high",
      complianceRequirements: ["ISO27001", "SOC2", "NIST"],
      previousRequests: 1,
      accessPattern: "24/7 Access",
      anomalyScore: 0.85,
    },
    {
      id: 3,
      requester: "Carol Chen",
      department: "Human Resources",
      systemName: "Employee Management System",
      accessLevel: "HR Manager",
      justification: "New HR Manager position",
      duration: "Permanent",
      requestDate: "2025-02-02",
      status: "approved",
      riskLevel: "medium",
      riskScore: 45,
      riskFactors: ["PII Access", "Standard HR Role"],
      approvalChain: ["HR Director", "Security Team", "System Owner"],
      currentApprover: "System Owner",
      comments: [
        {
          user: "HR Director",
          text: "Standard access for HR Manager role",
          date: "2025-02-02",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-02", user: "Carol Chen" },
        { action: "HR Approved", date: "2025-02-02", user: "HR Director" },
      ],
      relatedPolicies: ["HR-101", "PII-HANDLING"],
      entitlements: ["VIEW_EMPLOYEE_DATA", "MANAGE_HR_RECORDS"],
      expirationDate: "None",
      priority: "medium",
      complianceRequirements: ["GDPR", "CCPA"],
      previousRequests: 0,
      accessPattern: "Business Hours",
      anomalyScore: 0.2,
    },
    {
      id: 4,
      requester: "David Wilson",
      department: "Sales",
      systemName: "CRM System",
      accessLevel: "Sales Representative",
      justification: "New sales team member",
      duration: "3 months",
      requestDate: "2025-02-04",
      status: "denied",
      riskLevel: "low",
      riskScore: 25,
      riskFactors: ["Standard Sales Access", "Probationary Period"],
      approvalChain: ["Sales Manager", "Security Team"],
      currentApprover: "Completed",
      comments: [
        {
          user: "Sales Manager",
          text: "Pending completion of sales training",
          date: "2025-02-04",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-04", user: "David Wilson" },
        { action: "Denied", date: "2025-02-04", user: "Sales Manager" },
      ],
      relatedPolicies: ["SALES-101", "CRM-ACCESS"],
      entitlements: ["VIEW_CONTACTS", "MANAGE_LEADS"],
      expirationDate: "2025-05-04",
      priority: "low",
      complianceRequirements: ["SALES-COMPLIANCE"],
      previousRequests: 0,
      accessPattern: "Business Hours",
      anomalyScore: 0.1,
    },
    {
      id: 5,
      requester: "Elena Rodriguez",
      department: "Engineering",
      systemName: "Production Database",
      accessLevel: "Database Admin",
      justification: "Emergency access needed for critical system maintenance",
      duration: "24 hours",
      requestDate: "2025-02-05",
      status: "escalated",
      riskLevel: "critical",
      riskScore: 95,
      riskFactors: [
        "Emergency Access",
        "Critical System",
        "Database Admin Rights",
        "Off-Hours Request",
      ],
      approvalChain: ["Tech Lead", "Security Team", "CTO", "Database Owner"],
      currentApprover: "CTO",
      comments: [
        {
          user: "Tech Lead",
          text: "Critical maintenance required",
          date: "2025-02-05",
        },
        {
          user: "Security Team",
          text: "Escalated due to urgency",
          date: "2025-02-05",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-05", user: "Elena Rodriguez" },
        { action: "Escalated", date: "2025-02-05", user: "Security Team" },
      ],
      relatedPolicies: ["DB-EMERGENCY", "CRIT-ACCESS"],
      entitlements: ["FULL_DB_ADMIN", "BACKUP_RESTORE", "SCHEMA_MODIFY"],
      expirationDate: "2025-02-06",
      priority: "high",
      complianceRequirements: ["SOX", "HIPAA", "PCI-DSS"],
      previousRequests: 2,
      accessPattern: "Emergency Access",
      anomalyScore: 0.98,
    },
    {
      id: 6,
      requester: "Frank Lee",
      department: "Marketing",
      systemName: "Social Media Dashboard",
      accessLevel: "Content Publisher",
      justification: "Need to manage company social media accounts",
      duration: "12 months",
      requestDate: "2025-02-06",
      status: "pending",
      riskLevel: "medium",
      riskScore: 55,
      riskFactors: [
        "External System Access",
        "Brand Reputation Impact",
        "Multiple Platform Access",
      ],
      approvalChain: [
        "Marketing Manager",
        "Security Team",
        "Communications Director",
      ],
      currentApprover: "Marketing Manager",
      comments: [],
      history: [{ action: "Submitted", date: "2025-02-06", user: "Frank Lee" }],
      relatedPolicies: ["SOCIAL-MEDIA-101", "BRAND-GUIDELINES"],
      entitlements: ["POST_CONTENT", "ANALYZE_METRICS", "RESPOND_MESSAGES"],
      expirationDate: "2026-02-06",
      priority: "medium",
      complianceRequirements: ["MARKETING-COMPLIANCE", "GDPR"],
      previousRequests: 1,
      accessPattern: "Business Hours",
      anomalyScore: 0.45,
    },
    {
      id: 7,
      requester: "Grace Zhang",
      department: "Research & Development",
      systemName: "AI Development Platform",
      accessLevel: "Senior Developer",
      justification: "Leading new AI model development project",
      duration: "12 months",
      requestDate: "2025-02-07",
      status: "pending",
      riskLevel: "high",
      riskScore: 82,
      riskFactors: [
        "Intellectual Property Access",
        "Model Training Data",
        "High Compute Resources",
        "Competitive Advantage Risk",
      ],
      approvalChain: [
        "R&D Director",
        "Security Team",
        "AI Ethics Board",
        "CTO",
      ],
      currentApprover: "R&D Director",
      comments: [],
      history: [
        { action: "Submitted", date: "2025-02-07", user: "Grace Zhang" },
      ],
      relatedPolicies: ["AI-ETHICS-1", "IP-PROTECTION", "DATA-GOVERNANCE"],
      entitlements: ["AI_PLATFORM_ACCESS", "MODEL_DEPLOYMENT", "DATA_ACCESS"],
      expirationDate: "2026-02-07",
      priority: "high",
      complianceRequirements: [
        "AI Ethics Guidelines",
        "GDPR",
        "Data Protection",
      ],
      previousRequests: 2,
      accessPattern: "Research Hours",
      anomalyScore: 0.72,
    },
    {
      id: 8,
      requester: "Henry Wilson",
      department: "Legal",
      systemName: "Contract Management System",
      accessLevel: "Legal Counsel",
      justification: "Contract review and management",
      duration: "Permanent",
      requestDate: "2025-02-07",
      status: "approved",
      riskLevel: "medium",
      riskScore: 60,
      riskFactors: [
        "Confidential Documents",
        "Legal Precedents Access",
        "Client Data",
      ],
      approvalChain: ["Legal Director", "Compliance", "System Owner"],
      currentApprover: "Completed",
      comments: [
        {
          user: "Legal Director",
          text: "Standard access for legal role",
          date: "2025-02-07",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-07", user: "Henry Wilson" },
        { action: "Approved", date: "2025-02-07", user: "Legal Director" },
      ],
      relatedPolicies: ["LEGAL-001", "CONTRACT-ACCESS"],
      entitlements: ["VIEW_CONTRACTS", "EDIT_LEGAL_DOCS", "CLIENT_DATA"],
      expirationDate: "None",
      priority: "medium",
      complianceRequirements: [
        "Bar Association Rules",
        "Client Confidentiality",
      ],
      previousRequests: 1,
      accessPattern: "Business Hours",
      anomalyScore: 0.45,
    },
    {
      id: 9,
      requester: "Isabella Martinez",
      department: "Customer Support",
      systemName: "Customer Service Platform",
      accessLevel: "Team Lead",
      justification: "Managing support team and escalations",
      duration: "6 months",
      requestDate: "2025-02-08",
      status: "pending",
      riskLevel: "low",
      riskScore: 35,
      riskFactors: ["Customer Data Access", "Standard Support Tools"],
      approvalChain: ["Support Manager", "Security Team"],
      currentApprover: "Support Manager",
      comments: [],
      history: [
        { action: "Submitted", date: "2025-02-08", user: "Isabella Martinez" },
      ],
      relatedPolicies: ["SUPPORT-101", "CUSTOMER-DATA"],
      entitlements: ["SUPPORT_ADMIN", "ESCALATION_MANAGE"],
      expirationDate: "2025-08-08",
      priority: "medium",
      complianceRequirements: ["Customer Privacy", "Support Standards"],
      previousRequests: 0,
      accessPattern: "24/7 Rotating",
      anomalyScore: 0.25,
    },
    {
      id: 10,
      requester: "Jack Thompson",
      department: "Finance",
      systemName: "Treasury Management System",
      accessLevel: "Treasury Analyst",
      justification: "Managing company investments and cash flow",
      duration: "12 months",
      requestDate: "2025-02-08",
      status: "escalated",
      riskLevel: "critical",
      riskScore: 90,
      riskFactors: [
        "Financial Transactions",
        "Banking Access",
        "Investment Authority",
        "High Value Operations",
      ],
      approvalChain: [
        "Finance Manager",
        "Treasury Director",
        "CFO",
        "Board Audit Committee",
      ],
      currentApprover: "CFO",
      comments: [
        {
          user: "Treasury Director",
          text: "Requires additional verification",
          date: "2025-02-08",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-08", user: "Jack Thompson" },
        { action: "Escalated", date: "2025-02-08", user: "Treasury Director" },
      ],
      relatedPolicies: ["TREASURY-001", "FINANCIAL-CONTROLS", "BANKING-ACCESS"],
      entitlements: ["BANK_ACCESS", "PAYMENT_INITIATE", "INVESTMENT_MANAGE"],
      expirationDate: "2026-02-08",
      priority: "high",
      complianceRequirements: [
        "SOX",
        "Banking Regulations",
        "Internal Controls",
      ],
      previousRequests: 1,
      accessPattern: "Business Hours",
      anomalyScore: 0.88,
    },
    {
      id: 11,
      requester: "Kelly Brown",
      department: "Product Management",
      systemName: "Product Analytics Platform",
      accessLevel: "Product Manager",
      justification: "Product performance analysis and roadmap planning",
      duration: "12 months",
      requestDate: "2025-02-09",
      status: "pending",
      riskLevel: "medium",
      riskScore: 58,
      riskFactors: ["Usage Analytics", "Customer Insights", "Revenue Data"],
      approvalChain: ["Product Director", "Security Team", "Data Owner"],
      currentApprover: "Product Director",
      comments: [],
      history: [
        { action: "Submitted", date: "2025-02-09", user: "Kelly Brown" },
      ],
      relatedPolicies: ["PRODUCT-ANALYTICS", "DATA-ACCESS"],
      entitlements: ["ANALYTICS_VIEW", "FEATURE_FLAGS", "USER_METRICS"],
      expirationDate: "2026-02-09",
      priority: "medium",
      complianceRequirements: ["Data Privacy", "Product Security"],
      previousRequests: 3,
      accessPattern: "Business Hours",
      anomalyScore: 0.52,
    },
    {
      id: 12,
      requester: "Liam O'Connor",
      department: "Infrastructure",
      systemName: "Network Management System",
      accessLevel: "Network Engineer",
      justification: "Network maintenance and security monitoring",
      duration: "12 months",
      requestDate: "2025-02-09",
      status: "pending",
      riskLevel: "critical",
      riskScore: 88,
      riskFactors: [
        "Infrastructure Access",
        "Security Systems",
        "Network Controls",
        "Global Access",
      ],
      approvalChain: ["Infrastructure Manager", "Security Team", "CISO", "CTO"],
      currentApprover: "Security Team",
      comments: [
        {
          user: "Infrastructure Manager",
          text: "Critical role for network security",
          date: "2025-02-09",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-09", user: "Liam O'Connor" },
        {
          action: "Manager Approved",
          date: "2025-02-09",
          user: "Infrastructure Manager",
        },
      ],
      relatedPolicies: ["NET-SEC-001", "INFRA-ACCESS", "SECURITY-CONTROLS"],
      entitlements: ["NETWORK_ADMIN", "SECURITY_TOOLS", "MONITORING_SYSTEMS"],
      expirationDate: "2026-02-09",
      priority: "high",
      complianceRequirements: ["ISO27001", "NIST", "PCI-DSS"],
      previousRequests: 2,
      accessPattern: "24/7 On-Call",
      anomalyScore: 0.85,
    },
    {
      id: 13,
      requester: "Maria Garcia",
      department: "Compliance",
      systemName: "Regulatory Reporting System",
      accessLevel: "Compliance Officer",
      justification: "Regulatory reporting and audit management",
      duration: "12 months",
      requestDate: "2025-02-10",
      status: "approved",
      riskLevel: "high",
      riskScore: 75,
      riskFactors: [
        "Regulatory Data",
        "Audit Logs",
        "Compliance Reports",
        "Investigation Access",
      ],
      approvalChain: ["Compliance Director", "Legal", "CCO"],
      currentApprover: "Completed",
      comments: [
        {
          user: "Compliance Director",
          text: "Approved for regulatory duties",
          date: "2025-02-10",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-10", user: "Maria Garcia" },
        { action: "Approved", date: "2025-02-10", user: "Compliance Director" },
      ],
      relatedPolicies: ["COMPLIANCE-001", "AUDIT-LOGS", "REG-REPORTING"],
      entitlements: ["COMPLIANCE_ADMIN", "AUDIT_VIEW", "REPORT_GENERATE"],
      expirationDate: "2026-02-10",
      priority: "high",
      complianceRequirements: ["SEC Regulations", "Internal Audit Standards"],
      previousRequests: 1,
      accessPattern: "Business Hours",
      anomalyScore: 0.65,
    },
    {
      id: 14,
      requester: "Noah Parker",
      department: "Data Science",
      systemName: "Data Lake Access",
      accessLevel: "Data Scientist",
      justification: "Big data analysis and model training",
      duration: "6 months",
      requestDate: "2025-02-10",
      status: "denied",
      riskLevel: "high",
      riskScore: 80,
      riskFactors: [
        "Raw Data Access",
        "PII Data",
        "Large Dataset Export",
        "Algorithm Development",
      ],
      approvalChain: [
        "Data Science Lead",
        "Data Protection Officer",
        "Security Team",
      ],
      currentApprover: "Completed",
      comments: [
        {
          user: "Data Protection Officer",
          text: "Requires additional data privacy training",
          date: "2025-02-10",
        },
      ],
      history: [
        { action: "Submitted", date: "2025-02-10", user: "Noah Parker" },
        {
          action: "Denied",
          date: "2025-02-10",
          user: "Data Protection Officer",
        },
      ],
      relatedPolicies: ["DATA-SCIENCE-001", "DATA-PRIVACY", "MODEL-GOVERNANCE"],
      entitlements: ["DATA_LAKE_ACCESS", "MODEL_TRAIN", "DATA_EXPORT"],
      expirationDate: "2025-08-10",
      priority: "medium",
      complianceRequirements: ["GDPR", "Data Ethics", "Model Governance"],
      previousRequests: 0,
      accessPattern: "Research Hours",
      anomalyScore: 0.78,
    },
    {
      id: 15,
      requester: "Oliver Wright",
      department: "DevOps",
      systemName: "CI/CD Pipeline",
      accessLevel: "DevOps Engineer",
      justification: "Managing deployment pipelines and automation",
      duration: "12 months",
      requestDate: "2025-02-11",
      status: "pending",
      riskLevel: "critical",
      riskScore: 85,
      riskFactors: [
        "Production Deployment",
        "Infrastructure as Code",
        "Secrets Management",
        "Build Systems",
      ],
      approvalChain: ["DevOps Lead", "Security Team", "Release Manager", "CTO"],
      currentApprover: "DevOps Lead",
      comments: [],
      history: [
        { action: "Submitted", date: "2025-02-11", user: "Oliver Wright" },
      ],
      relatedPolicies: [
        "DEVOPS-001",
        "RELEASE-MANAGEMENT",
        "SECURITY-PIPELINE",
      ],
      entitlements: ["PIPELINE_ADMIN", "DEPLOY_PROD", "SECRETS_ACCESS"],
      expirationDate: "2026-02-11",
      priority: "high",
      complianceRequirements: [
        "Release Standards",
        "Security Controls",
        "Audit Requirements",
      ],
      previousRequests: 2,
      accessPattern: "24/7 On-Call",
      anomalyScore: 0.82,
    },
    {
      id: 16,
      requester: "Patricia Kim",
      department: "Quality Assurance",
      systemName: "Test Automation Framework",
      accessLevel: "QA Lead",
      justification: "Managing automated testing infrastructure",
      duration: "12 months",
      requestDate: "2025-02-11",
      status: "pending",
      riskLevel: "medium",
      riskScore: 55,
      riskFactors: [
        "Test Data Access",
        "Automation Scripts",
        "Test Environment Admin",
      ],
      approvalChain: ["QA Manager", "Security Team", "Test Environment Owner"],
      currentApprover: "QA Manager",
      comments: [],
      history: [
        { action: "Submitted", date: "2025-02-11", user: "Patricia Kim" },
      ],
      relatedPolicies: ["QA-001", "TEST-DATA", "AUTOMATION-STANDARDS"],
      entitlements: ["TEST_ADMIN", "AUTOMATION_MANAGE", "ENV_ACCESS"],
      expirationDate: "2026-02-11",
      priority: "medium",
      complianceRequirements: ["Testing Standards", "Data Handling"],
      previousRequests: 1,
      accessPattern: "Business Hours",
      anomalyScore: 0.48,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [activeTab, setActiveTab] = useState("details");
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [complianceView, setComplianceView] = useState(false);
  const [escalationReason, setEscalationReason] = useState("");
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [actionDialog, setActionDialog] = useState<{
    isOpen: boolean;
    type: "approve" | "deny" | null;
    requestId: number | null;
    comment: string;
  }>({
    isOpen: false,
    type: null,
    requestId: null,
    comment: "",
  });
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const analyticsData = [
    { name: "Jan", requests: 65, approved: 45, denied: 20 },
    { name: "Feb", requests: 75, approved: 55, denied: 20 },
  ];

  const getUniqueDepartments = () => {
    const departments = new Set(requests.map((req) => req.department));
    return Array.from(departments);
  };

  const handleAction = (requestId: number, action: "approved" | "denied") => {
    if (!actionDialog.comment.trim()) {
      setShowAlert({
        show: true,
        message: "Comment is required",
        type: "error",
      });
      return;
    }

    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          const newHistory = [
            ...req.history,
            {
              action: action === "approved" ? "Approved" : "Denied",
              date: new Date().toISOString().split("T")[0],
              user: "Current User",
              details: actionDialog.comment,
            },
          ];

          return {
            ...req,
            status: action,
            history: newHistory,
            comments: [
              ...req.comments,
              {
                user: "Current User",
                text: actionDialog.comment,
                date: new Date().toISOString().split("T")[0],
              },
            ],
          };
        }
        return req;
      })
    );

    setShowAlert({
      show: true,
      message: `Request ${
        action === "approved" ? "approved" : "denied"
      } successfully`,
      type: action === "approved" ? "success" : "error",
    });

    setActionDialog({
      isOpen: false,
      type: null,
      requestId: null,
      comment: "",
    });
    setTimeout(
      () => setShowAlert({ show: false, message: "", type: "" }),
      3000
    );
  };

  const handleEscalation = (requestId: number, reason: string) => {
    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            status: "escalated",
            history: [
              ...req.history,
              {
                action: "Escalated",
                date: new Date().toISOString().split("T")[0],
                user: "Current User",
                details: reason,
              },
            ],
          };
        }
        return req;
      })
    );
  };

  const RiskIndicator = ({ level, factors }) => (
    <div
      className={`p-4 rounded-lg ${
        level === "low"
          ? "bg-green-100 text-green-800 border-green-200"
          : level === "medium"
          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
          : "bg-red-100 text-red-800 border-red-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="h-5 w-5" />
        <span className="font-medium">{level.toUpperCase()} Risk Level</span>
      </div>
      <div className="text-sm">
        {factors?.map((factor, i) => (
          <div key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3" />
            {factor}
          </div>
        ))}
      </div>
    </div>
  );

  const RiskAnalysisDialog = ({ request }: { request: AccessRequest }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <Activity className="h-4 w-4 mr-2" />
          View Risk Analysis
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Risk Analysis Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Risk Score</h4>
            <Progress value={request.riskScore} className="h-2" />
            <span className="text-sm text-gray-500">
              {request.riskScore}/100
            </span>
          </div>

          <div>
            <h4 className="font-medium mb-2">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {request.riskFactors.map((factor, i) => (
                <Badge
                  key={i}
                  variant={
                    factor.includes("Critical") ? "destructive" : "secondary"
                  }
                >
                  {factor}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Compliance Impact</h4>
            <div className="space-y-2">
              {request.complianceRequirements?.map((req, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span>{req}</span>
                  <Badge variant="outline">Required</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const DetailContent = ({ request }: { request: AccessRequest }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Requester</label>
          <p className="mt-1">{request.requester}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">
            Department
          </label>
          <p className="mt-1">{request.department}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">System</label>
          <p className="mt-1">{request.systemName}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500">
            Access Level
          </label>
          <p className="mt-1">{request.accessLevel}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500">
            Justification
          </label>
          <p className="mt-1">{request.justification}</p>
        </div>
      </div>
      <RiskIndicator level={request.riskLevel} factors={request.riskFactors} />
      <RiskAnalysisDialog request={request} />

      <div className="mt-4 border rounded-lg p-4">
        <h3 className="font-medium mb-2">Access Pattern Analysis</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Anomaly Score</span>
            <Badge
              variant={request.anomalyScore > 0.7 ? "destructive" : "default"}
            >
              {(request.anomalyScore * 100).toFixed(0)}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span>Previous Requests</span>
            <span>{request.previousRequests}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkflowContent = ({ request }) => (
    <div className="space-y-6">
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">Approval Chain</h3>
        <div className="flex items-center gap-2">
          {request.approvalChain.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  step === request.currentApprover
                    ? "bg-blue-100 text-blue-800"
                    : request.approvalChain.indexOf(request.currentApprover) > i
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {step}
              </div>
              {i < request.approvalChain.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="border rounded-lg p-4">
        <h3 className="font-medium mb-2">Comments</h3>
        <div className="space-y-2">
          {request.comments.map((comment, i) => (
            <div key={i} className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{comment.user}</span>
                <span className="text-gray-500">{comment.date}</span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const filterRequests = () => {
    return requests.filter((request) => {
      const statusMatch =
        statusFilter === "all" || request.status === statusFilter;

      const departmentMatch =
        departmentFilter === "all" || request.department === departmentFilter;

      const searchLower = searchTerm.toLowerCase();
      const searchMatch =
        searchTerm === "" ||
        request.requester.toLowerCase().includes(searchLower) ||
        request.department.toLowerCase().includes(searchLower) ||
        request.systemName.toLowerCase().includes(searchLower) ||
        request.accessLevel.toLowerCase().includes(searchLower) ||
        request.justification.toLowerCase().includes(searchLower);

      return statusMatch && departmentMatch && searchMatch;
    });
  };

  const handleBulkSelect = (requestId: number) => {
    const filteredIds = filterRequests().map((req) => req.id);
    if (!filteredIds.includes(requestId)) return;

    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSelectAll = () => {
    const filteredIds = filterRequests().map((req) => req.id);

    setSelectedRequests((prev) => {
      const currentFilteredSelected = prev.filter((id) =>
        filteredIds.includes(id)
      );
      if (currentFilteredSelected.length === filteredIds.length) {
        return prev.filter((id) => !filteredIds.includes(id));
      } else {
        const newSelections = new Set([...prev, ...filteredIds]);
        return Array.from(newSelections);
      }
    });
  };

  const handleBulkAction = (action: "approve" | "deny" | "escalate") => {
    const updatedRequests = requests.map((request) => {
      if (selectedRequests.includes(request.id)) {
        const newStatus =
          action === "approve"
            ? "approved"
            : action === "deny"
            ? "denied"
            : "escalated";

        return {
          ...request,
          status: newStatus,
          history: [
            ...request.history,
            {
              action:
                action === "approve"
                  ? "Bulk Approved"
                  : action === "deny"
                  ? "Bulk Denied"
                  : "Bulk Escalated",
              date: new Date().toISOString().split("T")[0],
              user: "Current User",
            },
          ],
        };
      }
      return request;
    });

    setRequests(updatedRequests);
    setSelectedRequests([]);
    setShowAlert({
      show: true,
      message: `Bulk ${action} completed successfully`,
      type: action === "approve" ? "success" : "warning",
    });
  };

  const ActionDialog = () => (
    <AlertDialog
      open={actionDialog.isOpen}
      onOpenChange={(isOpen) =>
        setActionDialog({ isOpen, type: null, requestId: null, comment: "" })
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {actionDialog.type === "approve" ? "Approve" : "Deny"} Request
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please provide a reason for your decision.
            {actionDialog.type === "deny" && (
              <span className="text-red-500 block mt-2">
                * Denial reason is required and will be visible to the requester
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4">
          <Textarea
            placeholder="Enter your comments..."
            value={actionDialog.comment}
            onChange={(e) =>
              setActionDialog({ ...actionDialog, comment: e.target.value })
            }
            className="min-h-[100px]"
            required
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              handleAction(
                actionDialog.requestId,
                actionDialog.type === "approve" ? "approved" : "denied"
              )
            }
            className={
              actionDialog.type === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }
            disabled={!actionDialog.comment.trim()}
          >
            {actionDialog.type === "approve" ? "Approve" : "Deny"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const isExpiringSoon = (expirationDate: string) => {
    if (expirationDate === "None") return false;
    const expDate = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiration = Math.ceil(
      (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiration <= 14; // Consider 14 days as "soon"
  };

  const DashboardSection = ({ requests }) => {
    // Calculate metrics for pending requests
    const pendingRequests = requests.filter((r) => r.status === "pending");
    const criticalPending = pendingRequests.filter(
      (r) => r.riskLevel === "critical"
    ).length;
    const highRiskPending = pendingRequests.filter(
      (r) => r.riskLevel === "high"
    ).length;
    const urgentCount = pendingRequests.filter(
      (r) => r.priority === "high"
    ).length;

    // Calculate average response times (mock data - you'd calculate this from actual timestamps)
    const avgResponseTime = "4.2 hours";
    const slaBreachRisk = pendingRequests.filter(
      (r) => r.priority === "high" && r.riskLevel === "critical"
    ).length;

    // Add expiring soon calculation
    const expiringRequests = requests
      .filter(
        (r) => r.status === "approved" && isExpiringSoon(r.expirationDate)
      )
      .sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime()
      );

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Access Request Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{pendingRequests.length}</p>
                  <p className="text-xs text-gray-500">Pending Requests</p>
                </div>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {urgentCount} marked as urgent
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {criticalPending}
                  </p>
                  <p className="text-xs text-gray-500">Critical Risk Pending</p>
                </div>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                +{highRiskPending} high risk pending
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold">{avgResponseTime}</p>
                  <p className="text-xs text-gray-500">Avg. Response Time</p>
                </div>
                <History className="h-4 w-4 text-gray-400" />
              </div>
              <div className="mt-2 text-xs text-gray-500">Target: 8 hours</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-orange-600">
                    {slaBreachRisk}
                  </p>
                  <p className="text-xs text-gray-500">SLA Breach Risk</p>
                </div>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Requires immediate attention
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Critical Pending Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingRequests
                  .filter((r) => r.riskLevel === "critical")
                  .slice(0, 3)
                  .map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{request.requester}</p>
                        <p className="text-xs text-gray-500">
                          {request.systemName}
                        </p>
                      </div>
                      <Badge variant="destructive" className="ml-2">
                        {request.priority.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Expiring Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{request.requester}</p>
                      <div className="flex flex-col">
                        <p className="text-xs text-gray-500">
                          {request.systemName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires: {request.expirationDate}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        new Date(request.expirationDate).getTime() -
                          new Date().getTime() <
                        7 * 24 * 60 * 60 * 1000
                          ? "border-red-500 text-red-500"
                          : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {Math.ceil(
                        (new Date(request.expirationDate).getTime() -
                          new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </Badge>
                  </div>
                ))}
                {expiringRequests.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-2">
                    No access expiring soon
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Approval Queue Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Critical Risk</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (criticalPending /
                          Math.max(pendingRequests.length, 1)) *
                        100
                      }
                      className="w-24 h-2"
                    />
                    <span className="text-sm">{criticalPending}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">High Risk</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (highRiskPending /
                          Math.max(pendingRequests.length, 1)) *
                        100
                      }
                      className="w-24 h-2"
                    />
                    <span className="text-sm">{highRiskPending}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SLA at Risk</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (slaBreachRisk / Math.max(pendingRequests.length, 1)) *
                        100
                      }
                      className="w-24 h-2"
                    />
                    <span className="text-sm">{slaBreachRisk}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Access Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expiring Soon</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (expiringRequests.length /
                          Math.max(requests.length, 1)) *
                        100
                      }
                      className="w-24 h-2"
                    />
                    <span className="text-sm">{expiringRequests.length}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expired</span>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={
                        (requests.filter(
                          (r) =>
                            r.status === "approved" &&
                            new Date(r.expirationDate) < new Date()
                        ).length /
                          Math.max(requests.length, 1)) *
                        100
                      }
                      className="w-24 h-2"
                    />
                    <span className="text-sm">
                      {
                        requests.filter(
                          (r) =>
                            r.status === "approved" &&
                            new Date(r.expirationDate) < new Date()
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Add this helper function to check if any filters are active
  const hasActiveFilters = () => {
    return (
      statusFilter !== "all" || departmentFilter !== "all" || searchTerm !== ""
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <DashboardSection requests={requests} />
      <div className="mb-4 flex justify-between items-center">
        {hasActiveFilters() ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2"
                disabled={selectedRequests.length === 0}
              >
                <Activity className="h-4 w-4" />
                Bulk Actions (
                {
                  selectedRequests.filter((id) =>
                    filterRequests().some((req) => req.id === id)
                  ).length
                }
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleBulkAction("approve")}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction("deny")}>
                <XCircle className="h-4 w-4 mr-2" />
                Deny Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleBulkAction("escalate")}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Escalate Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="text-sm text-gray-500">
            Select a filter to enable bulk actions
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Access Requests</CardTitle>
                {hasActiveFilters() && (
                  <Checkbox
                    checked={
                      filterRequests().length > 0 &&
                      filterRequests().every((req) =>
                        selectedRequests.includes(req.id)
                      )
                    }
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all filtered"
                  />
                )}
              </div>
              <div className="space-y-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search requests..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    className="border rounded-md px-3 py-2 flex-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="denied">Denied</option>
                    <option value="escalated">Escalated</option>
                  </select>
                  <select
                    className="border rounded-md px-3 py-2 flex-1"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {getUniqueDepartments().map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Showing {filterRequests().length} of {requests.length}{" "}
                    requests
                    {hasActiveFilters() && selectedRequests.length > 0 && (
                      <span className="ml-1">
                        (
                        {
                          selectedRequests.filter((id) =>
                            filterRequests().some((req) => req.id === id)
                          ).length
                        }{" "}
                        selected in view)
                      </span>
                    )}
                  </span>
                  <div className="flex gap-2">
                    {hasActiveFilters() && selectedRequests.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRequests([])}
                        className="h-auto p-0 text-blue-600 hover:text-blue-800"
                      >
                        Clear Selection
                      </Button>
                    )}
                    {hasActiveFilters() && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("all");
                          setDepartmentFilter("all");
                          setSelectedRequests([]); // Clear selections when clearing filters
                        }}
                        className="h-auto p-0 text-blue-600 hover:text-blue-800"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filterRequests().length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    No requests match your filters
                  </div>
                ) : (
                  filterRequests().map((request) => (
                    <div
                      key={request.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 ${
                        selectedRequest?.id === request.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {hasActiveFilters() && (
                          <Checkbox
                            checked={selectedRequests.includes(request.id)}
                            onCheckedChange={() => handleBulkSelect(request.id)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Select request ${request.id}`}
                          />
                        )}
                        <div
                          className={`flex-1 cursor-pointer ${
                            !hasActiveFilters() ? "pl-0" : ""
                          }`}
                          onClick={() => setSelectedRequest(request)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{request.requester}</p>
                              <p className="text-sm text-gray-600">
                                {request.systemName}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {request.requestDate}
                              </div>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs ${
                                request.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : request.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : request.status === "escalated"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {request.status.toUpperCase()}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                request.riskLevel === "low"
                                  ? "bg-green-500"
                                  : request.riskLevel === "medium"
                                  ? "bg-yellow-500"
                                  : request.riskLevel === "high"
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span className="text-xs text-gray-500 capitalize">
                              {request.riskLevel} Risk
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-2/3">
          {selectedRequest ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Request Details</CardTitle>
                  {selectedRequest.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          setActionDialog({
                            isOpen: true,
                            type: "approve",
                            requestId: selectedRequest.id,
                            comment: "",
                          })
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() =>
                          setActionDialog({
                            isOpen: true,
                            type: "deny",
                            requestId: selectedRequest.id,
                            comment: "",
                          })
                        }
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="workflow">Workflow</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <DetailContent request={selectedRequest} />
                  </TabsContent>

                  <TabsContent value="workflow">
                    <WorkflowContent request={selectedRequest} />
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="space-y-4">
                      {selectedRequest.history.map((event, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            {i < selectedRequest.history.length - 1 && (
                              <div className="w-0.5 h-full bg-gray-200" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {event.action}
                            </p>
                            <p className="text-xs text-gray-500">
                              {event.user} - {event.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a request to view details
            </div>
          )}
        </div>
      </div>

      {showAlert.show && (
        <Alert
          className={`fixed bottom-4 right-4 w-96 ${
            showAlert.type === "success"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <AlertDescription
            className={
              showAlert.type === "success" ? "text-green-800" : "text-red-800"
            }
          >
            {showAlert.message}
          </AlertDescription>
        </Alert>
      )}
      <ActionDialog />
    </div>
  );
};

export default AdvancedAccessApproval;
