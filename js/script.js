document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle with ARIA Attributes
    const nav = document.querySelector("nav");
    const ul = document.querySelector("nav ul");

    if (nav && ul) {
        const menuButton = document.createElement("button");
        menuButton.textContent = "☰ Menu";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Toggle Main Navigation Menu");
        menuButton.className = "menu-toggle";
        nav.insertBefore(menuButton, ul);

        menuButton.addEventListener("click", () => {
            const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", !isExpanded);
            ul.classList.toggle("show");
            menuButton.textContent = isExpanded ? "☰ Menu" : "✕ Close";
        });
    }

    // 2. Dynamic Year Update in Footer
    const footerP = document.querySelector("footer p");
    if (footerP) {
        footerP.textContent = `Created for Campus.edu • Milestone 4 • ${new Date().getFullYear()}`;
    }

    // 3. Interactive Dynamic Category Filter (Projects Page)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll("#projects-grid .card");

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filter = button.getAttribute("data-filter");

                projectCards.forEach(card => {
                    const category = card.getAttribute("data-category");
                    if (filter === "all" || category === filter) {
                        card.style.display = "flex";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // 4. Form Validation Interaction (About/Contact Page)
    const form = document.getElementById("contact-form");
    if (form) {
        const fields = ["name", "email", "inquiry-type", "message"];

        fields.forEach(fieldId => {
            const inputField = document.getElementById(fieldId);
            if (inputField) {
                const errorSpan = document.createElement("span");
                errorSpan.className = "error-message";
                errorSpan.id = `${fieldId}-error`;
                errorSpan.setAttribute("aria-live", "polite");
                inputField.parentNode.appendChild(errorSpan);
                inputField.setAttribute("aria-describedby", `${fieldId}-error`);

                inputField.addEventListener("input", () => {
                    errorSpan.textContent = "";
                    inputField.removeAttribute("aria-invalid");
                });
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            fields.forEach(fieldId => {
                const inputField = document.getElementById(fieldId);
                const errorSpan = document.getElementById(`${fieldId}-error`);

                if (!inputField.value.trim()) {
                    isValid = false;
                    const labelText = inputField.parentNode.querySelector("label").textContent.replace("*", "").trim();
                    errorSpan.textContent = `${labelText} is required.`;
                    inputField.setAttribute("aria-invalid", "true");
                } else if (fieldId === "email" && (!inputField.value.includes("@") || !inputField.value.includes("."))) {
                    isValid = false;
                    errorSpan.textContent = "Please enter a valid email address (e.g. name@domain.com).";
                    inputField.setAttribute("aria-invalid", "true");
                }
            });

            if (isValid) {
                const existingSuccess = form.querySelector(".success-message");
                if (existingSuccess) existingSuccess.remove();

                const successMsg = document.createElement("div");
                successMsg.className = "success-message";
                successMsg.setAttribute("role", "status");
                successMsg.textContent = "Thank you! Your inquiry has been validated and sent successfully.";
                form.appendChild(successMsg);
                form.reset();
                setTimeout(() => successMsg.remove(), 6000);
            }
        });
    }

    // 5. Async API Fetch: GitHub Profile Stats Integration
    const featuredSection = document.getElementById("featured");
    if (featuredSection) {
        const apiContainer = document.createElement("div");
        apiContainer.className = "card";
        apiContainer.style.marginTop = "16px";
        apiContainer.innerHTML = `
            <h3>GitHub Activity Feed</h3>
            <div id="github-content">
                <p>Retrieving real-time profile telematics...</p>
            </div>
        `;
        featuredSection.appendChild(apiContainer);

        fetch("https://api.github.com/users/SLCCEO")
            .then(response => {
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                return response.json();
            })
            .then(user => {
                const contentDiv = document.getElementById("github-content");
                contentDiv.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 16px; margin-top: 10px; flex-wrap: wrap;">
                        <img src="${user.avatar_url}" alt="GitHub profile avatar for ${user.login}" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--brand-accent);">
                        <div>
                            <p style="margin:0;"><strong>${user.name || user.login}</strong> (@${user.login})</p>
                            <p style="font-size: 0.9rem; margin:0;">${user.bio || "IT Student & Systems Integrator"}</p>
                            <p style="font-size: 0.85rem; margin-top: 4px;">Public Repositories: <strong>${user.public_repos}</strong></p>
                            <a href="${user.html_url}" target="_blank" rel="noopener noreferrer" class="button" style="padding: 6px 12px; font-size: 0.85rem; margin-top: 8px; display: inline-block;">View GitHub Profile</a>
                        </div>
                    </div>
                `;
            })
            .catch(error => {
                const contentDiv = document.getElementById("github-content");
                contentDiv.innerHTML = `<p style="color: var(--error-color);">Could not fetch live GitHub data. Please check your network connection.</p>`;
                console.error("GitHub Fetch Error:", error);
            });
    }
});