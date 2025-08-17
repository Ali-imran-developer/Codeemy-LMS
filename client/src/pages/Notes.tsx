import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, BookOpen, Calendar } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  date: string;
  lastModified: string;
  tags: string[];
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Calculus - Derivatives',
    content: 'Key concepts about derivatives:\n\n1. Definition: Rate of change of a function\n2. Power rule: d/dx(x^n) = nx^(n-1)\n3. Product rule: d/dx(uv) = u\'v + uv\'\n4. Chain rule: d/dx(f(g(x))) = f\'(g(x)) * g\'(x)',
    subject: 'Mathematics',
    date: '2024-08-15',
    lastModified: '2024-08-16',
    tags: ['calculus', 'derivatives', 'formulas']
  },
  {
    id: '2',
    title: 'Physics - Newton\'s Laws',
    content: 'Newton\'s Three Laws of Motion:\n\n1. First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with constant velocity, unless acted upon by an external force.\n\n2. Second Law: F = ma (Force equals mass times acceleration)\n\n3. Third Law: For every action, there is an equal and opposite reaction.',
    subject: 'Physics',
    date: '2024-08-14',
    lastModified: '2024-08-14',
    tags: ['physics', 'mechanics', 'laws']
  },
  {
    id: '3',
    title: 'Chemistry - Periodic Trends',
    content: 'Important periodic trends:\n\n• Atomic radius: Decreases across a period, increases down a group\n• Ionization energy: Increases across a period, decreases down a group\n• Electronegativity: Increases across a period, decreases down a group\n• Metallic character: Decreases across a period, increases down a group',
    subject: 'Chemistry',
    date: '2024-08-13',
    lastModified: '2024-08-15',
    tags: ['chemistry', 'periodic table', 'trends']
  },
  {
    id: '4',
    title: 'Computer Science - Data Structures',
    content: 'Common data structures and their time complexities:\n\n• Array: Access O(1), Search O(n), Insert O(n), Delete O(n)\n• Linked List: Access O(n), Search O(n), Insert O(1), Delete O(1)\n• Hash Table: Access O(1), Search O(1), Insert O(1), Delete O(1)\n• Binary Tree: Access O(log n), Search O(log n), Insert O(log n), Delete O(log n)',
    subject: 'Computer Science',
    date: '2024-08-12',
    lastModified: '2024-08-13',
    tags: ['data structures', 'algorithms', 'complexity']
  }
];

const subjectColors = {
  'Mathematics': 'bg-blue-100 text-blue-800 border-blue-200',
  'Physics': 'bg-green-100 text-green-800 border-green-200',
  'Chemistry': 'bg-purple-100 text-purple-800 border-purple-200',
  'Computer Science': 'bg-orange-100 text-orange-800 border-orange-200',
};

export const Notes: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const filteredNotes = mockNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Create New Note</h1>
            <p className="text-muted-foreground mt-2">Add a new study note</p>
          </div>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Back to Notes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input placeholder="Note title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input placeholder="Subject (e.g., Mathematics, Physics)" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <Input placeholder="Tags (comma separated)" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea placeholder="Write your notes here..." rows={15} />
            </div>
            <div className="flex gap-2">
              <Button>Save Note</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
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
          <h1 className="text-3xl font-bold text-primary">Notes</h1>
          <p className="text-muted-foreground mt-2">Organize and manage your study notes</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                My Notes ({filteredNotes.length})
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredNotes.map(note => (
                  <div
                    key={note.id}
                    onClick={() => {
                      setSelectedNote(note);
                      setIsEditing(false);
                    }}
                    className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
                      selectedNote?.id === note.id ? 'bg-accent' : ''
                    }`}
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm truncate">{note.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${subjectColors[note.subject as keyof typeof subjectColors] || 'bg-gray-100 text-gray-800'}`}
                        >
                          {note.subject}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {note.content.substring(0, 60)}...
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(note.lastModified)}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {note.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{note.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note Content */}
        <div className="lg:col-span-2">
          {selectedNote ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle>{selectedNote.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Last modified: {formatDate(selectedNote.lastModified)}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge 
                        variant="outline" 
                        className={subjectColors[selectedNote.subject as keyof typeof subjectColors] || 'bg-gray-100 text-gray-800'}
                      >
                        {selectedNote.subject}
                      </Badge>
                      {selectedNote.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input defaultValue={selectedNote.title} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Content</label>
                      <Textarea 
                        defaultValue={selectedNote.content} 
                        rows={20}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {selectedNote.content}
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a note to view or edit</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};