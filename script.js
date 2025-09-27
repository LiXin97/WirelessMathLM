// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight current section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);

    function highlightCurrentSection() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', highlightCurrentSection);

    // Initial highlight
    highlightCurrentSection();

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animateElements = document.querySelectorAll('.result-card, .figure-container, .author-card, .resource-card, .step');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.result-card, .author-card, .resource-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Citation section functionality
    function initializeCitationSection() {
        // Copy citation button
        const copyBtn = document.getElementById('copy-citation');
        console.log('Copy button found:', copyBtn); // Debug log

        if (copyBtn) {
            copyBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Copy button clicked!'); // Debug log

                const citationText = document.getElementById('citation-text').textContent;
                console.log('Citation text:', citationText); // Debug log

                // Check if clipboard API is available
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(citationText).then(() => {
                        console.log('Clipboard API success'); // Debug log
                        showCopySuccess('Citation copied to clipboard!');
                    }).catch(err => {
                        console.error('Clipboard API failed:', err);
                        fallbackCopy(citationText);
                    });
                } else {
                    console.log('Using fallback copy method'); // Debug log
                    fallbackCopy(citationText);
                }
            });
        } else {
            console.error('Copy button not found!');
        }

        function fallbackCopy(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const result = document.execCommand('copy');
                console.log('Fallback copy result:', result);
                if (result) {
                    showCopySuccess('Citation copied to clipboard!');
                } else {
                    showCopySuccess('Please manually copy the citation above');
                }
            } catch (err) {
                console.error('Fallback copy failed:', err);
                showCopySuccess('Please manually copy the citation above');
            }

            document.body.removeChild(textArea);
        }

        // Download .bib file
        const downloadBtn = document.getElementById('download-bib');
        console.log('Download button found:', downloadBtn); // Debug log

        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Download button clicked!'); // Debug log

                const citationText = document.getElementById('citation-text').textContent;
                const blob = new Blob([citationText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'wirelessmathlm.bib';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showCopySuccess('Citation file downloaded!');
            });
        } else {
            console.error('Download button not found!');
        }

        // Format tabs
        const formatTabs = document.querySelectorAll('.format-tab');
        console.log('Format tabs found:', formatTabs.length); // Debug log

        formatTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                console.log('Format tab clicked:', this.getAttribute('data-format')); // Debug log

                // Remove active class from all tabs and content
                formatTabs.forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.format-text').forEach(f => f.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const format = this.getAttribute('data-format');
                const targetFormat = document.getElementById(`${format}-format`);
                if (targetFormat) {
                    targetFormat.classList.add('active');
                } else {
                    console.error('Format content not found:', `${format}-format`);
                }
            });
        });
    }

    function showCopySuccess(message) {
        // Remove existing success message
        const existing = document.getElementById('copy-success');
        if (existing) {
            existing.remove();
        }

        // Create success notification
        const successDiv = document.createElement('div');
        successDiv.id = 'copy-success';
        successDiv.innerHTML = `<i class="fas fa-check"></i> ${message}`;
        document.body.appendChild(successDiv);

        // Show with animation
        setTimeout(() => {
            successDiv.classList.add('show');
        }, 100);

        // Hide after 3 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 300);
        }, 3000);
    }

    // Citation functionality
    console.log('Initializing citation section...');
    initializeCitationSection();

    // Alternative simple copy functionality as backup
    setTimeout(() => {
        const copyBtnBackup = document.getElementById('copy-citation');
        console.log('Backup check - Copy button found:', copyBtnBackup);

        if (copyBtnBackup && !copyBtnBackup.hasAttribute('data-listener-added')) {
            copyBtnBackup.setAttribute('data-listener-added', 'true');
            console.log('Adding backup click listener...');

            copyBtnBackup.onclick = function(e) {
                e.preventDefault();
                console.log('Backup click handler triggered!');

                const citationText = document.getElementById('citation-text').textContent;

                // Try navigator.clipboard first
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(citationText).then(() => {
                        console.log('Backup clipboard success!');
                        showCopySuccess('Citation copied to clipboard!');
                    }).catch(() => {
                        console.log('Backup clipboard failed, using fallback...');
                        simpleTextCopy(citationText);
                    });
                } else {
                    console.log('Using simple fallback method...');
                    simpleTextCopy(citationText);
                }
            };
        }
    }, 1000);

    function simpleTextCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            const success = document.execCommand('copy');
            console.log('Simple copy result:', success);
            showCopySuccess('Citation copied to clipboard!');
        } catch (err) {
            console.log('Simple copy failed:', err);
            showCopySuccess('Please manually copy the citation');
        }
        document.body.removeChild(textarea);
    }

    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    document.body.appendChild(scrollToTopBtn);

    // Lazy loading for images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    // Add loading animation for figures
    const figures = document.querySelectorAll('.figure-image, .teaser-image');
    figures.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });

    // Performance: Use passive listeners where possible
    const passiveListener = { passive: true };

    // Handle PDF iframe for better viewing
    const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');
    pdfLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal PDF opening, but could add custom PDF viewer here
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const sectionIndex = parseInt(e.key) - 1;
            const sections = ['abstract', 'results', 'dataset', 'method', 'authors', 'resources'];
            const targetSection = document.getElementById(sections[sectionIndex]);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

});

// Add CSS for active nav link
const additionalCSS = `
.nav-links a.active {
    color: #2563eb !important;
    font-weight: 600;
}

.nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background: #2563eb;
    border-radius: 1px;
}

.nav-links a {
    position: relative;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);