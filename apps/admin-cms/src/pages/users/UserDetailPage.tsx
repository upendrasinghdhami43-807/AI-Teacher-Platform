import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, GraduationCap, Activity, ShieldBan, MessageSquare, BookOpen } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockUsers } from '@/data/mockUsers';

export default function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = mockUsers.find(u => u.user_id === userId) || mockUsers[0];

  return (
    <div className="animate-fade-in-up space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 text-text-secondary hover:text-text-primary rounded-md hover:bg-bg-hover transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">User Profile</h1>
          <p className="text-sm text-text-secondary">Manage student account and view progress.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="p-6 bg-bg-surface border-border text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-bg-elevated border-2 border-border flex items-center justify-center mb-4">
              <User size={48} className="text-text-muted" />
            </div>
            <h2 className="text-xl font-bold text-text-primary">{user.name}</h2>
            <p className="text-text-secondary">{user.email}</p>
            
            <div className="mt-4 flex gap-2">
              <Badge variant={user.status === 'active' ? 'success' : 'muted'}>{user.status}</Badge>
              <Badge variant="glass">{user.role}</Badge>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <Button variant="outline" fullWidth leftIcon={<MessageSquare size={16} />}>Message User</Button>
              <Button variant="danger" fullWidth className="bg-transparent border border-accent-rose text-accent-rose hover:bg-accent-rose hover:text-white" leftIcon={<ShieldBan size={16} />}>Suspend Account</Button>
            </div>
          </Card>

          <Card className="p-6 bg-bg-surface border-border">
            <h3 className="font-bold text-text-primary mb-4">Account Info</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2"><GraduationCap size={16}/> Grade</span>
                <span className="font-medium text-text-primary">{user.grade}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2"><Activity size={16}/> Joined</span>
                <span className="font-medium text-text-primary">{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary flex items-center gap-2"><BookOpen size={16}/> Enrolled</span>
                <span className="font-medium text-text-primary">{user.enrolled_courses.length} courses</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 bg-bg-surface border-border">
            <h3 className="font-bold text-text-primary mb-4">Enrolled Courses</h3>
            <div className="space-y-4">
              {user.enrolled_courses.map((courseId) => (
                <div key={courseId} className="flex items-center justify-between p-4 bg-bg-base border border-border rounded-lg">
                  <div>
                    <h4 className="font-semibold text-text-primary">{courseId.replace(/-/g, ' ').toUpperCase()}</h4>
                    <p className="text-xs text-text-secondary mt-1">Progress: 45% • Last accessed: 2 days ago</p>
                  </div>
                  <Button variant="ghost" size="sm">View Progress</Button>
                </div>
              ))}
              {user.enrolled_courses.length === 0 && (
                <p className="text-text-muted text-sm text-center py-4">No courses enrolled yet.</p>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-bg-surface border-border">
            <h3 className="font-bold text-text-primary mb-4">Recent Activity Logs</h3>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', action: 'Completed Lesson: Kinematics Part 1' },
                { time: '1 day ago', action: 'Chatted with AI Teacher (15 mins)' },
                { time: '3 days ago', action: 'Enrolled in Physics Class 11' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-2" />
                  <div>
                    <p className="text-sm text-text-primary font-medium">{log.action}</p>
                    <p className="text-xs text-text-secondary mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
