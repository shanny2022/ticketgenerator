// Wait until the page is ready
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticketForm");
  const ticket = document.getElementById("ticket");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // Get the values from the form
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const company = form.company.value.trim();
    const role = form.role.value.trim();
    const avatar = form.avatar.files[0];

    // Clear previous ticket
    ticket.innerHTML = "";

    // Basic form validation
    if (!name || !email || !company || !role || !avatar) {
      alert("Please fill in all fields and upload an avatar.");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate image type and size (under 2MB)
    if (!["image/jpeg", "image/png"].includes(avatar.type)) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    if (avatar.size > 2 * 1024 * 1024) {
      alert("File size too large. Max 2MB allowed.");
      return;
    }

    // Create FileReader to display avatar image
    const reader = new FileReader();
    reader.onload = function () {
      const avatarURL = reader.result;

      // Create ticket HTML
      ticket.innerHTML = `
        <div class="ticket-card">
          <h2>Your Conference Ticket 🎟️</h2>
          <img src="${avatarURL}" alt="Avatar" class="ticket-avatar">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><em>See you at Coding Conf 2025!</em></p>
        </div>
      `;

      // Add success animation
      ticket.classList.remove("hidden");
      ticket.style.animation = "fadeIn 1s ease";
    };

    // Read the image as base64 to show it
    reader.readAsDataURL(avatar);

    // Reset the form after submission
    form.reset();
  });
});
