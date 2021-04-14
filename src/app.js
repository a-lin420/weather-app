const api = `http://api.weatherapi.com/v1/current.json?key=6f407648e01f4148a0985137211404&q=Sydney`

// listen to whenever the window loads, then execute function
window.addEventListener('load', () => {
    let longitude;
    let latitude;

    let locationTimezone = document.querySelector(".location-timezone")
    let localTime = document.querySelector(".location-local-time")

    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")

    // if device allows geolocation access to the browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position) // print location of device

            // retrieve longitude and latitude
            longitude = position.coords.longitude
            latitude = position.coords.latitude
            console.log("Longitude : " + longitude + ", " + "Latitude : " + latitude)

            fetch(api) 
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)

                const {condition, temp_c} = data.current
                const {name, region, country, localtime} = data.location

                locationTimezone.textContent = name + ", " + region + ", " + country
                localTime.textContent = localtime
                temperatureDegree.textContent = temp_c
                temperatureDescription.textContent = condition.text
            }) 
        })

    } 
    
})