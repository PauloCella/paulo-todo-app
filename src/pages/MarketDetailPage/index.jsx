import React, { Component } from 'react';
import autoBind from "react-autobind";

import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { withRouter } from 'react-router';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { chartOptions } from './utilities/constants';

import { findEarnings, searchCompanyOverview } from './service'
import { formatDateISOToDate } from '../../utilities/formatters';


class MarketDetailPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            overviewLoading: false,
            earningsLoading: false,

            overview: {},
            dataAnnualEarningChart: {},
            dataQuarterlyEarningsChart: {}
        }
    }

    componentDidMount() {
        const symbol = new URLSearchParams(this.props.location.search).get("symbol");
        if (symbol) {
            //buscar as informacoes da org
            // this.searchOverview(symbol)
            this.searchEarnings(symbol)
        }
    }


    searchEarnings(symbol) {
        this.setState({ earningsLoading: true })
        findEarnings(symbol, earning => {
            console.log(earning)
            const dataAnnualEarningChart = {
                labels: earning.annualEarnings?.map(earn => formatDateISOToDate( earn.fiscalDateEnding)).reverse(),
                datasets: [{
                    label: "Earning Per Share",
                    data: earning.annualEarnings?.map(earn => earn.reportedEPS).reverse(),
                    borderColor: "#8dd0ff",
                    backgroundColor: "#8dd0ff20"
                }]
            }

            const dataQuarterlyEarningsChart = {
                labels: earning.quarterlyEarnings?.map(earn => formatDateISOToDate( earn.fiscalDateEnding)).reverse(),
                datasets: [{
                    label: "Estimated EPS",
                    data: earning.quarterlyEarnings?.map(earn => earn.estimatedEPS).reverse(),
                    borderColor: "#8aa0ff",
                    backgroundColor: "#8dd0ff20"
                },
                {
                    label: "Reported EPS",
                    data: earning.quarterlyEarnings?.map(earn => earn.reportedEPS).reverse(),
                    borderColor: "#8550ff",
                    backgroundColor: "#10c92bde"
                }]
            }

            this.setState({
                dataAnnualEarningChart : dataAnnualEarningChart,
                dataQuarterlyEarningsChart : dataQuarterlyEarningsChart,
                earningsLoading: false
            })
        })
    }

    searchOverview(symbol) {
        this.setState({ overviewLoading: true })
        searchCompanyOverview(symbol, overview => {
            this.setState({ overview: overview, overviewLoading: false })
        })
    }

    getTitleCard() {
        <div className="p-d-flex p-jc-between">
            <div>{this.state.overview?.Name}</div>
            <div>{this.state.overview?.Symbol}</div>
        </div>
    }


    render() {


        return (
            <div className="p-grid">
                <div className="p-col-12">

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title={this.getTitleCard()}
                        subTitle={`${this.state.overview?.Industry} - ${this.state.overview?.AssetType}`}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-m-0">
                                <Divider align="center" type="dashed" className="p-mt-0">
                                    <b>Description</b>
                                </Divider>
                                {this.state.overviewLoading ?
                                    <Skeleton with="100%" height="150px" />
                                    :
                                    <p>{this.state.overview?.Description}</p>
                                }
                                <Divider type="dashed" className="p-mt-0" />
                            </div>
                        </div>
                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Annual Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >

                        {this.state.earningsLoading ? (
                            <Skeleton with="100%" height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataAnnualEarningChart}
                                options={chartOptions}
                             />
                        )}

                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Quarterly Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >

                        {this.state.earningsLoading ? (
                            <Skeleton with="100%" height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataQuarterlyEarningsChart}
                                options={chartOptions}
                             />
                        )}

                    </Card>

                </div>
            </div>
        );
    }
}

export default withRouter(MarketDetailPage);
