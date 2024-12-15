export const send_btn = document.querySelector(".sub-btn #send"),
  toast = document.querySelector(".toast-bx"),
  closeIcon = document.querySelector(".toast-bx .close"),
  err_head = document.querySelector(".message .text-1"),
  err_desc = document.querySelector(".message .text-2"),
  err_ico = document.querySelector(".content .check"),
  progress = document.querySelector(".progress");
var toast_time, progress_time, tm_out;

export function toastError() {
    err_ico.classList.remove("bx-check");
    err_ico.classList.add("bxs-error-circle");
    err_ico.style.backgroundColor = "#B00020";

    progress.classList.add("error");
    toast.classList.add("error");
}

export function toastSuccess() {
    err_ico.classList.remove("bxs-error-circle");
    err_ico.classList.add("bx-check");
    err_ico.style.backgroundColor = "#f07b26";

    progress.classList.remove("error");
    toast.classList.remove("error");
}

export function showToast() {
  toast.classList.add("active");
  progress.classList.add("active");

  toast_time = setTimeout(() => {
    toast.classList.remove("active");
  }, 5000);

  progress_time = setTimeout(() => {
    progress.classList.remove("active");
  }, 5300);
}
export function success(head, txt) {
  err_head.textContent = head;
  err_desc.textContent = txt;

  send_btn.disabled = true;
  tm_out = setTimeout(() => {
     send_btn.disabled = false;
  }, 5350);
  if (err_ico.classList.contains("bxs-error-circle")) {
    toastSuccess();
  }
  showToast();
}
export function err(head, txt) {
  err_head.textContent = head;
  err_desc.textContent = txt;
  send_btn.disabled = true;
  tm_out = setTimeout(() => {
    send_btn.disabled = false;
  }, 5350);
  if (err_ico.classList.contains("bx-check")) {
    toastError();
  }
  showToast();
}

export function clears() {
  clearTimeout(toast_time);
  clearTimeout(progress_time);
  clearTimeout(tm_out);
  send_btn.disabled = false;
  toast.classList.remove("active");
  setTimeout(() => {
    progress.classList.remove("active");
  }, 300);
}
