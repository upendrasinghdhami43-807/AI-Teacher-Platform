import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { mockCourses } from '@/data/mockCourses';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';

export default function CoursesAdminPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = mockCourses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    course.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">Courses</h1>
          <p className="text-text-secondary mt-1">Manage and create educational courses.</p>
        </div>
        <Link to="/courses/new">
          <Button variant="primary" leftIcon={<Plus size={18} />}>Create Course</Button>
        </Link>
      </div>

      <Card className="p-4 bg-bg-surface border-border flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <Input 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={setSearchTerm}
            className="pl-10 w-full"
          />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />}>Filters</Button>
      </Card>

      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-elevated border-b border-border text-text-secondary font-medium">
              <tr>
                <th className="px-6 py-4">Course Details</th>
                <th className="px-6 py-4">Level / Subject</th>
                <th className="px-6 py-4">Metrics</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCourses.map(course => (
                <tr key={course.course_id} className="hover:bg-bg-hover transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-text-primary mb-1">{course.title}</div>
                    <div className="text-text-muted text-xs">Instructor: {course.instructor_name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <Badge variant="glass" className="text-xs">{course.subject.toUpperCase()}</Badge>
                      <span className="text-xs text-text-secondary">{course.level.replace('_', ' ').toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-text-secondary text-xs space-y-1">
                      <div>{course.total_lessons} Lessons</div>
                      <div>{course.enrolled_count.toLocaleString()} Students</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={course.is_published ? 'success' : 'warning'}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-muted hover:text-primary-400 transition-colors" title="View">
                        <Eye size={18} />
                      </button>
                      <Link to={`/courses/${course.course_id}`} className="p-2 text-text-muted hover:text-accent-cyan transition-colors" title="Edit">
                        <Edit size={18} />
                      </Link>
                      <button className="p-2 text-text-muted hover:text-accent-rose transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredCourses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                    No courses found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
