/*
  Dashboard page controller.
  Responsibilities:
  - Render selected order detail from dashboard mock data.
  - Filter visible pipeline rows.
  - Keep row selection state in sync with the detail panel.
  TODO(API): Replace dashboardOrderDetails with API detail response by order id.
*/
(function () {
  function initDashboardPage() {
    const data = window.DesignPrintHubData?.dashboardOrderDetails;
    const ui = window.DesignPrintHubUI;
    let rows = [...document.querySelectorAll(".order-row")];
    const orderList = document.querySelector(".order-list");
    const filterButtons = [...document.querySelectorAll(".segmented button")];
    const searchInput = document.querySelector(".search input");
    const timeline = document.querySelector("#timeline");
    const finalPrintOrderButton = document.querySelector("#finalPrintOrderButton");
    const finalOrderModal = document.querySelector("#finalOrderModal");
    const actionGrid = finalPrintOrderButton?.closest(".grid");

    if (!data || !ui || !orderList || rows.length === 0) {
      console.error("Dashboard initialization failed: required data or DOM nodes are missing.");
      return;
    }

    let activeFilter = "all";
    let selectedOrderId = rows.find((row) => row.classList.contains("selected"))?.dataset.order || rows[0]?.dataset.order;

    function getSelectedRow() {
      return rows.find((row) => row.dataset.order === selectedOrderId) || null;
    }

    // OrderDetail component: updates the selected-order detail panel.
    function renderOrderDetail(orderId) {
      const detail = data[orderId];
      if (!detail) return;

      document.querySelector("#detailTitle").textContent = detail.title;
      document.querySelector("#specQty").textContent = detail.qty;
      document.querySelector("#specPages").textContent = detail.pages;
      document.querySelector("#specCover").textContent = detail.cover;
      document.querySelector("#specInner").textContent = detail.inner;
      document.querySelector("#specFinish").textContent = detail.finish;
      timeline.innerHTML = ui.renderTimelineItems(detail.history);
    }

    function clearOrderDetail() {
      selectedOrderId = "";
      document.querySelector("#detailTitle").textContent = "";
      document.querySelector("#specQty").textContent = "";
      document.querySelector("#specPages").textContent = "";
      document.querySelector("#specCover").textContent = "";
      document.querySelector("#specInner").textContent = "";
      document.querySelector("#specFinish").textContent = "";
      timeline.innerHTML = "";
    }

    // PipelineList component: selecting a row updates both row state and detail panel.
    function selectOrder(orderId) {
      selectedOrderId = orderId;
      rows.forEach((row) => {
        row.classList.toggle("selected", row.dataset.order === orderId);
      });
      renderOrderDetail(orderId);
    }

    // FilterBar component: filters the pipeline rows by stage and search keyword.
    function applyFilters() {
      const query = searchInput.value.trim().toLowerCase();
      const visibleRows = [];

      rows.forEach((row) => {
        const matchesFilter = activeFilter === "all" || row.dataset.status === activeFilter;
        const matchesSearch = !query || row.dataset.keywords.toLowerCase().includes(query);
        const isVisible = matchesFilter && matchesSearch;
        row.hidden = !isVisible;
        if (isVisible) visibleRows.push(row);
      });

      if (activeFilter === "all") {
        if (visibleRows[0]) selectOrder(visibleRows[0].dataset.order);
        else clearOrderDetail();
        return;
      }

      rows.forEach((row) => row.classList.remove("selected"));
      clearOrderDetail();
    }

    function createOrderManageModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "dashboardOrderManageModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal dashboard-manage-modal" role="dialog" aria-modal="true" aria-labelledby="dashboardManageTitle">
          <div class="modal-head">
            <h2 id="dashboardManageTitle">주문 수정</h2>
            <button class="icon-btn" type="button" data-dashboard-modal-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <form class="dashboard-manage-form">
            <label>
              <span>주문명</span>
              <input name="title" type="text" required>
            </label>
            <label>
              <span>담당/주문번호</span>
              <input name="meta" type="text" required>
            </label>
            <label>
              <span>디자이너</span>
              <input name="designer" type="text" required>
            </label>
            <label>
              <span>작업 메모</span>
              <input name="designerMeta" type="text" required>
            </label>
            <label>
              <span>진행 상태</span>
              <select name="status">
                <option value="assign">작업 배정 대기</option>
                <option value="stage1">1차 디자인 확정</option>
                <option value="stage2">2-2차 오탈자 수정</option>
                <option value="stage3">3차 최종 수정</option>
              </select>
            </label>
            <div class="modal-actions">
              <button class="btn" type="button" data-dashboard-modal-close>취소</button>
              <button class="btn primary" type="submit">수정 반영</button>
            </div>
          </form>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const manageModal = createOrderManageModal();
    const manageForm = manageModal.querySelector(".dashboard-manage-form");
    const manageTitle = manageModal.querySelector("#dashboardManageTitle");
    const deleteModal = document.createElement("div");
    deleteModal.className = "modal-backdrop";
    deleteModal.id = "dashboardOrderDeleteModal";
    deleteModal.hidden = true;
    deleteModal.innerHTML = `
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="dashboardDeleteTitle">
        <div class="modal-head">
          <h2 id="dashboardDeleteTitle">주문을 삭제할까요?</h2>
          <button class="icon-btn" type="button" data-dashboard-delete-close aria-label="닫기">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
        <p><strong id="dashboardDeleteOrderName">선택 주문</strong>을 파이프라인 화면에서 삭제합니다. 현재 mock 화면에서만 제거되며 실제 주문 데이터는 변경되지 않습니다.</p>
        <div class="modal-actions">
          <button class="btn" type="button" data-dashboard-delete-close>취소</button>
          <button class="btn danger" type="button" data-dashboard-delete-confirm>삭제</button>
        </div>
      </section>
    `;
    document.body.appendChild(deleteModal);
    const deleteOrderName = deleteModal.querySelector("#dashboardDeleteOrderName");

    const statusOptions = {
      assign: { label: "작업 배정 대기", className: "green" },
      stage1: { label: "1차 디자인 확정", className: "stage1" },
      stage2: { label: "2-2차 오탈자 수정", className: "stage2" },
      stage3: { label: "3차 최종 수정", className: "stage3" }
    };

    function setRowStatus(row, status) {
      const statusConfig = statusOptions[status] || statusOptions.stage1;
      const badge = row.querySelector(".status");
      row.dataset.status = status;
      if (badge) {
        badge.className = `status ${statusConfig.className}`;
        badge.textContent = statusConfig.label;
      }
    }

    function syncRowKeywords(row) {
      const text = row.textContent.replace(/\s+/g, " ").trim();
      row.dataset.keywords = text;
    }

    function openEditOrderModal() {
      const row = getSelectedRow();
      if (!row) return;

      manageTitle.textContent = "주문 수정";
      manageForm.elements.title.value = row.querySelector(".client strong")?.textContent || "";
      manageForm.elements.meta.value = row.querySelector(".client span")?.textContent || "";
      manageForm.elements.designer.value = row.querySelector(".designer strong")?.textContent || "";
      manageForm.elements.designerMeta.value = row.querySelector(".designer span")?.textContent || "";
      manageForm.elements.status.value = row.dataset.status || "stage1";
      manageModal.hidden = false;
      manageForm.elements.title.focus();
    }

    function closeManageModal() {
      manageModal.hidden = true;
      editOrderButton?.focus();
    }

    function updateSelectedOrder(formData) {
      const row = getSelectedRow();
      if (!row) return;

      row.querySelector(".client strong").textContent = formData.get("title");
      row.querySelector(".client span").textContent = formData.get("meta");
      row.querySelector(".designer strong").textContent = formData.get("designer");
      row.querySelector(".designer span").textContent = formData.get("designerMeta");
      setRowStatus(row, formData.get("status"));
      syncRowKeywords(row);

      const detail = data[row.dataset.order];
      if (detail) {
        detail.title = formData.get("title");
        detail.history = [["주문 정보 수정", "방금 전"], ...detail.history.slice(0, 3)];
      }

      renderOrderDetail(row.dataset.order);
      applyFilters();
    }

    function removeSelectedOrder() {
      const row = getSelectedRow();
      if (!row) return;

      const deletedOrderId = row.dataset.order;
      row.remove();
      delete data[deletedOrderId];
      rows = rows.filter((item) => item.dataset.order !== deletedOrderId);

      const nextVisibleRow = rows.find((item) => !item.hidden) || rows[0];
      if (nextVisibleRow) {
        selectOrder(nextVisibleRow.dataset.order);
        applyFilters();
      } else {
        clearOrderDetail();
      }
    }

    function openDeleteOrderModal() {
      const row = getSelectedRow();
      if (!row) return;

      deleteOrderName.textContent = row.querySelector(".client strong")?.textContent || "선택 주문";
      deleteModal.hidden = false;
      deleteModal.querySelector("[data-dashboard-delete-confirm]")?.focus();
    }

    function closeDeleteOrderModal() {
      deleteModal.hidden = true;
      deleteOrderButton?.focus();
    }

    function deleteSelectedOrder() {
      openDeleteOrderModal();
    }

    const editOrderButton = document.createElement("button");
    editOrderButton.className = "btn";
    editOrderButton.type = "button";
    editOrderButton.setAttribute("aria-label", "선택 주문 수정");
    editOrderButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>
      수정
    `;

    const deleteOrderButton = document.createElement("button");
    deleteOrderButton.className = "btn danger";
    deleteOrderButton.type = "button";
    deleteOrderButton.setAttribute("aria-label", "선택 주문 삭제");
    deleteOrderButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
      삭제
    `;

    actionGrid?.prepend(deleteOrderButton);
    actionGrid?.prepend(editOrderButton);

    editOrderButton.addEventListener("click", openEditOrderModal);
    deleteOrderButton.addEventListener("click", deleteSelectedOrder);

    manageForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateSelectedOrder(new FormData(manageForm));
      closeManageModal();
    });

    manageModal.addEventListener("click", (event) => {
      const shouldClose = event.target === manageModal || event.target.closest("[data-dashboard-modal-close]");
      if (shouldClose) closeManageModal();
    });

    deleteModal.addEventListener("click", (event) => {
      if (event.target === deleteModal || event.target.closest("[data-dashboard-delete-close]")) {
        closeDeleteOrderModal();
        return;
      }

      if (event.target.closest("[data-dashboard-delete-confirm]")) {
        removeSelectedOrder();
        closeDeleteOrderModal();
      }
    });

    orderList.addEventListener("click", (event) => {
      const row = event.target.closest(".order-row");
      if (!row) return;
      selectOrder(row.dataset.order);
    });

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        activeFilter = button.dataset.filter || "all";
        applyFilters();
      });
    });

    searchInput.addEventListener("input", applyFilters);

    // ConfirmationModal component: confirms the final print order action.
    function openFinalOrderModal() {
      if (!finalOrderModal) return;
      finalOrderModal.hidden = false;
      finalOrderModal.querySelector("[data-modal-confirm]")?.focus();
    }

    function closeFinalOrderModal() {
      if (!finalOrderModal) return;
      finalOrderModal.hidden = true;
      finalPrintOrderButton?.focus();
    }

    finalPrintOrderButton?.addEventListener("click", openFinalOrderModal);
    finalOrderModal?.addEventListener("click", (event) => {
      const shouldClose = event.target === finalOrderModal || event.target.closest("[data-modal-close]") || event.target.closest("[data-modal-confirm]");
      if (shouldClose) closeFinalOrderModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && finalOrderModal && !finalOrderModal.hidden) {
        closeFinalOrderModal();
      }
      if (event.key === "Escape" && manageModal && !manageModal.hidden) {
        closeManageModal();
      }
      if (event.key === "Escape" && deleteModal && !deleteModal.hidden) {
        closeDeleteOrderModal();
      }
    });

    window.DesignPrintHubDashboard = {
      selectOrder,
      applyFilters,
      openFinalOrderModal,
      closeFinalOrderModal,
      openEditOrderModal,
      deleteSelectedOrder
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDashboardPage);
  } else {
    initDashboardPage();
  }
})();
