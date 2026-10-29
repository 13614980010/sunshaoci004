const pageViews = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-item, .mobile-item");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function renderPlaces(places) {
  document.querySelector(".nearby-list").innerHTML = places.map((place) => `
    <article class="nearby-item" data-category="${place.category}">
      <img src="${place.image}" alt="${place.name}">
      <div><small>${place.kind}</small><h2>${place.name}</h2><p>${place.description}</p><span>${place.rating} <b>★</b>　${place.distance}　${place.price}</span></div>
      <button class="save" data-save aria-label="收藏${place.name}" aria-pressed="false">♡</button>
    </article>`).join("");
}

function renderStories(stories) {
  document.querySelector(".story-grid").innerHTML = stories.map((story) => `
    <button class="story" data-page="detail"><img src="${story.image}" alt="${story.title}"><small>${story.category}</small><strong>${story.title}</strong><span>${story.description}</span></button>`).join("");
}

function renderTrips(trips) {
  document.querySelector(".trip-list").innerHTML = trips.map((trip) => `
    <article class="trip" data-status="${trip.status}" ${trip.status === "upcoming" ? "" : "hidden"}><div class="trip-date"><strong>${trip.day}</strong><small>${trip.date}</small></div>
      <div class="stops"><p><small>${trip.start}</small><strong>${trip.from}</strong></p><p><small>${trip.arrival}</small><strong>${trip.to}</strong></p></div>
      <div class="trip-action"><small class="status ${trip.status === "upcoming" ? "ready" : ""}">${trip.label}</small><button data-page="taxi">查看路线 →</button></div></article>`).join("");
}

function renderDashboard(data) {
  document.querySelector("#admin-metrics").innerHTML = data.metrics.map((metric) => `
    <article class="metric"><small>${metric.label}</small><strong>${metric.value}<span>${metric.unit}</span></strong><p>${metric.change}</p></article>`).join("");
}

async function loadMockData() {
  try {
    const endpoints = ["places", "stories", "trips", "dashboard"];
    const responses = await Promise.all(endpoints.map((name) => fetch(`data/${name}.json`)));
    if (responses.some((response) => !response.ok)) throw new Error("本地数据接口响应异常");
    const [places, stories, trips, dashboard] = await Promise.all(responses.map((response) => response.json()));
    renderPlaces(places);
    renderStories(stories);
    renderTrips(trips);
    renderDashboard(dashboard);
  } catch (error) {
    console.error("加载本地 mock 数据失败：", error);
    showToast("数据加载失败，请通过本地 HTTP 服务打开项目");
  }
}

function navigateTo(pageName) {
  const target = document.querySelector(`#page-${pageName}`);
  if (!target) return;

  pageViews.forEach((page) => {
    page.hidden = page !== target;
    page.classList.toggle("active", page === target);
  });
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.page === pageName));
  document.title = `${target.dataset.title} · 24001010806 孙绍词 · 漫行 City Guide`;
  history.replaceState(null, "", `#${pageName}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-page]");
  if (button) navigateTo(button.dataset.page);
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((filter) => filter.classList.toggle("selected", filter === button));
    document.querySelectorAll(".nearby-item").forEach((item) => {
      item.hidden = button.dataset.filter !== "all" && item.dataset.category !== button.dataset.filter;
    });
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-save]");
  if (!button) return;
  const saved = button.classList.toggle("saved");
  button.textContent = saved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(saved));
  showToast(saved ? "已加入收藏" : "已取消收藏");
});

document.querySelectorAll("[data-trip-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.tripFilter;
    document.querySelectorAll("[data-trip-filter]").forEach((tab) => tab.classList.toggle("selected", tab === button));
    document.querySelectorAll("[data-status]").forEach((trip) => {
      trip.hidden = trip.dataset.status !== filter;
    });
  });
});

document.querySelectorAll("[data-vehicle]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-vehicle]").forEach((vehicle) => vehicle.classList.toggle("selected", vehicle === button));
    document.querySelector("#request-ride").innerHTML = `呼叫${button.dataset.vehicle} · ¥${button.dataset.price} <span>→</span>`;
  });
});

document.querySelector("#request-ride").addEventListener("click", () => {
  const destination = document.querySelector("#destination").value.trim();
  if (!destination) {
    document.querySelector("#destination").focus();
    showToast("先填写目的地，再为你呼叫车辆");
    return;
  }
  showToast(`正在为你呼叫车辆，目的地：${destination}`);
});

document.querySelector("#search").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.currentTarget.value.trim()) {
    navigateTo("nearby");
    showToast(`正在查找：${event.currentTarget.value.trim()}`);
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#search").focus();
  }
});

const initialPage = window.location.hash.slice(1);
if (initialPage) navigateTo(initialPage);
loadMockData();