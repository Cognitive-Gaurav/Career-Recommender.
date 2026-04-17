(function () {
  const body = document.body;
  const page = body?.dataset.page;

  function getStoredProfile() {
    try {
      return JSON.parse(localStorage.getItem(APP_STATE_KEY)) || null;
    } catch {
      return null;
    }
  }

  function setStoredProfile(profile) {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(profile));
  }

  function getSelectedCareerId() {
    return localStorage.getItem(SELECTED_CAREER_KEY);
  }

  function setSelectedCareerId(id) {
    localStorage.setItem(SELECTED_CAREER_KEY, id);
  }

  function getCareerById(id) {
    return careerDatabase.find((career) => career.id === id) || careerDatabase[0];
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = current;
    localStorage.setItem("careerTheme", current);
    updateThemeIcons();
  }

  function updateThemeIcons() {
    const icon = document.querySelectorAll(".theme-icon");
    const theme = document.documentElement.dataset.theme || "dark";
    icon.forEach((el) => {
      el.textContent = theme === "dark" ? "☀" : "☾";
    });
  }

  function initTheme() {
    document.documentElement.dataset.theme = localStorage.getItem("careerTheme") || "dark";
    updateThemeIcons();
    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", toggleTheme);
    });
  }

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.18 });

    document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
  }

  function createChoiceCard(option, name, type = "checkbox") {
    const label = document.createElement("label");
    label.className = "choice-card";

    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.value = option.id;

    const content = document.createElement("div");
    content.className = "choice-content";
    content.innerHTML = `<span class="choice-icon">${option.icon}</span><strong>${option.label}</strong>`;

    label.append(input, content);
    return label;
  }

  function populateChoices(containerId, options, name, type = "checkbox") {
    const container = document.getElementById(containerId);
    if (!container) return;
    options.forEach((option) => {
      container.appendChild(createChoiceCard(option, name, type));
    });
  }

  function calculateCareerMatches(profile) {
    const matches = careerDatabase.map((career) => {
      let score = 0;

      career.interests.forEach((interest) => {
        if (profile.interests.includes(interest)) score += 2;
      });

      career.skills.forEach((skill) => {
        if (profile.skills.includes(skill)) score += 1;
      });

      career.workStyle.forEach((style) => {
        if (profile.workStyle === style) score += 1;
      });

      if (profile.filter && career.tags.includes(profile.filter)) {
        score += 2;
      }

      return { ...career, score };
    });

    const meaningful = matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (meaningful.every((item) => item.score === 0)) {
      return careerDatabase.slice(0, 3).map((career, index) => ({
        ...career,
        score: 3 - index
      }));
    }

    return meaningful;
  }

  function profileLabelLookup(ids, source) {
    return ids.map((id) => source.find((item) => item.id === id)?.label).filter(Boolean);
  }

  function initFormPage() {
    populateChoices("interests-options", interestOptions, "interests");
    populateChoices("skills-options", skillOptions, "skills");
    populateChoices("workstyle-options", workStyleOptions, "workStyle", "radio");
    populateChoices("filter-options", priorityFilters, "filter", "radio");

    const form = document.getElementById("career-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const profile = {
        name: String(formData.get("name") || "").trim(),
        interests: formData.getAll("interests"),
        skills: formData.getAll("skills"),
        workStyle: String(formData.get("workStyle") || "structured"),
        filter: String(formData.get("filter") || "")
      };

      if (profile.interests.length === 0) profile.interests = ["technology", "problem-solving"];
      if (profile.skills.length === 0) profile.skills = ["discipline", "communication"];

      const results = calculateCareerMatches(profile);
      profile.results = results;

      setStoredProfile(profile);
      setSelectedCareerId(results[0].id);
      window.location.href = "results.html";
    });
  }

  function renderSummary(profile) {
    const container = document.getElementById("student-summary");
    const title = document.getElementById("student-name");
    if (!container || !title) return;

    title.textContent = `${profile.name || "Student"}, here is your career match overview`;
    const interests = profileLabelLookup(profile.interests, interestOptions).join(", ");
    const skills = profileLabelLookup(profile.skills, skillOptions).join(", ");
    const workStyle = workStyleOptions.find((item) => item.id === profile.workStyle)?.label || "Structured";

    container.innerHTML = `
      <div class="summary-item"><span>Name</span><strong>${profile.name || "Student"}</strong></div>
      <div class="summary-item"><span>Selected Interests</span><strong>${interests}</strong></div>
      <div class="summary-item"><span>Current Skills</span><strong>${skills}</strong></div>
      <div class="summary-item"><span>Work Style</span><strong>${workStyle}</strong></div>
    `;
  }

  function renderResultFilters(activeFilter, profile) {
    const container = document.getElementById("result-filters");
    if (!container) return;

    priorityFilters.forEach((filter) => {
      const button = document.createElement("button");
      button.className = `filter-chip ${activeFilter === filter.id ? "active" : ""}`;
      button.type = "button";
      button.textContent = `${filter.icon} ${filter.label}`;
      button.addEventListener("click", () => {
        profile.filter = filter.id;
        profile.results = calculateCareerMatches(profile);
        setStoredProfile(profile);
        setSelectedCareerId(profile.results[0].id);
        window.location.reload();
      });
      container.appendChild(button);
    });
  }

  function renderResults(profile) {
    const results = profile.results || calculateCareerMatches(profile);
    const grid = document.getElementById("results-grid");
    const suitability = document.getElementById("suitability-content");
    const improvement = document.getElementById("improvement-content");
    const govSection = document.getElementById("government-section");

    if (!grid || !suitability || !improvement) return;

    grid.innerHTML = "";
    results.forEach((career, index) => {
      const matchScore = Math.min(98, 55 + career.score * 6 + index);
      const article = document.createElement("article");
      article.className = "glass-card result-card";
      article.innerHTML = `
        <div class="result-head">
          <div class="result-icon">${career.icon}</div>
          <div>
            <span class="eyebrow">Top ${index + 1} match</span>
            <h3>${career.name}</h3>
          </div>
          <div class="score-ring">${matchScore}%</div>
        </div>
        <p>${career.description}</p>
        <div class="tag-row">${career.tags.map((tag) => `<span>${tag.replace("-", " ")}</span>`).join("")}</div>
        <button class="button secondary wide" type="button" data-career="${career.id}">View Career Roadmap</button>
      `;
      article.querySelector("button").addEventListener("click", () => {
        setSelectedCareerId(career.id);
        window.location.href = "roadmap.html";
      });
      grid.appendChild(article);
    });

    const primary = results[0];
    const matchedInterests = primary.interests
      .filter((item) => profile.interests.includes(item))
      .map((item) => interestOptions.find((interest) => interest.id === item)?.label)
      .filter(Boolean);

    const matchedSkills = primary.skills
      .filter((item) => profile.skills.includes(item))
      .map((item) => skillOptions.find((skill) => skill.id === item)?.label)
      .filter(Boolean);

    suitability.innerHTML = `
      <p>${primary.name} aligns with your interests in <strong>${matchedInterests.join(", ") || "growth-oriented fields"}</strong> and your current strength in <strong>${matchedSkills.join(", ") || "foundational skills"}</strong>.</p>
      <p>Your preferred work style also fits this path, making it easier to stay consistent over time.</p>
    `;

    improvement.innerHTML = `
      <ul class="clean-list">
        ${primary.skillGaps.map((gap) => `<li>${gap}</li>`).join("")}
      </ul>
    `;

    if (results.some((career) => career.category === "Government")) {
      govSection?.classList.remove("hidden");
    }
  }

  function parichitReply(message, profile) {
    const normalized = message.toLowerCase();
    const match = parichitKnowledge.find((entry) =>
      entry.keywords.some((keyword) => normalized.includes(keyword))
    );

    if (match) {
      return match.answer;
    }

    const topCareer = profile?.results?.[0]?.name || "your top matched career";
    return `You are asking a thoughtful question, and that matters. Based on your profile, I would keep ${topCareer} as your main path for now. Break the problem into one next step, one weekly target, and one source of accountability. If you want, ask me about coding, government exams, study plans, salary paths, or feeling stuck.`;
  }

  function addChatMessage(sender, text) {
    const messages = document.getElementById("chat-messages");
    if (!messages) return;
    const item = document.createElement("div");
    item.className = `chat-message ${sender}`;
    item.innerHTML = `<strong>${sender === "bot" ? "PARICHIT" : "You"}</strong><p>${text}</p>`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
  }

  function initChat(profile) {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messages = document.getElementById("chat-messages");
    if (!form || !input || !messages) return;

    addChatMessage("bot", `Hello ${profile.name || "student"}, I am PARICHIT. I can help with career confusion, tech vs government, study planning, skill growth, SSC, banking preparation, and motivation. Ask me anything.`);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      addChatMessage("user", value);
      addChatMessage("bot", parichitReply(value, profile));
      input.value = "";
    });
  }

  function initResultsPage() {
    const profile = getStoredProfile();
    if (!profile) {
      window.location.href = "form.html";
      return;
    }
    renderSummary(profile);
    renderResultFilters(profile.filter, profile);
    renderResults(profile);
    initChat(profile);
  }

  function initRoadmapPage() {
    const profile = getStoredProfile();
    if (!profile) {
      window.location.href = "form.html";
      return;
    }

    const career = getCareerById(getSelectedCareerId() || profile.results?.[0]?.id);
    setSelectedCareerId(career.id);

    document.getElementById("roadmap-title").textContent = `${career.name} Roadmap`;
    document.getElementById("roadmap-description").textContent = career.description;
    document.getElementById("roadmap-duration").textContent = career.timeline;

    const timeline = document.getElementById("roadmap-timeline");
    timeline.innerHTML = "";
    career.roadmap.forEach((step, index) => {
      const block = document.createElement("article");
      block.className = "timeline-step";
      block.innerHTML = `
        <div class="timeline-point">${index + 1}</div>
        <div class="timeline-content glass-card">
          <div class="timeline-meta">
            <span class="eyebrow">${step.duration}</span>
            <h3>${step.level}</h3>
          </div>
          <div class="timeline-columns">
            <div>
              <strong>Skills to learn</strong>
              <ul class="clean-list">${step.skills.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
              <strong>Tools to use</strong>
              <ul class="clean-list">${step.tools.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
            <div>
              <strong>Projects to build</strong>
              <ul class="clean-list">${step.projects.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
          </div>
        </div>
      `;
      timeline.appendChild(block);
    });
  }

  function createResourceCard(resource) {
    const link = document.createElement("a");
    link.className = "glass-card resource-card";
    link.href = resource.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.innerHTML = `
      <span class="eyebrow">Open platform</span>
      <h3>${resource.title}</h3>
      <p>${resource.description}</p>
      <span class="resource-link">Visit site ↗</span>
    `;
    return link;
  }

  function renderResourceGroup(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    items.forEach((item) => container.appendChild(createResourceCard(item)));
  }

  function initResourcesPage() {
    renderResourceGroup("learning-resources", resourceCatalog.learning);
    renderResourceGroup("job-resources", resourceCatalog.jobs);
    renderResourceGroup("government-resources", resourceCatalog.government);
  }

  initTheme();
  initReveal();

  if (page === "form") initFormPage();
  if (page === "results") initResultsPage();
  if (page === "roadmap") initRoadmapPage();
  if (page === "resources") initResourcesPage();
})();
