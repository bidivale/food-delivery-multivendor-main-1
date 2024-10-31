import { getConfigurationSpecific } from "../apollo/server";
import { SERVER_URL } from "./global";

export const fetchConfiguration = async () => {
  try {
    const response = await fetch(`${SERVER_URL}graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4cHV2cmR1cGV1Ym9ueWFxcWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NzczNTEsImV4cCI6MjA0NTM1MzM1MX0.R6n1ScuMYE3LCE59LUw7a4YswNZYqkmtHYIfDo2FJqY"
      },
      body: JSON.stringify({
        query: getConfigurationSpecific,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      return result.data?.configuration;
    } else {
      return {
        configuration: {
          webAmplitudeApiKey: "",
        },
      };
    }
  } catch (err) {
    return {
      configuration: {
        webAmplitudeApiKey: "",
      },
    };
  }
};
