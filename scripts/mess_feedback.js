//This is an array of objects containing the data of IITDH mess menu.
const mess_menu = [
    { day: "Monday", breakfast: "Poha", lunch: "Rice, Dal, Aloo Capsicum", dinner: "Chapati, Paneer" },
    { day: "Tuesday", breakfast: "Uthapam", lunch: "Fried Rice/Bagara Rice", dinner: "BisbleBhat, Bhendi Sabzi" },
    { day: "Wednesday", breakfast: "Palak Paratha", lunch: "Rice, Dal, Rasam", dinner: "Chapati, Kofta Curry" },
    { day: "Thursday", breakfast: "Idly & vada", lunch: "Puliyogre", dinner: "Jeera Rice" },
    { day: "Friday", breakfast: "Poori", lunch: "Egg Biryani", dinner: "Aloo 65, Dal, Chapathi " },
    { day: "Saturday", breakfast: "Dosa", lunch: "Tomato Rice", dinner: "Bhendi bhunjiya, Rice" },
    { day: "Sunday", breakfast: "Aloo paratha", lunch: "Egg curry, Rice", dinner: "Mushroom curry, Roti" }
  ];
  
    
  //This  gets the HTML table with ID menuTable and fills it with rows based on the mess_menu array after the page gets loaded.
  window.onload = () => {
    const table = document.getElementById("menuTable");
    mess_menu.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.day}</td>
        <td>${item.breakfast}</td>
        <td>${item.lunch}</td>
        <td>${item.dinner}</td>
      `;
      table.appendChild(row);
    });
  };
  
//This is used to switch between different sections or tabs in the interface.
  function openTab(tabId) {
  //Removes the active class from all tab buttons and tab content areas.
    document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  //Adds active only to the selected tab and its content.
    document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }
  
  //Reads the selected meal (e.g., Breakfast, Lunch...) and feedback text from input fields and submit it to the backend server.
  async function submitFeedback() {
    const meal = document.getElementById("meal").value;
    const feedback = document.getElementById("feedbackText").value.trim();
  
    if (!feedback) {
      alert("Please enter feedback.");
      return;
    }
  //Ends a POST request to backend (/submit-feedback) with the meal and feedback as JSON.
    const res = await fetch("http://localhost:5000/submit-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ meal, feedback })
    });
  
    //Displays message.
    const result = await res.json();
    alert(result.message || "Feedback submitted!");
    document.getElementById("feedbackText").value = "";
  }




  