import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'lecture' | 'assignment' | 'exam' | 'meeting';
  description?: string;
}

const mockEvents: Event[] = [
  { id: '1', title: 'Mathematics Lecture', date: '2024-08-20', time: '09:00', type: 'lecture', description: 'Calculus fundamentals' },
  { id: '2', title: 'Physics Assignment Due', date: '2024-08-22', time: '23:59', type: 'assignment', description: 'Newton\'s Laws problems' },
  { id: '3', title: 'Chemistry Exam', date: '2024-08-25', time: '14:00', type: 'exam', description: 'Organic Chemistry midterm' },
  { id: '4', title: 'Academic Advisor Meeting', date: '2024-08-27', time: '11:00', type: 'meeting', description: 'Course selection discussion' },
];

const eventTypeColors = {
  lecture: 'bg-blue-100 text-blue-800 border-blue-200',
  assignment: 'bg-orange-100 text-orange-800 border-orange-200',
  exam: 'bg-red-100 text-red-800 border-red-200',
  meeting: 'bg-green-100 text-green-800 border-green-200',
};

export const Calendar: React.FC = () => {
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getEventsForDate = (date: string) => {
    return mockEvents.filter(event => event.date === date);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Academic Calendar</h1>
          <p className="text-muted-foreground mt-2">Manage your schedule and upcoming events</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <CardDescription>Click on a date to view events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
                const dateString = date.toISOString().split('T')[0];
                const hasEvents = getEventsForDate(dateString).length > 0;
                const isToday = dateString === new Date().toISOString().split('T')[0];
                
                return (
                  <Button
                    key={i}
                    variant={selectedDate === dateString ? "default" : "ghost"}
                    className={`h-10 w-10 p-0 ${isToday ? 'ring-2 ring-primary' : ''} ${hasEvents ? 'bg-primary/10' : ''}`}
                    onClick={() => setSelectedDate(dateString)}
                  >
                    {date.getDate()}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              {selectedDate ? `Events for ${formatDate(selectedDate)}` : 'Select a date to view events'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDate ? (
                getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map(event => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                          )}
                        </div>
                        <Badge variant="outline" className={eventTypeColors[event.type]}>
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No events scheduled for this date</p>
                )
              ) : (
                mockEvents.slice(0, 5).map(event => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(event.date)} at {event.time}
                        </p>
                      </div>
                      <Badge variant="outline" className={eventTypeColors[event.type]}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};