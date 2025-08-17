import React from 'react';
import { BookOpen, Clock, Users, Star, Play, Download, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Courses: React.FC = () => {
  const enrolledCourses = [
    {
      id: 1,
      title: 'Computer Science 101',
      instructor: 'Dr. Sarah Johnson',
      code: 'CS101',
      progress: 85,
      totalLectures: 24,
      completedLectures: 20,
      rating: 4.8,
      nextClass: '2024-02-20 09:00',
      description: 'Introduction to programming concepts and algorithms',
      assignments: 3,
      quizzes: 2
    },
    {
      id: 2,
      title: 'Physics 101',
      instructor: 'Prof. Michael Chen',
      code: 'PHY101',
      progress: 72,
      totalLectures: 20,
      completedLectures: 14,
      rating: 4.6,
      nextClass: '2024-02-20 14:00',
      description: 'Fundamentals of classical mechanics and thermodynamics',
      assignments: 2,
      quizzes: 1
    },
    {
      id: 3,
      title: 'Calculus II',
      instructor: 'Dr. Emily Rodriguez',
      code: 'MATH201',
      progress: 90,
      totalLectures: 18,
      completedLectures: 16,
      rating: 4.9,
      nextClass: '2024-02-21 10:30',
      description: 'Advanced calculus including integration techniques and series',
      assignments: 4,
      quizzes: 3
    },
    {
      id: 4,
      title: 'English Literature',
      instructor: 'Prof. David Wilson',
      code: 'ENG102',
      progress: 78,
      totalLectures: 16,
      completedLectures: 12,
      rating: 4.7,
      nextClass: '2024-02-22 15:00',
      description: 'Survey of major works in English literature from various periods',
      assignments: 2,
      quizzes: 1
    }
  ];

  const availableCourses = [
    {
      id: 5,
      title: 'Data Structures',
      instructor: 'Dr. Alex Kim',
      code: 'CS201',
      rating: 4.8,
      students: 156,
      duration: '16 weeks',
      description: 'Advanced data structures and algorithm analysis'
    },
    {
      id: 6,
      title: 'Organic Chemistry',
      instructor: 'Prof. Lisa Thompson',
      code: 'CHEM201',
      rating: 4.5,
      students: 89,
      duration: '18 weeks',
      description: 'Introduction to organic chemical reactions and mechanisms'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-academic-text">My Courses</h1>
          <p className="text-muted-foreground mt-2">
            Manage your enrolled courses and explore new learning opportunities
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary-dark">
          <BookOpen className="h-4 w-4 mr-2" />
          Browse Catalog
        </Button>
      </div>

      <Tabs defaultValue="enrolled" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enrolled">Enrolled Courses ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="shadow-academic hover:shadow-large transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-academic-text">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.code} • {course.instructor}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {course.completedLectures} of {course.totalLectures} lectures completed
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{course.assignments} assignments</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.quizzes} quizzes</span>
                      </div>
                    </div>
                  </div>

                  {/* Next Class */}
                  <div className="p-3 bg-academic-gray rounded-lg">
                    <p className="text-sm font-medium text-academic-text">Next Class</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(course.nextClass).toLocaleDateString()} at{' '}
                      {new Date(course.nextClass).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Materials
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="shadow-academic hover:shadow-large transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-academic-text">{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.code} • {course.instructor}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  
                  {/* Course Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-dark">
                      Enroll Now
                    </Button>
                    <Button size="sm" variant="outline">
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};