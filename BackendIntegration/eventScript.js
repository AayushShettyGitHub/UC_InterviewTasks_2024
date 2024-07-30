document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const container = document.querySelector('.slider__container');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
   

    function getSlideWidth() {
        if (window.innerWidth <= 768) {
            return window.innerWidth; 
        } else {
            return 300+33; //slide + margin
        }
    }
    const slideWidth =getSlideWidth();
    const slidesVisible= slideWidth<=768?1:3;
    const maxTranslation = (totalSlides - slidesVisible) * slideWidth;
    let currentTranslation = 0;
    container.style.transform = `translateX(${currentTranslation}px)`;

    prevButton.addEventListener('click', function () {
        currentTranslation = Math.min(currentTranslation + slideWidth, 0);
        container.style.transform = `translateX(${currentTranslation}px)`;
    });

    nextButton.addEventListener('click', function () {
        currentTranslation = Math.max(currentTranslation - slideWidth, -maxTranslation);
        container.style.transform = `translateX(${currentTranslation}px)`;
    });

    window.addEventListener('resize', () => {
        slideWidth = getSlideWidth();
        slidesVisible = window.innerWidth <= 768 ? 1 : 3;
        maxTranslation = (totalSlides - slidesVisible) * slideWidth;
        currentTranslation = Math.max(Math.min(currentTranslation, 0), -maxTranslation);
        container.style.transform = `translateX(${currentTranslation}px)`;
    });
});

const eventUrl = "https://se-tasks.vercel.app/events";
const eventName = document.querySelector(".header__searchInput");
const searchButton = document.querySelector(".header__searchButton");

async function fetchEventData() {
    try {
        const response = await fetch(eventUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`${eventUrl}/${eventId}`);
        const eventDetails = await response.json();
        return eventDetails;
    } catch (error) {
        console.error('Error fetching event details:', error);
    }
}

window.addEventListener('load', async () => {
    await displayEvents();
});

searchButton.addEventListener("click", async () => {
    const newEventName = eventName.value; 
    const data = await fetchEventData();
    const newData = data.find(obj => obj.name === newEventName);

    if (newData) {
        await displayEventDetails(newData._id);
    } else {
        alert('Event not found');
    }
});

async function displayEvents() {
    const slidesContainer = document.querySelector('.slider__container');
    const events = await fetchEventData();
    slidesContainer.innerHTML = ''; 

    for (const event of events) {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.innerHTML = `
            <h2>${event.name}</h2>
            <p>Date: ${event.date}</p>
            <p>Time: ${event.time}</p>
            <p>Venue: ${event.venue}</p>
            <button class="viewButton">View Details</button>`;
        
        const viewButton = slideElement.querySelector('.viewButton');
        viewButton.addEventListener('click', () => {
            displayEventDetails(event._id);
        });
        
        slidesContainer.appendChild(slideElement);
    }
}

async function displayEventDetails(id) {
    const eventDetails = await fetchEventDetails(id);
    if (!eventDetails) return;

    document.querySelector(".core").style.display = 'none';
    document.querySelector(".slider").style.display = 'none';
    document.querySelector(".footer").style.display = 'none';

    const detailContainer = document.createElement("div");
    detailContainer.classList.add("detailedCard");
    detailContainer.innerHTML = `
        <h2>${eventDetails.name}</h2>
        <p>Date: ${eventDetails.date}</p>
        <p>Time: ${eventDetails.time}</p>
        <p>Venue: ${eventDetails.venue}</p>
        <p>Category: ${eventDetails.category}</p>
        <p>Description: ${eventDetails.description}</p>
        <p>Total Tickets: ${eventDetails.totalTickets}</p>
        <p>Available Tickets: ${eventDetails.availableTickets}</p>
        <p>Booked Tickets: ${eventDetails.bookedTickets}</p>
        <p>Ticket Price: ${eventDetails.ticketPrice}</p> 
        <button onclick="backToHome()">Back to Home</button>`;
    
    document.querySelector(".header").appendChild(detailContainer);
}

function backToHome() {
    document.querySelector(".core").style.display = 'flex';
    document.querySelector(".slider").style.display = 'flex';
    document.querySelector(".footer").style.display = 'flex';
    document.querySelector(".detailedCard").remove();
}
