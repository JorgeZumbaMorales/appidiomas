import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { lessons, units as unitsSchema } from "@/db/schema";
import { 
  getCourseProgress, 
  getLessonPercentage, 
  getUnits, 
  getUserProgress,
  getUserSubscription
} from "@/db/queries";

import { Unit } from "./unit";
import { Header } from "./header";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();
  const userSubscriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // 📌 Definir el fondo según el idioma del curso activo
  let backgroundImage = "/backgrounds/default.jpg"; // Fondo por defecto

  switch (userProgress.activeCourse.title) {
    case "English":
      backgroundImage = "/london.png"; // Fondo para inglés
      break;
    case "Portuguese":
      backgroundImage = "/cristo.png"; // Fondo para portugués de Brasil
      break;
  }

  return (
    <div 
      className="flex flex-row-reverse gap-[48px] px-6 h-screen relative"
    >
      {/* 📌 Imagen de fondo con filtros SOLO en el fondo */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          width: "85%",
          height: "85%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          filter: "grayscale(40%) brightness(85%)", // Aplica solo al fondo
          opacity: 0.3, // Reduce la intensidad sin afectar el contenido
          zIndex: -1, // Manda el fondo atrás del contenido
        }}
      />

      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson as typeof lessons.$inferSelect & {
                unit: typeof unitsSchema.$inferSelect;
              } | undefined}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
