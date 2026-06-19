/*
  Order management page controller.
  Responsibilities:
  - Render the paginated order table.
  - Filter by design progress stage.
  - Render selected order detail and item rows.
  TODO(API): Replace client-side filtering/pagination with server-side query params when real data grows.
*/
(function () {
  function initOrderPage() {
    const orders = window.DesignPrintHubData?.orders || [];
    const ui = window.DesignPrintHubUI;
    const rows = document.querySelector("#orderRows");
    const search = document.querySelector("#orderSearch");
    const filter = document.querySelector("#stageFilter");
    const pageSizeSelect = document.querySelector("#pageSize");
    const pageRange = document.querySelector("#pageRange");
    const pageNav = document.querySelector("#pageNav");
    const listToolbar = document.querySelector("main > .panel .panel-head .toolbar");

    if (!ui || !rows || !search || !filter || !pageSizeSelect || !pageRange || !pageNav) {
      console.error("Order page initialization failed: required data or DOM nodes are missing.");
      return;
    }

    let currentPage = 1;
    let selectedOrderId = orders[0]?.id || "";

    const stageOptions = {
      pending: "작업 배정 대기",
      stage1: "1차 디자인 확정",
      stage2: "2-2차 오탈자 수정",
      stage3: "3차 최종 수정"
    };

    function filteredOrders() {
      const keyword = search.value.trim().toLowerCase();
      const stage = filter.value;
      return orders.filter((order) => {
        const text = [
          order.customerOrderNo,
          order.buyer,
          order.account,
          order.product,
          order.email,
          order.phone
        ].join(" ").toLowerCase();
        const matchesKeyword = !keyword || text.includes(keyword);
        const matchesStage = stage === "all" || order.workClass === stage;
        return matchesKeyword && matchesStage;
      });
    }

    // Table component: renders the current page of order rows.
    function renderOrderTable() {
      const visibleOrders = filteredOrders();
      const pageSize = Number(pageSizeSelect.value);
      const totalPages = Math.max(1, Math.ceil(visibleOrders.length / pageSize));
      currentPage = Math.min(currentPage, totalPages);

      const startIndex = (currentPage - 1) * pageSize;
      const pageOrders = visibleOrders.slice(startIndex, startIndex + pageSize);

      if (!pageOrders.some((order) => order.id === selectedOrderId)) {
        selectedOrderId = pageOrders[0]?.id || "";
      }

      rows.innerHTML = pageOrders.map((order) => `
        <tr data-id="${order.id}" class="${order.id === selectedOrderId ? "selected" : ""}">
          <td><strong>${order.customerOrderNo}</strong><span class="muted">${order.account}</span></td>
          <td><strong>${order.buyer}</strong><span class="muted">${order.email}<br>${order.phone}</span></td>
          <td><strong>${order.product}</strong><span class="muted">${order.productSummary}</span></td>
          <td><span class="amount">${order.amount}</span></td>
          <td><strong>${order.paymentMethod}</strong><span class="muted">${order.paymentAt}</span></td>
          <td><strong>${order.partner}</strong><span class="muted">${order.partnerRole}</span></td>
          <td><span class="status ${order.workClass}">${order.workStage}</span></td>
        </tr>
      `).join("");

      renderPagination(visibleOrders.length, totalPages, startIndex, pageOrders.length);

      if (selectedOrderId) {
        selectOrder(selectedOrderId);
      } else {
        clearDetail();
      }
    }

    // Pagination component: renders page size, range, and page controls.
    function renderPagination(totalCount, totalPages, startIndex, currentCount) {
      const from = totalCount === 0 ? 0 : startIndex + 1;
      const to = startIndex + currentCount;
      pageRange.textContent = `${from}-${to} / ${totalCount}건`;

      const maxButtons = 5;
      let firstPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      let lastPage = Math.min(totalPages, firstPage + maxButtons - 1);
      firstPage = Math.max(1, lastPage - maxButtons + 1);

      const buttons = [
        `<button class="page-btn" type="button" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>이전</button>`
      ];
      for (let page = firstPage; page <= lastPage; page += 1) {
        buttons.push(`<button class="page-btn ${page === currentPage ? "active" : ""}" type="button" data-page="${page}">${page}</button>`);
      }
      buttons.push(`<button class="page-btn" type="button" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>다음</button>`);

      pageNav.innerHTML = buttons.join("");
    }

    function renderItemRows(items) {
      return items.map((item) => `
        <tr>
          <td>
            <div class="item-product">
              <div class="thumb">PRINT<br>ITEM</div>
              <div>
                <strong>${item.name}</strong>
                <span class="muted">수량: ${item.quantity}</span>
              </div>
            </div>
          </td>
          <td><span class="muted">${item.spec}</span></td>
          <td><span class="amount">${item.amount}</span></td>
          <td><span class="file-link">${item.original}</span></td>
          <td><span class="file-link">${item.draft}</span></td>
          <td><span class="file-link">${item.final}</span></td>
          <td><span class="item-status">${item.status}</span></td>
        </tr>
      `).join("");
    }

    // OrderDetail component: updates the detail panels whenever an order row is selected.
    function selectOrder(orderId) {
      const order = orders.find((item) => item.id === orderId);
      if (!order) return;
      selectedOrderId = orderId;

      rows.querySelectorAll("tr").forEach((row) => {
        row.classList.toggle("selected", row.dataset.id === orderId);
      });

      document.querySelector("#detailTitle").textContent = `${order.customerOrderNo} 주문 상세`;
      document.querySelector("#detailMeta").textContent = `${order.account} · ${order.buyer} · ${order.product}`;
      document.querySelector("#orderInfo").innerHTML = ui.renderFieldRows(order.orderInfo);
      document.querySelector("#shippingInfo").innerHTML = ui.renderFieldRows(order.shipping);
      ui.setStatusBadge(document.querySelector("#workStage"), order.workStage, order.workClass);
      document.querySelector("#itemRows").innerHTML = renderItemRows(order.items);
      document.querySelector("#totalBar").innerHTML = `
        <span>상품금액: <strong>${order.goodsAmount}</strong></span>
        <span>배송비: <strong>${order.shippingFee}</strong></span>
        <span>합계: <strong>${order.total}</strong></span>
      `;
    }

    function clearDetail() {
      document.querySelector("#detailTitle").textContent = "주문 상세";
      document.querySelector("#detailMeta").textContent = "조건에 맞는 주문이 없습니다.";
      document.querySelector("#orderInfo").innerHTML = "";
      document.querySelector("#shippingInfo").innerHTML = "";
      document.querySelector("#itemRows").innerHTML = "";
      document.querySelector("#totalBar").innerHTML = "";
      ui.setStatusBadge(document.querySelector("#workStage"), "작업상태", "pending");
    }

    function getSelectedOrder() {
      return orders.find((item) => item.id === selectedOrderId) || null;
    }

    function syncOrderInfo(order) {
      order.orderInfo = {
        ...order.orderInfo,
        "주문번호": order.customerOrderNo,
        "주문자명": order.buyer,
        "학교명": order.account,
        "결제금액": order.amount,
        "결제방법": order.paymentMethod,
        "시안 진행단계": order.workStage
      };

      if (order.orderInfo["담당 프리랜서"] !== undefined) {
        order.orderInfo["담당 프리랜서"] = order.partner;
      } else {
        order.orderInfo["담당 협업업체"] = order.partner;
      }

      order.shipping = {
        ...order.shipping,
        "이메일": order.email,
        "연락처": order.phone
      };
    }

    function createOrderEditModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "orderListEditModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal dashboard-manage-modal" role="dialog" aria-modal="true" aria-labelledby="orderListEditTitle">
          <div class="modal-head">
            <h2 id="orderListEditTitle">주문 목록 수정</h2>
            <button class="icon-btn" type="button" data-order-edit-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <form class="dashboard-manage-form order-list-edit-form">
            <label>
              <span>주문번호</span>
              <input name="customerOrderNo" type="text" required>
            </label>
            <label>
              <span>학교/기업명</span>
              <input name="account" type="text" required>
            </label>
            <label>
              <span>주문자</span>
              <input name="buyer" type="text" required>
            </label>
            <label>
              <span>이메일</span>
              <input name="email" type="email" required>
            </label>
            <label>
              <span>연락처</span>
              <input name="phone" type="text" required>
            </label>
            <label>
              <span>상품정보</span>
              <input name="product" type="text" required>
            </label>
            <label>
              <span>상품 요약</span>
              <input name="productSummary" type="text" required>
            </label>
            <label>
              <span>결제금액</span>
              <input name="amount" type="text" required>
            </label>
            <label>
              <span>결제 방법</span>
              <input name="paymentMethod" type="text" required>
            </label>
            <label>
              <span>결제 일시</span>
              <input name="paymentAt" type="text" required>
            </label>
            <label>
              <span>담당 협업업체/프리랜서</span>
              <input name="partner" type="text" required>
            </label>
            <label>
              <span>담당 역할</span>
              <input name="partnerRole" type="text" required>
            </label>
            <label>
              <span>시안 진행단계</span>
              <select name="workClass">
                <option value="pending">작업 배정 대기</option>
                <option value="stage1">1차 디자인 확정</option>
                <option value="stage2">2-2차 오탈자 수정</option>
                <option value="stage3">3차 최종 수정</option>
              </select>
            </label>
            <div class="modal-actions">
              <button class="btn" type="button" data-order-edit-close>취소</button>
              <button class="btn primary" type="submit">수정 반영</button>
            </div>
          </form>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    function createOrderDeleteModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "orderListDeleteModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="orderListDeleteTitle">
          <div class="modal-head">
            <h2 id="orderListDeleteTitle">주문을 삭제할까요?</h2>
            <button class="icon-btn" type="button" data-order-delete-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <p><strong id="orderListDeleteName">선택 주문</strong>을 주문 목록 화면에서 삭제합니다. 현재 mock 화면에서만 제거되며 실제 주문 데이터는 변경되지 않습니다.</p>
          <div class="modal-actions">
            <button class="btn" type="button" data-order-delete-close>취소</button>
            <button class="btn danger" type="button" data-order-delete-confirm>삭제</button>
          </div>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const editModal = createOrderEditModal();
    const editForm = editModal.querySelector(".order-list-edit-form");
    const deleteModal = createOrderDeleteModal();
    const deleteName = deleteModal.querySelector("#orderListDeleteName");

    const editOrderButton = document.createElement("button");
    editOrderButton.className = "mini";
    editOrderButton.type = "button";
    editOrderButton.setAttribute("aria-label", "선택 주문 수정");
    editOrderButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>
      수정
    `;

    const deleteOrderButton = document.createElement("button");
    deleteOrderButton.className = "mini danger";
    deleteOrderButton.type = "button";
    deleteOrderButton.setAttribute("aria-label", "선택 주문 삭제");
    deleteOrderButton.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>
      삭제
    `;

    listToolbar?.prepend(deleteOrderButton);
    listToolbar?.prepend(editOrderButton);

    function openEditModal() {
      const order = getSelectedOrder();
      if (!order) return;

      Object.entries({
        customerOrderNo: order.customerOrderNo,
        account: order.account,
        buyer: order.buyer,
        email: order.email,
        phone: order.phone,
        product: order.product,
        productSummary: order.productSummary,
        amount: order.amount,
        paymentMethod: order.paymentMethod,
        paymentAt: order.paymentAt,
        partner: order.partner,
        partnerRole: order.partnerRole,
        workClass: order.workClass
      }).forEach(([name, value]) => {
        editForm.elements[name].value = value;
      });

      editModal.hidden = false;
      editForm.elements.customerOrderNo.focus();
    }

    function closeEditModal() {
      editModal.hidden = true;
      editOrderButton.focus();
    }

    function updateSelectedOrder(formData) {
      const order = getSelectedOrder();
      if (!order) return;

      [
        "customerOrderNo",
        "account",
        "buyer",
        "email",
        "phone",
        "product",
        "productSummary",
        "amount",
        "paymentMethod",
        "paymentAt",
        "partner",
        "partnerRole",
        "workClass"
      ].forEach((key) => {
        order[key] = formData.get(key);
      });
      order.workStage = stageOptions[order.workClass] || stageOptions.pending;
      syncOrderInfo(order);
      renderOrderTable();
      selectOrder(order.id);
    }

    function openDeleteModal() {
      const order = getSelectedOrder();
      if (!order) return;

      deleteName.textContent = `${order.customerOrderNo} · ${order.account}`;
      deleteModal.hidden = false;
      deleteModal.querySelector("[data-order-delete-confirm]")?.focus();
    }

    function closeDeleteModal() {
      deleteModal.hidden = true;
      deleteOrderButton.focus();
    }

    function deleteSelectedOrder() {
      const orderIndex = orders.findIndex((order) => order.id === selectedOrderId);
      if (orderIndex < 0) return;

      orders.splice(orderIndex, 1);
      const nextOrder = filteredOrders()[0] || orders[Math.min(orderIndex, orders.length - 1)] || orders[0];
      selectedOrderId = nextOrder?.id || "";
      renderOrderTable();
    }

    function resetAndRenderOrderTable() {
      currentPage = 1;
      selectedOrderId = "";
      renderOrderTable();
    }

    rows.addEventListener("click", (event) => {
      const row = event.target.closest("tr[data-id]");
      if (!row) return;
      selectOrder(row.dataset.id);
    });

    pageNav.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-page]");
      if (!button || button.disabled) return;
      const totalPages = Math.max(1, Math.ceil(filteredOrders().length / Number(pageSizeSelect.value)));
      if (button.dataset.page === "prev") currentPage = Math.max(1, currentPage - 1);
      else if (button.dataset.page === "next") currentPage = Math.min(totalPages, currentPage + 1);
      else currentPage = Number(button.dataset.page);
      renderOrderTable();
    });

    search.addEventListener("input", resetAndRenderOrderTable);
    filter.addEventListener("change", resetAndRenderOrderTable);
    pageSizeSelect.addEventListener("change", resetAndRenderOrderTable);

    editOrderButton.addEventListener("click", openEditModal);
    deleteOrderButton.addEventListener("click", openDeleteModal);

    editForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateSelectedOrder(new FormData(editForm));
      closeEditModal();
    });

    editModal.addEventListener("click", (event) => {
      if (event.target === editModal || event.target.closest("[data-order-edit-close]")) {
        closeEditModal();
      }
    });

    deleteModal.addEventListener("click", (event) => {
      if (event.target === deleteModal || event.target.closest("[data-order-delete-close]")) {
        closeDeleteModal();
        return;
      }

      if (event.target.closest("[data-order-delete-confirm]")) {
        deleteSelectedOrder();
        closeDeleteModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !editModal.hidden) closeEditModal();
      if (event.key === "Escape" && !deleteModal.hidden) closeDeleteModal();
    });

    window.DesignPrintHubOrders = {
      selectOrder,
      renderOrderTable,
      resetAndRenderOrderTable,
      openEditModal,
      openDeleteModal,
      deleteSelectedOrder
    };

    renderOrderTable();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOrderPage);
  } else {
    initOrderPage();
  }
})();
