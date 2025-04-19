import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardCheck, FileText, ArrowRight, Star, ThumbsUp } from 'lucide-react';

export default function UsabilityTesting() {
  const [activeTab, setActiveTab] = useState('test-plan');
  const [participantFeedback, setParticipantFeedback] = useState('');
  const [taskRating, setTaskRating] = useState<number | null>(null);
  const [feedbackData, setFeedbackData] = useState<Array<{id: number, feedback: string, rating: number}>>([]);
  const [participantName, setParticipantName] = useState('');
  const { toast } = useToast();

  const handleSubmitFeedback = () => {
    if (!participantFeedback || !taskRating) {
      toast({
        title: "Missing information",
        description: "Please provide both feedback and a rating",
        variant: "destructive",
      });
      return;
    }

    setFeedbackData([
      ...feedbackData,
      {
        id: Date.now(),
        feedback: participantFeedback,
        rating: taskRating
      }
    ]);

    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });

    setParticipantFeedback('');
    setTaskRating(null);
  };

  const testTasks = [
    { id: 1, task: "Create a new account and login", estimated: "1-2 min" },
    { id: 2, task: "Browse and filter events by category", estimated: "1-2 min" },
    { id: 3, task: "Search for a specific event using the search bar", estimated: "1 min" },
    { id: 4, task: "View event details and save an event", estimated: "1-2 min" },
    { id: 5, task: "Register for an event", estimated: "1-2 min" },
    { id: 6, task: "Navigate to the calendar view", estimated: "1 min" },
    { id: 7, task: "View your saved events", estimated: "1 min" },
    { id: 8, task: "Log out from the application", estimated: "30 sec" }
  ];

  const handleStartTest = () => {
    if (!participantName) {
      toast({
        title: "Participant name required",
        description: "Please enter the participant's name before starting",
        variant: "destructive",
      });
      return;
    }
    setActiveTab('test-execution');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="text-3xl text-blue-800">Usability Testing Portal</CardTitle>
          <CardDescription className="text-blue-600">
            Conduct usability tests and collect feedback for the Mahidol Event Platform
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 gap-4 p-2 bg-blue-100 rounded-lg">
          <TabsTrigger value="test-plan" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
            <FileText className="mr-2 h-4 w-4" /> Test Plan
          </TabsTrigger>
          <TabsTrigger value="test-execution" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
            <ClipboardCheck className="mr-2 h-4 w-4" /> Test Execution
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-white data-[state=active]:text-blue-700">
            <ThumbsUp className="mr-2 h-4 w-4" /> Results & Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>DECIDE Framework</CardTitle>
              <CardDescription>Our approach to usability testing follows the DECIDE framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">1. Determine Goals</h3>
                <p>Evaluate the usability of the Mahidol Event Platform in terms of:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Ease of navigation and information discovery</li>
                  <li>Efficiency of event registration process</li>
                  <li>Overall user satisfaction with the interface</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">2. Explore Questions</h3>
                <p>Key questions to be answered through testing:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Can users easily find and register for events?</li>
                  <li>Is the filtering and search functionality intuitive?</li>
                  <li>Do users understand how to save and retrieve their favorite events?</li>
                  <li>Is the calendar view helpful for planning?</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">3. Choose Evaluation Method</h3>
                <p>We will use a combination of:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Task-based testing with specific scenarios</li>
                  <li>Think-aloud protocol to understand user thought processes</li>
                  <li>Post-test questionnaire for satisfaction metrics</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">4. Identify Practical Issues</h3>
                <p>Testing setup and logistics:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Each test session will last approximately 20-30 minutes</li>
                  <li>Testing will be conducted with 5-7 participants (Mahidol students)</li>
                  <li>Screen recording and note-taking will be used to capture data</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">5. Decide How to Deal with Ethical Issues</h3>
                <p>Ethical considerations:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Informed consent will be obtained from all participants</li>
                  <li>Data collected will be anonymized in reporting</li>
                  <li>Participants may opt out at any time</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-700">6. Evaluate, Interpret, and Present Data</h3>
                <p>Analysis approach:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Task completion rates and times will be measured</li>
                  <li>Usability issues will be categorized by severity</li>
                  <li>Findings will be presented with recommendations for improvement</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Participant Setup</CardTitle>
              <CardDescription>Enter participant information to begin testing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="participant-name">Participant Name/ID</Label>
                  <Input 
                    id="participant-name" 
                    placeholder="e.g., P1 or Anonymous Participant 1" 
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="test-date">Test Date</Label>
                  <Input 
                    id="test-date" 
                    type="date" 
                    defaultValue={new Date().toISOString().substring(0, 10)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Demographics</Label>
                  <RadioGroup defaultValue="student">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="faculty" id="faculty" />
                      <Label htmlFor="faculty">Faculty/Staff</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="recording-consent" />
                  <Label htmlFor="recording-consent">Participant has consented to recording</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartTest} className="w-full bg-blue-600 hover:bg-blue-700">
                Start Testing Session <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="test-execution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Tasks</CardTitle>
              <CardDescription>Guide the participant through each task and record observations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-semibold">Participant: {participantName}</p>
                
                <div className="border rounded-lg divide-y">
                  {testTasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-blue-600 font-medium">Task {task.id}:</span> {task.task}
                        </div>
                        <div className="text-sm text-gray-500">
                          Est. time: {task.estimated}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Feedback</CardTitle>
              <CardDescription>Record participant feedback after completing tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">Participant Comments</Label>
                <Textarea 
                  id="feedback" 
                  placeholder="Record observations, quotes, and feedback from the participant..."
                  className="min-h-[120px]"
                  value={participantFeedback}
                  onChange={(e) => setParticipantFeedback(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Task Difficulty Rating (1 = Very Easy, 5 = Very Difficult)</Label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={taskRating === rating ? "default" : "outline"}
                      className={taskRating === rating ? "bg-blue-600" : ""}
                      onClick={() => setTaskRating(rating)}
                    >
                      {rating} <Star className={`ml-1 h-4 w-4 ${taskRating === rating ? "fill-current" : ""}`} />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitFeedback} className="w-full bg-blue-600 hover:bg-blue-700">
                Save Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>View and analyze collected feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackData.length > 0 ? (
                <div className="space-y-4">
                  {feedbackData.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between">
                        <div className="font-medium">Feedback #{item.id}</div>
                        <div className="flex items-center">
                          <span className="mr-2">Difficulty:</span>
                          <span className="bg-blue-100 text-blue-800 font-medium rounded-full px-2.5 py-0.5">
                            {item.rating}/5
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{item.feedback}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <ThumbsUp className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-1">No feedback collected yet</h3>
                  <p>Feedback will appear here as you complete testing sessions</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summarize Findings</CardTitle>
              <CardDescription>Document key observations and improvement suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="positive-findings">Positive Findings</Label>
                  <Textarea 
                    id="positive-findings" 
                    placeholder="What aspects of the system worked well for users?"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="usability-issues">Usability Issues Identified</Label>
                  <Textarea 
                    id="usability-issues" 
                    placeholder="What problems or challenges did users encounter?"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations for Improvement</Label>
                  <Textarea 
                    id="recommendations" 
                    placeholder="What changes would improve the user experience?"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Generate Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}