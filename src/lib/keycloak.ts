import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://keycloak-server",
  realm: "my-realm",
  clientId: "my-app",
});

try {
  const authenticated = await keycloak.init();
  if (authenticated) {
    console.log("User is authenticated");
  } else {
    console.log("User is not authenticated");
  }
} catch (error) {
  console.error("Failed to initialize adapter:", error);
}
