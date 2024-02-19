import * as configcat from "configcat-js-ssr";

const configCatClient = configcat.getClient(
  "1BzcCHay5kGCTJQpIo-OzQ/hdUeGcY0eEKTxyy2vCuhOw",
  configcat.PollingMode.AutoPoll,
  {
    pollIntervalSeconds: 30,
  }
);

export const isFlagEnabled = async (flagName: string): Promise<boolean> => {
  try {
    return await configCatClient.getValueAsync(flagName, false);
  } catch (error) {
    throw new Error(error as string);
  }
};
