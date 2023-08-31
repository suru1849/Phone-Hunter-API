const loadData = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);
};

// display-phones
const displayPhones = (phones, isShowAll) => {
  const phonesContainer = document.getElementById("phone-container");
  // clear-container
  phonesContainer.innerText = "";

  const showAllContainer = document.getElementById("show-all-contaienr");

  if (phones.length > 10 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 10);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-7 bg-gray-50 shadow-xl`;
    phoneCard.innerHTML = `
           <figure>
           <img
             src=" ${phone.image}"
           />
         </figure>
         <div class="card-body">
           <h2 class="card-title">${phone.phone_name}
            </h2>
           <p>If a dog chews shoes whose shoes does he choose?</p>
           <div class="card-actions justify-center">
             <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
           </div>
         </div>`;

    phonesContainer.appendChild(phoneCard);
  });

  // loading-spinner-stop
  toggleLoadingSpinner(false);
};

// Sreach-Handler
const searchHandler = (isShowAll) => {
  // loading spinner-start
  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  // showing data
  loadData(searchText, isShowAll);
};

// loading-spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadSpinner = document.getElementById("loadSpinner");

  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};

// show-details-button hanlder
const showDetails = async (id) => {
  // console.log("cliked", id);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  console.log(phone);

  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <img class="mx-auto my-5" src= "${phone.image}" />
    <p>Brand: <span class="text-black">${phone?.brand}</span></p>
    <p>Model: <span class="text-black">${phone?.name}</span></p>
    <p>Storage: <span class="text-black">${phone?.mainFeatures?.memory}</span></p>
  `;

  my_modal_5.showModal();
};

// handle-show-All
const handleShowAll = () => {
  searchHandler(true);
};

// default call
loadData();
