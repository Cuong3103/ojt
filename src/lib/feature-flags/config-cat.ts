import * as configcat from "configcat-js-ssr";

const configCatClient = configcat.getClient(
  "gCDcCER8Q0CAICZto0BEyA/C_OuuhAS9EuM_vfxgKhWcQ",
  configcat.PollingMode.AutoPoll,
  {
    pollIntervalSeconds: 360,
    logger: configcat.createConsoleLogger(configcat.LogLevel.Debug),
  }
);

export const isFlagEnabled = async (flagName: string): Promise<boolean> => {
  try {
    const value = await configCatClient.getValueAsync(flagName, false);
    return value;
  } catch (error) {
    console.error(error);
    return false;
  }
};
