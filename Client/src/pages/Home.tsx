import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../component/ui/Button";
import { Card } from "../component/ui/Card";
import { Sparkles, Zap, Target, TrendingUp } from "lucide-react";

const Home = () => {
  const { user, isLoading } = useAuth();

  if (user && !isLoading) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          AI-Powered <span className="text-[var(--color-accent)]">Fitness Plans</span>
        </h1>
        <p className="text-xl text-[var(--color-muted)] mb-8">
          Get personalized workout plans tailored to your goals, experience, and equipment. Let AI create your perfect training program.
        </p>
        <Link to="/auth/sign-in">
          <Button size="lg" className="gap-2">
            Get Started <Sparkles className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Card variant="bordered">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-[var(--color-accent)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Personalized Plans</h3>
              <p className="text-[var(--color-muted)]">
                AI analyzes your goals, experience level, and equipment to create the perfect workout routine.
              </p>
            </div>
          </div>
        </Card>

        <Card variant="bordered">
          <div className="flex items-start gap-4">
            <Target className="w-8 h-8 text-[var(--color-accent)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Multiple Training Splits</h3>
              <p className="text-[var(--color-muted)]">
                Choose from Full Body, Upper/Lower, Push/Pull/Legs, or let AI decide the best split for you.
              </p>
            </div>
          </div>
        </Card>

        <Card variant="bordered">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-[var(--color-accent)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Adapt to Your Schedule</h3>
              <p className="text-[var(--color-muted)]">
                Train 2-6 days per week with sessions ranging from 30 to 90 minutes. Your schedule, your rules.
              </p>
            </div>
          </div>
        </Card>

        <Card variant="bordered">
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-[var(--color-accent)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Injury Aware</h3>
              <p className="text-[var(--color-muted)]">
                Tell us about any injuries or limitations, and we'll create a plan that works around them.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="max-w-2xl mx-auto">
        <Card variant="bordered" className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fitness?</h2>
          <p className="text-[var(--color-muted)] mb-8">
            Sign up now and get your AI-powered personalized training plan in minutes.
          </p>
          <Link to="/auth/sign-up">
            <Button size="lg" className="gap-2">
              Start Your Journey <Zap className="w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Home;
