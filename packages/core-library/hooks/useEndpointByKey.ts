import { SsrTypes } from "../types/global";

interface Props {
  data?: SsrTypes["endpoints"];
  key: string;
}

export const useEndpointByKey = ({ data, key }: Props) => {
  const item = data?.find((entry) => entry.keyUrl === key);
  return item ? item.endpoint : undefined;
};
