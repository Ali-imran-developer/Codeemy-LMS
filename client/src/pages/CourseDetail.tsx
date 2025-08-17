import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Play, 
  Download, 
  Clock, 
  User, 
  BookOpen,
  FileText,
  CheckCircle,
  Calendar
} from 'lucide-react';

// Mock data for course details
const mockCourseData = {
  '1': {
    id: '1',
    name: 'Advanced Mathematics',
    instructor: 'Dr. Sarah Johnson',
    description: 'This comprehensive course covers advanced mathematical concepts including multivariable calculus, linear algebra, differential equations, and their applications in engineering and science.',
    progress: 75,
    totalVideos: 24,
    completedVideos: 18,
    assignments: 8,
    completedAssignments: 6,
    schedule: 'Mon, Wed, Fri 9:00-10:30 AM',
    location: 'Mathematics Building, Room 201',
    credits: 4,
    videos: [
      { id: '1', title: 'Introduction to Multivariable Calculus', duration: '45:30', completed: true },
      { id: '2', title: 'Partial Derivatives', duration: '52:15', completed: true },
      { id: '3', title: 'Multiple Integrals', duration: '48:20', completed: false },
      { id: '4', title: 'Vector Fields', duration: '41:45', completed: false },
    ],
    assignmentList: [
      { id: '1', title: 'Calculus Problem Set 1', dueDate: '2024-08-20', submitted: true, grade: 'A-' },
      { id: '2', title: 'Linear Algebra Quiz', dueDate: '2024-08-22', submitted: true, grade: 'B+' },
      { id: '3', title: 'Differential Equations Project', dueDate: '2024-08-25', submitted: false, grade: null },
    ]
  },
  // Add more courses as needed
};

export const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? mockCourseData[courseId as keyof typeof mockCourseData] : null;

  if (!course) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
              <p className="text-muted-foreground">The requested course could not be found.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      {/* Course Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{course.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 text-base">
                <User className="h-4 w-4" />
                {course.instructor}
              </CardDescription>
            </div>
            <Badge className="text-sm">{course.credits} Credits</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{course.description}</p>
          
          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{course.progress}%</div>
              <p className="text-sm text-muted-foreground">Progress</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{course.completedVideos}/{course.totalVideos}</div>
              <p className="text-sm text-muted-foreground">Videos Watched</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{course.completedAssignments}/{course.assignments}</div>
              <p className="text-sm text-muted-foreground">Assignments</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">A-</div>
              <p className="text-sm text-muted-foreground">Current Grade</p>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{course.schedule}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lecture Videos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Lecture Videos
            </CardTitle>
            <CardDescription>{course.completedVideos} of {course.totalVideos} completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {course.videos.map((video, index) => (
                <div key={video.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex-shrink-0">
                    {video.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-muted-foreground rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{video.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{video.duration}</span>
                    </div>
                  </div>
                  <Button size="sm" variant={video.completed ? "outline" : "default"}>
                    <Play className="h-3 w-3 mr-1" />
                    {video.completed ? 'Rewatch' : 'Watch'}
                  </Button>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Videos ({course.totalVideos})
            </Button>
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Assignments
            </CardTitle>
            <CardDescription>{course.completedAssignments} of {course.assignments} completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {course.assignmentList.map((assignment) => (
                <div key={assignment.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{assignment.title}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        {assignment.grade && (
                          <Badge variant="outline" className="text-xs">
                            Grade: {assignment.grade}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {assignment.submitted ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Button size="sm">Submit</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Assignments
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Course Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Course Materials
          </CardTitle>
          <CardDescription>Download textbooks, slides, and additional resources</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Course Syllabus</h4>
              <p className="text-sm text-muted-foreground mb-3">Complete course outline</p>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Textbook PDF</h4>
              <p className="text-sm text-muted-foreground mb-3">Digital textbook</p>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-medium mb-1">Lecture Slides</h4>
              <p className="text-sm text-muted-foreground mb-3">All presentation slides</p>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};