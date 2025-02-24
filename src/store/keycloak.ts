import { create } from "zustand";
import Keycloak from "keycloak-js";
import { getEnvVar } from "@/lib/config";

interface KeycloakStore {
  keycloak: Keycloak;
}

export const useKeycloakStore = create<KeycloakStore>((set, get) => ({
  keycloak: new Keycloak({
    url: getEnvVar("NEXT_PUBLIC_KEYCLOAK_URL"),
    realm: getEnvVar("NEXT_PUBLIC_KEYCLOAK_REALM"),
    clientId: getEnvVar("NEXT_PUBLIC_KEYCLOAK_CLIENT_ID"),
  }),
}));
