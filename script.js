//---================ Responsive Navigation============

      document.addEventListener("DOMContentLoaded", () => {
            const hamburger = document.getElementById("hamburger");
            const navLinks = document.getElementById("navLinks");

            // হ্যামবার্গার ক্লিক ইভেন্ট
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
                hamburger.classList.toggle("toggle");
            });

            // মেনু আইটেমে ক্লিক করলে মেনু বন্ধ হয়ে যাবে
            document.querySelectorAll(".nav-links a").forEach(link => {
                link.addEventListener("click", () => {
                    navLinks.classList.remove("active");
                    hamburger.classList.remove("toggle");
                });
            });
        });
		
	//========== products section design=============
	
    document.addEventListener("DOMContentLoaded", () => {
        // ১. ক্যাটাগরি ফিল্টারিং লজিক
        const filterBtns = document.querySelectorAll(".filter-btn");
        const productCards = document.querySelectorAll(".product-card");

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // অ্যাক্টিভ বাটন পরিবর্তন
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                productCards.forEach(card => {
                    if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                        card.classList.remove("hide");
                    } else {
                        card.classList.add("hide");
                    }
                });
            });
        });

        // ২. কুইক ভিউ স্পেসিফিকেশন পপ-আপ (Modal) লজিক
        const modal = document.getElementById("productModal");
        const closeModal = document.getElementById("closeModal");
        const modalQuoteBtn = document.getElementById("modalQuoteBtn");
        const quickViewBtns = document.querySelectorAll(".quick-view-btn");

        quickViewBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                document.getElementById("modalTitle").textContent = btn.getAttribute("data-title");
                document.getElementById("modalCategory").textContent = btn.getAttribute("data-category");
                document.getElementById("modalFabric").textContent = btn.getAttribute("data-fabric");
                document.getElementById("modalMoq").textContent = btn.getAttribute("data-moq");
                document.getElementById("modalLead").textContent = btn.getAttribute("data-lead");
                document.getElementById("modalImg").src = btn.getAttribute("data-img");

                modal.classList.add("open");
            });
        });

        // পপ-আপ বন্ধ করার লজিক
        closeModal.addEventListener("click", () => modal.classList.remove("open"));
        modalQuoteBtn.addEventListener("click", () => modal.classList.remove("open"));

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("open");
            }
        });
    });



//---================ Contact Us section design ============


    document.addEventListener("DOMContentLoaded", () => {
        const contactForm = document.getElementById("contactForm");
        const successAlert = document.getElementById("formSuccessAlert");
        const sendBtn = document.getElementById("sendBtn");

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // ইনপুট ভ্যালু সংগ্রহ
            const name = document.getElementById("cName").value.trim();
            const email = document.getElementById("cEmail").value.trim();
            const message = document.getElementById("cMessage").value.trim();

            // এরর মেসেজ ক্লিয়ার করা
            document.getElementById("nameError").textContent = "";
            document.getElementById("emailError").textContent = "";
            document.getElementById("msgError").textContent = "";

            let isValid = true;

            // ভ্যালিডেশন চেক
            if (name === "") {
                document.getElementById("nameError").textContent = "Please enter your full name.";
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                isValid = false;
            }

            if (message.length < 10) {
                document.getElementById("msgError").textContent = "Please write at least 10 characters.";
                isValid = false;
            }

            // সব ঠিক থাকলে সাবমিট অ্যানিমেশন ও কনফার্মেশন দেখাবে
            if (isValid) {
                sendBtn.textContent = "Sending...";
                sendBtn.disabled = true;

                setTimeout(() => {
                    successAlert.style.display = "block";
                    contactForm.reset();
                    sendBtn.textContent = "Send Message";
                    sendBtn.disabled = false;

                    // ৬ সেকেন্ড পর অ্যালার্ট হাইড হবে
                    setTimeout(() => {
                        successAlert.style.display = "none";
                    }, 6000);
                }, 800);
            }
        });
    });


//---================ CHAT BOT DESIGN JS ============



    // সরাসরি inline display পরিবর্তন করে চ্যাটবট ওপেন/ক্লোজ করার ফাংশন
    function dpToggleChat() {
        const chatWindow = document.getElementById("dpChatWindow");
        const chatIcon = document.getElementById("dpChatIcon");
        const chatInput = document.getElementById("dpChatInput");

        if (chatWindow.style.display === "flex") {
            chatWindow.style.display = "none";
            chatIcon.textContent = "💬";
        } else {
            chatWindow.style.display = "flex";
            chatIcon.textContent = "✕";
            setTimeout(() => chatInput.focus(), 100);
        }
    }

    // বায়িং হাউজের উত্তর জেনারেটর
    function dpGetReply(text) {
        const q = text.toLowerCase();
        if (q.includes("moq") || q.includes("minimum") || q.includes("quantity")) {
            return "Our standard Minimum Order Quantity (MOQ) is <strong>2,000 – 3,000 pcs per style</strong>, depending on fabric and wash complexity.";
        } else if (q.includes("product") || q.includes("knit") || q.includes("woven") || q.includes("denim") || q.includes("sweater")) {
            return "We specialize in <strong>Knitwear, Woven Shirts & Jackets, Stretch Denim, and Flat-Knit Sweaters</strong> for men, women, and kids.";
        } else if (q.includes("compliance") || q.includes("audit") || q.includes("bsci") || q.includes("sedex") || q.includes("factory")) {
            return "100% of our partner factories are audited and certified by <strong>amfori BSCI, SEDEX, WRAP, OEKO-TEX®, and RSC (Accord)</strong>.";
        } else if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("quote")) {
            return "Reach our merchandising desk at <strong>info@designparkbd.com</strong> or WhatsApp <strong>+880 1711-000000</strong>.";
        } else {
            return "Thank you for your inquiry! Our merchandising team can assist with custom tech packs and FOB pricing. Please click <strong>Request Quote</strong> above.";
        }
    }

    // মেসেজ যোগ করা
    function dpAppendMsg(text, sender) {
        const body = document.getElementById("dpChatBody");
        const div = document.createElement("div");
        div.className = "dp-msg " + (sender === "user" ? "dp-user-msg" : "dp-bot-msg");
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        div.innerHTML = `<p>${text}</p><span class="dp-time">${time}</span>`;
        
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
    }

    // প্রসেস এবং রিপ্লাই
    function dpProcessQuery(query) {
        if (!query || !query.trim()) return;
        dpAppendMsg(query, "user");

        setTimeout(() => {
            dpAppendMsg(dpGetReply(query), "bot");
        }, 500);
    }

    // ফর্ম সাবমিট
    function dpSendMessage(e) {
        e.preventDefault();
        const input = document.getElementById("dpChatInput");
        const val = input.value;
        input.value = "";
        dpProcessQuery(val);
    }

    // কুইক চিপ বাটন ক্লিক
    function dpQuickAsk(question) {
        dpProcessQuery(question);
    }



//---================ Responsive Navigation============
//---================ Responsive Navigation============
//---================ Responsive Navigation============
