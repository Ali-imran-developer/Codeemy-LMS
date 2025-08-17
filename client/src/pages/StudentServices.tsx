import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  Heart, 
  BookOpen, 
  CreditCard, 
  MapPin, 
  Phone, 
  Clock,
  ExternalLink,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'available' | 'limited' | 'unavailable';
  location: string;
  hours: string;
  contact: string;
  category: 'academic' | 'financial' | 'health' | 'administrative';
}

const services: Service[] = [
  {
    id: '1',
    name: 'Academic Advising',
    description: 'Get guidance on course selection, degree planning, and academic goals.',
    icon: BookOpen,
    status: 'available',
    location: 'Academic Building, Room 205',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    contact: 'advising@edu.com',
    category: 'academic'
  },
  {
    id: '2',
    name: 'Financial Aid Office',
    description: 'Assistance with scholarships, grants, loans, and payment plans.',
    icon: CreditCard,
    status: 'available',
    location: 'Administration Building, Room 101',
    hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    contact: 'financialaid@edu.com',
    category: 'financial'
  },
  {
    id: '3',
    name: 'Health Services',
    description: 'Medical care, mental health support, and wellness programs.',
    icon: Heart,
    status: 'available',
    location: 'Student Health Center',
    hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
    contact: '(555) 123-4567',
    category: 'health'
  },
  {
    id: '4',
    name: 'Registrar Office',
    description: 'Transcripts, enrollment verification, and academic records.',
    icon: FileText,
    status: 'limited',
    location: 'Administration Building, Room 150',
    hours: 'Mon-Fri: 9:00 AM - 4:00 PM',
    contact: 'registrar@edu.com',
    category: 'administrative'
  },
  {
    id: '5',
    name: 'Career Services',
    description: 'Job placement, resume writing, and career counseling.',
    icon: Users,
    status: 'available',
    location: 'Career Center Building',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    contact: 'careers@edu.com',
    category: 'academic'
  },
  {
    id: '6',
    name: 'Disability Services',
    description: 'Accommodations and support for students with disabilities.',
    icon: AlertCircle,
    status: 'available',
    location: 'Student Support Building, Room 120',
    hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
    contact: 'disability@edu.com',
    category: 'administrative'
  }
];

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 border-blue-200',
  financial: 'bg-green-100 text-green-800 border-green-200',
  health: 'bg-red-100 text-red-800 border-red-200',
  administrative: 'bg-purple-100 text-purple-800 border-purple-200',
};

const statusColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  limited: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  unavailable: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  available: CheckCircle,
  limited: AlertCircle,
  unavailable: AlertCircle,
};

export const StudentServices: React.FC = () => {
  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Student Services</h1>
        <p className="text-muted-foreground mt-2">Access support services and resources for your academic journey</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Services</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {services.filter(s => s.status === 'available').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limited Services</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {services.filter(s => s.status === 'limited').length}
            </div>
            <p className="text-xs text-muted-foreground">Reduced hours/capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Services</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
            <p className="text-xs text-muted-foreground">Available to students</p>
          </CardContent>
        </Card>
      </div>

      {/* Services by Category */}
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-4 capitalize flex items-center gap-2">
            {category} Services
            <Badge variant="outline" className={categoryColors[category as keyof typeof categoryColors]}>
              {categoryServices.length}
            </Badge>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryServices.map(service => {
              const StatusIcon = statusIcons[service.status];
              return (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={categoryColors[service.category]}>
                              {service.category}
                            </Badge>
                            <Badge variant="outline" className={statusColors[service.status]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {service.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-4">
                      {service.description}
                    </CardDescription>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{service.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{service.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{service.contact}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" disabled={service.status === 'unavailable'}>
                        Contact Service
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        More Info
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* Emergency Contacts */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-red-800">Campus Security</p>
              <p className="text-red-700">(555) 911-0000</p>
              <p className="text-red-600">24/7 Emergency Response</p>
            </div>
            <div>
              <p className="font-medium text-red-800">Crisis Hotline</p>
              <p className="text-red-700">(555) 988-5555</p>
              <p className="text-red-600">Mental Health Support</p>
            </div>
            <div>
              <p className="font-medium text-red-800">Title IX Office</p>
              <p className="text-red-700">(555) 123-7890</p>
              <p className="text-red-600">Discrimination & Harassment</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};