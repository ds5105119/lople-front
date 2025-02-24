"use client";

import { Metadata } from "next";
import { GovernmentSupportCard } from "@/components/card/govwelfarecard";
import { useKeycloakStore } from "@/store/keycloak";

export default async function LoginPage() {
  const { keycloak } = useKeycloakStore();

  if (!keycloak.authenticated) {
    await keycloak.init();
  }

  return (
    <div className="container flex w-full h-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"></div>
    </div>
  );
}
