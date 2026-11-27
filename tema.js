(function () {
    const storageKey = "yasa-theme";
    const root = document.documentElement;
    let savedTheme = "light";

    try {
        const storedTheme = localStorage.getItem(storageKey);
        if (storedTheme === "light" || storedTheme === "dark") {
            savedTheme = storedTheme;
        }
    } catch (error) {
        console.warn("No se pudo leer la preferencia del tema.", error);
    }

    root.dataset.theme = savedTheme;

    document.addEventListener("DOMContentLoaded", function () {
        const toggle = document.getElementById("theme-toggle");
        if (!toggle) return;

        function updateToggle(theme) {
            const isDark = theme === "dark";
            toggle.setAttribute("aria-pressed", String(isDark));
            toggle.textContent = isDark ? "☀️ Modo claro" : "🌙 Modo oscuro";
        }

        updateToggle(root.dataset.theme);

        toggle.addEventListener("click", function () {
            const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
            root.dataset.theme = nextTheme;
            updateToggle(nextTheme);

            try {
                localStorage.setItem(storageKey, nextTheme);
            } catch (error) {
                console.warn("No se pudo guardar la preferencia del tema.", error);
            }
        });
    });
})();
