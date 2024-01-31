import * as configcat from 'configcat-js-ssr';

const configCatClient = configcat.getClient(
  '1BzcCHay5kGCTJQpIo-OzQ/hdUeGcY0eEKTxyy2vCuhOw',
  configcat.PollingMode.AutoPoll, {
    pollIntervalSeconds: 360,
    logger: configcat.createConsoleLogger(configcat.LogLevel.Debug)
  },
);

export const isFlagEnabled = (flagName: string) => {
  configCatClient.getValueAsync(flagName, false).then((value) => value);
}
