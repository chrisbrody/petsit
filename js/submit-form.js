var isSubmitting = false;
// submit for search form
$('form').on('submit', function(e) {

    e.preventDefault();

    // Disable the submit button to prevent multiple submissions
    const submitButton = $(this).find('button[type="submit"]');
    submitButton.prop('disabled', true);  // Disable the button

    console.log(isSubmitting)
    if (isSubmitting) {
        return false; // Prevent duplicate submissions
    }
    isSubmitting = true;

    // Check the honeypot field
    const honeypot = document.getElementById('website').value;
    if (honeypot) {
        console.warn("Bot detected, form submission blocked.");
        return; // Stop the form submission
    }

    let allGood = true;

    $('.req').each(function(){
        if ($(this).val() === '') {
            allGood = false;
        };
    });

    if (allGood === false) {
        submitButton.prop('disabled', false);
        return;
    } else if (allGood === true) {
        // Use `this` to refer to the current form element
        const form = this;
        const formData = new FormData(form);

        // Add additional fields
        formData.append("website", window.location.href);
        formData.append("domain", window.location.href.replace(/^https?:\/\/([^/]+).*/, "$1")); // Extract domain
        // Check if the #message element exists
        const messageField = document.getElementById('message');
        if (messageField) {
            // Escape newlines in the message field
            const escapedMessage = messageField.value.replace(/\n/g, '\\n'); // Replace newlines with escaped versions
            console.log(escapedMessage)
            formData.set('message', escapedMessage);
        }

        const webhookUrl = "https://hook.us1.make.com/g8avvnscv5jnjwwjgzh8xsf4rkxuntmm";

        fetch(webhookUrl, {
            method: "POST",
            body: formData,
        })
            .then(response => {
                const status = document.getElementById("status");
                if (response.ok) {
                    status.innerHTML = "<p>Thank you for reaching out. We will respond to you shortly.</p>";
                    status.style.display = "block"
                    // form.reset(); // Reset form fields after submission
                    form.style.display = "none";
                } else {
                    throw new Error("Network response was not ok.");
                }
            })
            .catch(error => {
                document.getElementById("status").textContent = "Failed to send message, please refresh the page and try again.";
                status.style.display = "block"
                console.error("Error:", error);
            });
    };

});