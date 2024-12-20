const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const progress = document.getElementById("progress");
const stepCircles = document.querySelectorAll(".step");

let currentStep = 0;

// Handle "Next" buttons
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      updateStep(currentStep + 1);
    }
  });
});

// Handle "Previous" buttons
prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateStep(currentStep - 1);
  });
});

// Update the current step and progress
function updateStep(step) {
  steps[currentStep].classList.remove("active");
  stepCircles[currentStep].classList.remove("active");

  currentStep = step;

  steps[currentStep].classList.add("active");
  stepCircles[currentStep].classList.add("active");

  const progressPercent = (currentStep / (steps.length - 1)) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Validate the current step's inputs
function validateStep(step) {
  const inputs = steps[step].querySelectorAll("input, select");
  for (let input of inputs) {
    if (!input.checkValidity()) {
      alert(`Please fill out the ${input.name} field.`);
      return false;
    }
  }
  return true;
}

// Submit the form
document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("https://example.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register. Please try again.");
    }

    alert("Registration completed successfully!");
    e.target.reset();
    updateStep(0); // Reset to first step
  } catch (error) {
    alert(error.message);
  }
});