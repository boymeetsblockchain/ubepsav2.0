"use client";

import { useEffect, useState } from "react";
import { getUserById, UpdateUser } from "@/actions/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { ClipLoader } from "react-spinners";
import { Camera } from "lucide-react";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  if (!session) {
    redirect("/");
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        const fetchedUser = await getUserById(session.user.id);
        if (fetchedUser.success) {
          setUser(fetchedUser.user as User);
          setUsername(fetchedUser?.user?.username || "");
        }
      }
    };
    fetchUser();
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpdateProfile = async () => {
    if (!session?.user?.id) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("username", username);

    if (profileImage) {
      formData.append("image", profileImage);
    }

    const result = await UpdateUser(session.user.id, formData);

    if (result.success) {
      alert("Profile updated successfully!");
    } else {
      setError(result.error || "Failed to update profile.");
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50">
        <ClipLoader size={50} color="#3b82f6" />
      </div>
    );
  }

  const logout = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col items-center bg-white shadow-md rounded-lg text-gray-800 space-y-6 mt-12">
      <h1 className="text-3xl font-bold text-gray-700">Profile</h1>

      {/* Profile Image Section */}
      <div className="relative">
        <img
          src={user.imageUrl || "/placeholder.jpg"}
          alt={user.username || "Profile"}
          className="w-28 h-28 rounded-full object-cover border border-gray-300 shadow"
        />
        <label
          htmlFor="profileImage"
          className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 shadow-md"
        >
          <Camera size={20} />
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* User Information */}
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-600">
            Email
          </Label>
          <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
            {user.email}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-600">
            Role
          </Label>
          <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
            {user.role}
          </p>
        </div>

        <div className="space-y-2">
          <Label className="block text-sm font-medium text-gray-600">
            Member Since
          </Label>
          <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600">
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Editable Username */}
      <div className="w-full max-w-sm">
        <Label className="block text-sm font-medium text-gray-600">
          Username
        </Label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleUpdateProfile}
        className={`w-full max-w-sm px-4 py-2 rounded-md text-white ${
          loading ? "bg-blue-400" : "bg-blue-600"
        } hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Profile"}
      </Button>

      <Button className="" variant={"destructive"} onClick={logout}>
        Logout
      </Button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-semibold text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

export default ProfilePage;
