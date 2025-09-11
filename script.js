// Portfolio Site JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Update time in menu bar
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        // Reverse the text for the mirror effect
        const reversedTimeString = timeString.split('').reverse().join('');
        document.querySelector('.time').textContent = reversedTimeString;
    }

    // Update time every minute
    updateTime();
    setInterval(updateTime, 60000);

    // Portfolio window functionality
    const portfolioWindow = document.getElementById('portfolio-window');
    const closeBtn = document.querySelector('.control.close');

    // Open portfolio window when clicking on folder icons
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const project = this.dataset.project;
            openPortfolioWindow(project);
        });
    });

    // Close portfolio window
    closeBtn.addEventListener('click', function() {
        portfolioWindow.style.display = 'none';
    });

    // Close window when clicking outside
    portfolioWindow.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Dock item interactions
    document.querySelectorAll('.dock-item').forEach(item => {
        item.addEventListener('click', function() {
            const app = this.dataset.app;
            handleDockClick(app);
        });
    });

    // Settings icon interaction
    document.querySelector('.settings-icon').addEventListener('click', function() {
        showSettings();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            portfolioWindow.style.display = 'none';
        }
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            openPortfolioWindow('main');
        }
    });

    // Functions
    function openPortfolioWindow(project) {
        // Update content based on project
        updatePortfolioContent(project);
        portfolioWindow.style.display = 'block';
        
        // Add entrance animation
        portfolioWindow.style.opacity = '0';
        portfolioWindow.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            portfolioWindow.style.transition = 'all 0.3s ease-out';
            portfolioWindow.style.opacity = '1';
            portfolioWindow.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    }

    function updatePortfolioContent(project) {
        const content = document.querySelector('.portfolio-content');
        
        const projects = {
            case1: {
                title: "Hackasaurus",
                description: "How might we turn everyday browsing into an entry point for learning to code?",
                details: "<p>I co-created Hackasaurus at Mozilla, a project that reimagined how teens learn web development by meeting them where they already are—on the web itself. Instead of abstract sandbox environments, we designed playful tools and curriculum that empowered youth to remix real websites using the X-Ray Goggles bookmarklet. Working closely with librarians in New York and Chicago, we piloted \"hack jams\" to test and refine the approach, and then scaled it internationally with educators and youth from Newark to Nairobi. This collaborative, iterative process not only gave teens a hands-on way to understand the building blocks of the web, but also helped educators actively support their learning. I'm proud of this project because it shaped how out-of-school programs approach coding, turning digital consumers into creators.</p>"
            },
            case2: {
                title: "Mobile App Design",
                description: "iOS/Android app for fitness tracking",
                details: "Designed and developed a cross-platform mobile application for fitness enthusiasts. Includes workout tracking, progress analytics, and social features."
            },
            case3: {
                title: "Data Visualization Dashboard",
                description: "Interactive dashboard for business analytics",
                details: "Created a comprehensive dashboard using D3.js and React for visualizing complex business data. Features real-time updates, custom charts, and export functionality."
            },
            case4: {
                title: "AI-Powered Chatbot",
                description: "Customer service automation solution",
                details: "Developed an intelligent chatbot using natural language processing to handle customer inquiries. Integrated with existing CRM systems and achieved 80% query resolution rate."
            }
        };

        const projectData = projects[project] || {
            title: "Jessica Klein",
            description: "Creative Developer & Designer",
            details: "Welcome to my portfolio! Click on the different case studies to explore my work."
        };

        content.innerHTML = `
            <h1>${projectData.title}</h1>
            <div class="message-divider"></div>
            <p>${projectData.description}</p>
            <div class="project-details">
                <p>${projectData.details}</p>
                <div class="project-links">
                    <a href="http://hackasaurus.toolness.org/en-US/" target="_blank" class="btn btn-primary">Try it</a>
                    <a href="https://www.youtube.com/watch?v=AOSAx7karNg" target="_blank" class="btn btn-secondary">Watch demo</a>
                </div>
            </div>
        `;
    }

    function handleDockClick(app) {
        switch(app) {
            case 'trash':
                showNotification('Trash emptied!');
                break;
            case 'home':
                openPortfolioWindow('main');
                break;
            case 'notes':
                showNotification('Notes app would open here');
                break;
            case 'photos':
                showNotification('Photo gallery would open here');
                break;
            case 'mail':
                showNotification('Mail app would open here');
                break;
        }
    }

    function showSettings() {
        showNotification('Settings panel would open here');
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 50px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Add some interactive effects
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-5px)';
        });

        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Parallax effect for background
    document.addEventListener('mousemove', function(e) {
        const bookshelf = document.querySelector('.bookshelf');
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        
        bookshelf.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Add CSS for additional elements
const additionalStyles = `
    .project-details {
        margin-top: 30px;
    }

    .tech-stack {
        margin: 20px 0;
    }

    .tech-stack h3 {
        color: #333;
        margin-bottom: 10px;
        font-weight: 600;
    }

    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tech-tag {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
    }

    .project-links {
        margin-top: 30px;
        display: flex;
        gap: 15px;
    }

    .btn {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
        display: inline-block;
    }

    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.8);
        color: #333;
        border: 2px solid #ddd;
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 1);
        border-color: #999;
        transform: translateY(-2px);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
