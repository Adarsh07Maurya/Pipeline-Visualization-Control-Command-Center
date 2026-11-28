
document.addEventListener("DOMContentLoaded", () => {

    // Active Navigation Link
    document.querySelectorAll(".nav-link").forEach(link => {

        const current = location.pathname.split("/").pop() || "index.html";

        if (link.getAttribute("href") === current) {
            link.classList.add("active");
        }

    });


    // Pipeline Run Buttons
    const runButtons = [
        document.getElementById("runPipeline"),
        document.getElementById("runPipelineBottom")
    ].filter(Boolean);

    const reset = document.getElementById("resetPipeline");
    const stages = document.querySelectorAll("#stages .stage");
    const message = document.getElementById("pipelineMessage");

    let running = false;


    // Run Pipeline Function
    function run() {

        if (running) return;

        running = true;

        runButtons.forEach(button => {
            button.disabled = true;
        });

        if (message) {
            message.textContent =
                "Pipeline is running. Processing build, test, deploy and production stages...";
        }

        stages.forEach((stage, i) => {

            stage.classList.remove("complete");

            stage.querySelector("small").textContent = "Waiting";
            stage.querySelector(".stage-icon").textContent = "";

            setTimeout(() => {

                stage.classList.add("complete");

                stage.querySelector("small").textContent = "Completed";
                stage.querySelector(".stage-icon").textContent = "✓";

                if (i === stages.length - 1) {

                    running = false;

                    runButtons.forEach(button => {
                        button.disabled = false;
                    });

                    if (message) {
                        message.textContent =
                            "Pipeline completed successfully. All stages are green.";
                    }

                }

            }, (i + 1) * 900);

        });

        if (!stages.length) {

            alert("Pipeline run started!");

            runButtons.forEach(button => {
                button.disabled = false;
            });

            running = false;

        }

    }


    // Run Pipeline Button Events
    runButtons.forEach(button => {
        button.addEventListener("click", run);
    });


    // Reset Pipeline
    if (reset) {

        reset.addEventListener("click", () => {

            stages.forEach(stage => {

                stage.classList.remove("complete");

                stage.querySelector("small").textContent = "Waiting";
                stage.querySelector(".stage-icon").textContent = "";

            });

            if (message) {
                message.textContent =
                    "Your pipeline is ready. Start a run to see each stage in action.";
            }

            running = false;

            runButtons.forEach(button => {
                button.disabled = false;
            });

        });

    }


    // Create New Pipeline
    const newPipeline = document.getElementById("newPipeline");

    if (newPipeline) {

        newPipeline.addEventListener("click", () => {

            const name = prompt("Enter pipeline name:");

            if (name) {

                const tbody = document.getElementById("pipelineRows");

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td></td>
                    <td>main</td>
                    <td>Just now</td>
                    <td>
                        <span class="pill">Created</span>
                    </td>
                    <td>
                        <a href="pipeline-details.html">View details</a>
                    </td>
                `;

                row.cells[0].textContent = name;

                tbody.prepend(row);

            }

        });

    }


    // Search Activity Logs
    const logSearch = document.getElementById("logSearch");

    if (logSearch) {

        logSearch.addEventListener("input", () => {

            document.querySelectorAll("#logList p").forEach(p => {

                p.style.display = p.textContent
                    .toLowerCase()
                    .includes(logSearch.value.toLowerCase())
                    ? ""
                    : "none";

            });

        });

    }


    // Refresh Jobs
    const refresh = document.getElementById("refreshJobs");

    if (refresh) {

        refresh.addEventListener("click", () => {

            refresh.textContent = "Refreshed";

            setTimeout(() => {
                refresh.textContent = "Refresh";
            }, 1000);

        });

    }


    // Save Settings
    const save = document.getElementById("saveSettings");

    if (save) {

        save.addEventListener("click", () => {

            alert("Settings saved successfully!");

        });

    }

});
