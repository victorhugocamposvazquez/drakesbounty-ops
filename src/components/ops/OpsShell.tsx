import type { ProfileSnapshot } from "@/lib/data/profile";
import { OracleSidebar } from "./OracleSidebar";

type Props = {
  userEmail: string;
  profile: ProfileSnapshot;
  children: React.ReactNode;
};

export function OpsShell({ userEmail, profile, children }: Props) {
  return (
    <div className="app">
      <OracleSidebar profile={profile} userEmail={userEmail} />
      {children}
    </div>
  );
}
