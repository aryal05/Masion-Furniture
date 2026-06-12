"use client";
import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";

export function AvatarUpload() {
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);

    try {
      // Upload to Supabase storage
      const ext = file.name.split(".").pop();
      const path = `avatars/${user.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);

      // Update user metadata
      await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="grid h-20 w-20 place-items-center rounded-full bg-walnut/10 text-2xl font-medium">
            {user?.user_metadata?.name?.charAt(0) ?? user?.email?.charAt(0) ?? "U"}
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 grid place-items-center rounded-full bg-white/80">
            <span className="text-sm">...</span>
          </div>
        )}
      </div>

      <div>
        <label className="cursor-pointer rounded-btn border border-walnut/20 px-4 py-2 text-sm transition-colors hover:border-walnut">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? "Uploading..." : "Change Photo"}
        </label>
        <p className="mt-2 text-xs text-muted">JPG, PNG. Max 5MB.</p>
      </div>
    </div>
  );
}
