document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "54a1a4ac02b3704da065071ad9f54743";
  const apiUrl = "https://restcountries.com/v3.1/";

  // Arrow function for country dropdown
  const populateCountryDropdown = () => {
    const countrySelect = document.getElementById("country-select");
    fetch(apiUrl + "all?apiKey=" + apiKey)
      .then((response) => response.json())
      .then((data) => {
        // Countries in alphabetical order
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        data.forEach((country) => {
          const option = document.createElement("option");
          option.value = country.name.common;
          option.text = country.name.common;
          countrySelect.appendChild(option);
        });
      });
  };

  // Arrow function to get country information based on the selection
  const getCountryInfo = (selectedCountryName) => {
    fetch(apiUrl + "name/" + selectedCountryName + "?apiKey=" + apiKey)
      .then((response) => response.json())
      .then((countryData) => {
        const selectedCountry = countryData[0];
        document.getElementById("capital").textContent =
          selectedCountry.capital;
        document.getElementById("population").textContent =
          selectedCountry.population.toLocaleString();
      });
  };

  // Fill the country dropdown as soon as the page loads
  populateCountryDropdown();

  // Submit button
  document.getElementById("country-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedCountryName = document.getElementById("country-select").value;
    if (selectedCountryName) {
      getCountryInfo(selectedCountryName);
    }
  });
});
