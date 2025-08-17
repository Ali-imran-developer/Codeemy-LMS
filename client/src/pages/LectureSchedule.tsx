import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, Calendar, Filter } from 'lucide-react';

interface Lecture {
  id: string;
  subject: string;
  professor: string;
  time: string;
  duration: string;
  location: string;
  day: string;
  type: 'lecture' | 'lab' | 'seminar' | 'tutorial';
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockLectures: Lecture[] = [
  {
    id: '1',
    subject: 'Advanced Mathematics',
    professor: 'Dr. Sarah Johnson',
    time: '09:00 AM',
    duration: '1h 30m',
    location: 'Room 101, Mathematics Building',
    day: 'Monday',
    type: 'lecture',
    status: 'scheduled'
  },
  {
    id: '2',
    subject: 'Physics Fundamentals',
    professor: 'Prof. Michael Chen',
    time: '11:00 AM',
    duration: '1h',
    location: 'Physics Lab 2',
    day: 'Monday',
    type: 'lab',
    status: 'scheduled'
  },
  {
    id: '3',
    subject: 'Chemistry Lab',
    professor: 'Dr. Emily Rodriguez',
    time: '02:00 PM',
    duration: '2h',
    location: 'Chemistry Lab A',
    day: 'Tuesday',
    type: 'lab',
    status: 'scheduled'
  },
  {
    id: '4',
    subject: 'Computer Science',
    professor: 'Dr. Alex Kumar',
    time: '10:00 AM',
    duration: '1h 15m',
    location: 'Computer Lab 1',
    day: 'Wednesday',
    type: 'lecture',
    status: 'scheduled'
  },
  {
    id: '5',
    subject: 'Advanced Mathematics',
    professor: 'Dr. Sarah Johnson',
    time: '03:00 PM',
    duration: '45m',
    location: 'Room 205, Mathematics Building',
    day: 'Thursday',
    type: 'tutorial',
    status: 'scheduled'
  },
  {
    id: '6',
    subject: 'Research Methodology',
    professor: 'Dr. James Wilson',
    time: '01:00 PM',
    duration: '1h 30m',
    location: 'Seminar Hall 1',
    day: 'Friday',
    type: 'seminar',
    status: 'scheduled'
  }
];

const typeColors = {
  lecture: 'bg-blue-100 text-blue-800 border-blue-200',
  lab: 'bg-green-100 text-green-800 border-green-200',
  seminar: 'bg-purple-100 text-purple-800 border-purple-200',
  tutorial: 'bg-orange-100 text-orange-800 border-orange-200',
};

const statusColors = {
  scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const LectureSchedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredLectures = mockLectures.filter(lecture => {
    const dayMatch = selectedDay === 'All' || lecture.day === selectedDay;
    const typeMatch = selectedType === 'All' || lecture.type === selectedType;
    return dayMatch && typeMatch;
  });

  const getLecturesForDay = (day: string) => {
    return mockLectures.filter(lecture => lecture.day === day);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Lecture Schedule</h1>
          <p className="text-muted-foreground mt-2">View your weekly class timetable and lecture details</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="All">All Days</option>
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="All">All Types</option>
            <option value="lecture">Lectures</option>
            <option value="lab">Labs</option>
            <option value="seminar">Seminars</option>
            <option value="tutorial">Tutorials</option>
          </select>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {daysOfWeek.map(day => (
          <Card key={day} className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{day}</CardTitle>
              <CardDescription>{getLecturesForDay(day).length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {getLecturesForDay(day).map(lecture => (
                  <div key={lecture.id} className="p-2 border rounded-lg bg-accent/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{lecture.subject}</span>
                      <Badge variant="outline" className={`text-xs ${typeColors[lecture.type]}`}>
                        {lecture.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lecture.time}
                    </p>
                  </div>
                ))}
                {getLecturesForDay(day).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No lectures</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Schedule</CardTitle>
          <CardDescription>
            {selectedDay !== 'All' || selectedType !== 'All' 
              ? `Filtered results (${filteredLectures.length} lectures)` 
              : 'Complete lecture schedule for the week'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLectures.map(lecture => (
              <div key={lecture.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{lecture.subject}</h3>
                      <Badge variant="outline" className={typeColors[lecture.type]}>
                        {lecture.type}
                      </Badge>
                      <Badge variant="outline" className={statusColors[lecture.status]}>
                        {lecture.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{lecture.professor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{lecture.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{lecture.time} ({lecture.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{lecture.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLectures.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No lectures found for the selected filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};