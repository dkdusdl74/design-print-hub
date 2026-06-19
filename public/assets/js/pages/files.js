/*
  Webhard-style file archive page controller.
  Responsibilities:
  - Render premium 3D folder tiles for customer visual assets.
  - Open external webhard folders when a folder has an externalUrl.
  - Show simple file chips for local mock folders.
  TODO(API): Connect folder search, external storage links, permissions, and folder contents to backend APIs.
*/
(function () {
  function initFileArchivePage() {
    const folders = window.DesignPrintHubData?.fileFolders || [];
    const files = window.DesignPrintHubData?.files || [];
    const folderList = document.querySelector("#fileFolderList");
    const fileRows = document.querySelector("#fileRows");
    const search = document.querySelector("#fileSearch");
    const empty = document.querySelector("#fileEmpty");
    const panelTitle = document.querySelector("#filePanelTitle");
    const panelMeta = document.querySelector("#filePanelMeta");

    if (!folderList || !fileRows || !search || !empty || !panelTitle || !panelMeta) {
      console.error("File archive initialization failed: required DOM nodes are missing.");
      return;
    }

    let selectedFolderId = "";
    let editingFolderId = "";
    let deletingFolderId = "";

    function createFolderEditModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "fileFolderEditModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal dashboard-manage-modal" role="dialog" aria-modal="true" aria-labelledby="fileFolderEditTitle">
          <div class="modal-head">
            <h2 id="fileFolderEditTitle">폴더 수정</h2>
            <button class="icon-btn" type="button" data-folder-edit-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <form class="dashboard-manage-form file-folder-edit-form">
            <label>
              <span>폴더명</span>
              <input name="name" type="text" required>
            </label>
            <label>
              <span>설명</span>
              <input name="description" type="text" required>
            </label>
            <label>
              <span>자료 수</span>
              <input name="fileCount" type="number" min="0" step="1">
            </label>
            <label>
              <span>업데이트</span>
              <input name="updatedAt" type="text">
            </label>
            <div class="modal-actions">
              <button class="btn" type="button" data-folder-edit-close>취소</button>
              <button class="btn primary" type="submit">수정 반영</button>
            </div>
          </form>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    function createFolderDeleteModal() {
      const modal = document.createElement("div");
      modal.className = "modal-backdrop";
      modal.id = "fileFolderDeleteModal";
      modal.hidden = true;
      modal.innerHTML = `
        <section class="modal" role="dialog" aria-modal="true" aria-labelledby="fileFolderDeleteTitle">
          <div class="modal-head">
            <h2 id="fileFolderDeleteTitle">폴더를 삭제할까요?</h2>
            <button class="icon-btn" type="button" data-folder-delete-close aria-label="닫기">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
          </div>
          <p><strong id="fileFolderDeleteName">선택 폴더</strong>를 파일함 화면에서 삭제합니다. 현재 mock 화면에서만 제거되며 실제 파일이나 폴더는 삭제되지 않습니다.</p>
          <div class="modal-actions">
            <button class="btn" type="button" data-folder-delete-close>취소</button>
            <button class="btn danger" type="button" data-folder-delete-confirm>삭제</button>
          </div>
        </section>
      `;
      document.body.appendChild(modal);
      return modal;
    }

    const folderEditModal = createFolderEditModal();
    const folderEditForm = folderEditModal.querySelector(".file-folder-edit-form");
    const folderDeleteModal = createFolderDeleteModal();
    const folderDeleteName = folderDeleteModal.querySelector("#fileFolderDeleteName");

    function folderFiles(folderId) {
      const keyword = search.value.trim().toLowerCase();
      return files.filter((file) => {
        const text = [file.name, file.project, file.client, file.type].join(" ").toLowerCase();
        return file.folderId === folderId && (!keyword || text.includes(keyword));
      });
    }

    function visibleFolders() {
      const keyword = search.value.trim().toLowerCase();
      if (!keyword) return folders;
      return folders.filter((folder) => {
        const folderText = [folder.name, folder.description].join(" ").toLowerCase();
        const hasMatchingFile = files.some((file) => {
          const fileText = [file.name, file.project, file.client, file.type].join(" ").toLowerCase();
          return file.folderId === folder.id && fileText.includes(keyword);
        });
        return folderText.includes(keyword) || hasMatchingFile;
      });
    }

    function folderActionButtons(folder) {
      return `
        <span class="webhard-folder-actions" aria-label="${folder.name} 폴더 관리">
          <button class="webhard-folder-action" type="button" data-folder-edit aria-label="${folder.name} 수정">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>
          </button>
          <button class="webhard-folder-action" type="button" data-folder-delete aria-label="${folder.name} 삭제">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </span>
      `;
    }

    // WebhardFolderGrid component: renders large premium folder tiles.
    function renderFolders() {
      const visible = visibleFolders();
      folderList.innerHTML = visible.map((folder) => `
        <article class="webhard-folder ${folder.id === selectedFolderId ? "selected" : ""}" role="button" tabindex="0" data-folder-id="${folder.id}">
          ${folderActionButtons(folder)}
          <span class="webhard-folder-icon">
            <img src="/assets/folder-icon.png" alt="" aria-hidden="true">
          </span>
          <strong>${folder.name}</strong>
          <small>${folder.description}</small>
          <em>${folder.externalUrl ? "외부 웹하드" : `${folder.fileCount}개 자료`}</em>
        </article>
      `).join("");

      empty.hidden = visible.length > 0;
      if (!visible.length) {
        fileRows.innerHTML = "";
        panelTitle.textContent = "검색 결과가 없습니다";
        panelMeta.textContent = "다른 검색어로 다시 확인해 주세요.";
      }
    }

    function renderFolderFiles(folder) {
      const visibleFiles = folderFiles(folder.id);
      panelTitle.textContent = folder.name;
      panelMeta.textContent = folder.externalUrl
        ? "외부 웹하드 폴더입니다. 폴더를 클릭하면 새 창으로 이동합니다."
        : `${folder.description} · ${visibleFiles.length}개 자료`;

      fileRows.innerHTML = visibleFiles.map((file) => `
        <article class="webhard-file-chip">
          <span class="file-type">${file.type}</span>
          <span>
            <strong>${file.name}</strong>
            <small>${file.client} · ${file.size} · ${file.uploadedAt}</small>
          </span>
        </article>
      `).join("");

      empty.hidden = visibleFiles.length > 0;
    }

    function selectFolder(folderId) {
      const folder = folders.find((item) => item.id === folderId);
      if (!folder) return;

      if (folder.externalUrl) {
        window.open(folder.externalUrl, "_blank", "noopener");
      }

      selectedFolderId = folderId;
      renderFolders();
      renderFolderFiles(folder);
    }

    function openFolderEditModal(folderId) {
      const folder = folders.find((item) => item.id === folderId);
      if (!folder) return;

      editingFolderId = folderId;
      folderEditForm.elements.name.value = folder.name || "";
      folderEditForm.elements.description.value = folder.description || "";
      folderEditForm.elements.fileCount.value = folder.fileCount ?? "";
      folderEditForm.elements.updatedAt.value = folder.updatedAt || "";
      folderEditModal.hidden = false;
      folderEditForm.elements.name.focus();
    }

    function closeFolderEditModal() {
      folderEditModal.hidden = true;
      editingFolderId = "";
    }

    function updateFolder(formData) {
      const folder = folders.find((item) => item.id === editingFolderId);
      if (!folder) return;

      folder.name = String(formData.get("name") || "").trim() || folder.name;
      folder.description = String(formData.get("description") || "").trim() || folder.description;
      folder.fileCount = Number(formData.get("fileCount")) || 0;
      folder.updatedAt = String(formData.get("updatedAt") || "").trim() || folder.updatedAt;
      renderFolders();
      if (selectedFolderId === folder.id) renderFolderFiles(folder);
    }

    function openFolderDeleteModal(folderId) {
      const folder = folders.find((item) => item.id === folderId);
      if (!folder) return;

      deletingFolderId = folderId;
      folderDeleteName.textContent = folder.name;
      folderDeleteModal.hidden = false;
      folderDeleteModal.querySelector("[data-folder-delete-confirm]")?.focus();
    }

    function closeFolderDeleteModal() {
      folderDeleteModal.hidden = true;
      deletingFolderId = "";
    }

    function deleteFolder() {
      const folderIndex = folders.findIndex((item) => item.id === deletingFolderId);
      if (folderIndex < 0) return;

      const deletedFolderId = folders[folderIndex].id;
      folders.splice(folderIndex, 1);
      if (selectedFolderId === deletedFolderId) {
        selectedFolderId = "";
        fileRows.innerHTML = "";
        panelTitle.textContent = "?대뜑瑜??좏깮?섏꽭??";
        panelMeta.textContent = "?몃? ?뱁븯???대뜑???대┃ ????李쎌쑝濡??대룞?⑸땲??";
      }
      renderFolders();
    }

    folderList.addEventListener("click", (event) => {
      const folderCard = event.target.closest("[data-folder-id]");
      if (event.target.closest("[data-folder-edit]")) {
        event.preventDefault();
        event.stopPropagation();
        openFolderEditModal(folderCard?.dataset.folderId);
        return;
      }

      if (event.target.closest("[data-folder-delete]")) {
        event.preventDefault();
        event.stopPropagation();
        openFolderDeleteModal(folderCard?.dataset.folderId);
        return;
      }

      const folder = event.target.closest("[data-folder-id]");
      if (!folder) return;
      selectFolder(folder.dataset.folderId);
    });

    folderList.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const folder = event.target.closest("[data-folder-id]");
      if (!folder) return;
      event.preventDefault();
      selectFolder(folder.dataset.folderId);
    });

    folderEditForm.addEventListener("submit", (event) => {
      event.preventDefault();
      updateFolder(new FormData(folderEditForm));
      closeFolderEditModal();
    });

    folderEditModal.addEventListener("click", (event) => {
      if (event.target === folderEditModal || event.target.closest("[data-folder-edit-close]")) {
        closeFolderEditModal();
      }
    });

    folderDeleteModal.addEventListener("click", (event) => {
      if (event.target === folderDeleteModal || event.target.closest("[data-folder-delete-close]")) {
        closeFolderDeleteModal();
        return;
      }

      if (event.target.closest("[data-folder-delete-confirm]")) {
        deleteFolder();
        closeFolderDeleteModal();
      }
    });

    search.addEventListener("input", () => {
      renderFolders();
      if (selectedFolderId) {
        const folder = folders.find((item) => item.id === selectedFolderId);
        if (folder) renderFolderFiles(folder);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !folderEditModal.hidden) closeFolderEditModal();
      if (event.key === "Escape" && !folderDeleteModal.hidden) closeFolderDeleteModal();
    });

    window.DesignPrintHubFiles = {
      renderFolders,
      selectFolder,
      openFolderEditModal,
      openFolderDeleteModal,
      deleteFolder
    };

    renderFolders();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFileArchivePage);
  } else {
    initFileArchivePage();
  }
})();
