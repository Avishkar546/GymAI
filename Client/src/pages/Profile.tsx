import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react';
import { Card } from '../component/ui/Card';
import { Button } from '../component/ui/Button';
import { Loader2, ArrowRight } from 'lucide-react';

const Profile = () => {
  const {user, isLoading, profile, plan, fetchProfile, generatePlan} = useAuth();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (user && !profile) {
      fetchProfile();
    }
  }, [user, profile]);

  if(!user && !isLoading) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  if(!profile && !isLoading) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    try {
      await generatePlan();
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEditProfile = () => {
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Summary */}
        <Card variant="bordered" className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Training Profile</h1>
              <p className="text-[var(--color-muted)]">Last updated: {profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Just now'}</p>
            </div>
            <Button variant="secondary" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Goal</p>
              <p className="font-semibold capitalize">{profile?.goal}</p>
            </div>
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Experience</p>
              <p className="font-semibold capitalize">{profile?.experience}</p>
            </div>
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Days per Week</p>
              <p className="font-semibold">{profile?.days_per_week}</p>
            </div>
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Session Length</p>
              <p className="font-semibold">{profile?.session_length} min</p>
            </div>
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Equipment</p>
              <p className="font-semibold capitalize">{profile?.equipment.replace('_', ' ')}</p>
            </div>
            <div className="p-4 bg-[var(--color-background)] rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Split Type</p>
              <p className="font-semibold capitalize">{profile?.preferred_split.replace('_', ' ')}</p>
            </div>
          </div>

          {profile?.injuries && (
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-[var(--color-muted)] text-sm mb-1">Injuries/Limitations</p>
              <p className="text-sm">{profile.injuries}</p>
            </div>
          )}
        </Card>

        {/* Workout Plan */}
        <Card variant="bordered">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Workout Plan</h2>
            {!plan && (
              <Button 
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Plan <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>

          {isGenerating && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-[var(--color-accent)] mx-auto mb-4 animate-spin" />
                <p className="text-[var(--color-muted)]">Generating your personalized plan...</p>
              </div>
            </div>
          )}

          {plan && (
            <div className="space-y-6">
              <div className="p-4 bg-[var(--color-background)] rounded-lg">
                <p className="text-[var(--color-muted)] text-sm mb-1">Plan Notes</p>
                <p className="text-sm">{plan.notes}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Weekly Schedule</h3>
                <div className="space-y-3">
                  {Object.entries(plan.workoutPlan || {}).map(([day, exercises]: [string, any], index) => (
                    <div key={index} className="p-4 bg-[var(--color-background)] rounded-lg">
                      <h4 className="font-semibold mb-2">{day}</h4>
                      <ul className="space-y-1">
                        {exercises.map((exercise: string, idx: number) => (
                          <li key={idx} className="text-sm text-[var(--color-muted)] flex items-center">
                            <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-2"></span>
                            {exercise}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="secondary" onClick={handleGeneratePlan} className="w-full">
                Regenerate Plan
              </Button>
            </div>
          )}

          {!plan && !isGenerating && (
            <div className="text-center py-12">
              <p className="text-[var(--color-muted)] mb-4">No workout plan generated yet.</p>
              <Button onClick={handleGeneratePlan} className="gap-2">
                Generate My Workout Plan <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Profile
