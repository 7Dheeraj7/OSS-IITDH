//Global variables to store the extracted data
let wal_addr = "";
let stu_name = "";


//This is waiting till the browser is loaded and as soon as it is loaded the below function will get executed
window.addEventListener("DOMContentLoaded", async () => {
  //Extracting the data from the URL params sent from login.html
  const params = new URLSearchParams(window.location.search);
  wal_addr = params.get("wallet");
  stu_name = params.get("name");
  stu_dob= params.get("dob");
  stu_phone = params.get("phone");

  //Setting this info to html elements
  document.getElementById("profileName").textContent = stu_name;
  document.getElementById("profileWallet").textContent = wal_addr;
  document.getElementById("profiledob").textContent = stu_dob;
  document.getElementById("profilephone").textContent = stu_phone;

  //Requests for list of availabe courses from the backend
  const res = await fetch("http://localhost:5000/courses");
  const courses = await res.json();

  //Displays the list of courses as checkboxes to select
  const listDiv = document.getElementById("courseList");
  courses.forEach(course => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div style="
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0;
  ">
    <input type="checkbox" value="${course.id}">
    <span>${course.name}</span>
  </div>
`;

    listDiv.appendChild(div);
  });
});


//Submits the courses to the backend server
async function registerCourses() {
  //Gathers the selected checkboxes (courses).

  const checkboxes = document.querySelectorAll("#courseList input[type=checkbox]:checked");
  const sel_cour = Array.from(checkboxes).map(cb => cb.value);

  if (sel_cour.length === 0) return alert("Please select at least one course.");

  console.log(stu_name);
  //Sends the data to the backend via a POST request
  const res = await fetch("http://localhost:5000/register-courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stu_name, wal_addr, sel_cour })
  });

  const result = await res.json();
  alert(result.message);
}

//To display the registered courses
async function showRegisteredCourses() {
 // Sends the wallet address to the backend to return registered course names.
  const res = await fetch("http://localhost:5000/registered-courses?wallet=" + wal_addr);
  const data = await res.json();


  //Displaying the result
  const resultDiv = document.getElementById("registeredCourses");
  resultDiv.innerHTML = "<h3>Registered Courses:</h3>";

  if (data.length === 0) {
    resultDiv.innerHTML += "<p>No courses registered yet.</p>";
  } else {
    const ul = document.createElement("ul");
    data.forEach(course => {
      const li = document.createElement("li");
      li.textContent = course;
      ul.appendChild(li);
    });
    resultDiv.appendChild(ul);
  }
}
