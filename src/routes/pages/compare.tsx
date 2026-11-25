import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/compare")({
  beforeLoad: () => {
    throw redirect({ to: "/compare" });
  },
});
