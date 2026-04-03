import { DemoV2App } from "./_components/DemoV2App";
import { parseV2View } from "./_lib/utils";

export default async function DemoV2Page({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  const { view } = await searchParams;
  const initialView = parseV2View(view) ?? "pipeline";

  return <DemoV2App initialView={initialView} />;
}
