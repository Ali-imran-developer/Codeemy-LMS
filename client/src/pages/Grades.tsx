import React from 'react';
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Grades: React.FC = () => {
  const gradesSummary = {
    currentGPA: 3.67,
    previousGPA: 3.54,
    totalCredits: 24,
    completedCredits: 18
  };

  const semesterGrades = [
    {
      course: 'Computer Science 101',
      code: 'CS101',
      credits: 4,
      grade: 'A-',
      gpa: 3.7,
      assignments: [
        { name: 'Assignment 1', score: 95, maxScore: 100, weight: 15 },
        { name: 'Assignment 2', score: 88, maxScore: 100, weight: 15 },
        { name: 'Midterm Exam', score: 85, maxScore: 100, weight: 25 },
        { name: 'Final Project', score: 92, maxScore: 100, weight: 30 },
        { name: 'Participation', score: 90, maxScore: 100, weight: 15 }
      ]
    },
    {
      course: 'Physics 101',
      code: 'PHY101',
      credits: 4,
      grade: 'B+',
      gpa: 3.3,
      assignments: [
        { name: 'Lab Report 1', score: 87, maxScore: 100, weight: 20 },
        { name: 'Lab Report 2', score: 82, maxScore: 100, weight: 20 },
        { name: 'Midterm Exam', score: 78, maxScore: 100, weight: 30 },
        { name: 'Final Exam', score: 85, maxScore: 100, weight: 30 }
      ]
    },
    {
      course: 'Calculus II',
      code: 'MATH201',
      credits: 3,
      grade: 'A',
      gpa: 4.0,
      assignments: [
        { name: 'Problem Set 1', score: 98, maxScore: 100, weight: 15 },
        { name: 'Problem Set 2', score: 95, maxScore: 100, weight: 15 },
        { name: 'Problem Set 3', score: 94, maxScore: 100, weight: 15 },
        { name: 'Midterm Exam', score: 96, maxScore: 100, weight: 25 },
        { name: 'Final Exam', score: 98, maxScore: 100, weight: 30 }
      ]
    },
    {
      course: 'English Literature',
      code: 'ENG102',
      credits: 3,
      grade: 'B+',
      gpa: 3.3,
      assignments: [
        { name: 'Essay 1', score: 88, maxScore: 100, weight: 25 },
        { name: 'Essay 2', score: 85, maxScore: 100, weight: 25 },
        { name: 'Midterm Exam', score: 82, maxScore: 100, weight: 25 },
        { name: 'Final Essay', score: 90, maxScore: 100, weight: 25 }
      ]
    }
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-50';
    if (grade.startsWith('D')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const calculateOverallScore = (assignments: any[]) => {
    return assignments.reduce((total, assignment) => {
      return total + (assignment.score / assignment.maxScore) * assignment.weight;
    }, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-academic-text">Grade Book</h1>
          <p className="text-muted-foreground mt-2">
            Track your academic performance and view detailed grade breakdowns
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Transcript
        </Button>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-academic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current GPA</p>
                <p className="text-3xl font-bold text-academic-text">{gradesSummary.currentGPA}</p>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm">+0.13</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Previous GPA</p>
                <p className="text-3xl font-bold text-academic-text">{gradesSummary.previousGPA}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Credits</p>
                <p className="text-3xl font-bold text-academic-text">{gradesSummary.completedCredits}</p>
              </div>
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-academic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                <p className="text-3xl font-bold text-academic-text">{gradesSummary.totalCredits}</p>
              </div>
              <Award className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="history">Grade History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          {/* Course Grades */}
          <div className="grid gap-6">
            {semesterGrades.map((course, index) => (
              <Card key={index} className="shadow-academic">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl text-academic-text">{course.course}</CardTitle>
                      <CardDescription>{course.code} • {course.credits} Credits</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-lg font-bold px-3 py-1 ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {calculateOverallScore(course.assignments).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assignment</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Contribution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {course.assignments.map((assignment, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{assignment.name}</TableCell>
                          <TableCell>
                            {assignment.score}/{assignment.maxScore}
                            <span className="text-muted-foreground ml-2">
                              ({((assignment.score / assignment.maxScore) * 100).toFixed(1)}%)
                            </span>
                          </TableCell>
                          <TableCell>{assignment.weight}%</TableCell>
                          <TableCell>
                            {((assignment.score / assignment.maxScore) * assignment.weight).toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="shadow-academic">
            <CardHeader>
              <CardTitle>Academic History</CardTitle>
              <CardDescription>Your complete academic record by semester</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Semester</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>GPA Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Fall 2023</TableCell>
                    <TableCell>Introduction to Programming</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell><Badge className={getGradeColor('B+')}>B+</Badge></TableCell>
                    <TableCell>3.3</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fall 2023</TableCell>
                    <TableCell>Calculus I</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell><Badge className={getGradeColor('A-')}>A-</Badge></TableCell>
                    <TableCell>3.7</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fall 2023</TableCell>
                    <TableCell>English Composition</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell><Badge className={getGradeColor('B')}>B</Badge></TableCell>
                    <TableCell>3.0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-academic">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Your academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Performance analytics chart would be displayed here
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-academic">
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Breakdown of your grades by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">A Grades</span>
                    <span className="text-green-600">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">B Grades</span>
                    <span className="text-blue-600">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">C Grades</span>
                    <span className="text-yellow-600">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};