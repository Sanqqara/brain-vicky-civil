import React, { Component } from 'react'
import Select from 'react-select'
import readXlsxFile from "read-excel-file";
import axios from "axios"
import trap from "./trap.jpg"
import rectangular from "./rectangular.png"
import circular from "./circular.png";

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 0,
            yearBlank: 0,
            rainfall: [],
            rainfallBlank: 0,
            rainfallData: [],
            rainfallValues: [],
            sortedRainfall: [],
            manningOptions: [],
            manningValue: 0,
            distance: 0,
            h1: 0,
            h2: 0,
            slope: 0,
            zValue: 0,
            section: "",
            AValue: 0,
            breadth: 0,
            depth: 0,
            qValue: 0,
            difference: 0,
            optimumDepth: 0,
            rectangularHidden: true,
            trapezoidalHidden: true,
            circularHidden: true,
            nValue: 0,
            theta: 0,
            message: "",
            q_slope: 0,
            q_intercept: 0,
            yearRainArray: [],
            returnPeriod: 0,
            areaInKm: 0,
            terrainValue: 0,
            rainfallHours: 0
        }
    }

    componentDidMount() {

        const manning_values = [
            { "Asbestos cement": 0.011 },
            { "Asphalt": 0.016 },
            { "Brass": 0.011 },
            { "Brick and cement mortar sewers": 0.015 },
            { "Canvas": 0.012 },
            { "Cast or Ductile iron, new": 0.012 },
            { "Clay tile": 0.014 },
            { "Concrete - steel forms": 0.011 },
            { "Concrete (Cement) - finished": 0.012 },
            { "Concrete - wooden forms": 0.015 },
            { "Concrete - centrifugally spun": 0.013 },
            { "Copper": 0.011 },
            { "Corrugated metal": 0.022 },
            { "Earth, smooth": 0.018 },
            { "Earth channel - clean": 0.022 },
            { "Earth channel - gravelly": 0.025 },
            { "Earth channel - weedy": 0.030 },
            { "Earth channel - stony, cobbles": 0.035 },
            { "Earth channel - pasture, farmland": 0.035 },
            { "Floodplains - light brush": 0.050 },
            { "Floodplains - heavy brush": 0.075 },
            { "Floodplains - trees": 0.15 },
            { "Galvanised iron": 0.016 },
            { "Glass": 0.010 },
            { "Gravel, firm": 0.023 },
            { "Lead": 0.011 },
            { "Masonry": 0.025 },
            { "Metal - corrugated": 0.022 },
            { "Natural streams - clean and straight": 0.030 },
            { "Natural streams - major rivers": 0.035 },
            { "Natural streams - sluggish with deep pools": 0.040 },
            { "Natural channels, very poor condition": 0.060 },
            { "Plastic": 0.009 },
            { "Polythylene PE - Corrugated with smooth inner walls": 0.012 }, // estimate
            { "Polythylene PE - Corrugated with corrugated inner walls": 0.021 }, // estimate
            { "Polyvinyl Chloride PVC - with smooth inner walls": 0.010 }, // estimate
            { "Rubble Masonry": 0.020 }, // estimate
            { "Steel - Coal-tar enamel": 0.010 },
            { "Steel - smooth": 0.012 },
            { "Steel - New unlined": 0.011 },
            { "Steel - Riveted": 0.019 },
            { "Vitrified clay sewer pipe": 0.014 }, // estimate
            { "Wood - planned": 0.012 },
            { "Wood - unplaned": 0.013 },
            { "Wood stave pipe, small diameter": 0.012 }, // estimate
            { "Wood stave pipe, large diameter": 0.013 } // estimate
        ]

        const options = []
        for (let i = 0; i < manning_values.length; i++) {
            // console.log([{ value: Object.values(manning_values[i]), label: Object.keys(manning_values[i]) }])
            options.push({ value: Object.values(manning_values[i]), label: Object.keys(manning_values[i]) })
            // return([{ value: Object.values(manning_values[i]), label: Object.keys(manning_values[i]) }])
        }
        this.setState({ manningOptions: options })
        // console.log(options)
    }


    onRainSubmit = () => {
        let rainfallData = [...this.state.rainfallData]
        let data = { [this.state.year]: this.state.rainfall }
        rainfallData.push(data)
        this.setState({ rainfallData: rainfallData })
        this.setState({ rainfallBlank: "" })
        this.setState({ yearBlank: "" })
        let rainfallValues = [...this.state.rainfallValues]
        rainfallValues.push(Number(this.state.rainfall))
        this.setState({ rainfallValues: rainfallValues })
    }

    onYearSubmit = (e) => {
        this.setState({ yearBlank: e.target.value })
        this.setState({ year: e.target.value })
    }

    onMeasureSubmit = (e) => {
        this.setState({ rainfallBlank: e.target.value })
        this.setState({ rainfall: e.target.value })
        // let rainfallValues = [...this.state.rainfallValues]
        // rainfallValues.push(e.target.value)
        // this.setState({rainfallValues: rainfallValues})
    }

    test = () => {
        axios.post("/api/test", { "test": "Hello World", "Timothy": "Sankara" })
            // .then(response => this.setState({ message: response }))
            .then(response => console.log(response.data))
    }

    calcuateQ = () => {
        let data = []
        let rainvalues = []
        let yearValues = []
        let convertedArray = []
        let col_titles = this.state.file[0].slice(0, 2)
        this.state.file.slice(1, this.state.file.length).map((array, index) => (
            rainvalues.push(array[1]),
            yearValues.push(array[0])
        ))
        this.setState({ rainvalues: rainvalues })
        // for (let i = 0; i < rainValues.length; i++) {
        //     let q = 0
        //     let rate = ((rainValues / 10) / this.state.rainfallHours)
        //     let converted = this.state.terrainValue * rate * this.state.areaInKm
        //     console.log(converted)
        // }
        rainvalues = rainvalues.sort().reverse()
        rainvalues.forEach((value => {
            let q = 0
            let rate = ((value / 10) / this.state.rainfallHours)
            let converted = this.state.terrainValue * rate * this.state.areaInKm * 2.778
            // console.log(converted)
            convertedArray.push(converted)
        }))
        // console.log(rainvalues)
        let xyArray = []
        let order = 1
        let returnPeriodColumn = []
        let numberOfColumns = rainvalues.length;

        // generate the return period array and the order:rainfall peak values array
        for (let i = 0; i <= rainvalues.length; i++) {
            xyArray[i] = { [order]: convertedArray[i] } // x is the order, y is the rainvalue
            let returnPeriod = (numberOfColumns+1) / order
            returnPeriodColumn[i] = (returnPeriod)
            order++
        }
        console.log(returnPeriodColumn)
        console.log(convertedArray)
        axios.post("/api/test", { data: xyArray, returnPeriod: this.state.returnPeriod, returnPeriodColumn: returnPeriodColumn })
            .then(response => (
                // console.log(response)
                this.setState({ q_slope: [response.data.slope[0][0]] }),
                this.setState({ q_intercept: [response.data.intercept[0]] }),
                this.setState({ qValue: [response.data.q_value[0][0]] })
            ))
    }

    // calcuateQ = () => {
    //     let rainValues = [...this.state.rainfallValues]
    //     rainValues = rainValues.sort().reverse()
    //     console.log(rainValues)
    //     let xyArray = []
    //     let order = 1
    //     for (let i = 0; i < rainValues.length; i++) {
    //         // console.log(rainValues[i])
    //         xyArray[i] = { [order]: rainValues[i] }
    //         order++
    //     }
    //     console.log(xyArray)
    // }

    showFile = (e) => {
        e.preventDefault()
        // const reader = new FileReader()
        // reader.onload = (e) => {
        //     const data = (e.target.result)
        //     var workbook = XLSX.read(data, {
        //         type: "binary"
        //     })
        // }
        // reader.readAsText(e.target.files[0])
        let x;
        let rainvalues = []
        let yearRainArray = []
        readXlsxFile(e.target.files[0]).then(
            file => (
                this.setState({ file: file }),
                file.slice(1, this.state.file.length).map((array, index) => (
                    // rainvalues.push(array[1]),
                    // yearValues.push(array[0])
                    yearRainArray.push([array[0], array[1]])
                )),
                // this.setState({rainvalues: rainvalues}),
                // this.setState({yearValues: yearValues})
                this.setState({ yearRainArray })
            )
        )
    }


    calculateSlope = () => {
        let slope = (Number(this.state.h1) - Number(this.state.h2)) / Number(this.state.distance)
        this.setState({ slope: (Number(slope) / 100) })
    }

    sectionSelect = (e) => {
        this.setState({ section: e.value })
        // if (e.value === "Trapezoidal") {
        //     this.setState({ zInputHidden: false })
        // } else {
        //     this.setState({ zInputHidden: true })
        // }
        if (e.value == "Rectangular") {
            this.setState({ rectangularHidden: false })
            this.setState({ trapezoidalHidden: true })
            this.setState({ circularHidden: true })
        } else if (e.value == "Trapezoidal") {
            this.setState({ trapezoidalHidden: false })
            this.setState({ rectangularHidden: true })
            this.setState({ circularHidden: true })
        } else if (e.value == "Circular") {
            this.setState({ circularHidden: false })
            this.setState({ trapezoidalHidden: true })
            this.setState({ rectangularHidden: true })
        }
    }

    calculateMain = () => {
        if (this.state.section === "Rectangular") {
            let numberOfLoops = 100000
            let breadth = this.state.breadth
            let depth = this.state.depth
            let differenceArray = []

            while (numberOfLoops > 0) {
                // let depthArray = []
                // let qnsArray = []

                let area = breadth * depth
                let perimeter = breadth + (2 * depth)
                let radius = area / perimeter
                let rPower = Math.pow(radius, (2 / 3))
                let arPower = area * rPower
                // console.log(arPower)

                let q = this.state.qValue
                let n = this.state.manningValue
                let slope = this.state.slope
                let qns = q * n / (Math.pow(slope, 0.5))

                let difference = qns - arPower
                // differenceArray.push(difference)

                // depthArray.push(depth)
                // qnsArray.push(qns)
                // console.log(qns)
                if (difference <= 0) {
                    this.setState({ difference })
                    this.setState({ optimumDepth: depth })
                    console.log(difference, depth)
                    return (difference, depth)
                    break
                }
                numberOfLoops = numberOfLoops - 1
                depth = depth + 0.0005
            }
            // console.log(differenceArray)
        } else if (this.state.section === "Trapezoidal") {
            let numberOfLoops = 100000
            let breadth = this.state.breadth
            let depth = this.state.depth
            let zValue = this.state.zValue
            let slope = this.state.slope

            while (numberOfLoops > 0) {
                let area = breadth * depth + (zValue * depth * depth)
                let oneZSquared = 1 + Math.pow(zValue, 2)


                let perimeter = breadth + (2 * depth * Math.pow(oneZSquared, 0.5))
                let rValue = area / perimeter
                // let radius = area / perimeter
                let rPower = Math.pow(rValue, (2 / 3))
                let arPower = area * rPower

                let n = this.state.manningValue
                let q = this.state.qValue

                console.log("Ar Power: ", arPower)
                console.log("Q: ", q)
                console.log("n: ", n)
                let qns = (n * q) / Math.pow(slope, 0.5)
                console.log("QNS: ", qns)

                // // let n = this.state.manningValue
                // let qns = q * n / (Math.pow(slope, 0.5))

                let difference = qns - arPower
                // differenceArray.push(difference)

                // depthArray.push(depth)
                // qnsArray.push(qns)
                // console.log(qns)
                if (difference <= 0) {
                    this.setState({ difference })
                    this.setState({ optimumDepth: depth })
                    // console.log(difference, depth)
                    // return (difference, depth)
                    break
                }
                numberOfLoops = numberOfLoops - 1
                depth = depth + 0.0005
            }
        } else if (this.state.section === "Circular") {
            let numberOfLoops = 10000
            let depth = this.state.depth
            let slope = this.state.slope
            let theta = this.state.theta
            let n = this.state.manningValue
            let q = this.state.qValue

            while (numberOfLoops > 0) {
                let area = 0.125 * (theta - Math.sin(theta)) * depth * depth
                console.log("Area: ", area)
                let p = (depth * theta) / 2
                console.log("P: ", p)
                let r = area / p
                console.log("R: ", r)
                // console.log(r)
                // console.log(p)
                let rPower = Math.pow(r, (2 / 3))
                console.log("Rpower: ", rPower)
                let arPower = area * rPower
                console.log("ARpower: ", arPower)
                let qns = (q * n) / Math.pow(slope, 0.5)
                console.log("QNS: ", qns)
                // console.log(rPower)
                // console.log(arPower)
                console.log(qns)

                let difference = qns - arPower
                console.log("Difference: ", difference)

                if (difference <= 0) {
                    this.setState({ difference })
                    this.setState({ optimumDepth: depth })
                    // console.log(depth)
                    // console.log(10000 - numberOfLoops)
                    break
                }

                depth = depth + 0.0005
                console.log("Depth: ", depth)
                // theta = theta + 0.5
                numberOfLoops = numberOfLoops - 1
            }
        }
    }

    render() {
        const options = [
            { value: "Trapezoidal", label: "Trapezoidal" },
            { value: "Rectangular", label: "Rectangular" },
            { value: "Circular", label: "Circular" }
        ]

        const terrainOptions = [
            { label: "Flat Residental areas", value: 0.4 },
            { label: "Moderately steep residential areas", value: 0.6 },
            { label: "Built up areas-impervious", value: 0.8 },
            { label: "Rolling lands and clay loam soils", value: 0.5 },
            { label: "Hilly areas, forests, clay and loamy soils", value: 0.5 },
            { label: "Flat cultivated lands and sandy soils", value: 0.2 }
        ]

        return (
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-6 mx-auto card">
                        <h5 className="display-5">Enter Rainfall Data</h5>
                        {/* <div className="row mt-2">
                            <div className="col-6">
                                <label>Year</label>
                                <input className="form-control" type="number" value={this.state.yearBlank} onChange={this.onYearSubmit} />
                            </div>
                            <div className="col-6">
                                <label>Rainfall - m<sup>3</sup>/s</label>
                                <input className="form-control" type="number" value={this.state.rainfallBlank} onChange={this.onMeasureSubmit} />
                            </div>
                            <div className="col-8 mx-auto">
                                <button className="btn btn-success form-control my-3" onClick={this.onRainSubmit}>Submit</button>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-6 mt-4">
                                <input className="input" type="file" onChange={(e) => this.showFile(e)} />
                            </div>
                            <div className="col-6">
                                <label>Enter Return Period(Years)</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ returnPeriod: e.target.value })} />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6">
                                <label>Terrain Value</label>
                                <Select
                                    options={
                                        terrainOptions
                                    }
                                    onChange={(e) => this.setState({ terrainValue: e.value })}
                                />
                                <p>{this.state.terrainValue}</p>
                            </div>
                            <div className="col-6">
                                <label>Enter Basin Area(gi)</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ areaInKm: e.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Number of Rainfall Hours(hrs)</label>
                                <input className="form-control" type="number" onChange={(e) => this.setState({ rainfallHours: e.target.value })} />
                                <p>{this.state.rainfallHours}</p>
                            </div>
                        </div>

                        <div className="row col-6 mx-auto">
                            {/* <div className="col"> */}
                            <button className="btn btn-success form-control my-3" onClick={this.calcuateQ}>Calculate</button>
                            {/* </div> */}
                        </div>

                        {/* <button onClick={this.test}>Test</button> */}
                        {/* <button className="btn btn-success my-3" onClick={this.test2}>Test2</button> */}
                        <p>Q Value: {this.state.qValue} m<sup>3</sup>/s</p>
                    </div>
                    {/* <div className="col-6">
                        <img src={regression} alt={"Chart Image..."}/>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-10 mx-auto card">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>Year</td>
                                    <td>Rainfall</td>
                                    {/* <td>Delete Entry</td> */}
                                </tr>
                            </thead>
                            {this.state.yearRainArray.map((data, index) => (
                                <tbody key={index}>
                                    <tr>
                                        <td>{data[0]}</td>
                                        <td>{data[1]}</td>

                                        {/* <td>
                                            <button className="btn btn-danger"
                                                onClick={(e) => {
                                                    this.setState({
                                                        yearRainArray: this.state.yearRainArray.filter(function (rainData) {
                                                            return rainData !== data
                                                        })
                                                    })
                                                }}
                                            >&#xd7;
                                            </button>
                                        </td> */}
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>


                <div className="row my-5">
                    <div className="col-7 mx-auto card">
                        <h5>Sections</h5>
                        <div className="row">
                            <div className="col-6 my-3">
                                <label>Select a section</label>
                                <Select options={options} onChange={this.sectionSelect.bind(this)} />
                            </div>
                            <div className="col-6 my-3">
                                <label>Select the Manning Value(n)</label>
                                <Select options={this.state.manningOptions} onChange={(e) => this.setState({ manningValue: e.value })} />
                            </div>
                            <div className="col-4">
                                <p>Manning Value: {this.state.manningValue}</p>
                            </div>
                        </div>

                        <hr style={{ backgroundColor: "red" }} />

                        {/* Rectangular Section */}

                        <div className="row" hidden={this.state.rectangularHidden}>
                            <div className="col-6">
                                <label>Enter Breadth(m)</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ breadth: (Number(e.target.value)) })} />
                                <label>Enter Depth(m)</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ depth: (Number(e.target.value)) })} />
                                {/* <div>
                                    <label>Enter Z</label>
                                    <input type="number" className="form-control" onClick={(e) => this.setState({ zValue: e.target.value })} />
                                </div> */}
                                <div className="row justify-content-center my-3">
                                    <div className="col-6">
                                        <button className="btn btn-success" onClick={this.calculateMain}>
                                            Calculate
                                        </button>
                                    </div>
                                </div>

                                <div className="card row mx-auto my-3">
                                    <p>Optimum depth: {this.state.optimumDepth}</p>
                                    <p>Difference: {this.state.difference}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <p>Rectangular Section</p>
                                <img alt="Trapezoidal section image..." src={rectangular} style={{ width: "100%", height: "50%" }} />
                            </div>
                        </div>

                        {/* Trapezoidal Section */}

                        <div className="row" hidden={this.state.trapezoidalHidden}>
                            <div className="col-6">
                                <label>Enter Breadth(m)</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ breadth: (Number(e.target.value)) })} />
                                <label>Enter Depth(m)</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ depth: (Number(e.target.value)) })} />
                                <div>
                                    <label>Enter Z</label>
                                    <input type="number" className="form-control" onChange={(e) => this.setState({ zValue: Number(e.target.value) })} />
                                </div>
                                <div className="row justify-content-center my-3">
                                    <div className="col-6">
                                        <button className="btn btn-success" onClick={this.calculateMain}>
                                            Calculate
                                        </button>
                                    </div>
                                </div>

                                <div className="card row mx-auto my-3">
                                    <p>Optimum depth: {this.state.optimumDepth}</p>
                                    <p>Difference: {this.state.difference}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <p>Trapezoidal Section</p>
                                <img alt="Trapezoidal section image..." src={trap} style={{ width: "100%", height: "50%" }} />
                            </div>
                        </div>

                        {/* Circular Section */}

                        <div className="row" hidden={this.state.circularHidden}>
                            <div className="col-6">
                                <label>Enter Diameter(m)</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ depth: (Number(e.target.value)) })} />
                                <div>
                                    <label>Enter Angle</label>
                                    <input type="number" className="form-control" onChange={(e) => this.setState({ theta: e.target.value })} />
                                </div>
                                <div className="row justify-content-center my-3">
                                    <div className="col-6">
                                        <button className="btn btn-success" onClick={this.calculateMain}>
                                            Calculate
                                        </button>
                                    </div>
                                </div>

                                <div className="card row mx-auto my-3">
                                    <p>Optimum depth: {this.state.optimumDepth}</p>
                                    <p>Difference: {this.state.difference}</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <p>Circular Section</p>
                                <img alt="Trapezoidal section image..." src={circular} style={{ width: "100%", height: "85%" }} />
                            </div>
                        </div>


                    </div>
                    <div className="col-4 my-3 card mx-1">
                        <h5>Slope Calculations</h5>
                        <div className="row">
                            <div className="col-6">
                                <label>Height One</label>
                                <input type="number" className="form-control mb-2" onChange={(e) => this.setState({ h1: e.target.value })} />
                                <label>Height Two</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ h2: e.target.value })} />
                                <label>Distance</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ distance: e.target.value })} />
                                <button className="btn btn-success my-2" onClick={this.calculateSlope}>Calculate Slope</button>
                            </div>
                            <div className="col-6">
                                <label>Enter Slope</label>
                                <input type="number" className="form-control" onChange={(e) => this.setState({ slope: (Number(e.target.value) / 100) })} />
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <p>Slope as a percentage: {this.state.slope}</p>
                        </div>
                        <hr style={{ backgroundColor: "red" }} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
