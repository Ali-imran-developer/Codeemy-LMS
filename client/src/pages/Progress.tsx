import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Award, BookOpen, Clock } from 'lucide-react';

interface CourseProgress {
  id: string;
  name: string;
  progress: number;
  grade: string;
  assignments: { completed: number; total: number };
  lectures: { attended: number; total: number };
  status: 'excellent' | 'good' | 'needs-improvement';
}

const mockCourseProgress: CourseProgress[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    progress: 85,
    grade: 'A-',
    assignments: { completed: 8, total: 10 },
    lectures: { attended: 14, total: 15 },
    status: 'excellent'
  },
  {
    id: '2',
    name: 'Physics Fundamentals',
    progress: 72,
    grade: 'B+',
    assignments: { completed: 6, total: 8 },
    lectures: { attended: 10, total: 12 },
    status: 'good'
  },
  {
    id: '3',
    name: 'Chemistry Lab',
    progress: 58,
    grade: 'C+',
    assignments: { completed: 4, total: 9 },
    lectures: { attended: 8, total: 14 },
    status: 'needs-improvement'
  },
  {
    id: '4',
    name: 'Computer Science',
    progress: 91,
    grade: 'A',
    assignments: { completed: 7, total: 7 },
    lectures: { attended: 12, total: 13 },
    status: 'excellent'
  }
];

const statusColors = {
  excellent: 'bg-green-100 text-green-800 border-green-200',
  good: 'bg-blue-100 text-blue-800 border-blue-200',
  'needs-improvement': 'bg-orange-100 text-orange-800 border-orange-200',
};

const progressColors = {
  excellent: 'bg-green-500',
  good: 'bg-blue-500',
  'needs-improvement': 'bg-orange-500',
};

export const Progress: React.FC = () => {
  const overallProgress = Math.round(
    mockCourseProgress.reduce((sum, course) => sum + course.progress, 0) / mockCourseProgress.length
  );

  const totalAssignments = mockCourseProgress.reduce((sum, course) => sum + course.assignments.total, 0);
  const completedAssignments = mockCourseProgress.reduce((sum, course) => sum + course.assignments.completed, 0);

  const totalLectures = mockCourseProgress.reduce((sum, course) => sum + course.lectures.total, 0);
  const attendedLectures = mockCourseProgress.reduce((sum, course) => sum + course.lectures.attended, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Academic Progress</h1>
        <p className="text-muted-foreground mt-2">Track your academic performance and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <ProgressBar value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAssignments}/{totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((attendedLectures / totalLectures) * 100)}%</div>
            <p className="text-xs text-muted-foreground">{attendedLectures}/{totalLectures} lectures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourseProgress.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress Details */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Detailed progress for each of your enrolled courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockCourseProgress.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{course.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={statusColors[course.status]}>
                        {course.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Current Grade: {course.grade}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{course.progress}%</div>
                    <p className="text-sm text-muted-foreground">Complete</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <ProgressBar value={course.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Assignments</span>
                      </div>
                      <span className="text-sm font-bold">
                        {course.assignments.completed}/{course.assignments.total}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Lectures</span>
                      </div>
                      <span className="text-sm font-bold">
                        {course.lectures.attended}/{course.lectures.total}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};