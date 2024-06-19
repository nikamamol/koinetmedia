(function($) {
    "use strict";

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($("#spinner").length > 0) {
                $("#spinner").removeClass("show");
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $(".sticky-top").addClass("shadow-sm").css("top", "0px");
        } else {
            $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
        }
    });

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });

    // Modal Video
    var $videoSrc;
    $(".btn-play").click(function() {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $("#videoModal").on("shown.bs.modal", function(e) {
        $("#video").attr(
            "src",
            $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
        );
    });
    $("#videoModal").on("hide.bs.modal", function(e) {
        $("#video").attr("src", $videoSrc);
    });

    // Project and Testimonial carousel
    $(".project-carousel, .testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
})(jQuery);

//**************************************contact us page************************************ */
//contact form
document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const message = document.getElementById("message").value;

        const postData = {
            firstName,
            lastName,
            email,
            phone,
            message,
        };

        fetch("/postContact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error adding contact form entry");
                }
                return response.text();
            })
            .then((data) => {
                alert(data); // Show success message
                document.getElementById("contactForm").reset(); // Clear form
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Error adding contact form entry");
            });
    });

//********************************************************************************** */
// register form
async function submitForm() {
    const form = document.getElementById("registrationForm");
    const formData = new FormData(form);
    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        phone: formData.get("phone"),
        role: formData.get("role"),
    };

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            // Registration successful, redirect to login page
            window.location.href = "/login";
        } else {
            // Registration failed, show error message
            alert(result.message || "Error registering user.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error registering user.");
    }
}




//****************************************************************** */
// navbar