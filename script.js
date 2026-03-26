document.addEventListener('DOMContentLoaded', () => {
    const sections = ['hero', 'work', 'projects', 'contact'];
    let currentSection = 'hero';

    // Navigation Logic
    window.navigateTo = function(id) {
        if (id === currentSection) return;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.nav === id) {
                link.classList.add('text-primary');
                link.classList.remove('text-[#e2e2e6]');
            } else {
                link.classList.remove('text-primary');
                link.classList.add('text-[#e2e2e6]');
            }
        });

        document.querySelectorAll('.section-fade').forEach(section => {
            section.classList.remove('section-active');
        });

        const targetSection = document.getElementById(id);
        if (targetSection) {
            targetSection.classList.add('section-active');
            currentSection = id;
        }

        if (id === 'hero') {
            runTerminalAnimations();
        }
    };

    // Hero Section Header Typing
    const typeTarget = document.getElementById('type-target');
    const heroText = "I build reliable digital systems.";
    let charIndex = 0;

    function typeWriter() {
        if (typeTarget && charIndex < heroText.length) {
            typeTarget.textContent += heroText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    }

    // Interactive Terminal Logic
    const commands = {
        help: "Available commands: whoami, role, focus, experience, projects, contact, resume, clear, help",
        whoami: "Sheikh Mannan Javeed. Computer Science student & Full-stack Developer Intern.",
        role: "Software Engineer specializing in scalable backends and AI-powered systems.",
        focus: "Building high-performance APIs | Microservices | LLM Integration.",
        experience: "- Hertzwave Innovations (Full-stack Intern)\n- Hertzwave Innovations (SDE Intern)\n- Ramaiah Institute (Mobile Dev)",
        projects: "1. MindArena — AI Debate Club\n2. Customer Feedback Microservices System\n3. GitHub PR Review Assistant",
        contact: "Email: smjaveed94@gmail.com | GitHub: @SheikhJaveed | LinkedIn: /in/sheikh-javeed",
        resume: "Resume Link: https://drive.google.com/file/d/1_hQXZ1GEByD4lx-vj5krEjqYcaE7NOuP/view?usp=drive_link",
        clear: "CLEAR_COMMAND"
    };

    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const inputDisplay = document.getElementById('input-display');
    const terminalInputLine = document.getElementById('terminal-input-line');
    let commandHistory = [];
    let historyIndex = -1;

    function typeWriterEffect(text, element) {
        let i = 0;
        const interval = setInterval(() => {
            element.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                if (terminalOutput) {
                    terminalOutput.scrollTop = terminalOutput.scrollHeight;
                }
            }
        }, 15);
    }

    function renderOutput(content, isCommand = false) {
        if (!terminalOutput) return;
        const line = document.createElement('div');
        line.className = 'terminal-line show py-0.5';
        if (isCommand) {
            line.innerHTML = `<span class="text-primary">&gt; </span><span class="text-on-surface">${content}</span>`;
        } else {
            line.className += ' text-on-surface-variant opacity-80';
            typeWriterEffect(content, line);
        }
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function handleCommand(cmd) {
        const cleanCmd = cmd.toLowerCase().trim();
        if (!cleanCmd) return;

        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        renderOutput(cmd, true);

        if (cleanCmd === 'clear') {
            if (terminalOutput) terminalOutput.innerHTML = '';
        } else if (commands[cleanCmd]) {
            renderOutput(commands[cleanCmd]);
        } else {
            renderOutput(`Command not found: ${cleanCmd}. Type 'help' for options.`);
        }

        // Auto-scroll the page/section to keep the input line visible
        setTimeout(() => {
            if (terminalInputLine) {
                terminalInputLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }

    if (terminalInput) {
        terminalInput.addEventListener('input', (e) => {
            if (inputDisplay) inputDisplay.textContent = e.target.value;
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value;
                handleCommand(cmd);
                terminalInput.value = '';
                if (inputDisplay) inputDisplay.textContent = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                    if (inputDisplay) inputDisplay.textContent = terminalInput.value;
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                    if (inputDisplay) inputDisplay.textContent = terminalInput.value;
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                    if (inputDisplay) inputDisplay.textContent = '';
                }
            }
        });
    }

    // Focus handling for terminal
    const terminalContainer = document.querySelector('#terminal-content')?.closest('.bg-surface-container');
    if (terminalContainer && terminalInput) {
        // Use both click and touchstart for robust mobile interaction
        ['click', 'touchstart'].forEach(eventType => {
            terminalContainer.addEventListener(eventType, (e) => {
                terminalInput.focus();
                // Ensure the input is visible when the keyboard pops up
                setTimeout(() => {
                    if (terminalInputLine) {
                        terminalInputLine.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 300);
            });
        });
    }

    function runTerminalAnimations() {
        if (typeTarget) {
            typeTarget.textContent = "";
            charIndex = 0;
            setTimeout(typeWriter, 800);
        }

        if (terminalOutput) {
            terminalOutput.innerHTML = '';
            setTimeout(() => {
                renderOutput("System initialized. Type 'help' to start.");
                if (terminalInputLine) terminalInputLine.classList.add('show');
                if (terminalInput) terminalInput.focus();
            }, 1200);
        }
    }

    // Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    window.toggleMobileMenu = function() {
        if (!mobileMenu) return;
        const isOpen = mobileMenu.classList.contains('opacity-100');
        if (isOpen) {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
        } else {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
        }
    };

    window.mobileNavigate = function(id) {
        toggleMobileMenu();
        setTimeout(() => {
            navigateTo(id);
        }, 300);
    };

    runTerminalAnimations();

    document.addEventListener('keydown', (e) => {
        if (document.activeElement === terminalInput) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            let nextIdx = (sections.indexOf(currentSection) + 1) % sections.length;
            navigateTo(sections[nextIdx]);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            let prevIdx = (sections.indexOf(currentSection) - 1 + sections.length) % sections.length;
            navigateTo(sections[prevIdx]);
        }
    });
});
