ARG BASE_IMAGE=node:20-alpine

FROM ${BASE_IMAGE} as builder

ENV NODE_ENV=test
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app
COPY ./package*.json ./

RUN CI=true npm ci
RUN NODE_ENV=production npm run build

FROM ${BASE_IMAGE}

WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["npm", "run", "start"]

