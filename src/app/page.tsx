import { ViewportProvider } from "@/components/shared/ViewportProvider";
import CinematicExperience from "@/components/cinematic/CinematicExperience";

export default function Home() {
  return (
    <ViewportProvider>
      <CinematicExperience />
    </ViewportProvider>
  );
}
