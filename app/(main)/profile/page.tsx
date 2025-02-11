"use client";

import Image from "next/image";
import { useState } from "react";
import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { avatars } from "@/lib/avatars"; // Importamos la lista de avatares

// 🚨 Deshabilitamos la conexión a la base de datos
// import { getUserProgress, getUserSubscription } from "@/db/queries";

const ProfilePage = () => {
  // 🚀 Simulamos datos en lugar de obtenerlos de la BD
  const userProgress = {
    activeCourse: { name: "Curso de React" },
    points: 1500,
    hearts: 3,
  };

  const userSubscription = { isActive: false };

  if (!userProgress) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  // Estado local para la gestión de avatares y puntos
  const [userPoints, setUserPoints] = useState(userProgress.points);
  const [unlockedAvatars, setUnlockedAvatars] = useState([1]); // Avatar básico desbloqueado
  const [selectedAvatar, setSelectedAvatar] = useState(1); // Avatar actual

  // Función para desbloquear avatares con puntos
  const unlockAvatar = (avatarId: number, cost: number) => {
    if (userPoints >= cost && !unlockedAvatars.includes(avatarId)) {
      setUserPoints(userPoints - cost);
      setUnlockedAvatars([...unlockedAvatars, avatarId]);
    }
  };

  // Función para cambiar el avatar actual
  const changeAvatar = (avatarId: number) => {
    if (unlockedAvatars.includes(avatarId)) {
      setSelectedAvatar(avatarId);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userPoints}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>

      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={avatars.find((a) => a.id === selectedAvatar)?.image || "/profile.svg"}
            alt="Perfil"
            height={90}
            width={90}
          />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Mi Perfil
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Aquí puedes ver tu información de usuario.
          </p>
          <div className="text-center text-lg">
            <p><strong>Curso activo:</strong> {userProgress.activeCourse.name}</p>
            <p><strong>Puntos:</strong> {userPoints}</p>
            <p><strong>Vidas:</strong> {userProgress.hearts}</p>
            <p>
              <strong>Suscripción:</strong>{" "}
              {isPro ? "✅ Activa (Pro)" : "❌ No activa"}
            </p>
          </div>
        </div>

        {/* Sección de avatares */}
        <div className="w-full mt-6">
          <h2 className="text-xl font-bold text-center mb-4">Selecciona tu Avatar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
            {avatars.map((avatar) => (
              <div key={avatar.id} className="flex flex-col items-center">
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className={`w-20 h-20 rounded-full cursor-pointer ${
                    unlockedAvatars.includes(avatar.id) ? "border-2 border-green-500" : "opacity-50"
                  }`}
                  onClick={() => changeAvatar(avatar.id)}
                />
                <p className="text-sm">{avatar.name}</p>
                {!unlockedAvatars.includes(avatar.id) && (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
                    onClick={() => unlockAvatar(avatar.id, avatar.cost)}
                    disabled={userPoints < avatar.cost}
                  >
                    Desbloquear ({avatar.cost} puntos)
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
