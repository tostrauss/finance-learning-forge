// src/pages/Signin.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If already signed in, redirect or show status
  useEffect(() => {
    if (user) {
      console.log("🌟 User already signed in:", user.email);
      // Removed automatic navigation; user must confirm via button

    }
  }, [user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      // login sets user in context, useEffect will handle redirect
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // onAuthStateChanged in context will update user and trigger redirect
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Already Signed In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">You are signed in as <strong>{user.email}</strong>.</p>
            <Button className="mt-4 w-full" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In…" : "Sign In"}
            </Button>
          </form>
          <div className="my-4 flex items-center">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2 text-gray-500">OR</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
