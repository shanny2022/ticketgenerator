document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticketForm");
  const ticket = document.getElementById("ticket");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const github = form.github.value.trim();
    const avatar = form.avatar.files[0];

    // Clear previous ticket
    ticket.innerHTML = "";

    // Validate inputs
    if (!name || !email || !github || !avatar) {
      alert("Please complete all fields and upload your avatar.");
      return;
    }

    // Check email format
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format.");
      return;
    }

    // Check file type
    if (!["image/jpeg", "image/png"].includes(avatar.type)) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    // Check file size
    if (avatar.size > 2 * 1024 * 1024) {
      alert("Image too large. Max 2MB.");
      return;
    }

    // Read the avatar image
    const reader = new FileReader();
    reader.onload = () => {
      const avatarURL = reader.result;

      // Display ticket
      ticket.innerHTML = `
        <div class="ticket-card">
          <h2>Congrats, ${name}!</h2>
          <img src="${avatarURL}" alt="Avatar" class="ticket-avatar" />
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>GitHub:</strong> ${github}</p>
          <p>We've emailed your ticket and will send updates in the run-up to the event.</p>
          <p><em>Coding Conf — Jan 31, 2025 / Austin, TX</em></p>
        </div>
      `;

      ticket.classList.remove("hidden");
    };

    reader.readAsDataURL(avatar);
    form.reset();
  });
});
