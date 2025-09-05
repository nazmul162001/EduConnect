"use client";
import { Protected } from "@/components/auth/Protected";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUniversity(user.university ?? "");
      setAddress(user.address ?? "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container-responsive py-10">
        <h1 className="text-2xl font-semibold">Please login to view profile</h1>
      </div>
    );
  }

  return (
    <Protected>
      <div className="container-responsive py-10">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="mt-6 max-w-xl card">
          {!editing ? (
            <div className="grid gap-2 text-sm">
              <p>
                <span className="font-medium">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              {user.university && (
                <p>
                  <span className="font-medium">University:</span>{" "}
                  {user.university}
                </p>
              )}
              {user.address && (
                <p>
                  <span className="font-medium">Address:</span> {user.address}
                </p>
              )}
              <Button className="mt-3" onClick={() => setEditing(true)}>
                Edit
              </Button>
            </div>
          ) : (
            <form
              className="grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                updateProfile({ name, email, university, address });
                setEditing(false);
              }}
            >
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="University"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <Button type="submit">Save</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Protected>
  );
}
