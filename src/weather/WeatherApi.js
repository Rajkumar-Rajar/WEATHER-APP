import React, { useEffect, useState } from 'react'
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const WeatherApi = () => {



    const [search, setsearch] = useState("salem")
    const [weather1, setweather1] = useState("")

    const [city, setcity] = useState(["salem", "namakkal", "mallasamudram", "attur", "bengaluru", "richmond", "pune", "karnataka", "america", "mumbai"])

    const [cityName, setcityName] = useState("select city")


    const api = {

        key: "aad4f6195454c6573864a6b12e7ea904",
        base: "https://api.openweathermap.org/data/2.5/",
    }

    useEffect(() => {

        fetch(`${api.base}weather?q=${search}&appid=${api.key}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setweather1(data)
            })

    }, [])


    const pieChartData = [
        {
            name: 'feels_like',
            y: weather1 ? parseInt(weather1.main.feels_like) : 1,
            sliced: true,
            selected: true
        },
        {
            name: 'humidity',
            y: weather1 ? parseInt(weather1.main.humidity) : 2
        },
        {
            name: 'pressure',
            y: weather1 ? parseInt(weather1.main.pressure) : 3
        },
        {
            name: 'wind-deg',
            y: weather1 ? parseInt(weather1.wind.deg) : 4
        },
        {
            name: 'wind-speed',
            y: weather1 ? parseInt(weather1.wind.speed) : 5
        },
        {
            name: 'temperature',
            y: weather1 ? parseInt(weather1.main.temp) : 6
        }
    ];


    const options = {
        title: {
            useHTML: true,
            text: `WEATHER DATA <span style="color: skyblue; font-weight: bold;"> ${search.toUpperCase()}</span>`  
        },
        series: [{
            type: 'pie',
            data: pieChartData
        }]
    }




    const searchdata = () => {

        setcityName("select city")
        fetch(`${api.base}weather?q=${search}&appid=${api.key}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setweather1(data)
            })
    }

    const dropdown_search = (item) => {

        setsearch(item)

        setcityName(item)

        fetch(`${api.base}weather?q=${item}&appid=${api.key}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setweather1(data)
            })
    }





    return (
        <div>

            <div className="container">


                <h1 className='text-uppercase text-center text-secondary'>search your town</h1>

                <div className="row row-cols-sm-2 justify-content-between mt-5">
                    <div className="col d-flex justify-content-center">
                       
                       <input type="search"
                            placeholder='city / town'
                            onChange={(e) => { setsearch(e.target.value) }}
                            name="" id=""
                            className='rounded border border-info text-center focus-outline-none focus-shadow-none"'
                            style={{ height: "35px"}}
                        />

                        <button onClick={() => { searchdata() }} className='btn btn-outline-info ms-2'  >search</button>
                      
                    </div>

                    <div className="col d-flex justify-content-center">
                        <div class="dropdown">
                            <button class="btn btn-outline-info dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {cityName}
                            </button>
                            <ul class="dropdown-menu">
                                {
                                    city.map((item, index) =>
                                        <li><a class="dropdown-item" href="#" onClick={() => { dropdown_search(item) }}>{item}</a></li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>


                <h1 className='text-uppercase text-info text-center mt-5'>city data</h1>

                
                    <div className="row row-cols-1  row-cols-sm-1 row-cols-md-2    mt-5">

                        <div className="col">
                            <table class=" table table-hover mt-5">

                                <thead>
                                    <tr>
                                        <td className='fw-bold'>WEATHER</td>
                                        <td className='fw-bold'>DETAILS</td>
                                    </tr>
                                </thead>

                                {
                                    weather1 &&
                                    <tbody>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td >name</td>
                                            <td>{weather1.name}</td>

                                        </tr>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td>temperature</td>
                                            <td>{weather1.main.temp}</td>

                                        </tr>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td> pressure</td>
                                            <td>{weather1.main.pressure}</td>

                                        </tr>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td>weather-main</td>
                                            <td>{weather1.weather[0].main}</td>

                                        </tr>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td >weather-description</td>
                                            <td>{weather1.weather[0].description}</td>

                                        </tr>
                                        <tr className='text-uppercase fw-semibold'>
                                            <td>wind-speed</td>
                                            <td>{weather1.wind.speed}</td>

                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>


                        <div className="col d-flex justify-content-center mt-5">

                            <HighchartsReact
                          
                                highcharts={Highcharts}
                                options={options}
                            />

                        </div>


                    </div>


               
{/* 
                    echo "# WEATHER-APP" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Rajkumar-Rajar/WEATHER-APP.git
git push -u origin main */}


{/* github tokem is name: new_token= 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 */}






            </div>


        </div>
    )
}

export default WeatherApi
