import type { Metadata } from "next";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileCard from "./ProfileCard";

export const metadata: Metadata = {
  title: "BookNook | My Profile",
  description: "Your BookNook profile.",
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-md pb-4">
        <h1 className="text-center font-display text-3xl font-bold text-forest-900 dark:text-cream-50">
          My Profile
        </h1>
        <ProfileCard />
      </div>
    </ProtectedRoute>
  );
}
