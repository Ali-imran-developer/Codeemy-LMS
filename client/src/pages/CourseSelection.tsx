import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Users, 
  Calendar, 
  Plus, 
  Minus,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  schedule: string;
  location: string;
  capacity: number;
  enrolled: number;
  description: string;
  prerequisites: string[];
  category: 'core' | 'elective' | 'major' | 'minor';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  isSelected: boolean;
  isWaitlisted: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    code: 'MATH301',
    name: 'Advanced Calculus',
    instructor: 'Dr. Sarah Johnson',
    credits: 4,
    schedule: 'Mon, Wed, Fri 9:00-10:00 AM',
    location: 'Math Building 101',
    capacity: 30,
    enrolled: 28,
    description: 'Advanced topics in calculus including multivariable calculus, vector fields, and differential equations.',
    prerequisites: ['MATH201', 'MATH202'],
    category: 'core',
    difficulty: 'advanced',
    rating: 4.5,
    isSelected: true,
    isWaitlisted: false
  },
  {
    id: '2',
    code: 'PHYS205',
    name: 'Quantum Physics',
    instructor: 'Prof. Michael Chen',
    credits: 3,
    schedule: 'Tue, Thu 2:00-3:30 PM',
    location: 'Physics Lab 201',
    capacity: 25,
    enrolled: 25,
    description: 'Introduction to quantum mechanics, wave functions, and quantum applications.',
    prerequisites: ['PHYS101', 'PHYS102', 'MATH201'],
    category: 'major',
    difficulty: 'advanced',
    rating: 4.2,
    isSelected: false,
    isWaitlisted: true
  },
  {
    id: '3',
    code: 'CHEM101',
    name: 'General Chemistry',
    instructor: 'Dr. Emily Rodriguez',
    credits: 4,
    schedule: 'Mon, Wed 1:00-2:30 PM + Lab Fri 2:00-5:00 PM',
    location: 'Chemistry Building 150',
    capacity: 40,
    enrolled: 32,
    description: 'Fundamental principles of chemistry including atomic structure, bonding, and chemical reactions.',
    prerequisites: [],
    category: 'core',
    difficulty: 'beginner',
    rating: 4.8,
    isSelected: true,
    isWaitlisted: false
  },
  {
    id: '4',
    code: 'CS250',
    name: 'Data Structures',
    instructor: 'Dr. Alex Kumar',
    credits: 3,
    schedule: 'Tue, Thu 10:00-11:30 AM',
    location: 'Computer Lab 305',
    capacity: 35,
    enrolled: 20,
    description: 'Study of fundamental data structures including arrays, linked lists, trees, and graphs.',
    prerequisites: ['CS101', 'CS102'],
    category: 'major',
    difficulty: 'intermediate',
    rating: 4.6,
    isSelected: false,
    isWaitlisted: false
  },
  {
    id: '5',
    code: 'ENG201',
    name: 'Technical Writing',
    instructor: 'Prof. Lisa Anderson',
    credits: 2,
    schedule: 'Wed 3:00-5:00 PM',
    location: 'Liberal Arts 210',
    capacity: 20,
    enrolled: 15,
    description: 'Development of technical writing skills for scientific and engineering communication.',
    prerequisites: ['ENG101'],
    category: 'elective',
    difficulty: 'beginner',
    rating: 4.3,
    isSelected: false,
    isWaitlisted: false
  },
  {
    id: '6',
    code: 'ART105',
    name: 'Digital Design',
    instructor: 'Prof. Maria Garcia',
    credits: 3,
    schedule: 'Mon, Wed 4:00-5:30 PM',
    location: 'Art Studio 102',
    capacity: 15,
    enrolled: 12,
    description: 'Introduction to digital design principles using modern software tools.',
    prerequisites: [],
    category: 'elective',
    difficulty: 'beginner',
    rating: 4.7,
    isSelected: false,
    isWaitlisted: false
  }
];

const categoryColors = {
  core: 'bg-red-100 text-red-800 border-red-200',
  elective: 'bg-green-100 text-green-800 border-green-200',
  major: 'bg-blue-100 text-blue-800 border-blue-200',
  minor: 'bg-purple-100 text-purple-800 border-purple-200',
};

const difficultyColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export const CourseSelection: React.FC = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedCourses = courses.filter(course => course.isSelected);
  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);
  const waitlistedCourses = courses.filter(course => course.isWaitlisted);

  const toggleCourseSelection = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isSelected: !course.isSelected, isWaitlisted: false }
        : course
    ));
  };

  const toggleWaitlist = (courseId: string) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isWaitlisted: !course.isWaitlisted, isSelected: false }
        : course
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Course Selection</h1>
        <p className="text-muted-foreground mt-2">Select courses for the upcoming semester</p>
      </div>

      {/* Selection Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected Courses</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{selectedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Courses enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCredits}</div>
            <p className="text-xs text-muted-foreground">Credit hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waitlisted</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{waitlistedCourses.length}</div>
            <p className="text-xs text-muted-foreground">Courses pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
          <CardDescription>Browse and select courses for registration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, codes, or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="core">Core Courses</option>
              <option value="major">Major Courses</option>
              <option value="elective">Electives</option>
              <option value="minor">Minor Courses</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredCourses.map(course => (
              <Card key={course.id} className={`border-2 ${
                course.isSelected ? 'border-green-500 bg-green-50' : 
                course.isWaitlisted ? 'border-yellow-500 bg-yellow-50' : 
                'border-border'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{course.code}: {course.name}</CardTitle>
                        <Badge variant="outline" className={categoryColors[course.category]}>
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className={difficultyColors[course.difficulty]}>
                          {course.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm mb-3">
                        {course.description}
                      </CardDescription>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Prof. {course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{course.schedule}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.credits} credits</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{course.enrolled}/{course.capacity} enrolled</span>
                        </div>
                      </div>

                      {course.prerequisites.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm font-medium">Prerequisites:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {course.prerequisites.map(prereq => (
                              <Badge key={prereq} variant="secondary" className="text-xs">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({Math.floor(Math.random() * 50) + 10} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      {course.enrolled >= course.capacity ? (
                        <Button
                          variant={course.isWaitlisted ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => toggleWaitlist(course.id)}
                          className="min-w-[120px]"
                        >
                          {course.isWaitlisted ? (
                            <>
                              <Minus className="h-4 w-4 mr-1" />
                              Leave Waitlist
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              Join Waitlist
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant={course.isSelected ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleCourseSelection(course.id)}
                          className="min-w-[120px]"
                        >
                          {course.isSelected ? (
                            <>
                              <Minus className="h-4 w-4 mr-1" />
                              Drop Course
                            </>
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-1" />
                              Add Course
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {selectedCourses.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Ready to submit your course selection?</p>
                <p className="text-sm text-muted-foreground">
                  You have selected {selectedCourses.length} courses ({totalCredits} credits)
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Registration</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};