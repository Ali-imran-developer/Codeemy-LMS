import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Video, 
  MessageSquare, 
  Download,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'download';
  category: string;
  duration?: string;
  fileSize?: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.',
    category: 'Account',
    helpful: 45
  },
  {
    id: '2',
    question: 'How do I register for courses?',
    answer: 'Course registration can be done through the Course Selection page. Browse available courses, check prerequisites, and click "Add Course" to register.',
    category: 'Academic',
    helpful: 38
  },
  {
    id: '3',
    question: 'Where can I view my grades?',
    answer: 'Your grades are available in the Grade Book section. You can view current grades, grade history, and download grade reports.',
    category: 'Academic',
    helpful: 42
  },
  {
    id: '4',
    question: 'How do I contact my professors?',
    answer: 'You can contact professors through the Mail system or find their contact information in the course details on the Courses page.',
    category: 'Communication',
    helpful: 29
  },
  {
    id: '5',
    question: 'How do I access financial aid information?',
    answer: 'Financial aid information is available in the Account Book section. You can also contact the Financial Aid office directly.',
    category: 'Financial',
    helpful: 33
  },
  {
    id: '6',
    question: 'How do I submit assignments?',
    answer: 'Assignments can be submitted through the course page. Click on the specific course, find the assignment, and upload your files.',
    category: 'Academic',
    helpful: 51
  }
];

const guides: Guide[] = [
  {
    id: '1',
    title: 'Getting Started with the LMS',
    description: 'A comprehensive guide to navigating the Learning Management System',
    type: 'article',
    category: 'Getting Started'
  },
  {
    id: '2',
    title: 'Course Registration Walkthrough',
    description: 'Step-by-step video tutorial on how to register for courses',
    type: 'video',
    category: 'Academic',
    duration: '8 minutes'
  },
  {
    id: '3',
    title: 'Student Handbook 2024',
    description: 'Complete student handbook with policies and procedures',
    type: 'download',
    category: 'Policies',
    fileSize: '2.5 MB'
  },
  {
    id: '4',
    title: 'Using the Grade Book',
    description: 'Learn how to view grades, track progress, and understand grade calculations',
    type: 'article',
    category: 'Academic'
  },
  {
    id: '5',
    title: 'Email and Communication Tutorial',
    description: 'Video guide on using the mail system and contacting faculty',
    type: 'video',
    category: 'Communication',
    duration: '5 minutes'
  },
  {
    id: '6',
    title: 'Financial Aid Guide',
    description: 'Understanding scholarships, grants, and payment options',
    type: 'download',
    category: 'Financial',
    fileSize: '1.8 MB'
  }
];

const categories = ['All', 'Getting Started', 'Academic', 'Communication', 'Financial', 'Technical', 'Policies'];

export const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'download': return Download;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800 border-red-200';
      case 'download': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Help & Support</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions and helpful resources</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search help articles, FAQs, and guides..."
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
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              {filteredFAQs.length} questions found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredFAQs.map(faq => (
                <div key={faq.id} className="border rounded-lg">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-4 text-left hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{faq.question}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {faq.helpful} found helpful
                          </span>
                        </div>
                      </div>
                      {expandedFAQ === faq.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4 border-t bg-accent/50">
                      <p className="text-sm text-muted-foreground mt-3">{faq.answer}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs text-muted-foreground">Was this helpful?</span>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Yes
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          No
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Guides and Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Guides & Resources
            </CardTitle>
            <CardDescription>
              {filteredGuides.length} resources available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredGuides.map(guide => {
                const TypeIcon = getTypeIcon(guide.type);
                return (
                  <div key={guide.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <TypeIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={getTypeColor(guide.type)}>
                            {guide.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {guide.category}
                          </Badge>
                          {guide.duration && (
                            <span className="text-xs text-muted-foreground">{guide.duration}</span>
                          )}
                          {guide.fileSize && (
                            <span className="text-xs text-muted-foreground">{guide.fileSize}</span>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Still Need Help?
          </CardTitle>
          <CardDescription>Contact our support team for personalized assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get instant help from our support team
              </p>
              <Button size="sm">Start Chat</Button>
            </div>

            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send us an email and we'll respond within 24 hours
              </p>
              <Button size="sm" variant="outline">Send Email</Button>
            </div>

            <div className="text-center">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Call us during business hours for immediate assistance
              </p>
              <Button size="sm" variant="outline">
                <Phone className="h-3 w-3 mr-1" />
                Call Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};