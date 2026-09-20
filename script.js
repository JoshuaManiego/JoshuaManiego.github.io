const skills = [
    {
        name: "Python",
        category: "Programming",
        description: "Used for programming activities, problem solving, and learning software development.",
        icon: "fa-brands fa-python"
    },
    {
        name: "Java",
        category: "Programming",
        description: "Used for object-oriented programming and data structure activities.",
        icon: "fa-brands fa-java"
    },
    {
        name: "HTML & CSS",
        category: "Web",
        description: "Used to create and design responsive websites and portfolio projects.",
        icon: "fa-brands fa-html5"
    },
    {
        name: "JavaScript",
        category: "Web",
        description: "Used to add interactive features and dynamic content to websites.",
        icon: "fa-brands fa-js"
    },
    {
        name: "Cybersecurity Fundamentals",
        category: "Cybersecurity",
        description: "Learning the basic concepts of cybersecurity, threats, vulnerabilities, and protection.",
        icon: "fa-solid fa-shield-halved"
    },
    {
        name: "Network Security",
        category: "Cybersecurity",
        description: "Learning how networks can be protected from unauthorized access and attacks.",
        icon: "fa-solid fa-lock"
    },
    {
        name: "Computer Networking",
        category: "Networking",
        description: "Learning networking concepts, devices, connections, and communication.",
        icon: "fa-solid fa-network-wired"
    },
    {
        name: "Problem Solving",
        category: "Programming",
        description: "Developing logical thinking and solving programming and technical problems.",
        icon: "fa-solid fa-lightbulb"
    }
];

function normalizeSearch(value) {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim().toLowerCase();
}

function filterSkills(searchValue, categoryValue) {
    const search = normalizeSearch(searchValue);
    const category = normalizeSearch(categoryValue);

    return skills.filter(function (skill) {
        const matchesSearch =
            skill.name.toLowerCase().includes(search) ||
            skill.category.toLowerCase().includes(search) ||
            skill.description.toLowerCase().includes(search);

        const matchesCategory =
            category === "all" ||
            skill.category.toLowerCase() === category;

        return matchesSearch && matchesCategory;
    });
}

function renderSkills(skillList) {
    const container = document.getElementById("skillsContainer");
    const message = document.getElementById("skillsMessage");

    if (!container || !message) {
        return;
    }

    container.innerHTML = "";

    if (!Array.isArray(skillList) || skillList.length === 0) {
        message.textContent = "No skills found. Try another search or category.";
        return;
    }

    message.textContent = "";

    skillList.forEach(function (skill) {
        if (
            !skill ||
            !skill.name ||
            !skill.category ||
            !skill.description ||
            !skill.icon
        ) {
            return;
        }

        const card = document.createElement("div");
        card.className = "skill-card";

        card.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>

            <div class="skill-info">
                <span class="skill-category">${skill.category}</span>
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("skillSearch");
    const categoryButtons = document.querySelectorAll(".category-btn");

    if (!searchInput || !categoryButtons.length) {
        return;
    }

    let currentCategory = "All";

    searchInput.addEventListener("input", function () {
        const filteredSkills = filterSkills(
            searchInput.value,
            currentCategory
        );

        renderSkills(filteredSkills);
    });

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            currentCategory = button.dataset.category || "All";

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filteredSkills = filterSkills(
                searchInput.value,
                currentCategory
            );

            renderSkills(filteredSkills);
        });
    });

    renderSkills(skills);
});
