(function () {
  const data = window.resumeData;
  const rootPath = document.body.getAttribute("data-root") || "";

  if (!data || !Array.isArray(data.profiles)) {
    return;
  }

  const profileMap = new Map(data.profiles.map((profile) => [profile.id, profile]));
  const defaultId = "tpm";

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function resolvePath(path) {
    return `${rootPath}${path}`;
  }

  function animateFocusBars(scope) {
    const bars = scope.querySelectorAll(".focus-fill");
    bars.forEach((bar, index) => {
      const target = bar.getAttribute("data-width");
      bar.style.width = "0%";
      bar.style.transitionDelay = `${index * 80}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = `${target}%`;
        });
      });
    });
  }

  function profileMarkup(profile) {
    const competencies = profile.coreCompetencies
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const impacts = profile.impactHighlights
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const experiences = profile.experienceHighlights
      .map((item) => {
        const bullets = item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("");
        return `
          <article class="experience-item">
            <div class="experience-topline">
              <div>
                <div class="experience-role">${escapeHtml(item.role)}</div>
                <div class="experience-company">${escapeHtml(item.company)}</div>
              </div>
              <div class="experience-dates">${escapeHtml(item.dates)}</div>
            </div>
            <ul class="compact-list">${bullets}</ul>
          </article>
        `;
      })
      .join("");

    const signals = profile.supportingSignals
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    return `
      <section class="summary-card" aria-labelledby="summary-title">
        <div class="section-header">
          <div>
            <div class="section-kicker">Profile Summary</div>
            <h2 class="section-title" id="summary-title">${escapeHtml(profile.label)}</h2>
          </div>
        </div>
        <p>${escapeHtml(profile.summary)}</p>
      </section>
      <div class="profile-grid">
        <div class="main-column">
          <section class="section-card" aria-labelledby="competencies-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Core Competencies</div>
                <h3 class="section-title" id="competencies-title">What this profile leads with</h3>
              </div>
            </div>
            <ul class="compact-list">${competencies}</ul>
          </section>
          <section class="section-card" aria-labelledby="impact-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Impact</div>
                <h3 class="section-title" id="impact-title">Quantified proof</h3>
              </div>
            </div>
            <ul class="impact-list">${impacts}</ul>
          </section>
          <section class="section-card" aria-labelledby="experience-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Experience Highlights</div>
                <h3 class="section-title" id="experience-title">Relevant roles and outcomes</h3>
              </div>
            </div>
            <div class="experience-list">${experiences}</div>
          </section>
        </div>
        <aside class="side-column">
          <section class="support-card" aria-labelledby="signals-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Supporting Signals</div>
                <h3 class="section-title" id="signals-title">Context that reinforces fit</h3>
              </div>
            </div>
            <ul class="signal-list">${signals}</ul>
          </section>
          <section class="section-card" aria-labelledby="source-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Source of Truth</div>
                <h3 class="section-title" id="source-title">Resume source</h3>
              </div>
            </div>
            <ul class="meta-list">
              <li><a href="${escapeHtml(resolvePath(profile.variantPage))}" target="_blank" rel="noreferrer">Open standalone HTML variant</a></li>
              <li><a href="${escapeHtml(resolvePath(profile.sourcePdf))}" target="_blank" rel="noreferrer">Open source PDF</a></li>
              <li class="ui-hidden" data-hook="extracted-digest-link"><a href="${escapeHtml(resolvePath("docs/RESUME_SOURCE_DIGEST.md"))}" target="_blank" rel="noreferrer">Open extracted digest</a></li>
            </ul>
          </section>
        </aside>
      </div>
    `;
  }

  function unifiedVisualMarkup(profile) {
    const snapshot = profile.visualSnapshot || { metrics: [], bars: [], timeline: [] };
    const metrics = snapshot.metrics
      .map(
        (item) => `
          <article class="visual-metric">
            <div class="visual-metric-value">${escapeHtml(item.value)}</div>
            <div class="visual-metric-label">${escapeHtml(item.label)}</div>
          </article>
        `
      )
      .join("");

    const bars = snapshot.bars
      .map(
        (item) => `
          <div class="focus-row">
            <div class="focus-topline">
              <span>${escapeHtml(item.label)}</span>
            </div>
            <div class="focus-track" aria-hidden="true">
              <div class="focus-fill" data-width="${escapeHtml(item.value)}"></div>
            </div>
          </div>
        `
      )
      .join("");

    const timeline = snapshot.timeline
      .map(
        (item) => `
          <li class="timeline-item">
            <span class="timeline-period">${escapeHtml(item.period)}</span>
            <span class="timeline-label">${escapeHtml(item.label)}</span>
          </li>
        `
      )
      .join("");

    const competencies = profile.coreCompetencies
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const impacts = profile.impactHighlights
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const signals = profile.supportingSignals
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    return `
      <section class="summary-card" aria-labelledby="summary-title">
        <div class="section-header">
          <div>
            <div class="section-kicker">Profile Summary</div>
            <h2 class="section-title" id="summary-title">${escapeHtml(profile.label)}</h2>
          </div>
        </div>
        <p>${escapeHtml(profile.summary)}</p>
      </section>
      <div class="profile-grid unified-profile-grid">
        <div class="main-column">
          <section class="section-card" aria-labelledby="competencies-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Core Competencies</div>
                <h3 class="section-title" id="competencies-title">What this profile leads with</h3>
              </div>
            </div>
            <ul class="compact-list">${competencies}</ul>
          </section>
          <section class="section-card unified-visuals" aria-labelledby="snapshot-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Role Snapshot</div>
                <h3 class="section-title" id="snapshot-title">Impact, focus, and depth at a glance</h3>
              </div>
            </div>
            <div class="visual-metrics-grid">${metrics}</div>
            <div class="visual-detail-grid">
              <section class="visual-panel" aria-label="Capability distribution">
                <h4 class="visual-panel-title">Capability distribution</h4>
                <div class="focus-chart">${bars}</div>
              </section>
              <section class="visual-panel" aria-label="Experience depth">
                <h4 class="visual-panel-title">Experience depth</h4>
                <ol class="timeline-list">${timeline}</ol>
              </section>
            </div>
          </section>
          <section class="section-card" aria-labelledby="impact-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Impact</div>
                <h3 class="section-title" id="impact-title">Quantified proof</h3>
              </div>
            </div>
            <ul class="impact-list">${impacts}</ul>
          </section>
        </div>
        <aside class="side-column">
          <section class="support-card" aria-labelledby="signals-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Supporting Signals</div>
                <h3 class="section-title" id="signals-title">Context that reinforces fit</h3>
              </div>
            </div>
            <ul class="signal-list">${signals}</ul>
          </section>
          <section class="section-card" aria-labelledby="source-title">
            <div class="section-header">
              <div>
                <div class="section-kicker">Source of Truth</div>
                <h3 class="section-title" id="source-title">Resume source</h3>
              </div>
            </div>
            <ul class="meta-list">
              <li><a href="${escapeHtml(resolvePath(profile.variantPage))}" target="_blank" rel="noreferrer">Open standalone HTML variant</a></li>
              <li><a href="${escapeHtml(resolvePath(profile.sourcePdf))}" target="_blank" rel="noreferrer">Open source PDF</a></li>
              <li class="ui-hidden" data-hook="extracted-digest-link"><a href="${escapeHtml(resolvePath("docs/RESUME_SOURCE_DIGEST.md"))}" target="_blank" rel="noreferrer">Open extracted digest</a></li>
            </ul>
          </section>
        </aside>
      </div>
    `;
  }

  function renderInteractivePage() {
    const tabList = document.getElementById("tab-list");
    const profileRoot = document.getElementById("profile-root");
    const positioning = document.getElementById("active-positioning");
    const pdfLink = document.getElementById("active-pdf-link");

    function currentId() {
      const hash = window.location.hash.replace("#", "");
      return profileMap.has(hash) ? hash : defaultId;
    }

    function renderTabs(activeId) {
      tabList.innerHTML = data.profiles
        .map(
          (profile) => `
            <button
              class="tab"
              id="tab-${escapeHtml(profile.id)}"
              role="tab"
              type="button"
              aria-selected="${profile.id === activeId ? "true" : "false"}"
              aria-controls="panel-${escapeHtml(profile.id)}"
              data-profile-id="${escapeHtml(profile.id)}"
            >
              ${escapeHtml(profile.label)}
            </button>
          `
        )
        .join("");

      tabList.querySelectorAll(".tab").forEach((button) => {
        button.addEventListener("click", () => activate(button.dataset.profileId, true));
        button.addEventListener("keydown", (event) => {
          const ids = data.profiles.map((profile) => profile.id);
          const index = ids.indexOf(button.dataset.profileId);
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            const next = ids[(index + 1) % ids.length];
            tabList.querySelector(`[data-profile-id="${next}"]`).focus();
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            const previous = ids[(index - 1 + ids.length) % ids.length];
            tabList.querySelector(`[data-profile-id="${previous}"]`).focus();
          }
          if (event.key === "Home") {
            event.preventDefault();
            tabList.querySelector(`[data-profile-id="${ids[0]}"]`).focus();
          }
          if (event.key === "End") {
            event.preventDefault();
            tabList.querySelector(`[data-profile-id="${ids[ids.length - 1]}"]`).focus();
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate(button.dataset.profileId, true);
          }
        });
      });
    }

    function activate(id, pushHash) {
      const profile = profileMap.get(id) || profileMap.get(defaultId);
      positioning.textContent = profile.primaryPositioning;
      pdfLink.href = resolvePath(profile.sourcePdf);
      profileRoot.innerHTML = `<div class="profile-panel" id="panel-${escapeHtml(profile.id)}">${unifiedVisualMarkup(profile)}</div>`;
      animateFocusBars(profileRoot);
      renderTabs(profile.id);

      if (pushHash) {
        window.location.hash = profile.id;
      }
    }

    window.addEventListener("hashchange", () => activate(currentId(), false));
    activate(currentId(), false);
  }

  function renderVariantPage() {
    const page = document.body;
    const profileId = page.getAttribute("data-profile");
    const profile = profileMap.get(profileId) || profileMap.get(defaultId);
    const root = document.getElementById("variant-root");
    const title = document.getElementById("variant-title");
    const positioning = document.getElementById("variant-positioning");
    const pdfLink = document.getElementById("variant-pdf-link");
    const sourceLink = document.getElementById("variant-source-link");
    const interactiveLink = document.getElementById("variant-interactive-link");

    document.title = `${data.person.name} | ${profile.label}`;
    title.textContent = profile.label;
    positioning.textContent = profile.primaryPositioning;
    pdfLink.href = resolvePath(profile.sourcePdf);
    sourceLink.href = resolvePath(profile.sourcePdf);
    interactiveLink.href = `../index.html#${profile.id}`;
    root.innerHTML = `<div class="profile-panel">${profileMarkup(profile)}</div>`;
  }

  if (document.body.getAttribute("data-page") === "variant") {
    renderVariantPage();
  } else {
    renderInteractivePage();
  }
})();
