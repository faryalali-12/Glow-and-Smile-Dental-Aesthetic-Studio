// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 50,
            duration: 800,
        });
    }

    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        // Prevent scrolling while splash screen is active
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
            // Restore scrolling
            document.body.style.overflow = 'auto';
            // Re-trigger AOS animations if needed
            if (typeof AOS !== 'undefined') AOS.refresh();
        }, 2500); // Wait for the text animation to finish before fading out
    }

    // Navbar Scroll Effect (make solid on scroll)
    const navbar = document.querySelector('.navbar');
    if (navbar && document.getElementById('home')) { // only for index page with hero
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(11, 27, 61, 0.95) !important';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(11, 27, 61, 0.8) !important';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Initialize EmailJS
    // NOTE TO USER: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); 
    }

    // Handle Appointment Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";

            // Gather form parameters
            const templateParams = {
                from_name: document.getElementById('from_name').value,
                reply_to: document.getElementById('reply_to').value,
                contact_number: document.getElementById('contact_number').value,
                preferred_date: document.getElementById('preferred_date').value,
                preferred_time: document.getElementById('preferred_time').value,
                message: document.getElementById('message').value,
            };

            // NOTE TO USER: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID'
            // with your actual EmailJS Service ID and Template ID.
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                   console.log('SUCCESS!', response.status, response.text);
                   alert("Appointment request sent successfully! We will contact you soon.");
                   appointmentForm.reset();
                   submitBtn.disabled = false;
                   submitBtn.innerText = "Confirm Booking";
                }, function(error) {
                   console.error('FAILED...', error);
                   alert("Oops! Something went wrong. Please check your EmailJS configuration or try calling us directly.");
                   submitBtn.disabled = false;
                   submitBtn.innerText = "Confirm Booking";
                });
        });
    }
});
