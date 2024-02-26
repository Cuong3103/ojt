import { MetadataResponse } from "@/app/services/mock-response.service";

export const totalPage = (metadata: MetadataResponse) => {
  return Math.ceil(metadata.total / metadata.limit);
};
