import { CollegeCard } from "@/components/college/CollegeCard";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionPrimitives";
import { getColleges } from "@/lib/data";

export default function CollegesPage() {
  const colleges = getColleges();
  return (
    <div className="container-responsive py-10">
      <h1 className="text-3xl font-bold">All Colleges</h1>
      <StaggerContainer>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((c) => (
            <StaggerItem key={c.id}>
              <CollegeCard college={c} />
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </div>
  );
}
