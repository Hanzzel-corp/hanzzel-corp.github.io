(function () {
  "use strict";
  var config = window.HANZZEL_ANALYTICS;
  var site = document.documentElement.getAttribute("data-analytics-site");
  if (!config || !config.websites || !site) return;
  var websiteId = config.websites[site];
  var validId = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (typeof websiteId !== "string" || !validId.test(websiteId)) return;
  var tracker = document.createElement("script");
  tracker.defer = true;
  tracker.src = (config.host || "https://cloud.umami.is").replace(/\/$/, "") + "/script.js";
  tracker.setAttribute("data-website-id", websiteId);
  tracker.setAttribute("data-domains", "hanzzel-corp.github.io");
  tracker.setAttribute("data-do-not-track", "true");
  document.head.appendChild(tracker);
})();
