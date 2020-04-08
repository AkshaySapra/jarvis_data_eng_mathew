import React from 'react';
import SingleFieldForm from '../forms/single-field-form';
import DailyListView from '../components/daily-list-view';
import UpdateAll from '../components/update-all-view';
import ManualUpdate from '../forms/manual-update-form';

export default class QuoteServices extends React.Component {

    constructor(props) {
        super(props);
        this.lastButton = false;
        this.forms = {
            "iex": <SingleFieldForm label="Symbol:" verb="get"
              url="http://localhost:8080/quote/iex/ticker" />,
            "track": <SingleFieldForm label="Symbol:" verb="post"
              url="http://localhost:8080/quote/track" />,
            "daily": <DailyListView />,
            "updateall": <UpdateAll />,
            "manual": <ManualUpdate />,
        }
        this.state = {
            currentEndpoint: <p>Placeholder</p>,
            currentEndpointName: "",
        };
    }

    loadForm(event) {
        const clicked = event.target;
        if(this.lastButton) {
            this.lastButton.disabled = false;
        }
        clicked.disabled = true;
        this.lastButton = clicked;
        this.setState({
            currentEndpointName: clicked.id,
            currentEndpoint: this.forms[clicked.id],
        });
    }

    render() {
        return (
        <div style={{width:"100%"}}>
            <div className="button-row">
                <button id="iex" onClick={e => this.loadForm(e)}>Quote from IEX</button>
                <button id="track" onClick={e => this.loadForm(e)}>Track Symbol</button>
                <button id="daily" onClick={e => this.loadForm(e)}>Daily List</button>
                <button id="updateall" onClick={e => this.loadForm(e)}>Update Tracked</button>
                <button id="manual" onClick={e => this.loadForm(e)}>Manual Update</button>
            </div>
            {this.state.currentEndpoint}
        </div>
        );
    }
}