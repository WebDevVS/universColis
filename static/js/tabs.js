document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab-btn");
  const panes = document.querySelectorAll(".tab-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-target");

      // Active tab
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Show target pane
      panes.forEach(pane => {
        if (pane.id === target) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
    });
  });
});
