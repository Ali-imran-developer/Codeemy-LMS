import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail as MailIcon, Search, Plus, Inbox, Send, Archive, Star, Trash2 } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  starred: boolean;
  category: 'academic' | 'administrative' | 'personal' | 'system';
}

const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Dr. Sarah Johnson',
    subject: 'Assignment Deadline Extension',
    preview: 'I am writing to inform you that the deadline for the Mathematics assignment has been extended...',
    date: '2024-08-16',
    read: false,
    starred: true,
    category: 'academic'
  },
  {
    id: '2',
    from: 'Student Services',
    subject: 'Course Registration Reminder',
    preview: 'This is a reminder that course registration for the next semester begins next week...',
    date: '2024-08-15',
    read: true,
    starred: false,
    category: 'administrative'
  },
  {
    id: '3',
    from: 'Prof. Michael Chen',
    subject: 'Physics Lab Schedule Update',
    preview: 'Please note that next week\'s physics lab has been rescheduled to Friday...',
    date: '2024-08-14',
    read: false,
    starred: false,
    category: 'academic'
  },
  {
    id: '4',
    from: 'LMS System',
    subject: 'New Quiz Available',
    preview: 'A new quiz for Chemistry has been published and is now available for completion...',
    date: '2024-08-13',
    read: true,
    starred: false,
    category: 'system'
  },
  {
    id: '5',
    from: 'Academic Advisor',
    subject: 'Meeting Confirmation',
    preview: 'This email confirms your appointment scheduled for tomorrow at 2:00 PM...',
    date: '2024-08-12',
    read: false,
    starred: true,
    category: 'academic'
  }
];

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 border-blue-200',
  administrative: 'bg-green-100 text-green-800 border-green-200',
  personal: 'bg-purple-100 text-purple-800 border-purple-200',
  system: 'bg-orange-100 text-orange-800 border-orange-200',
};

export const Mail: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmails = mockEmails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = mockEmails.filter(email => !email.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  if (showCompose) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Compose Email</h1>
            <p className="text-muted-foreground mt-2">Send a new message</p>
          </div>
          <Button variant="outline" onClick={() => setShowCompose(false)}>
            Back to Inbox
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">To</label>
              <Input placeholder="Recipient email address" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input placeholder="Email subject" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea placeholder="Write your message..." rows={10} />
            </div>
            <div className="flex gap-2">
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button variant="outline">Save Draft</Button>
              <Button variant="outline" onClick={() => setShowCompose(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Mail</h1>
          <p className="text-muted-foreground mt-2">Manage your academic communication</p>
        </div>
        <Button onClick={() => setShowCompose(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="h-5 w-5" />
                  Inbox
                </CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="default">{unreadCount}</Badge>
                )}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredEmails.map(email => (
                  <div
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                      selectedEmail?.id === email.id ? 'bg-accent' : ''
                    } ${!email.read ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`text-sm truncate ${!email.read ? 'font-semibold' : 'font-medium'}`}>
                            {email.from}
                          </p>
                          {email.starred && <Star className="h-3 w-3 text-yellow-500 fill-current" />}
                        </div>
                        <p className={`text-sm truncate ${!email.read ? 'font-medium' : ''}`}>
                          {email.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {email.preview}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className={`text-xs ${categoryColors[email.category]}`}>
                            {email.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(email.date)}
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

        {/* Email Content */}
        <div className="lg:col-span-2">
          {selectedEmail ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedEmail.subject}</CardTitle>
                    <CardDescription className="mt-2">
                      From: {selectedEmail.from} • {formatDate(selectedEmail.date)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Badge variant="outline" className={categoryColors[selectedEmail.category]}>
                    {selectedEmail.category}
                  </Badge>
                  <div className="prose max-w-none">
                    <p>{selectedEmail.preview}</p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>Best regards,<br />{selectedEmail.from}</p>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button>Reply</Button>
                    <Button variant="outline">Forward</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MailIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select an email to read</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};