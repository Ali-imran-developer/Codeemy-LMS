import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Building,
  Users,
  BookOpen,
  AlertCircle
} from 'lucide-react';

interface ContactInfo {
  department: string;
  email: string;
  phone: string;
  location: string;
  hours: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const contactInfo: ContactInfo[] = [
  {
    department: 'Academic Affairs',
    email: 'academics@edu.com',
    phone: '(555) 123-4567',
    location: 'Academic Building, Room 200',
    hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    description: 'Course registration, academic policies, and degree requirements',
    icon: BookOpen
  },
  {
    department: 'Student Services',
    email: 'services@edu.com',
    phone: '(555) 123-4568',
    location: 'Student Center, Room 150',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
    description: 'General student support, housing, and campus life',
    icon: Users
  },
  {
    department: 'Financial Aid',
    email: 'financialaid@edu.com',
    phone: '(555) 123-4569',
    location: 'Administration Building, Room 101',
    hours: 'Mon-Fri: 8:00 AM - 4:00 PM',
    description: 'Scholarships, grants, loans, and payment plans',
    icon: Building
  },
  {
    department: 'IT Support',
    email: 'itsupport@edu.com',
    phone: '(555) 123-4570',
    location: 'Technology Center, Room 120',
    hours: 'Mon-Fri: 7:00 AM - 7:00 PM',
    description: 'Technical assistance, LMS support, and account issues',
    icon: MessageSquare
  }
];

const inquiryTypes = [
  'General Information',
  'Academic Support',
  'Financial Aid',
  'Technical Support',
  'Campus Services',
  'Admissions',
  'Other'
];

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    inquiryType: '',
    subject: '',
    message: '',
    urgent: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Contact Us</h1>
        <p className="text-muted-foreground mt-2">Get in touch with our support team for assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send us a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Student ID</label>
                  <Input
                    placeholder="Your student ID (optional)"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Inquiry Type *</label>
                  <select
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                    required
                  >
                    <option value="">Select inquiry type</option>
                    {inquiryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject *</label>
                <Input
                  placeholder="Brief description of your inquiry"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <Textarea
                  placeholder="Please provide detailed information about your inquiry..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => handleInputChange('urgent', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="urgent" className="text-sm">
                  This is an urgent matter
                </label>
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Department Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Department Contacts</CardTitle>
              <CardDescription>Direct contact information for specific departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactInfo.map((dept, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <dept.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{dept.department}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{dept.description}</p>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href={`mailto:${dept.email}`} className="text-primary hover:underline">
                              {dept.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${dept.phone}`} className="text-primary hover:underline">
                              {dept.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{dept.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{dept.hours}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription className="text-red-700">
                For urgent matters requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-800">Campus Security</span>
                  <a href="tel:555-911-0000" className="text-red-700 font-mono hover:underline">
                    (555) 911-0000
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-800">Crisis Hotline</span>
                  <a href="tel:555-988-5555" className="text-red-700 font-mono hover:underline">
                    (555) 988-5555
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-red-800">After Hours Support</span>
                  <a href="tel:555-123-9999" className="text-red-700 font-mono hover:underline">
                    (555) 123-9999
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Response Time:</strong>
                  <p className="text-muted-foreground">
                    We typically respond to inquiries within 24-48 hours during business days.
                  </p>
                </div>
                <div>
                  <strong>Office Hours:</strong>
                  <p className="text-muted-foreground">
                    Monday - Friday: 8:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 12:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
                <div>
                  <strong>Campus Address:</strong>
                  <p className="text-muted-foreground">
                    123 University Avenue<br />
                    Education City, State 12345
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};