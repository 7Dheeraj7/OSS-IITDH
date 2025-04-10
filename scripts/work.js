//Used to submit work requests
async function submitRequest() {
    //Fetching values entered by the user from various input fields on the form.
    const rollNo = document.getElementById("rollNo").value.trim();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();
    const building = document.getElementById("building").value.trim();
    const roomNo = document.getElementById("roomNo").value.trim();
    const floorNo = document.getElementById("floorNo").value.trim();
    const preferredDate = document.getElementById("preferredDate").value;
    const preferredTime = document.getElementById("preferredTime").value;

    //If any field is empty, it alerts the user and stops the function from continuing.
    if (!rollNo || !category || !description || !building || !roomNo || !floorNo || !preferredDate || !preferredTime) {
      alert("Please fill out all required fields.");
      return;
    }

    //Sends a POST request to /submit-work-request in the backend
    //Sends the form data as a JSON object in the body of the request.
     const res = await fetch("http://localhost:5000/submit-work-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rollNo, category, description, building, roomNo, floorNo, preferredDate, preferredTime
      })
    });

    //Display message.
    const result = await res.json();
    alert(result.message || "Work request submitted!");

  //Resets the form to empty
    document.querySelector("form")?.reset?.(); 
    document.getElementById("rollNo").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("building").value = "";
    document.getElementById("roomNo").value = "";
    document.getElementById("floorNo").value = "";
    document.getElementById("preferredDate").value = "";
    document.getElementById("preferredTime").value = "";
  }