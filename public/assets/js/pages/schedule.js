/*
  Schedule page controller.
  Responsibilities:
  - Render weekly project schedule by day, not as duration bars.
  - Render filterable schedule table.
  - Update the selected project schedule detail.
  TODO(API): Connect filters and selected schedule detail to real project schedule APIs.
*/
(function () {
  function initSchedulePage() {
    const schedules = window.DesignPrintHubData?.schedules || [];
    const days = window.DesignPrintHubData?.scheduleDays || [];
    const ui = window.DesignPrintHubUI;
    const search = document.querySelector("#scheduleSearch");
    const ownerFilter = document.querySelector("#scheduleOwnerFilter");
    const stageFilter = document.querySelector("#scheduleStageFilter");
    const board = document.querySelector("#scheduleBoard");
    const rows = document.querySelector("#scheduleRows");
    const empty = document.querySelector("#scheduleEmpty");
    const memoInput = document.querySelector("#scheduleMemo");

    if (!ui || !search || !ownerFilter || !stageFilter || !board || !rows || !empty || !memoInput) {
      console.error("Schedule page initialization failed: required data or DOM nodes are missing.");
      return;
    }

    let selectedScheduleId = schedules[0]?.id || "";
    let editingPlanRef = null;
    let deletingPlanRef = null;
    const memoStorageKey = "design-print-hub.schedule.memos";
    const savedMemos = JSON.parse(localStorage.getItem(memoStorageKey) || "{}");

    function ensurePlanIds() {
      schedules.forEach((schedule) => {
        (schedule.dailyPlan || []).forEach((plan, index) => {
          if (!plan.id) plan.id = `${schedule.id}-plan-${index}`;
        });
      });
    }

    function createPlanEditModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "schedulePlanEditModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal dashboard-manage-modal" role="dialog" aria-modal="true" aria-labelledby="schedulePlanEditTitle">
          <div class="modal-head">
            <h2 id="schedulePlanEditTitle">일정 카드 수정</h2>
            <button class="icon-btn" type="button" data-schedule-plan-edit-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <form class="dashboard-manage-form schedule-plan-edit-form">
            <label>
              <span>카드 라벨</span>
              <input name="title" type="text" required>
            </label>
            <label>
              <span>이동할 날짜</span>
              <select name="day" required>
                ${days.map((day, index) => `<option value="${index}">${day}</option>`).join("")}
              </select>
            </label>
            <div class="modal-actions">
              <button class="btn" type="button" data-schedule-plan-edit-close>취소</button>
              <button class="btn primary" type="submit">수정 반영</button>
            </div>
          </form>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    function createPlanDeleteModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "schedulePlanDeleteModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="schedulePlanDeleteTitle">
          <div class="modal-head">
            <h2 id="schedulePlanDeleteTitle">일정 카드를 삭제할까요?</h2>
            <button class="icon-btn" type="button" data-schedule-plan-delete-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <p><strong id="schedulePlanDeleteName">선택 일정</strong>을 주간 프로젝트 일정에서 삭제합니다. 현재 mock 화면에서만 제거되며 실제 데이터는 변경되지 않습니다.</p>
          <div class="modal-actions">
            <button class="btn" type="button" data-schedule-plan-delete-close>취소</button>
            <button class="btn danger" type="button" data-schedule-plan-delete-confirm>삭제</button>
          </div>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const planEditModal = createPlanEditModal();
    const planEditForm = planEditModal.querySelector(".schedule-plan-edit-form");
    const planDeleteModal = createPlanDeleteModal();
    const planDeleteName = planDeleteModal.querySelector("#schedulePlanDeleteName");

    function memoFor(item) {
      return savedMemos[item.id] ?? item.memo ?? "";
    }

    function saveMemo(scheduleId, value) {
      if (!scheduleId) return;
      savedMemos[scheduleId] = value;
      const item = schedules.find((schedule) => schedule.id === scheduleId);
      if (item) item.memo = value;
      localStorage.setItem(memoStorageKey, JSON.stringify(savedMemos));
    }

    function findPlan(scheduleId, planId) {
      const schedule = schedules.find((item) => item.id === scheduleId);
      const plan = schedule?.dailyPlan?.find((item) => item.id === planId);
      return { schedule, plan };
    }

    function syncScheduleCheckpoints(schedule) {
      if (!schedule) return;
      schedule.checkpoints = (schedule.dailyPlan || []).map((plan) => plan.title);
    }

    function uniqueOwners() {
      return [...new Set(schedules.map((item) => item.owner))];
    }

    function fillOwnerFilter() {
      ownerFilter.innerHTML = [
        '<option value="all">전체 담당자</option>',
        ...uniqueOwners().map((owner) => `<option value="${owner}">${owner}</option>`)
      ].join("");
    }

    function filteredSchedules() {
      const keyword = search.value.trim().toLowerCase();
      const owner = ownerFilter.value;
      const stage = stageFilter.value;
      return schedules.filter((item) => {
        const text = [item.orderNo, item.project, item.client, item.owner, item.stage, item.scope].join(" ").toLowerCase();
        const matchesKeyword = !keyword || text.includes(keyword);
        const matchesOwner = owner === "all" || item.owner === owner;
        const matchesStage = stage === "all" || item.stageClass === stage;
        return matchesKeyword && matchesOwner && matchesStage;
      });
    }

    function dayPlans(item, dayIndex) {
      return (item.dailyPlan || []).filter((plan) => plan.day === dayIndex);
    }

    function planColorClass(title) {
      if (title === "1차 디자인 발송") return "process-stage1";
      if (title === "2-1차 진행중" || title === "2-2차 진행중" || title === "2-3차 진행중") return "process-stage2";
      if (title === "최종 진행 중") return "process-final";
      if (title === "확정 및 인쇄 진행 예정") return "process-print";
      return "process-default";
    }

    function currentPlan(item) {
      return (item.dailyPlan || [])[0] || { title: item.stage };
    }

    function planActionButtons(plan) {
      return `
        <span class="schedule-card-actions" aria-label="${plan.title} 일정 관리">
          <button class="schedule-card-action" type="button" data-plan-edit aria-label="${plan.title} 수정">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>
          </button>
          <button class="schedule-card-action" type="button" data-plan-delete aria-label="${plan.title} 삭제">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </span>
      `;
    }

    // WeeklySchedule component: renders each project task inside its exact day column.
    function renderBoard(items) {
      board.innerHTML = `
        <div class="schedule-calendar-head">
          <span>프로젝트</span>
          ${days.map((day) => `<span>${day}</span>`).join("")}
        </div>
        ${items.map((item) => `
          <div class="schedule-calendar-row ${item.id === selectedScheduleId ? "selected" : ""}" role="button" tabindex="0" data-schedule-row-id="${item.id}">
            <span class="schedule-calendar-project">
              <strong>${item.project}</strong>
              <small>${item.owner}</small>
            </span>
            ${days.map((day, dayIndex) => `
              <span class="schedule-day-cell" aria-label="${day} ${item.project} 일정">
                ${dayPlans(item, dayIndex).map((plan) => `
                  <span class="schedule-day-card ${planColorClass(plan.title)}" data-schedule-id="${item.id}" data-plan-id="${plan.id}">
                    <strong>${plan.title}</strong>
                    ${planActionButtons(plan)}
                  </span>
                `).join("")}
              </span>
            `).join("")}
          </div>
        `).join("")}
      `;
    }

    function renderRows(items) {
      rows.innerHTML = items.map((item) => `
        <tr class="${item.id === selectedScheduleId ? "selected" : ""}" data-schedule-row-id="${item.id}">
          <td><strong>${item.project}</strong><span class="muted">${item.orderNo}</span></td>
          <td>${item.owner}<span class="muted">${item.ownerType}</span></td>
          <td><span class="status schedule-process ${planColorClass(currentPlan(item).title)}">${item.stage}</span></td>
          <td>${item.confirmAt}</td>
          <td>${item.deliveryAt}</td>
          <td>${item.status}</td>
        </tr>
      `).join("");
    }

    function renderDetail(item) {
      if (!item) {
        document.querySelector("#scheduleDetailTitle").textContent = "선택된 일정이 없습니다";
        document.querySelector("#scheduleDetailMeta").textContent = "일정을 클릭하면 상세 정보가 표시됩니다.";
        document.querySelector("#scheduleDetailFields").innerHTML = "";
        document.querySelector("#scheduleCheckpoints").innerHTML = "";
        memoInput.value = "";
        memoInput.disabled = true;
        return;
      }

      document.querySelector("#scheduleDetailTitle").textContent = item.project;
      document.querySelector("#scheduleDetailMeta").textContent = `${item.orderNo} · ${item.client}`;
      document.querySelector("#scheduleDetailFields").innerHTML = ui.renderFieldRows({
        "담당": `${item.owner} (${item.ownerType})`,
        "진행 단계": item.stage,
        "작업 범위": item.scope,
        "확인 일정": item.confirmAt,
        "납품 일정": item.deliveryAt,
        "상태": item.status
      });
      document.querySelector("#scheduleCheckpoints").innerHTML = item.checkpoints.map((checkpoint) => (
        `<li>${checkpoint}</li>`
      )).join("");
      memoInput.disabled = false;
      memoInput.value = memoFor(item);
    }

    function selectSchedule(scheduleId) {
      selectedScheduleId = scheduleId;
      const item = schedules.find((schedule) => schedule.id === scheduleId);
      document.querySelectorAll("[data-schedule-row-id]").forEach((element) => {
        element.classList.toggle("selected", element.dataset.scheduleRowId === scheduleId);
      });
      renderDetail(item);
    }

    function renderSchedulePage() {
      const items = filteredSchedules();
      if (!items.some((item) => item.id === selectedScheduleId)) {
        selectedScheduleId = items[0]?.id || "";
      }

      renderBoard(items);
      renderRows(items);
      empty.hidden = items.length > 0;
      renderDetail(schedules.find((item) => item.id === selectedScheduleId));
    }

    function openPlanEditModal(scheduleId, planId) {
      const { schedule, plan } = findPlan(scheduleId, planId);
      if (!schedule || !plan) return;

      editingPlanRef = { scheduleId, planId };
      planEditForm.elements.title.value = plan.title;
      planEditForm.elements.day.value = String(plan.day);
      planEditModal.hidden = false;
      planEditForm.elements.title.focus();
    }

    function closePlanEditModal() {
      planEditModal.hidden = true;
      editingPlanRef = null;
    }

    function updatePlan(formData) {
      if (!editingPlanRef) return;
      const { schedule, plan } = findPlan(editingPlanRef.scheduleId, editingPlanRef.planId);
      if (!schedule || !plan) return;

      const nextTitle = String(formData.get("title") || "").trim();
      plan.title = nextTitle || plan.title;
      plan.day = Number(formData.get("day"));
      syncScheduleCheckpoints(schedule);
      selectedScheduleId = schedule.id;
      renderSchedulePage();
    }

    function openPlanDeleteModal(scheduleId, planId) {
      const { schedule, plan } = findPlan(scheduleId, planId);
      if (!schedule || !plan) return;

      deletingPlanRef = { scheduleId, planId };
      planDeleteName.textContent = `${schedule.project} · ${plan.title}`;
      planDeleteModal.hidden = false;
      planDeleteModal.querySelector("[data-schedule-plan-delete-confirm]")?.focus();
    }

    function closePlanDeleteModal() {
      planDeleteModal.hidden = true;
      deletingPlanRef = null;
    }

    function deletePlan() {
      if (!deletingPlanRef) return;
      const { schedule, plan } = findPlan(deletingPlanRef.scheduleId, deletingPlanRef.planId);
      if (!schedule || !plan) return;

      schedule.dailyPlan = (schedule.dailyPlan || []).filter((item) => item.id !== plan.id);
      syncScheduleCheckpoints(schedule);
      selectedScheduleId = schedule.id;
      renderSchedulePage();
    }

    [search, ownerFilter, stageFilter].forEach((control) => {
      control.addEventListener("input", renderSchedulePage);
      control.addEventListener("change", renderSchedulePage);
    });

    document.querySelector(".schedule-page").addEventListener("click", (event) => {
      const planCard = event.target.closest(".schedule-day-card");
      if (event.target.closest("[data-plan-edit]")) {
        event.preventDefault();
        event.stopPropagation();
        openPlanEditModal(planCard?.dataset.scheduleId, planCard?.dataset.planId);
        return;
      }

      if (event.target.closest("[data-plan-delete]")) {
        event.preventDefault();
        event.stopPropagation();
        openPlanDeleteModal(planCard?.dataset.scheduleId, planCard?.dataset.planId);
        return;
      }

      const target = event.target.closest("[data-schedule-row-id]");
      if (!target) return;
      selectSchedule(target.dataset.scheduleRowId);
    });

    document.querySelector(".schedule-page").addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target.closest(".schedule-calendar-row[data-schedule-row-id]");
      if (!target) return;
      event.preventDefault();
      selectSchedule(target.dataset.scheduleRowId);
    });

    planEditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updatePlan(new FormData(planEditForm));
      closePlanEditModal();
    });

    planEditModal.addEventListener("click", (event) => {
      if (event.target === planEditModal || event.target.closest("[data-schedule-plan-edit-close]")) {
        closePlanEditModal();
      }
    });

    planDeleteModal.addEventListener("click", (event) => {
      if (event.target === planDeleteModal || event.target.closest("[data-schedule-plan-delete-close]")) {
        closePlanDeleteModal();
        return;
      }

      if (event.target.closest("[data-schedule-plan-delete-confirm]")) {
        deletePlan();
        closePlanDeleteModal();
      }
    });

    memoInput.addEventListener("input", () => {
      saveMemo(selectedScheduleId, memoInput.value);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !planEditModal.hidden) closePlanEditModal();
      if (event.key === "Escape" && !planDeleteModal.hidden) closePlanDeleteModal();
    });

    window.DesignPrintHubSchedule = {
      renderSchedulePage,
      selectSchedule,
      openPlanEditModal,
      openPlanDeleteModal,
      deletePlan
    };

    ensurePlanIds();
    fillOwnerFilter();
    renderSchedulePage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSchedulePage);
  } else {
    initSchedulePage();
  }
})();
