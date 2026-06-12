"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { AvatarUpload } from "@/components/account/AvatarUpload";
import { useUI } from "@/stores/ui";

export default function AccountSettingsPage() {
  const { user } = useUser();
  const addToast = useUI((s) => s.addToast);

  const [name, setName] = useState(user?.user_metadata?.name ?? "");
  const [phone, setPhone] = useState(user?.user_metadata?.phone ?? "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const profileMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.updateUser({
        data: { name, phone },
      });
      if (error) throw error;

      // Also update the profiles table
      await supabase
        .from("profiles")
        .update({ name, phone })
        .eq("id", user!.id);
    },
    onSuccess: () => {
      addToast({ type: "success", message: "Profile updated successfully" });
    },
    onError: (error) => {
      addToast({ type: "error", message: error.message });
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async () => {
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      addToast({ type: "success", message: "Password updated successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      addToast({ type: "error", message: error.message });
    },
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-xl">Account Settings</h2>

      {/* Avatar */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h3 className="font-display text-lg mb-6">Profile Photo</h3>
        <AvatarUpload />
      </section>

      {/* Profile Info */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h3 className="font-display text-lg mb-6">Personal Information</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            profileMutation.mutate();
          }}
          className="space-y-4 max-w-md"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              value={user?.email ?? ""}
              disabled
              className="input bg-walnut/5 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-muted">
              Email cannot be changed here.
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Phone Number
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              placeholder="98XXXXXXXX"
            />
          </div>

          <button
            type="submit"
            disabled={profileMutation.isPending}
            className="rounded-btn bg-walnut px-6 py-2.5 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
          >
            {profileMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Change Password */}
      <section className="rounded-card border border-walnut/10 bg-white p-6 shadow-warm">
        <h3 className="font-display text-lg mb-6">Change Password</h3>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            passwordMutation.mutate();
          }}
          className="space-y-4 max-w-md"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              placeholder="Min 8 characters"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
            />
          </div>

          <button
            type="submit"
            disabled={passwordMutation.isPending}
            className="rounded-btn bg-walnut px-6 py-2.5 text-sm uppercase tracking-label text-ivory disabled:opacity-50"
          >
            {passwordMutation.isPending ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>

      {/* Danger Zone */}
      <section className="rounded-card border border-rose/20 bg-white p-6">
        <h3 className="font-display text-lg text-rose mb-2">Danger Zone</h3>
        <p className="text-sm text-muted mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button className="rounded-btn border border-rose px-5 py-2.5 text-sm text-rose hover:bg-rose/5">
          Delete Account
        </button>
      </section>
    </div>
  );
}
