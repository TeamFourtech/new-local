// Show the form and overlay
function showForm() {
  document.getElementById('enquiryForm').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

// Close the form and overlay
function closeForm() {
  document.getElementById('enquiryForm').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// async function submitForm(event) {
//   event.preventDefault();

//   const nameInput = document.getElementById("name").value;
//   const emailInput = document.getElementById("email").value;
//   const phoneInput = document.getElementById("phone").value;
//   const serviceInput = document.getElementById("services").value;
//   const submitButton = document.querySelector(".submit-btn");
//   const loader = document.getElementById("loader");
//   const message = document.getElementById("submissionMessage");

//   // Validation checks
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phonePattern = /^\d{10}$/;

//   if (!emailPattern.test(emailInput)) {
//     alert("Please enter a valid email address.");
//     return;
//   }




//   // Disable the submit button and show the loader
//   submitButton.disabled = true;
//   loader.style.display = "inline-block";

//   // Prepare data for Google Apps Script submission
//   const formData = new FormData();
//   formData.append("name", nameInput);
//   formData.append("email", emailInput);
//   formData.append("phone", phoneInput);
//   formData.append("services", serviceInput);

//   try {
//     // Submit data to Google Apps Script
//     const response = await fetch('https://script.google.com/macros/s/AKfycbzBTORG5Wwrq8VnqHsAo3c3c6zXv45UHDkNiJmJJyoseiusWdMR31RkTzt0csYc9M2RKQ/exec', {
//       method: 'POST',
//       body: new URLSearchParams(Object.fromEntries(formData.entries()))
//     });
//     const result = await response.json();
//     console.log('Google Apps Script response:', result);
//   } catch (error) {
//     console.error('Error sending data to Google Apps Script:', error);
//   }

//   // Prepare email data for EmailJS
//   const templateParams = {
//     name: nameInput,
//     email: emailInput,
//     phone: phoneInput,
//     services: serviceInput,
//   };

//   // Send email using EmailJS
//   emailjs.send('service_gqzc16m', 'template_tpr0u9k', templateParams)
//     .then((response) => {
//       console.log('Email sent successfully!', response.status, response.text);
//     }, (error) => {
//       console.error('Failed to send email:', error);
//       alert("There was a problem sending your email.");
//     })
//     .finally(() => {
//       // Hide the loader and re-enable the submit button
//       loader.style.display = "none";
//       submitButton.disabled = false;

//       // Show the submission message
//       message.style.display = "block";

//       // Reset the form
//       document.getElementById("enquiry_Form").reset();

//       // Hide the message after a brief delay
//       setTimeout(() => {
//         message.style.display = "none";
//       }, 3000);

//       // Close the form (if applicable)
//       closeForm();
//     });
// }

async function submitForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name").value;
  const emailInput = document.getElementById("email").value;
  const phoneInput = document.getElementById("phone").value;
  const serviceInput = document.getElementById("services").value;
  const submitButton = document.querySelector(".submit-btn");
  const loader = document.getElementById("loader");
  const message = document.getElementById("submissionMessage");

  // Validation checks
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  if (!emailPattern.test(emailInput)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Disable the submit button and show the loader
  submitButton.disabled = true;
  loader.style.display = "inline-block";

  // Prepare data for the backend submission
  const formData = new FormData();
  formData.append("name", nameInput);
  formData.append("email", emailInput);
  formData.append("phone", phoneInput);
  formData.append("services", serviceInput);

  try {
    // Send data to Google Apps Script
    const googleResponse = await fetch('https://script.google.com/macros/s/AKfycbzBTORG5Wwrq8VnqHsAo3c3c6zXv45UHDkNiJmJJyoseiusWdMR31RkTzt0csYc9M2RKQ/exec', {
      method: 'POST',
      body: new URLSearchParams(Object.fromEntries(formData.entries()))
    });

    const googleResult = await googleResponse.json();
    console.log('Google Apps Script response:', googleResult);
  } catch (error) {
    console.error('Error sending data to Google Apps Script:', error);
  }

  // Prepare email data for EmailJS
  const templateParams = {
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    services: serviceInput,
  };

  // Send email using EmailJS
  emailjs.send('service_gqzc16m', 'template_tpr0u9k', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
    }, (error) => {
      console.error('Failed to send email:', error);
      alert("There was a problem sending your email.");
    });

  // Send data to your backend API (Mailtrap)
  try {
    const backendResponse = await fetch('https://fourtech-api.onrender.com/send_email', {
      method: 'POST',
      body: formData
    });

    const backendResult = await backendResponse.json();
    console.log('Backend response:', backendResult);
  } catch (error) {
    console.error('Error sending data to backend:', error);
  }

  // Re-enable submit button and hide loader
  loader.style.display = "none";
  submitButton.disabled = false;

  // Show submission message and reset the form
  message.style.display = "block";
  document.getElementById("enquiry_Form").reset();

  // Hide the message after 3 seconds
  setTimeout(() => {
    message.style.display = "none";
  }, 3000);

  // Optionally close the form if required
  closeForm();
}


function countUp(repeatCount = 1) {
  const counters = document.querySelectorAll(".count");
  const speed = 400; // Adjust speed as needed
  let currentRepeat = 0;

  const startCounting = () => {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = target / speed;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;

          // Restart count if repeats are remaining
          if (currentRepeat < repeatCount - 1) {
            setTimeout(() => {
              counter.innerText = "0";
              currentRepeat++;
              startCounting();
            }, 500); // Delay before restarting (optional)
          }
        }
      };

      updateCount();
    });
  };

  startCounting();
}

// Scroll animations
function onScroll() {
  const counters = document.querySelectorAll(".counter");
  const widget = document.getElementById("counter-widget");
  const rect = widget.getBoundingClientRect();

  if (rect.top < window.innerHeight && rect.bottom > 0) {
    counters.forEach((counter, index) => {
      setTimeout(() => {
        counter.style.opacity = "1";
        counter.style.animation = "fadeInUp 1s ease-in-out";
      }, index * 200); // Staggered animation
    });

    countUp(); // Start counter animation
    window.removeEventListener("scroll", onScroll); // Remove listener after triggering
  }
}

window.addEventListener("scroll", onScroll);

// Typewriting effect
document.addEventListener("DOMContentLoaded", () => {
  const text = "Four Technologies"; // The text to type out
  const element = document.getElementById("typewriter");
  let index = 0;

  const typeWriter = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index); // Add one character at a time
      index++;
      setTimeout(typeWriter, 150); // Adjust typing speed here
    } else {
      element.style.borderRight = "none"; // Remove blinking cursor after typing
    }
  };

  typeWriter(); // Start the typing effect
});

// Menu Toggling
document.addEventListener("DOMContentLoaded", function () {
  function toggleMenu() {
    const menu = document.querySelector('.menu-container');
    const hamburger = document.querySelector('.hamburger-menu');

    // Toggle the 'active' class
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }

  // Bind event listeners
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', toggleMenu);
  }

  const signupButton = document.querySelector('.signup');
  if (signupButton) {
    signupButton.addEventListener('click', showForm); // Assuming your signup button has the class 'signup'
  }

  // Ensure .overlay exists in the HTML
  const overlay = document.querySelector('.overlay');
  if (overlay) {
    overlay.addEventListener('click', closeForm); // Close form when overlay is clicked
  } else {
    console.warn('Overlay element not found!');
  }
});

// Function to check if an element is in the viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

// Function to handle animations on scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animation');
  elements.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('visible'); // Add the visible class if in viewport
    } else {
      el.classList.remove('visible'); // Remove the visible class if out of viewport
    }
  });
}

// Attach scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Initial trigger on page load
document.addEventListener('DOMContentLoaded', handleScrollAnimations);



document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const isElementInView = (el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const checkTimelineVisibility = () => {
      timelineItems.forEach(item => {
          if (isElementInView(item)) {
              item.classList.add('visible');
          }
      });
  };

  // Check on scroll and on initial load
  window.addEventListener('scroll', checkTimelineVisibility);
  checkTimelineVisibility(); // Initial check
});


// Function to check if an element is in the viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event (arrowImages)
function handleScroll() {
  const arrowImages = document.querySelectorAll('.arrow-image');

  // Loop through each arrow image and check if it's in the viewport
  arrowImages.forEach((arrow) => {
    if (isElementInViewport(arrow)) {
      arrow.classList.add('arrow-visible'); // Add class to trigger animation
    } else {
      arrow.classList.remove('arrow-visible'); // Remove class when out of viewport
    }
  });
}

// Add event listener for scroll events
window.addEventListener('scroll', handleScroll);

// Initial check for when the page loads
handleScroll();


// async function it_submission(event) {
//   event.preventDefault();

//   console.log("Form submission started.");

//   // Fetch input values
//   const firstName = document.getElementById("first_name").value.trim();
//   const lastName = document.getElementById("last_name").value.trim();
//   const email = document.getElementById("email_input").value.trim();
//   const phone = document.getElementById("phone_input").value.trim();
//   const companyName = document.getElementById("company_name").value.trim();
//   const jobTitle = document.getElementById("job_title").value.trim();
//   const typeOfHire = document.getElementById("hire").value.trim();
//   const numberOfOpenings = document.getElementById("number_of_openings").value.trim();
//   const location = document.getElementById("location").value.trim();
//   const jobDescription = document.getElementById("job_description").value.trim();
//   const submitButton = document.getElementById("itstaffing_submit");
//   const loader = document.getElementById("form_loader");
//   const message = document.getElementById("form_submissionMessage");
  

//   // Phone validation (if provided)
//   if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
//     alert("Please enter a valid international phone number (e.g., +1234567890).");
//     return;
//   }



//   // Disable the submit button and show the loader
//   submitButton.disabled = true;
//   if (loader) {
//     loader.style.display = "inline-block";  // Show the loader
//   }

//   // Prepare data for submission
//   const formData = new FormData();
//   formData.append("first_name", firstName);
//   formData.append("last_name", lastName);
//   formData.append("email", email);
//   formData.append("phone", phone);
//   formData.append("company_name", companyName);
//   formData.append("job_title", jobTitle);
//   formData.append("type_of_hire", typeOfHire);
//   formData.append("number_of_openings", numberOfOpenings);
//   formData.append("location", location);
//   formData.append("job_description", jobDescription);

//   try {
//     // Submit data to Google Apps Script
//     const response = await fetch('https://script.google.com/macros/s/AKfycbzRgbbRMHCx4Hrd4li8v70pVAMOFCe7MZMuNeu8uAhZe7wUuAfF7CW7tQ9B70VsbTA/exec', {
//       method: 'POST',
//       body: new URLSearchParams(Object.fromEntries(formData.entries())),
//     });
//     const result = await response.json();
//     console.log('Google Apps Script response:', result);
//   } catch (error) {
//     console.error('Error sending data to Google Apps Script:', error);
//   }

//   // Prepare email data for EmailJS
//   const templateParams = {
//     first_name: firstName,
//     last_name: lastName,
//     email: email,
//     phone: phone,
//     company_name: companyName,
//     job_title: jobTitle,
//     type_of_hire: typeOfHire,
//     number_of_openings: numberOfOpenings,
//     job_location: location,
//     job_description: jobDescription,
//   };

//   emailjs.send('service_fq8qyb9', 'template_366j0ze', templateParams)
//     .then((response) => {
//       console.log('Email sent successfully!', response.status, response.text);
//       alert("Thank you for your submission!");

//     }, (error) => {
//       console.error('Failed to send email:', error);
//       alert("There was a problem sending your email.");
//     })
//     .finally(() => {
//       // Hide loader and show message after submission
//       if (loader) {
//         loader.style.display = "none";  // Hide loader
//       }
//       submitButton.disabled = false;

//       // Show submission message
//       if (message) {
//         message.style.display = "block";  // Show success message
//       }

//       // Reset the form after submission
//       const form = document.getElementById("itstaffing_form");
//       if (form) {
//         form.reset();  // Reset form
//       }

//       // Hide the success message after 3 seconds
//       setTimeout(() => {
//         if (message) {
//           message.style.display = "none";  // Hide message
//         }
//       }, 3000);

//       // Optional: Close form if necessary
//       closeForm();
//     });
// }

async function it_submission(event) {
  event.preventDefault();

  console.log("Form submission started.");

  // Fetch input values
  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email_input").value.trim();
  const phone = document.getElementById("phone_input").value.trim();
  const companyName = document.getElementById("company_name").value.trim();
  const jobTitle = document.getElementById("job_title").value.trim();
  const typeOfHire = document.getElementById("hire").value.trim();
  const numberOfOpenings = document.getElementById("number_of_openings").value.trim();
  const location = document.getElementById("location").value.trim();
  const jobDescription = document.getElementById("job_description").value.trim();
  const submitButton = document.getElementById("itstaffing_submit");
  const loader = document.getElementById("form_loader");
  const message = document.getElementById("form_submissionMessage");

  // Phone validation (if provided)
  if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      alert("Please enter a valid international phone number (e.g., +1234567890).");
      return;
  }

  // Disable the submit button and show the loader
  submitButton.disabled = true;
  if (loader) {
      loader.style.display = "inline-block";  // Show the loader
  }

  // Prepare data for submission
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("company_name", companyName);
  formData.append("job_title", jobTitle);
  formData.append("type_of_hire", typeOfHire);
  formData.append("number_of_openings", numberOfOpenings);
  formData.append("location", location);
  formData.append("job_description", jobDescription);

  try {
      // Submit data to Google Apps Script
      const response = await fetch('https://script.google.com/macros/s/AKfycbzRgbbRMHCx4Hrd4li8v70pVAMOFCe7MZMuNeu8uAhZe7wUuAfF7CW7tQ9B70VsbTA/exec', {
          method: 'POST',
          body: new URLSearchParams(Object.fromEntries(formData.entries())),
      });
      const result = await response.json();
      console.log('Google Apps Script response:', result);
  } catch (error) {
      console.error('Error sending data to Google Apps Script:', error);
  }

  // Prepare email data for EmailJS
  const templateParams = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      company_name: companyName,
      job_title: jobTitle,
      type_of_hire: typeOfHire,
      number_of_openings: numberOfOpenings,
      job_location: location,
      job_description: jobDescription,
  };

  // Send email using EmailJS
  emailjs.send('service_fq8qyb9', 'template_366j0ze', templateParams)
      .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          alert("Thank you for your submission!");
      }, (error) => {
          console.error('Failed to send email:', error);
          alert("There was a problem sending your email.");
      });

  // Send email using Mailtrap (your API should be handling the email sending in the backend)
  try {
      const mailtrapResponse = await fetch('https://fourtech-staffing-api.onrender.com/send_it_staffing_email', {
          method: 'POST',
          body: new URLSearchParams({
              first_name: firstName,
              last_name: lastName,
              email: email,
              phone: phone,
              company_name: companyName,
              job_title: jobTitle,
              type_of_hire: typeOfHire,
              number_of_openings: numberOfOpenings,
              location: location,
              job_description: jobDescription,
          }),
      });

      const mailtrapResult = await mailtrapResponse.json();
      console.log('Mailtrap email sent:', mailtrapResult);
  } catch (error) {
      console.error('Error sending email with Mailtrap:', error);
  }

  // Show success message and reset form
  if (loader) {
      loader.style.display = "none";  // Hide loader
  }
  submitButton.disabled = false;

  if (message) {
      message.style.display = "block";  // Show success message
  }

  // Reset the form after submission
  const form = document.getElementById("itstaffing_form");
  if (form) {
      form.reset();  // Reset form
  }

  // Hide the success message after 3 seconds
  setTimeout(() => {
      if (message) {
          message.style.display = "none";  // Hide message
      }
  }, 3000);

  // Optional: Close form if necessary
  closeForm();
}





function toggleAnswer(index) {
  const answer = document.getElementById('answer' + index);
  const button = answer.previousElementSibling.querySelector('.toggle-btn');

  if (answer.style.display === "block") {
      answer.style.display = "none"; // Hide the answer
      button.classList.remove("open"); // Reset arrow rotation
  } else {
      answer.style.display = "block"; // Show the answer
      button.classList.add("open"); // Rotate the arrow
  }
}


async function contact_form_submission(event) {
  event.preventDefault();  // Prevent form from submitting the default way

  console.log("Form submission started.");

  // Fetch input values
  const name = document.getElementById("contact_name").value.trim();
  const email = document.getElementById("contact_email").value.trim();
  const phone = document.getElementById("contact_phone").value.trim();
  const message = document.getElementById("message").value.trim();
  const submitButton = document.getElementById("submitBtn");
  const loader = document.getElementById("form_loader");
  const successMessage = document.getElementById("form_submissionMessage");

  // Phone number validation (if provided)
  if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
    alert("Please enter a valid international phone number (e.g., +1234567890).");
    return;
  }

  // Disable the submit button and show the loader
  submitButton.disabled = true;
  if (loader) {
    loader.style.display = "inline-block";  // Show the loader
  }

  // Prepare data for Google Apps Script submission
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("message", message);

  try {
    // Submit data to Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbwFE0jBOulBc1AB6U_Pjj7B7Bh2aHBw0CAd4F0FWdZyo_b46YeWzH3I_ZYmOocCDbBU1A/exec', {
      method: 'POST',
      body: new URLSearchParams(Object.fromEntries(formData.entries())),
    });
    const result = await response.json();
    console.log('Google Apps Script response:', result);
  } catch (error) {
    console.error('Error sending data to Google Apps Script:', error);
  }

  // Prepare email data for EmailJS
  const templateParams = {
    name: name,       // Corresponds to 'name' column in Google Sheets
    email: email,     // Corresponds to 'email' column in Google Sheets
    phone: phone,     // Corresponds to 'phone' column in Google Sheets
    message: message  // Corresponds to 'message' column in Google Sheets
  };

  console.log(templateParams);  // Check if email and message are populated correctly


  emailjs.send('service_keeg7nd', 'template_cme4cnf', templateParams)
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      alert("Thank you for your message! We'll get back to you shortly.");
    }, (error) => {
      console.error('Failed to send email:', error);
      alert("There was a problem sending your message.");
    })
    .finally(() => {
      // Hide loader, show success message, and re-enable the submit button
      if (loader) {
        loader.style.display = "none";  // Hide loader
      }
      submitButton.disabled = false;

      // Show success message
      if (successMessage) {
        successMessage.style.display = "block";  // Show success message
      }

      // Reset the form after submission
      const form = document.getElementById("contactForm");
      if (form) {
        form.reset();  // Reset form
      }

      // Hide the success message after 3 seconds
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = "none";  // Hide success message
        }
      }, 3000);
    });
}



window.addEventListener('load', function () {
  // Show the loader initially
  document.getElementById('ft-loader').style.display = 'flex';
  
  // Set a timeout for 3 seconds (3000 milliseconds)
  setTimeout(function () {
      // Hide the loader after 3 seconds
      document.getElementById('ft-loader').style.opacity = 0;
      document.getElementById('ft-loader').style.visibility = 'hidden';
  }, 500); // 3000ms = 3 seconds
});




function toggleDetails(button) {
  const teamMember = button.closest('.team-member');
  teamMember.classList.toggle('expanded');
  button.textContent = teamMember.classList.contains('expanded') ? 'View Less' : 'View More';
}




