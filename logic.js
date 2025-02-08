// Form elements
const legExercisesForm = document.getElementById('legExercisesForm');
const pushExercisesForm = document.getElementById('pushExercisesForm');
const pullExercisesForm = document.getElementById('pullExercisesForm');
const methodSelection = document.getElementById('MethodSelection');
const volumeAmount = document.getElementById('Volume');
const finishButton = document.getElementById('finishButton');
const outputElement = document.getElementById('output');

// Object that stores details
let workoutPlan = {
    method: '',
    volume: '',
    legExercises: [],
    pushExercises: [],
    pullExercises: [],
};

function setupOtherInput(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);

    checkbox.addEventListener("change", function () {
        input.disabled = !this.checked;
        if (!this.checked) {
            input.value = ""; // Clear input if not checked
        } 
    });
}

setupOtherInput("otherLegCheckbox", "otherLegInput");
setupOtherInput("otherPushCheckbox", "otherPushInput");
setupOtherInput("otherPullCheckbox", "otherPullInput");

function getSelectedExercises(form, otherCheckboxId, otherInputId) {
  const allElements = Array.from(form.elements);
  const checkedCheckboxes = allElements.filter((element) => element.checked);
  const values = checkedCheckboxes.filter(element => element.value !== "on").map(element => element.value);
  // Custom input
  const otherCheckbox = document.getElementById(otherCheckboxId);
  const otherInput = document.getElementById(otherInputId);

  if (otherCheckbox.checked && otherInput.value.trim() !== "") {
      values.push(otherInput.value.trim());
  }

  return values;
}


finishButton.addEventListener('click', () => {
    workoutPlan.method = methodSelection.value;
    workoutPlan.experience = volumeAmount.value;
    workoutPlan.legExercises = getSelectedExercises(legExercisesForm, "otherLegCheckbox", "otherLegInput");
    workoutPlan.pushExercises = getSelectedExercises(pushExercisesForm, "otherPushCheckbox", "otherPushInput");
    workoutPlan.pullExercises = getSelectedExercises(pullExercisesForm, "otherPullCheckbox", "otherPullInput");

    const workoutPlanHtml = generateWorkoutPlanHtml(workoutPlan);
    outputElement.innerHTML = workoutPlanHtml;
});

// Function to choose reps based on training method
function determineReps(method) {
    if (method === "Strength") {
        return "4-8 reps"; 
    } else if (method === "Aesthetics") {
        return "8-12 reps"; 
    }
    return "10 reps"; // Default value
}

function generateWorkoutPlanHtml(workoutPlan) {
    const reps = determineReps(workoutPlan.method);
    // Formatting
    const formatExercisesWithVolumeAndReps = (exercises) => {
        const sets = workoutPlan.experience.split(" ")[0]; // Extract the number of sets from the string (e.g., "3 Sets")
        return exercises.map((exercise) => `${exercise} - ${sets} x ${reps}`).join('</li><li>');
    };

    let html = `
        <h2>Workout Plan</h2>
        <p>Training Method: ${workoutPlan.method}</p>
        <p>Experience Level: ${workoutPlan.experience}</p>
        <h3>Leg Exercises</h3>
        <ul>
            <li>${formatExercisesWithVolumeAndReps(workoutPlan.legExercises)}</li>
        </ul>
        <h3>Push Exercises</h3>
        <ul>
            <li>${formatExercisesWithVolumeAndReps(workoutPlan.pushExercises)}</li>
        </ul>
        <h3>Pull Exercises</h3>
        <ul>
            <li>${formatExercisesWithVolumeAndReps(workoutPlan.pullExercises)}</li>
        </ul>
    `;
    return html;
}
