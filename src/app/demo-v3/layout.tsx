import type { Metadata } from "next";
import "./demo-v3.css";

export const metadata: Metadata = {
  title: "WAMA MED — Mission Control CRM V3",
  description: "Version 3 du CRM Mission Control, portée depuis le dossier client.",
};

export default function DemoV3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
