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
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdvancedAccessApproval = () => {
  const [requests, setRequests] = useState([
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
      riskLevel: "medium",
      riskFactors: ["Sensitive Data Access", "External System"],
      approvalChain: ["Manager", "Security Team", "System Owner"],
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
      relatedPolicies: ["FIN-201", "SEC-101"],
      entitlements: ["VIEW_REPORTS", "EDIT_ENTRIES", "EXPORT_DATA"],
      expirationDate: "2025-08-01",
      priority: "high",
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
  const [bulkSelected, setBulkSelected] = useState(new Set());

  const analyticsData = [
    { name: "Jan", requests: 65, approved: 45, denied: 20 },
    { name: "Feb", requests: 75, approved: 55, denied: 20 },
  ];

  const handleAction = (requestId, action, comment = "") => {
    setRequests(
      requests.map((req) => {
        if (req.id === requestId) {
          const newHistory = [
            ...req.history,
            {
              action: action === "approved" ? "Approved" : "Denied",
              date: new Date().toISOString().split("T")[0],
              user: "Current User",
            },
          ];

          return {
            ...req,
            status: action,
            history: newHistory,
            comments: comment
              ? [
                  ...req.comments,
                  {
                    user: "Current User",
                    text: comment,
                    date: new Date().toISOString().split("T")[0],
                  },
                ]
              : req.comments,
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

    setTimeout(
      () => setShowAlert({ show: false, message: "", type: "" }),
      3000
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

  const DetailContent = ({ request }) => (
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

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Bulk Actions
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-md px-3 py-2"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedRequest?.id === request.id
                        ? "border-blue-500 bg-blue-50"
                        : ""
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
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {request.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
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
                          handleAction(selectedRequest.id, "approved")
                        }
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() =>
                          handleAction(selectedRequest.id, "denied")
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
    </div>
  );
};

export default AdvancedAccessApproval;
