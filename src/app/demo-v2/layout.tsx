import type { Metadata } from "next";
import "./demo-v2.css";

export const metadata: Metadata = {
  title: "WAMA MED — Patient CRM",
  description: "Simplified patient journey management",
};

export default function DemoV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
