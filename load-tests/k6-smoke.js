import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500"],
  },
  scenarios: {
    public_burst: {
      executor: "ramping-vus",
      stages: [
        { duration: "30s", target: 25 },
        { duration: "1m", target: 100 },
        { duration: "30s", target: 0 },
      ],
    },
  },
};

const baseUrl = __ENV.BASE_URL || "http://localhost:3000";

export default function () {
  const responses = http.batch([
    ["GET", `${baseUrl}/`],
    ["GET", `${baseUrl}/api/health`],
    ["GET", `${baseUrl}/api/public-data/opportunities`],
    ["GET", `${baseUrl}/data/opportunities/index.json`],
  ]);

  for (const response of responses) {
    check(response, {
      "status is 2xx or cached redirect": (res) => res.status >= 200 && res.status < 400,
      "response has cache headers when public": (res) =>
        res.url.includes("/data/") ? Boolean(res.headers["Cache-Control"]) : true,
    });
  }

  sleep(1);
}
