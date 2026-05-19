import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card } from '../component/ui/Card';
import { Button } from '../component/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Mail, Shield } from 'lucide-react';

const Account = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

        {/* User Info Card */}
        <Card variant="bordered" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[var(--color-background)] rounded-lg">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--color-accent)]" />
                <div>
                  <p className="text-sm text-[var(--color-muted)]">Email</p>
                  <p className="font-medium">{user?.email || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[var(--color-background)] rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[var(--color-accent)]" />
                <div>
                  <p className="text-sm text-[var(--color-muted)]">Account ID</p>
                  <p className="font-medium text-sm break-all">{user?.id || 'Loading...'}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card variant="bordered" className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              onClick={() => navigate("/profile")}
            >
              View Training Profile
            </Button>
            <Button 
              variant="secondary" 
              className="w-full justify-start"
              onClick={() => navigate("/onboarding")}
            >
              Update Training Profile
            </Button>
          </div>
        </Card>

        {/* Help Card */}
        <Card variant="bordered">
          <h2 className="text-xl font-semibold mb-4">Help & Support</h2>
          <p className="text-[var(--color-muted)] text-sm mb-4">
            Need help? Check out our documentation or contact support.
          </p>
          <div className="space-y-2">
            <Button variant="secondary" className="w-full">
              Documentation
            </Button>
            <Button variant="secondary" className="w-full">
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Account;
