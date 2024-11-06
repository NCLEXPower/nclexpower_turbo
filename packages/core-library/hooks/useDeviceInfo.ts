import { useState, useEffect, useCallback, useMemo } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import UAParser from "ua-parser-js";

export interface DeviceInfo {
  fingerprint: string;
  deviceName: string;
  deviceType: string;
  ipAddress: string;
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const getFingerprint = useCallback(async () => {
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result.visitorId;
    } catch (error) {
      console.error("Error generating fingerprint:", error);
      return;
    }
  }, []);

  const getDeviceDetails = useMemo(() => {
    try {
      const parser = new UAParser();
      const device = parser.getDevice();
      const os = parser.getOS();
      const deviceName = `${os.name ?? "Unknown"} ${os.version ?? ""} (${device.model ?? "Unknown"})`;
      const deviceType = device.type || "desktop";

      return { deviceName, deviceType };
    } catch (error) {
      console.error("Error picking device details:", error);
      return { deviceName: "Unknown", deviceType: "desktop" };
    }
  }, []);

  // This can be transfer to SSR
  const getIpAddress = useCallback(async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip ?? "";
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return "";
    }
  }, []);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const fingerprint = await getFingerprint();
      const ipAddress = await getIpAddress();
      const { deviceName, deviceType } = getDeviceDetails;

      setDeviceInfo({
        fingerprint: fingerprint || "Unknown",
        deviceName: deviceName || "Unknown",
        deviceType: deviceType || "desktop",
        ipAddress: ipAddress || "Unknown",
      });
    };

    fetchDeviceInfo();
  }, [getFingerprint, getDeviceDetails, getIpAddress]);

  return { deviceInfo, getDeviceDetails };
};
