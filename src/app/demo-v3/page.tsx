import { DemoV3App } from "./_components/DemoV3App";
import { loadDemoV3Seed } from "./_lib/seed-loader";
import { parseDemoV3View } from "./_lib/utils";

export default async function DemoV3Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const params = await searchParams;
  const initialView = parseDemoV3View(params.view) ?? "dashboard";
  const seed = await loadDemoV3Seed();

  return <DemoV3App initialView={initialView} seed={seed} />;
}
