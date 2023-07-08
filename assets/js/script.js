document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        infoClear();
        warning('Carregando...');
        
        // Get info from API
        let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=0d85b3d40392a6d493dba1e05a3f2b00&units=metric&lang=pt_br`;
        let results = await fetch(urlAPI);
        let json = await results.json();
        
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            infoClear();
            warning('Não encontramos está localização')
        }
    } else {
        infoClear();
    }
});

// Get info from API and show on screen
function showInfo(json) {
    warning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

// Clean info when search again
function infoClear() {
    warning('');
    document.querySelector('.resultado').style.display = 'none';
}

// Show warning message
function warning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}