import React, { Component } from 'react'
import Select from 'react-select'

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
            slope: 0
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

    calcuateQ = () => {
        let rainValues = [...this.state.rainfallValues]
        rainValues = rainValues.sort()
        console.log(rainValues)
    }

    calculateSlope = () => {
        let slope = (Number(this.state.h1) - Number(this.state.h2)) / Number(this.state.distance)
        this.setState({ slope: slope })
    }

    render() {
        const options = [
            { value: "Trapezoidal", label: "Trapezoidal" },
            { value: "Rectangular", label: "Rectangular" },
            { value: "Circular", label: "Circular" }
        ]

        return (
            <div className="container-fluid">
                <div className="row my-5">
                    <div className="col-6 mx-auto card">
                        <h5 className="display-5">Enter Rainfall Data</h5>
                        <div className="row mt-2">
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
                        </div>
                        <div className="row col-6 mx-auto">
                            {/* <div className="col"> */}
                            <button className="btn btn-success form-control my-3" onClick={this.calcuateQ}>Calculate</button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>

                <div className="row my-5">
                    <div className="col-7 mx-auto card">
                        <h5>Sections</h5>
                        <div className="row mt-2">
                            <div className="col-4 my-3">
                                <label>Enter Return Period</label>
                                <input className="form-control" type="text" />
                            </div>
                            <div className="col-4 my-3">
                                <label>Select a section</label>
                                <Select options={options} />
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-4">
                                <label>Select the Manning Value</label>
                                <Select options={this.state.manningOptions} onChange={(e) => this.setState({ manningValue: e.value })} />
                            </div>
                            <div className="col-4">
                                <p>Manning Value: {this.state.manningValue}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 my-3 card mx-1">
                        <h5>Parameters</h5>
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
                                <input type="number" className="form-control" onChange={(e) => this.setState({ slope: e.target.value })} />
                            </div>
                        </div>
                        <div className="row mx-auto">
                            <p>Slope: {this.state.slope}</p>
                        </div>
                        <hr style={{ color: "red" }} />
                        <div className="row">
                            <div className="col-6">
                                <label>Enter Breadth</label>
                                <input type="number" className="form-control" onClick={(e) => this.setState({ breadth: e.target.value })} />
                                <label>Enter Depth</label>
                                <input type="number" className="form-control" onClick={(e) => this.setState({ depth: e.target.value })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
