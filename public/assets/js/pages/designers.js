/*
  Designer/cooperator page controller.
  Responsibilities:
  - Render designer/vendor list.
  - Render selected designer profile, active projects, and communication history.
  TODO(API): Replace mock list/detail rendering with designer and assignment API responses.
*/
(function () {
  function initDesignerPage() {
    const designers = window.DesignPrintHubData?.designers || [];
    const ui = window.DesignPrintHubUI;
    const list = document.querySelector("#designerList");
    const search = document.querySelector("#designerSearch");
    const typeFilter = document.querySelector("#designerTypeFilter");
    const activeProjectRows = document.querySelector("#designerProjectRows");
    const pastProjectRows = document.querySelector("#designerPastProjectRows");
    const projectHistoryMeta = document.querySelector("#projectHistoryMeta");
    const memoInput = document.querySelector("#designerMemo");
    const listToolbar = document.querySelector(".designer-left .panel .panel-head");

    if (!ui || !list || !search || !typeFilter || !activeProjectRows || !pastProjectRows || !projectHistoryMeta || !memoInput) {
      console.error("Designer page initialization failed: required data or DOM nodes are missing.");
      return;
    }

    let selectedDesignerId = designers[0]?.id || "";
    let selectedProjectId = "";
    const memoStorageKey = "design-print-hub.designer.memos";
    const savedMemos = JSON.parse(localStorage.getItem(memoStorageKey) || "{}");

    function memoFor(designer) {
      return savedMemos[designer.id] ?? designer.memo ?? "";
    }

    function saveMemo(designerId, value) {
      if (!designerId) return;
      savedMemos[designerId] = value;
      const designer = designers.find((item) => item.id === designerId);
      if (designer) designer.memo = value;
      localStorage.setItem(memoStorageKey, JSON.stringify(savedMemos));
    }

    function getSelectedDesigner() {
      return designers.find((item) => item.id === selectedDesignerId) || null;
    }

    function createDesignerEditModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "designerListEditModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal dashboard-manage-modal" role="dialog" aria-modal="true" aria-labelledby="designerListEditTitle">
          <div class="modal-head">
            <h2 id="designerListEditTitle">디자이너/협업 업체 수정</h2>
            <button class="icon-btn" type="button" data-designer-edit-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <form class="dashboard-manage-form designer-list-edit-form">
            <label>
              <span>이름/업체명</span>
              <input name="name" type="text" required>
            </label>
            <label>
              <span>구분</span>
              <select name="type">
                <option value="프리랜서">프리랜서</option>
                <option value="협업 업체">협업 업체</option>
              </select>
            </label>
            <label>
              <span>약칭</span>
              <input name="shortName" type="text" required>
            </label>
            <label>
              <span>연락처</span>
              <input name="phone" type="text" required>
            </label>
            <label>
              <span>메일주소</span>
              <input name="email" type="email" required>
            </label>
            <label>
              <span>전문 영역</span>
              <input name="specialty" type="text" required>
            </label>
            <label>
              <span>배정 상태</span>
              <input name="availability" type="text" required>
            </label>
            <label>
              <span>작업량</span>
              <input name="activeLoad" type="text" required>
            </label>
            <label class="form-wide">
              <span>관리 메모</span>
              <textarea name="memo" rows="4"></textarea>
            </label>
            <div class="modal-actions">
              <button class="btn" type="button" data-designer-edit-close>취소</button>
              <button class="btn primary" type="submit">수정 반영</button>
            </div>
          </form>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    function createDesignerDeleteModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "designerListDeleteModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="designerListDeleteTitle">
          <div class="modal-head">
            <h2 id="designerListDeleteTitle">목록에서 삭제할까요?</h2>
            <button class="icon-btn" type="button" data-designer-delete-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <p><strong id="designerListDeleteName">선택 항목</strong>을 디자이너/협업 업체 목록에서 삭제합니다. 현재 mock 화면에서만 제거되며 실제 데이터는 변경되지 않습니다.</p>
          <div class="modal-actions">
            <button class="btn" type="button" data-designer-delete-close>취소</button>
            <button class="btn danger" type="button" data-designer-delete-confirm>삭제</button>
          </div>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const editModal = createDesignerEditModal();
    const editForm = editModal.querySelector(".designer-list-edit-form");
    const deleteModal = createDesignerDeleteModal();
    const deleteName = deleteModal.querySelector("#designerListDeleteName");

    const designerActions = document.createElement("div");
    designerActions.className = "toolbar";
    designerActions.innerHTML = `
      <button class="mini" type="button" aria-label="선택 디자이너 수정">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>
        수정
      </button>
      <button class="mini danger" type="button" aria-label="선택 디자이너 삭제">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
        삭제
      </button>
    `;
    listToolbar?.appendChild(designerActions);
    const editDesignerButton = designerActions.querySelector("[aria-label='선택 디자이너 수정']");
    const deleteDesignerButton = designerActions.querySelector("[aria-label='선택 디자이너 삭제']");

    function openEditModal() {
      const designer = getSelectedDesigner();
      if (!designer) return;

      Object.entries({
        name: designer.name,
        type: designer.type,
        shortName: designer.shortName,
        phone: designer.phone,
        email: designer.email,
        specialty: designer.specialty,
        availability: designer.availability,
        activeLoad: designer.activeLoad,
        memo: memoFor(designer)
      }).forEach(([name, value]) => {
        editForm.querySelector(`[name="${name}"]`).value = value || "";
      });

      editModal.hidden = false;
      editForm.querySelector('[name="name"]').focus();
    }

    function closeEditModal() {
      editModal.hidden = true;
      editDesignerButton?.focus();
    }

    function updateSelectedDesigner(formData) {
      const designer = getSelectedDesigner();
      if (!designer) return;

      [
        "name",
        "type",
        "shortName",
        "phone",
        "email",
        "specialty",
        "availability",
        "activeLoad",
        "memo"
      ].forEach((key) => {
        designer[key] = formData.get(key);
      });
      saveMemo(designer.id, designer.memo);
      renderDesignerList();
      selectDesigner(designer.id);
    }

    function openDeleteModal() {
      const designer = getSelectedDesigner();
      if (!designer) return;

      deleteName.textContent = `${designer.name} · ${designer.type}`;
      deleteModal.hidden = false;
      deleteModal.querySelector("[data-designer-delete-confirm]")?.focus();
    }

    function closeDeleteModal() {
      deleteModal.hidden = true;
      deleteDesignerButton?.focus();
    }

    function deleteSelectedDesigner() {
      const designerIndex = designers.findIndex((designer) => designer.id === selectedDesignerId);
      if (designerIndex < 0) return;

      delete savedMemos[selectedDesignerId];
      localStorage.setItem(memoStorageKey, JSON.stringify(savedMemos));
      designers.splice(designerIndex, 1);
      const nextDesigner = filteredDesigners()[0] || designers[Math.min(designerIndex, designers.length - 1)] || designers[0];
      selectedDesignerId = nextDesigner?.id || "";
      renderDesignerList();
    }

    function filteredDesigners() {
      const keyword = search.value.trim().toLowerCase();
      const type = typeFilter.value;
      return designers.filter((designer) => {
        const text = [
          designer.name,
          designer.type,
          designer.phone,
          designer.email,
          designer.specialty,
          designer.availability
        ].join(" ").toLowerCase();
        const matchesKeyword = !keyword || text.includes(keyword);
        const matchesType = type === "all" || designer.type === type;
        return matchesKeyword && matchesType;
      });
    }

    // DesignerList component: renders selectable designer/vendor rows.
    function renderDesignerList() {
      const visibleDesigners = filteredDesigners();
      if (!visibleDesigners.some((designer) => designer.id === selectedDesignerId)) {
        selectedDesignerId = visibleDesigners[0]?.id || "";
      }

      list.innerHTML = visibleDesigners.map((designer) => `
        <button class="designer-list-item ${designer.id === selectedDesignerId ? "selected" : ""}" type="button" data-id="${designer.id}">
          <span class="avatar">${designer.shortName.slice(0, 1)}</span>
          <span>
            <strong>${designer.name}</strong>
            <small>${designer.type} · ${designer.specialty}</small>
          </span>
          <em>${designer.availability}</em>
        </button>
      `).join("");

      if (selectedDesignerId) {
        selectDesigner(selectedDesignerId);
      } else {
        clearDesignerDetail();
      }
    }

    function projectRows(projects, projectType) {
      return projects.map((project) => `
        <tr data-project-id="${project.id}" data-project-type="${projectType}">
          <td><strong>${project.title}</strong><span class="muted">${project.orderNo}</span></td>
          <td>${project.scope}</td>
          <td><span class="status ${project.statusClass}">${project.stage}</span></td>
          <td>${project.due}</td>
        </tr>
      `).join("");
    }

    function combinedProjects(designer) {
      const activeProjects = (designer.projects || []).map((project) => ({
        ...project,
        projectType: "active",
        history: project.history || designer.history
      }));
      const pastProjects = (designer.pastProjects || []).map((project) => ({
        ...project,
        projectType: "past"
      }));
      return [...activeProjects, ...pastProjects];
    }

    function splitHistoryBody(body) {
      const [time, ...details] = String(body || "").split(" · ");
      return {
        time: time || "",
        detail: details.join(" · ")
      };
    }

    // ProjectHistoryFeed component: renders project communication in scannable cards.
    function renderProjectHistory(history) {
      if (!history || history.length === 0) {
        return '<div class="project-history-empty">선택한 프로젝트의 커뮤니케이션 히스토리가 없습니다.</div>';
      }

      return history.map(([title, body], index) => {
        const item = splitHistoryBody(body);
        return `
          <article class="project-history-card">
            <span class="project-history-index">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <div class="project-history-title">
                <strong>${title}</strong>
                <time>${item.time}</time>
              </div>
              ${item.detail ? `<p>${item.detail}</p>` : ""}
            </div>
          </article>
        `;
      }).join("");
    }

    // DesignerDetail component: updates profile, projects, and history for selected designer.
    function selectDesigner(designerId) {
      const designer = designers.find((item) => item.id === designerId);
      if (!designer) return;
      selectedDesignerId = designerId;
      selectedProjectId = "";

      list.querySelectorAll(".designer-list-item").forEach((item) => {
        item.classList.toggle("selected", item.dataset.id === designerId);
      });

      document.querySelector("#designerName").textContent = designer.name;
      document.querySelector("#designerMeta").textContent = `${designer.type} · ${designer.specialty}`;
      document.querySelector("#designerFields").innerHTML = ui.renderFieldRows({
        "이름/업체명": designer.name,
        "구분": designer.type,
        "연락처": designer.phone,
        "메일주소": designer.email,
        "전문 영역": designer.specialty,
        "배정 상태": designer.availability,
        "작업량": designer.activeLoad
      });
      memoInput.disabled = false;
      memoInput.value = memoFor(designer);
      activeProjectRows.innerHTML = projectRows(designer.projects || [], "active");
      pastProjectRows.innerHTML = projectRows(designer.pastProjects || [], "past");
      clearProjectHistory();
    }

    // ProjectHistory component: clicking a project controls the communication history below.
    function selectProject(projectId) {
      const designer = designers.find((item) => item.id === selectedDesignerId);
      if (!designer) return;
      const project = combinedProjects(designer).find((item) => item.id === projectId);
      if (!project) {
        projectHistoryMeta.textContent = "프로젝트를 선택하면 히스토리가 표시됩니다.";
        document.querySelector("#designerTimeline").innerHTML = '<div class="project-history-empty">선택한 프로젝트의 커뮤니케이션 히스토리가 없습니다.</div>';
        return;
      }

      selectedProjectId = projectId;
      document.querySelectorAll("[data-project-id]").forEach((row) => {
        row.classList.toggle("selected", row.dataset.projectId === projectId);
      });
      projectHistoryMeta.textContent = `${project.title} · ${project.orderNo}`;
      document.querySelector("#designerTimeline").innerHTML = renderProjectHistory(project.history || []);
    }

    function clearProjectHistory() {
      projectHistoryMeta.textContent = "프로젝트를 선택하면 히스토리가 표시됩니다.";
      document.querySelector("#designerTimeline").innerHTML = '<div class="project-history-empty">오른쪽 프로젝트를 클릭하면 해당 프로젝트의 커뮤니케이션 기록이 표시됩니다.</div>';
    }

    function clearDesignerDetail() {
      document.querySelector("#designerName").textContent = "선택된 디자이너가 없습니다";
      document.querySelector("#designerMeta").textContent = "";
      document.querySelector("#designerFields").innerHTML = "";
      memoInput.value = "";
      memoInput.disabled = true;
      activeProjectRows.innerHTML = "";
      pastProjectRows.innerHTML = "";
      clearProjectHistory();
    }

    list.addEventListener("click", (event) => {
      const item = event.target.closest(".designer-list-item");
      if (!item) return;
      selectDesigner(item.dataset.id);
    });

    memoInput.addEventListener("input", () => {
      saveMemo(selectedDesignerId, memoInput.value);
    });

    document.querySelector(".designer-detail").addEventListener("click", (event) => {
      const row = event.target.closest("[data-project-id]");
      if (!row) return;
      selectProject(row.dataset.projectId);
    });

    search.addEventListener("input", renderDesignerList);
    typeFilter.addEventListener("change", renderDesignerList);

    editDesignerButton?.addEventListener("click", openEditModal);
    deleteDesignerButton?.addEventListener("click", openDeleteModal);

    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateSelectedDesigner(new FormData(editForm));
      closeEditModal();
    });

    editModal.addEventListener("click", (event) => {
      if (event.target === editModal || event.target.closest("[data-designer-edit-close]")) {
        closeEditModal();
      }
    });

    deleteModal.addEventListener("click", (event) => {
      if (event.target === deleteModal || event.target.closest("[data-designer-delete-close]")) {
        closeDeleteModal();
        return;
      }

      if (event.target.closest("[data-designer-delete-confirm]")) {
        deleteSelectedDesigner();
        closeDeleteModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !editModal.hidden) closeEditModal();
      if (event.key === "Escape" && !deleteModal.hidden) closeDeleteModal();
    });

    window.DesignPrintHubDesigners = {
      selectDesigner,
      selectProject,
      renderDesignerList,
      openEditModal,
      openDeleteModal,
      deleteSelectedDesigner
    };

    renderDesignerList();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDesignerPage);
  } else {
    initDesignerPage();
  }
})();
