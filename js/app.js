lucide.createIcons();

const currentDate = document.getElementById("current-date")

const date = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);

currentDate.textContent = formattedDate;