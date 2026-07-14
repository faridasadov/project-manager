// render-markup.js — render funksiyalarının SAF markup (data → HTML-string) hissələri.
// script.js-dən əvvəl klassik <script> kimi yüklənir → paylaşılan global scope.
// Bu funksiyalar yalnız verilən data-dan HTML string qaytarır — DOM oxumur/yazmır,
// appState-ə toxunmur (data-nı render wrapper ötürür). DOM-a yazan nazik render
// wrapper-ləri (customerList.innerHTML = ...) script.js-də qalır.
// Runtime globalları (saf helper-lər): escapeHtml (utils.js), text,
//   fileSizeLabel (utils.js), formatDateTime (format.js).
// Render fazasının pilot modulu — gələcək markup çıxarışları buraya əlavə olunur.

function customerListMarkup(scopedCustomers) {
  return scopedCustomers.length ? scopedCustomers.map((customer) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(customer.name)}</strong>${escapeHtml([customer.contact, customer.email].filter(Boolean).join(" · "))}</span>
      <div class="mini-actions">
        <button type="button" data-customer-action="delete" data-id="${escapeHtml(customer.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}

function managedFileListMarkup(scopedFiles) {
  return scopedFiles.length ? scopedFiles.map((file) => `
    <div class="resource-item">
      <span><strong>${escapeHtml(file.name)}</strong>${fileSizeLabel(Number(file.size) || 0)} · ${escapeHtml(formatDateTime(file.createdAt))}</span>
      <div class="mini-actions">
        <a class="attachment-chip" href="${escapeHtml(file.dataUrl)}" download="${escapeHtml(file.name)}">${text("download")}</a>
        <button type="button" data-file-action="delete" data-id="${escapeHtml(file.id)}">${text("delete")}</button>
      </div>
    </div>
  `).join("") : `<div class="empty">${text("empty")}</div>`;
}
